import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Text, Toast } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import Sync from 'react-native-vector-icons/AntDesign'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import NetInfo from '@react-native-community/netinfo'
import HeaderComponent from '../components/HeaderComponent'
import RNFetchBlob from 'rn-fetch-blob'

var Sound = require("react-native-sound");

const data = [
    { name: 'Knowledge Center', code: 'fresh-green-vegetables-produce-greenhouse-garden-nursery-farm_33829-312.jpg' },
    { name: 'Important Links', code: '172-1723685_links-useful-links-icon-png.png' },
    { name: 'Money Manager', code: '826028-rupee-thinkstock.jpg' },
    { name: 'Contact', code: 'KV%2020%20April%202020kv.jpg' },
    { name: 'Message', code: 'Automatically-Message-Facebook-Fans.jpg' },
    { name: 'General Settings', code: '20012020020200fertilisers-bccl.jpg' }
]


export default class DashBoardScreen extends Component {


    constructor(props) {
        super(props)
        this.state = {
            data: [],
            languages: [],
            textLanguageChange: '',
            notificationCount : 0,
            isUserOnline: false
        }

        this.state.languages = Languages
        this.state.data = data
        // this.state.data[0].name = LanguageChange.knowledgeCenter
        // this.state.data[1].name = LanguageChange.importantLinks
        // this.state.data[2].name = LanguageChange.moneyManager
        // this.state.data[3].name = LanguageChange.contact
        // this.state.data[4].name = LanguageChange.message
        // this.state.data[5].name = LanguageChange.generalSettings

    }

