import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'



export default class CropsScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            crops: [],
            isLoading: false,
            isFetching: false,
            textLanguageChange : '',
            languages: []
        }
        this.state.languages = Languages
    }
    componentDidMount() {
        //this.loadCrops()
        this.loadCropsFromStorage()
        this.setLanguageOnMount()
    }

    loadCropsFromStorage = async() => {
        try{
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            console.log(specificObject.crops)
        }catch(error){
            alert(error)
        }
        this.setState({crops : specificObject.crops})
    }

    loadCrops = async () => {

        this.setState({ isLoading: true })
        var load = true
        var username = await AsyncStorage.getItem('username')
        var token = await AsyncStorage.getItem('token')
        var encodedUsername = base64.encode(username)
        var cropsArray = []
        var imageFile;
        console.log(token + " token from crops")
        await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.Crops, {
            headers: {
                'Content-type': "accept",
                'X-Information': encodedUsername,
                'Authorization': "POP " + token,
                'Accept-Language':""
            }
        }).then(function (response) {
            console.log(response.data)
            cropsArray = response.data.data
            console.log(cropsArray.map((i) => i.name))
            if (response.data.status === 1) {
                load = false
            }
            imageFile = cropsArray.map((i) => i.imageFile)
            console.log(imageFile)
            // console.log(cropsArray)
            // var id = cropsArray
            // console.log(id)

        }).catch(function (error) {
            console.log(error.message)
        })


        if (load === false) {
            this.setState({ isLoading: false })
            this.setState({ isFetching: false })
        }

        this.setState({
            crops: cropsArray
        })
    }

    navigateToLandScreen = (data,name,imageFile) => {
        console.log(data)
        this.props.navigation.navigate({
            name: 'LandTypeScreen',
            params: {
                _id: data,
                cropName:name,
                imageFile : imageFile
            }
        })
    }

    setLanguageOnMount = async() => {
        let defaultLanguage = await AsyncStorage.getItem('language')
        if(defaultLanguage === 'en'){
            this.setState({textLanguageChange : '0'})
        }else if(defaultLanguage === 'hi'){
            this.setState({textLanguageChange : '1'})
        }else if(defaultLanguage === 'ho'){
            this.setState({textLanguageChange : '2'})
        }else if(defaultLanguage === 'od'){
            this.setState({textLanguageChange : '3'})
        }else if(defaultLanguage === 'san'){
            this.setState({textLanguageChange : '4'})
        }
    }

    languageChangeFunction = async(data) => {
        
        if(data === 'en'){
            AsyncStorage.setItem('language','en')
            this.setState({textLanguageChange : '0'})
        }else if(data === 'hi'){
            this.setState({textLanguageChange : '1'})
            AsyncStorage.setItem('language','hi')
        }else if(data === 'ho'){
            this.setState({textLanguageChange : '2'})
            AsyncStorage.setItem('language','ho')
        }else if(data === 'od'){
            this.setState({textLanguageChange : '3'})
            AsyncStorage.setItem('language','od')
        }else if(data === 'san'){
            AsyncStorage.setItem('language','san')
            this.setState({textLanguageChange : '4'})
        }
    }

    onRefresh = () => {
        this.setState({ isFetching: true }, function () { this.loadCrops() });
    }

    render() {
        var cropsArray = []
        cropsArray = this.state.crops
        //console.log(cropsArray)
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor}}>
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
                    <TouchableOpacity onPress={() =>this.languageChangeFunction(this.state.languages[0].id)}>
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

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[1].id)}>
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

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[2].id)}>
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
                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[3].id)}>
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

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[4].id)}>
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
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>{LanguageChange.crops}</Text>
                {
                    this.state.isLoading ? <View style={{ justifyContent: 'center', marginTop: heightToDp("20%"),backgroundColor: BaseColor.BackgroundColor }}><CustomIndicator IsLoading={this.state.isLoading} /></View> :
                        <View>
                            <FlatGrid
                                style={{ marginTop: heightToDp("1%"), marginBottom: heightToDp("74%"),backgroundColor:BaseColor.BackgroundColor }}
                                bounces={true}
                                itemDimension={130}
                                data={Object.values(cropsArray)}
                                bouncesZoom={true}
                                onRefresh={() => this.onRefresh()}
                                refreshing={this.state.isFetching}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => this.navigateToLandScreen(item._id, item.nameEnglish , item.imageFile)}>
                                        <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("47%"), height: heightToDp("30%"), elevation: 10, borderRadius: 10 }}>
                                            {
                                                this.state.textLanguageChange==='0'? <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("0.4%"), fontFamily: 'Oswald-Medium' }}>{item.nameEnglish}</Text> : ((this.state.textLanguageChange === '1') ? <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("0.4%"), fontFamily: 'Oswald-Medium' }}>{item.nameHindi}</Text> : ((this.state.textLanguageChange === '2') ? <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("0.4%"), fontFamily: 'Oswald-Medium' }}>{item.nameHo}</Text> : ((this.state.textLanguageChange === '3') ? <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("0.4%"), fontFamily: 'Oswald-Medium' }}>{item.nameOdia}</Text>: ((this.state.textLanguageChange === '4') ? <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("0.4%"), fontFamily: 'Oswald-Medium' }}>{item.nameSanthali}</Text> : null))) )
                                            }
                                            
                                            <Image
                                                style={{ width: widthToDp("47%"), height: heightToDp("25%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("1%") }}
                                                source={{ uri: DataAccess.BaseUrl + DataAccess.CropImage + item.imageFile }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                }


            </View>
        );
    }
}