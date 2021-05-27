import React, { Component } from 'react'
import { View, Button, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BaseColor from '../Core/BaseTheme'
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { widthToDp, heightToDp } from '../Responsive'
import Sync from 'react-native-vector-icons/AntDesign'
import Database from 'react-native-vector-icons/FontAwesome'
import NetInfo from '@react-native-community/netinfo'
import axios from 'axios'
import base64 from 'react-native-base64'
import DataAccess from '../Core/DataAccess'
import { objectOf } from 'prop-types'
import HeaderComponent from '../components/HeaderComponent'
import Languages from '../Core/Languages'
import CustomIndicator from '../Core/CustomIndicator';
import { Alert } from 'react-native'



export default class MessageScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            languages: [],
            messages: [],
            stepVideoLabel: '',
            textLanguageChange: '',
            isLoading: false,
            headerLabel: '',
            descLabel: ''
        }
        this.state.languages = Languages
    }

    componentDidMount() {
        this.languagePresent()
        this.getMessageTemplate()
    }

    languagePresent = async () => {
        let value = await AsyncStorage.getItem('language')
        if (value === 'en') {
            this.state.textLanguageChange = '0'
        } else if (value === 'hi') {
            this.state.textLanguageChange = '1'
        } else if (value === 'ho') {
            this.state.textLanguageChange = '2'
        } else if (value === 'od') {
            this.state.textLanguageChange = '3'
        } else if (value === 'san') {
            this.state.textLanguageChange = '4'
        }

        this.loadlabelsFromStorage()
    }


    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var stepVideoLabel = specificObject.labels.find((i) => i.type === 259)
            var headerLabel = specificObject.labels.find((i) => i.type === 260)
            var descLabel = specificObject.labels.find((i) => i.type === 261)
            if (this.state.textLanguageChange === '0') {
                this.setState({ stepVideoLabel: stepVideoLabel.nameEnglish })
                this.setState({ headerLabel: headerLabel.nameEnglish })
                this.setState({ descLabel: descLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({ stepVideoLabel: stepVideoLabel.nameHindi })
                this.setState({ headerLabel: headerLabel.nameHindi })
                this.setState({ descLabel: descLabel.nameHindi })
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ stepVideoLabel: stepVideoLabel.nameHo })
                this.setState({ headerLabel: headerLabel.nameHo })
                this.setState({ descLabel: descLabel.nameHo })
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ stepVideoLabel: stepVideoLabel.nameOdia })
                this.setState({ headerLabel: headerLabel.nameOdia })
                this.setState({ descLabel: descLabel.nameOdia })
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ stepVideoLabel: stepVideoLabel.nameSanthali })
                this.setState({ headerLabel: headerLabel.nameSanthali })
                this.setState({ descLabel: descLabel.nameSanthali })
            }
        } catch (error) {
            console.log(error)
        }
        //this.setState({ crops: specificObject.crops })
        //this.showData()
    }    

    languageChangeFunction = async(data) => {
        
        if(data === 'en'){
            AsyncStorage.setItem('language','en')
            this.setState({textLanguageChange : '0'})
            this.loadlabelsFromStorage()
        }else if(data === 'hi'){
            this.setState({textLanguageChange : '1'})
            AsyncStorage.setItem('language','hi')
            this.loadlabelsFromStorage()
        }else if(data === 'ho'){
            this.setState({textLanguageChange : '2'})
            AsyncStorage.setItem('language','ho')
            this.loadlabelsFromStorage()
        }else if(data === 'od'){
            this.setState({textLanguageChange : '3'})
            AsyncStorage.setItem('language','od')
            this.loadlabelsFromStorage()
        }else if(data === 'san'){
            AsyncStorage.setItem('language','san')
            this.setState({textLanguageChange : '4'})
            this.loadlabelsFromStorage()
        }
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "DashBoardScreen" }]
        });
    }

    getMessageTemplate = async () => {
        this.setState({isLoading: true})
        var messages = [], language = ''
        let value = await AsyncStorage.getItem('language')
        if(value === "en") {
            language = "English";
        } else if(value === "hi") {
            language = "Hindi";
        } else if(value === "ho") {
            language = "Ho";
        } else if(value === "od") {
            language = "Odisa";
        } else if(value === "san") {
            language = "Santhali";
        }
        await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.GetMessageTemplate + language, {
            headers: {
                'Content-type': "accept"
            }
        }).then(function (response) {
            messages = response.data.data
            //console.log(response.data.data)
        }).catch(function (error) {
            console.log(error)
            messages = [];
        })
        // this.state.messages = messages
        this.setState({ messages: messages, isLoading: false })
        console.log(this.state.messages)

    }

    sendMessage = async (msg) => {
        this.setState({isLoading: true})
        let userId = await AsyncStorage.getItem('_id')
        //console.log(userId)
        var status, successText = ''
        await axios.post('https://tupop.in/api/v1/send/message', {
            "userId": userId,
            "message": msg
        }).then(function (response) {
            //messages = response.data.data
            console.log(response.data, msg, userId);
            successText = response.data.msg;
            status = response.data.status
        }).catch(function (error) {
            console.log(error)
        })
        this.setState({isLoading: false})
        if (Number(status) === 1 || Number(status) === 2) {
            Alert.alert("Server Message", successText, [{text: "Ok"}]);
        } else {
            alert("Some error occurred")
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
                <HeaderComponent
                    navigation={this.props.navigation}
                    messageScreen={true}
                />
                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%") }}>
                    <TouchableOpacity onPress={() =>this.languageChangeFunction(this.state.languages[0].id)}>
                        <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontFamily: 'Oswald-Medium' }}>{this.state.languages[0].value}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[1].id)}>
                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[1].value}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[2].id)}>
                        <View style={{ backgroundColor: BaseColor.Ho, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[2].value}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%"), alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[3].id)}>
                        <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[3].value}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[4].id)}>
                        <View style={{ backgroundColor: BaseColor.Santhali, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, marginLeft: widthToDp("2%"), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[4].value}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ borderBottomColor: BaseColor.Stroke, borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("100%") }}></View>
                {/* <TouchableOpacity>
                    <View style={{ marginTop: heightToDp("20%"), alignSelf: 'center', backgroundColor: '#fff', width: widthToDp("50%"), height: heightToDp("4%"), borderRadius: 20 }}>
                        <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.6%") }}>{this.state.stepVideoLabel}</Text>
                    </View>
                </TouchableOpacity> */}
                <Text style={{
                    marginLeft:widthToDp("3%"),
                    marginTop:heightToDp("2%"),
                    fontSize:widthToDp("7%"),
                    fontFamily:'Oswald-Medium'
                }}>{this.state.headerLabel}</Text>
                <Text style={{
                    marginLeft:widthToDp("3%"),
                    marginVertical:heightToDp("3%"),
                    fontSize:widthToDp("5%"),
                }}>{this.state.descLabel}</Text>
                <ScrollView
                    style={{
                        paddingVertical: heightToDp(`${this.state.isLoading ? 3 : 1}%`),
                        paddingHorizontal: widthToDp("3%")
                    }}
                >
                    {
                        this.state.isLoading ? 
                        <CustomIndicator IsLoading={this.state.isLoading} /> :
                        this.state.messages.length > 0 &&
                        this.state.messages.map((i, key) => (
                            (
                                (this.state.textLanguageChange === "0" && i.contentEnglish) ||
                                (this.state.textLanguageChange === "1" && i.contentHindi) ||
                                (this.state.textLanguageChange === "2" && i.contentHo) ||
                                (this.state.textLanguageChange === "3" && i.contentOdia) ||
                                (this.state.textLanguageChange === "4" && i.contentSanthali)
                            ) &&
                            <>
                                <TouchableOpacity 
                                    activeOpacity={0.7}
                                    style={{ backgroundColor: '#fff', padding: widthToDp("5%"), marginTop: heightToDp("2%"), borderRadius: 10 }}
                                    onPress={() => this.sendMessage(
                                        this.state.textLanguageChange === "0" ? i.contentEnglish :
                                        this.state.textLanguageChange === "1" ? i.contentHindi :
                                        this.state.textLanguageChange === "2" ? i.contentHo :
                                        this.state.textLanguageChange === "3" ? i.contentOdia :
                                        this.state.textLanguageChange === "4" ? i.contentSanthali : ""
                                    )}
                                >
                                    {
                                        this.state.textLanguageChange === "0" ? <Text style={{ textAlign: 'center', fontSize: widthToDp("4.5%") }}>{i.contentEnglish}</Text> : ((this.state.textLanguageChange === "1") ? <Text style={{ textAlign: 'center', fontSize: widthToDp("4.5%") }}>{i.contentHindi}</Text> : ((this.state.textLanguageChange === "2") ? <Text style={{ textAlign: 'center', fontSize: widthToDp("4.5%") }}>{i.contentHo}</Text> : ((this.state.textLanguageChange === "3") ? <Text style={{ textAlign: 'center', fontSize: widthToDp("4.5%") }}>{i.contentOdia}</Text> : ((this.state.textLanguageChange === "4") ? <Text style={{ textAlign: 'center', fontSize: widthToDp("4.5%") }}>{i.contentSanthali}</Text> : null))))
                                    }
                                </TouchableOpacity>
                                {key === this.state.messages.length -1 && <View style={{height: heightToDp("3%")}}/>}
                            </>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}