    componentDidMount() {   
        this.setLanguageOnMount()
    }

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var knowledgeCenter = specificObject.labels.find((i) => i.type === 22)
            var importantLinks = specificObject.labels.find((i) => i.type === 23)
            var moneyManager = specificObject.labels.find((i) => i.type === 24)
            var contact = specificObject.labels.find((i) => i.type === 25)
            var message = specificObject.labels.find((i) => i.type === 26)
            var generalSettings = specificObject.labels.find((i) => i.type === 27)
            var englishLanguage = specificObject.labels.find((i) => i.type === 225)
            var hindiLanguage = specificObject.labels.find((i) => i.type === 226)
            var odiaLanguage = specificObject.labels.find((i) => i.type === 215)
            var hoLanguage = specificObject.labels.find((i) => i.type === 217)
            var santhaliLanguage = specificObject.labels.find((i) => i.type === 216)
            // var pension = specificObject.labels.find((i) => i.type === 51)
            // var others = specificObject.labels.find((i) => i.type === 52)
            if (this.state.textLanguageChange === '0') {
                this.state.data[0].name = knowledgeCenter.nameEnglish
                this.state.data[1].name = importantLinks.nameEnglish
                this.state.data[2].name = moneyManager.nameEnglish
                this.state.data[3].name = contact.nameEnglish
                this.state.data[4].name = message.nameEnglish
                this.state.data[5].name = generalSettings.nameEnglish
                this.state.languages[0].audio = englishLanguage.audioEnglish
                this.state.languages[1].audio = hindiLanguage.audioEnglish
                this.state.languages[2].audio = hoLanguage.audioEnglish
                this.state.languages[3].audio = odiaLanguage.audioEnglish
                this.state.languages[4].audio = santhaliLanguage.audioEnglish
                // this.state.data[6].name = pension.nameEnglish
                // this.state.data[7].name = others.nameEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.state.data[0].name = knowledgeCenter.nameHindi
                this.state.data[1].name = importantLinks.nameHindi
                this.state.data[2].name = moneyManager.nameHindi
                this.state.data[3].name = contact.nameHindi
                this.state.data[4].name = message.nameHindi
                this.state.data[5].name = generalSettings.nameHindi
                this.state.languages[0].audio = englishLanguage.audioHindi
                this.state.languages[1].audio = hindiLanguage.audioHindi
                this.state.languages[2].audio = hoLanguage.audioHindi
                this.state.languages[3].audio = odiaLanguage.audioHindi
                this.state.languages[4].audio = santhaliLanguage.audioHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                this.state.data[0].name = knowledgeCenter.nameHo
                this.state.data[1].name = importantLinks.nameHo
                this.state.data[2].name = moneyManager.nameHo
                this.state.data[3].name = contact.nameHo
                this.state.data[4].name = message.nameHo
                this.state.data[5].name = generalSettings.nameHo
                this.state.languages[0].audio = englishLanguage.audioHo
                this.state.languages[1].audio = hindiLanguage.audioHo
                this.state.languages[2].audio = hoLanguage.audioHo
                this.state.languages[3].audio = odiaLanguage.audioHo
                this.state.languages[4].audio = santhaliLanguage.audioHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                this.state.data[0].name = knowledgeCenter.nameOdia
                this.state.data[1].name = importantLinks.nameOdia
                this.state.data[2].name = moneyManager.nameOdia
                this.state.data[3].name = contact.nameOdia
                this.state.data[4].name = message.nameOdia
                this.state.data[5].name = generalSettings.nameOdia
                this.state.languages[0].audio = englishLanguage.audioOdia
                this.state.languages[1].audio = hindiLanguage.audioOdia
                this.state.languages[2].audio = hoLanguage.audioOdia
                this.state.languages[3].audio = odiaLanguage.audioOdia
                this.state.languages[4].audio = santhaliLanguage.audioOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                this.state.data[0].name = knowledgeCenter.nameSanthali
                this.state.data[1].name = importantLinks.nameSanthali
                this.state.data[2].name = moneyManager.nameSanthali
                this.state.data[3].name = contact.nameSanthali
                this.state.data[4].name = message.nameSanthali
                this.state.data[5].name = generalSettings.nameSanthali
                this.state.languages[0].audio = englishLanguage.audioSanthali
                this.state.languages[1].audio = hindiLanguage.audioSanthali
                this.state.languages[2].audio = hoLanguage.audioSanthali
                this.state.languages[3].audio = odiaLanguage.audioSanthali
                this.state.languages[4].audio = santhaliLanguage.audioSanthali
                // this.state.data[6].name = pension.nameSanthali
                // this.state.data[7].name = others.nameSanthali
            }

        } catch (error) {
            // alert("Network Error! Data not saved. Please login again. ")
            // this.props.navigation.reset({
            //     index: 0,
            //     routes: [{ name: "LanguageScreen" }]
            // });
            console.log(error,"labels")
        }
        this.setState({ crops: specificObject.crops })
    }

    checkAudioFileExistence = async (audio) => {
        let files = await RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.PictureDir);
        if(files.includes("/storage/emulated/0/Pictures/image_" + audio)) {
            return true;
        } else {
            return false;
        }
    }
    
    playSound = (audio) => {
        if(this.checkAudioFileExistence(audio)) {
            var sound = new Sound("/storage/emulated/0/Pictures/image_" + audio, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log(
                'duration in seconds: ' + sound.getDuration() + 
                ', number of channels: ' + sound.getNumberOfChannels()
            );
            
            // Play the sound with an onEnd callback
            sound.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
            });
        } else return;
    }

    // changeLanguage = (id) => {
    //     //alert(id)
    //     AsyncStorage.setItem('language', id)
    //     LanguageChange.setLanguage(id)
    //     this.setState({ data: data })
    //     this.state.data[0].name = LanguageChange.knowledgeCenter
    //     this.state.data[1].name = LanguageChange.importantLinks
    //     this.state.data[2].name = LanguageChange.moneyManager
    //     this.state.data[3].name = LanguageChange.contact
    //     this.state.data[4].name = LanguageChange.message
    //     this.state.data[5].name = LanguageChange.generalSettings
    // }

    check = async (data) => {
        if (data === this.state.data[5].name) {
            this.props.navigation.navigate({
                name: 'GeneralSettingsScreen'
            })
        } else if (data === this.state.data[0].name) {
            this.props.navigation.navigate({
                name: "KnowledgeCenterScreen"
            })
        } else if (data === this.state.data[1].name) {
            this.props.navigation.navigate({
                name: "ImportantLinksScreen"
            })
        } else if (data === this.state.data[3].name) {
            this.props.navigation.navigate({
                name: "ContactScreen"
            })
        } else if (data === this.state.data[2].name) {
            this.props.navigation.navigate({
                name: "MoneyManagerScreen"
            })
        } else if (data === this.state.data[4].name) {
            let isOnline = await NetInfo.fetch().then(state => state.isConnected);
            if(isOnline) {
                // console.warn("Message");
            } else {
                Toast.show({
                    type: "warning",
                    text: "Please be online to see Message section",
                    duration: 3000
                })
            }
        }
    }

    setLanguageOnMount = async () => {
        let defaultLanguage = await AsyncStorage.getItem('language')
        if (defaultLanguage === 'en') {
            this.setState({ textLanguageChange: '0' })
            this.loadlabelsFromStorage()
        } else if (defaultLanguage === 'hi') {
            this.setState({ textLanguageChange: '1' })
            this.loadlabelsFromStorage()
        } else if (defaultLanguage === 'ho') {
            this.setState({ textLanguageChange: '2' })
            this.loadlabelsFromStorage()
        } else if (defaultLanguage === 'od') {
            this.setState({ textLanguageChange: '3' })
            this.loadlabelsFromStorage()
        } else if (defaultLanguage === 'san') {
            this.setState({ textLanguageChange: '4' })
            this.loadlabelsFromStorage()
        }
    }

    languageChangeFunction = async (data) => {

        if (data === 'en') {
            AsyncStorage.setItem('language', 'en')
            this.setState({ textLanguageChange: '0' })
            this.loadlabelsFromStorage()
        } else if (data === 'hi') {
            this.setState({ textLanguageChange: '1' })
            AsyncStorage.setItem('language', 'hi')
            this.loadlabelsFromStorage()
        } else if (data === 'ho') {
            this.setState({ textLanguageChange: '2' })
            AsyncStorage.setItem('language', 'ho')
            this.loadlabelsFromStorage()
        } else if (data === 'od') {
            this.setState({ textLanguageChange: '3' })
            AsyncStorage.setItem('language', 'od')
            this.loadlabelsFromStorage()
        } else if (data === 'san') {
            AsyncStorage.setItem('language', 'san')
            this.setState({ textLanguageChange: '4' })
            this.loadlabelsFromStorage()
        }
    }

    syncData = async () => {
        
        NetInfo.fetch().then(state => {
            var isConnected = state.isConnected
            console.log(isConnected)
            if (isConnected === true) {
                return this.startDatasync()
            } else {
                return Toast.show({
                    text: "Please be online to sync the data",
                    duration: 3000,
                    type: 'danger'
                })
            }
        })
        
    }

    startDatasync = async() => {
        var token = await AsyncStorage.getItem('token')
        var username = await AsyncStorage.getItem('username')
        var encodedUsername = base64.encode(username)
        var user = await AsyncStorage.getItem('user')
        let parsed = JSON.parse(user);
        var specificObject = parsed.find((i) => i.username === username)
        console.log(specificObject)
        await axios.post(DataAccess.BaseUrl + DataAccess.AccessUrl + "sync-data", {
            data: specificObject
        }, {
            headers: {
                'Content-type': "application/json",
                'X-Information': encodedUsername,
                'Authorization': "POP " + token,
            }
        }).then(function (response) {
            console.log(response.data)
        }).catch(function (error) {
            console.log(error)
        })

        Toast.show({
            text: "Data Synced Successfully",
            duration: 3000,
            type: 'success'
        })
    }   

    render() {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor }}>
                <HeaderComponent 
                    navigation={this.props.navigation}
                    isDashboard={true}
                    hideHome={true}
                    syncData={this.syncData}
                />
                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginHorizontal: widthToDp("1%") }}>
                    <View style={{ flex: 1, backgroundColor: BaseColor.English, alignItems: 'center', justifyContent: 'center', width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                        <TouchableOpacity 
                            style={{width: widthToDp("15%")}}
                            onPress={() => this.languageChangeFunction(this.state.languages[0].id)}
                        >
                            <Text style={{ color: '#fff', fontFamily: 'Oswald-Medium' }}>{this.state.languages[0].value}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{width: widthToDp("8%")}}
                            onPress={() => this.playSound(this.state.languages[0].audio)}
                        >
                            <Icon
                                name="microphone"
                                size={30}
                                color={"#fff"}
                                style={{marginLeft: widthToDp("3%")}}                            
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, backgroundColor: BaseColor.English, alignItems: 'center', justifyContent: 'center', width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                        <TouchableOpacity 
                            style={{width: widthToDp("10%")}}
                            onPress={() => this.languageChangeFunction(this.state.languages[1].id)}
                        >
                            <Text style={{ color: '#fff', fontFamily: 'Oswald-Medium' }}>{this.state.languages[1].value}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{width: widthToDp("10%")}}
                            onPress={() => this.playSound(this.state.languages[1].audio)}
                        >
                            <Icon
                                name="microphone"
                                size={30}
                                color={"#fff"}
                                style={{marginLeft: widthToDp("3%")}}                            
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, backgroundColor: BaseColor.English, alignItems: 'center', justifyContent: 'center', width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                        <TouchableOpacity 
                            style={{width: widthToDp("14%")}}
                            onPress={() => this.languageChangeFunction(this.state.languages[2].id)}
                        >
                            <Text style={{ color: '#fff', fontFamily: 'Oswald-Medium' }}>{this.state.languages[2].value}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{width: widthToDp("10%")}}
                            onPress={() => this.playSound(this.state.languages[2].audio)}
                        >
                            <Icon
                                name="microphone"
                                size={30}
                                color={"#fff"}
                                style={{marginLeft: widthToDp("3%")}}                            
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginHorizontal: widthToDp("17%"), alignSelf: 'center' }}>
                    <View style={{ flex: 1, backgroundColor: BaseColor.English, alignItems: 'center', justifyContent: 'center', width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                        <TouchableOpacity 
                            style={{width: widthToDp("10%")}}
                            onPress={() => this.languageChangeFunction(this.state.languages[3].id)}
                        >
                            <Text style={{ color: '#fff', fontFamily: 'Oswald-Medium' }}>{this.state.languages[3].value}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{width: widthToDp("10%")}}
                            onPress={() => this.playSound(this.state.languages[3].audio)}
                        >
                            <Icon
                                name="microphone"
                                size={30}
                                color={"#fff"}
                                style={{marginLeft: widthToDp("3%")}}                            
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, backgroundColor: BaseColor.English, alignItems: 'center', justifyContent: 'center', width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("1%"), borderRadius: 100, flexDirection: 'row' }}>
                        <TouchableOpacity 
                            style={{width: widthToDp("18%")}}
                            onPress={() => this.languageChangeFunction(this.state.languages[4].id)}
                        >
                            <Text style={{ color: '#fff', fontFamily: 'Oswald-Medium' }}>{this.state.languages[4].value}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{width: widthToDp("8%")}}
                            onPress={() => this.playSound(this.state.languages[4].audio)}
                        >
                            <Icon
                                name="microphone"
                                size={30}
                                color={"#fff"}
                                style={{marginLeft: widthToDp("3%")}}                            
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ borderBottomColor: BaseColor.Stroke, borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("100%") }}></View>               
                <View>
                    <FlatGrid
                        style={{ marginTop: heightToDp("2%"), marginBottom: heightToDp("60%") }}
                        bounces={true}
                        itemDimension={130}
                        data={this.state.data}
                        bouncesZoom={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.check(item.name)}>
                                <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("47%"), height: heightToDp("30%"), elevation: 10, borderRadius: 10 }}>
                                    <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("0.4%"), fontFamily: 'Oswald-Medium' }}>{item.name}</Text>
                                    <Image
                                        style={{ width: widthToDp("47%"), height: heightToDp("25%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("1%") }}
                                        source={{ uri: 'file:///storage/emulated/0/Pictures/image_' + item.code }}
                                    />
                                </View>

                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        );
    }
}