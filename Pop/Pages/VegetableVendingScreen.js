import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList, Linking, ScrollView } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import tts from 'react-native-tts'
import base64 from 'react-native-base64'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import HTML from "react-native-render-html";

const Sound = require('react-native-sound')

export default class VegetableVendingScreen extends Component {

    sound = new Sound('http://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg')

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            title: '',
            data: [],
            isLoading: false,
            languages: [],
            screensData: '',
            pageCounter: 0,
            lengthOfData: ''
        }
        this.state.languages = Languages
        //alert(this.state.value)
    }

    componentDidMount() {
        //this.getDetails()
        this.getDetailsFromOffline()
    }


    changeLanguage = (id) => {
        //alert(id)
        AsyncStorage.setItem('language', id)
        LanguageChange.setLanguage(id)
        if (this.state.value === 0) {
            this.setState({ title: LanguageChange.wash })
        } else if (this.state.value === 1) {
            this.setState({ title: LanguageChange.health })
        } else if (this.state.value === 2) {
            this.setState({ title: LanguageChange.covid })
        } else if (this.state.value === 3) {
            this.setState({ title: LanguageChange.govtSchemes })
        }
        // this.setState({data : data})
        // this.state.data[0].name = LanguageChange.wash
        // this.state.data[1].name = LanguageChange.health
        // this.state.data[2].name = LanguageChange.covid
        // this.state.data[3].name = LanguageChange.govtSchemes
    }


    getDetailsFromOffline = async () => {
        try {

            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            //alert(specificObject.nutrationGraden.length)
            this.setState({ lengthOfData: specificObject.vegetableVending.length })

            var descri = specificObject.vegetableVending[this.state.pageCounter]
            this.setState({ screensData: specificObject.vegetableVending[this.state.pageCounter] })
            console.log(specificObject.dryFish[3])
        } catch (error) {
            console.log(error)
        }

        this.setState({ data: descri })

        this.setState({})
    }


    getDetails = async () => {
        this.setState({ isLoading: true })
        var load = true
        var username = await AsyncStorage.getItem('username')
        var token = await AsyncStorage.getItem('token')
        var encodedUsername = base64.encode(username)
        var valueArray = []

        await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.ImportantLinks + this.state.value, {
            headers: {
                'Content-type': "accept",
                'X-Information': encodedUsername,
                'Authorization': "POP " + token
            }
        }).then(function (response) {
            if (response.data.status === 1) {
                load = false
            }
            //console.log(response.data.status)
            valueArray = response.data.data
        }).catch(function (error) {
            console.log(error.message)
        })


        if (load === false) {
            this.setState({ isLoading: false })
        }
        this.setState({ data: valueArray })
        //console.log(this.state.data)

    }

    openLink = (link) => {
        Linking.openURL(link)
    }


    goToDetailsPage = (name, description, contentArea) => {
        //alert(category)
        this.props.navigation.navigate({
            name: 'NutritionGardenDetailsScreen',
            params: {
                name: name,
                contentArea: contentArea,
                description: description
            }
        })
    }



    speak = (data) => {
        // tts.speak(data)
        this.sound.play()
    }

    nextButton = () => {
        var length = parseInt(this.state.lengthOfData)
        //alert(length)

        this.state.pageCounter = this.state.pageCounter + 1
        
        if (this.state.pageCounter === length) {
            // this.props.navigation.reset({
            //     index: 0,
            //     routes: [{ name: "DashBoardScreen" }]
            // })
            this.props.navigation.navigate({
                name: 'VegetableVendingFirstTableScreen'
            })
        }else{
            this.getDetailsFromOffline()
        }
        //alert(this.state.pageCounter)

    }

    render() {
        var valueArray = []
        valueArray = this.state.data
        //console.log(valueArray)
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
                <View style={{ backgroundColor: 'white', width: widthToDp("100%"), height: heightToDp("13%"), flexDirection: 'row' }}>
                    <View style={{ marginTop: heightToDp("3%"), marginLeft: widthToDp("3%") }}>
                        <TopLogo />
                    </View>
                    <Icon
                        name="bell"
                        size={30}
                        style={{ marginTop: heightToDp("4.6%"), marginLeft: widthToDp("52%") }}
                        onPress={() => this.props.navigation.navigate('NotificationsScreen')}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%") }}>
                    <TouchableOpacity onPress={() => this.changeLanguage(this.state.languages[0].id)}>
                        <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginLeft: widthToDp("5%") }}>{this.state.languages[0].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.changeLanguage(this.state.languages[1].id)}>
                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("5%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[1].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("9%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <View style={{ backgroundColor: BaseColor.Ho, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), marginLeft: widthToDp("5%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[2].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6.3%") }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%"), alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.changeLanguage(this.state.languages[3].id)}>
                        <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("4.7%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[3].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6.9%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <View style={{ backgroundColor: BaseColor.Santhali, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, marginLeft: widthToDp("2%"), flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("3.4%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[4].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("3%") }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ borderBottomColor: BaseColor.Stroke, borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("100%") }}></View>
                {
                    this.state.isLoading ? <View style={{ justifyContent: 'center', marginTop: heightToDp("20%") }}><CustomIndicator IsLoading={this.state.isLoading} /></View> : null
                }

                <View style={{ backgroundColor: BaseColor.Red, height: heightToDp("50%"), alignSelf: 'center', width: widthToDp("90%"), borderRadius: 10, marginTop: heightToDp('1.5%') }}>
                    <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>{this.state.screensData.titleEnglish}</Text>
                    <View style={{ backgroundColor: "white", height: heightToDp("45%"), alignSelf: 'center', width: widthToDp("90%"), marginTop: heightToDp('2%'), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                        {/* <View style={{}}>
                            <Image
                                source={{ uri: DataAccess.BaseUrl + DataAccess.NutritionGardenImage + this.state.screensData.imageFile }}
                                style={{ height: heightToDp("15%"), width: widthToDp("80%"), alignSelf: 'center', marginTop: heightToDp("1%"), borderRadius: 10 }}
                            />
                        </View> */}
                        
                        <ScrollView>
                            <Text style={{ fontFamily: 'Oswald-Medium', fontSize: widthToDp("4%"), marginLeft: widthToDp("2%") }}>{this.state.screensData.descEnglish}</Text>
                            <HTML source={{ html: this.state.screensData.descriptionEnglish || '<p></p>' }} containerStyle={{ elevation: 10, marginTop: heightToDp("2%"), marginLeft: widthToDp("2%") }} />
                            <View style={{ marginTop: heightToDp("2%") }}></View>
                        </ScrollView>
                    </View>
                </View>

                <View style={{ height: heightToDp("10%"), marginTop: heightToDp("3%") }}>
                    <TouchableOpacity onPress={() => this.nextButton()}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf: 'center', marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>NEXT</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}