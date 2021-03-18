import React, { Component, useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet, PermissionsAndroid } from 'react-native'
import { Button, Text } from 'native-base'
import Logo from '../assets/Logo'
import { heightToDp, widthToDp } from '../Responsive'
import FloatingLabel from 'react-native-floating-labels'
import BaseColor from '../Core/BaseTheme'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import NetInfo from '@react-native-community/netinfo'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import RNFetchBlob from 'rn-fetch-blob'
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions'

const Sound = require('react-native-sound')


const requestCameraPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Cool Photo App Camera Permission",
                message:
                    "Cool Photo App needs access to your camera " +
                    "so you can take awesome pictures.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
        } else {
            console.log("Camera permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};


export default class LanguageScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            languages: [],
            cropImages: []
        }

        this.state.languages = Languages
        requestCameraPermission()
        //console.log(this.state.languages)
    }



    test = (value) => {
        AsyncStorage.setItem('language', value)
        LanguageChange.setLanguage(value)
        this.props.navigation.navigate('SigninScreen', { selectedLanguage: value })

        //alert(value)

    }

    sound = new Sound('http://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg')
    // play = () => {
    //     SoundPlayer.playUrl('http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg')

    // }
    platsound = () => {
        this.sound.play()
    }

    componentDidMount() {
        this.checkSession()
        //this.requestStoragePermission()
        this.permision()
        this.testPermision()
    }

    testPermision = () => {
        check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log('unavailable')
                    break;
                case RESULTS.DENIED:
                    console.log("denieddd")
                    break;
                case RESULTS.GRANTED:
                    console.log("granted")
                    break;
            }
        })

        request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => {
            console.log(result)
        })
    }

    permision = () => {
        const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        if (granted) {
            console.log("You can use the External storage")
        }
        else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
            console.log("External permission denied")
        }
    }




    checkSession = async () => {
        let value = await AsyncStorage.getItem('_id')
        let username = await AsyncStorage.getItem('username')
        let name = await AsyncStorage.getItem('name')
        let token = await AsyncStorage.getItem('token')
        let type = await AsyncStorage.getItem('type')
        let language = await AsyncStorage.getItem('language')
        LanguageChange.setLanguage(language)
        console.log(token + " this is token ")
        if (value) {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        }
    }




    render() {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
                {/* <Button onPress={()=> this.platsound()}>
                    <Text>play</Text>
                </Button> */}
                <View style={{ marginTop: heightToDp("3%"), alignSelf: "center" }}>
                    <Logo />
                </View>
                <View style={{ backgroundColor: '#fff', height: heightToDp("43%"), width: widthToDp("90%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("5%"), borderRadius: 20, elevation: 10 }}>
                    <Text style={{ marginTop: heightToDp("4%"), alignSelf: 'center', fontSize: widthToDp("6%"), fontFamily: 'Oswald-Medium' }}>SELECT LANGUAGE</Text>
                    {/* {
                        Languages.map((item, i) => {
                            return (
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SigninScreen')}>
                                        <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100, flexDirection: 'row' }}>
                                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginLeft: widthToDp("5%") }}>{item.value}</Text>
                                            <Icon
                                                name="microphone"
                                                color="white"
                                                size={20}
                                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6%") }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    } */}
                    <View style={{ flexDirection: 'row', marginTop: heightToDp("5%") }}>
                        <TouchableOpacity onPress={() => this.test(this.state.languages[0].id)}>
                            <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100, flexDirection: 'row' }}>
                                <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginLeft: widthToDp("9%"), justifyContent: 'center' }}>{this.state.languages[0].value}</Text>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.test(this.state.languages[1].id)}>
                            <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100, flexDirection: 'row' }}>
                                <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), justifyContent: 'center', fontWeight: 'bold', fontSize: widthToDp("4.3%"), marginLeft: widthToDp("10%") }}>{this.state.languages[1].value}</Text>

                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: heightToDp("4%") }}>
                        <TouchableOpacity onPress={() => alert("No scripts available")}>
                            <View style={{ backgroundColor: BaseColor.Ho, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100, flexDirection: 'row' }}>
                                <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), marginLeft: widthToDp("5%"), fontWeight: 'bold', fontSize: widthToDp("4.3%"), marginLeft: widthToDp("10%") }}>{this.state.languages[2].value}</Text>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.test(this.state.languages[3].id)}>
                            <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100, flexDirection: 'row' }}>
                                <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("4.7%"), fontWeight: 'bold', fontSize: widthToDp("4.3%"), marginLeft: widthToDp("10%") }}>{this.state.languages[3].value}</Text>

                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => alert("No scripts available")}>
                        <View style={{ marginTop: heightToDp("4%"), backgroundColor: BaseColor.Santhali, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, alignSelf: 'center', flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("3.4%"), fontWeight: 'bold', fontSize: widthToDp("4.3%"), marginLeft: widthToDp("5%") }}>{this.state.languages[4].value}</Text>

                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
