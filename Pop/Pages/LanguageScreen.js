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
import RNFS, { exists } from 'react-native-fs'
import { check, PERMISSIONS, RESULTS, request, checkMultiple, requestMultiple } from 'react-native-permissions'
import TrackPlayer from 'react-native-track-player';


export default class LanguageScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            languages: [],
            cropImages: []
        }

        this.state.languages = Languages
        //console.log(this.state.languages)
    }
    // play = () => {
    //     SoundPlayer.playUrl('http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg')

    // }


    test = (value) => {
        //alert(value)

        AsyncStorage.setItem('language', value)
        LanguageChange.setLanguage(value)
        this.props.navigation.navigate('SigninScreen', { selectedLanguage: value })

        //alert(value)

    }
    playAudio = async (value) => {
        if (value === 'en') {
            await TrackPlayer.setupPlayer();

            await TrackPlayer.add({
                id: 'trackId',
                url: require('../assets/English.mp3'),
                title: 'Track Title',
                artist: 'Track Artist',
            });

            await TrackPlayer.play();
        } else if (value === 'hi') {
            await TrackPlayer.setupPlayer();

            await TrackPlayer.add({
                id: 'trackId',
                url: require('../assets/Hindi.mp3'),
                title: 'Track Title',
                artist: 'Track Artist',
            });

            await TrackPlayer.play();
        } else if (value === 'od') {
            await TrackPlayer.setupPlayer();

            await TrackPlayer.add({
                id: 'trackId',
                url: require('../assets/Odia.mp3'),
                title: 'Track Title',
                artist: 'Track Artist',
            });

            await TrackPlayer.play();
        } else if (value === 'ho') {
            await TrackPlayer.setupPlayer();

            await TrackPlayer.add({
                id: 'trackId',
                url: require('../assets/Ho.mp3'),
                title: 'Track Title',
                artist: 'Track Artist',
            });

            await TrackPlayer.play();
        } else if (value === 'san') {
            await TrackPlayer.setupPlayer();

            await TrackPlayer.add({
                id: 'trackId',
                url: require('../assets/Santhali.mp3'),
                title: 'Track Title',
                artist: 'Track Artist',
            });

            await TrackPlayer.play();
        }
    }

    componentDidMount() {
        //this.checkSession()
        //this.requestStoragePermission()
        this.acceptPermissionDialogBox()
        this.makeDirTest()
        this.seeIfWorks()
    }

    seeIfWorks = async () => {
        const { config, fs } = RNFetchBlob;
        let DirTest = fs.dirs.PictureDir + "/" + 'Pop'
        console.log(DirTest, "lolpop")
    }

    makeDirTest = () => {
        const folderName = RNFS.PicturesDirectoryPath + '/' + 'Pop'
        RNFS.mkdir(folderName)
            .then((result) => {
                console.log(result)

            })
            .catch((err) => {
                console.log(err, "asasalolopopsdjasbkjbakfb")
            })
        // let test = RNFS.ExternalStorageDirectoryPath
        // console.log(test,"lplpplplp")
        // RNFS.readDir(RNFS.ExternalStorageDirectoryPath+'/'+'Pop')
        // .then((result) => {
        //     console.log(result)
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    }



    testPermision = () => {
        check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log('unavailable')
                    break;
                case RESULTS.DENIED:
                    this.acceptPermissionDialogBox()
                    console.log("deniiiiid")
                    break;
                case RESULTS.GRANTED:
                    console.log("granted")
                    break;
            }
        })

        // request(PERMISSIONS.ANDROID.READ_PHONE_STATE).then((result) => {
        //     console.log(result)
        // })



    }

    acceptPermissionDialogBox = () => {
        requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_PHONE_STATE]).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
    }






    // checkSession = async () => {
    //     let value = await AsyncStorage.getItem('_id')
    //     let username = await AsyncStorage.getItem('username')
    //     let name = await AsyncStorage.getItem('name')
    //     let token = await AsyncStorage.getItem('token')
    //     let type = await AsyncStorage.getItem('type')
    //     let language = await AsyncStorage.getItem('language')
    //     LanguageChange.setLanguage(language)
    //     console.log(token + " this is token ")
    //     if (value) {
    //         this.props.navigation.reset({
    //             index: 0,
    //             routes: [{ name: "DashBoardScreen" }]
    //         });
    //     }
    // }




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

                        <View style={{ backgroundColor: BaseColor.English, alignItems: 'center', justifyContent: 'center', width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100, flexDirection: 'row' }}>
                            <TouchableOpacity 
                            style={{ width: widthToDp("15%") }}
                            onPress={() => this.test(this.state.languages[0].id)}>
                                <Text style={{ color: '#fff', fontFamily: 'Oswald-Medium', fontWeight: 'bold', fontSize: widthToDp("3.6%") }}>{this.state.languages[0].value}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ width: widthToDp("8%") }}
                                onPress={() => this.playAudio(this.state.languages[0].id)}
                            >
                                <Icon
                                    name="microphone"
                                    color="white"
                                    size={20}
                                    style={{ marginLeft: widthToDp("3%") }}
                                />
                            </TouchableOpacity>
                        </View>


                        <View style={{ backgroundColor: BaseColor.Hindi, alignItems: 'center', justifyContent: 'center', width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100, flexDirection: 'row' }}>
                            <TouchableOpacity 
                            style={{ width: widthToDp("15%") }}
                            onPress={() => this.test(this.state.languages[1].id)}>
                                <Text style={{ color: '#fff', fontFamily: 'Oswald-Medium', fontWeight: 'bold', fontSize: widthToDp("3.6%") }}>{this.state.languages[1].value}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.playAudio(this.state.languages[1].id)}
                                style={{ width: widthToDp("8%") }}
                            >
                                <Icon
                                    name="microphone"
                                    color="white"
                                    size={20}
                                    style={{ marginLeft: widthToDp("3%") }}
                                />
                            </TouchableOpacity>                            
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: heightToDp("4%") }}>

                        <View style={{ backgroundColor: BaseColor.Ho, alignItems: 'center', justifyContent: 'center', width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100, flexDirection: 'row' }}>
                            <TouchableOpacity 
                            style={{ width: widthToDp("15%") }}
                            onPress={() => this.test(this.state.languages[1].id)}>
                                <Text style={{ color: '#fff', fontFamily: 'Oswald-Medium', fontWeight: 'bold', fontSize: widthToDp("3.6%") }}>{this.state.languages[2].value}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.playAudio(this.state.languages[2].id)}
                                style={{ width: widthToDp("8%") }}
                            >
                                <Icon
                                    name="microphone"
                                    color="white"
                                    size={20}
                                    style={{ marginLeft: widthToDp("3%") }}
                                />
                            </TouchableOpacity>
                        </View>



                        <View style={{ backgroundColor: BaseColor.Uridia, alignItems: 'center', justifyContent: 'center', width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100, flexDirection: 'row' }}>
                            <TouchableOpacity 
                            style={{ width: widthToDp("15%") }}
                            onPress={() => this.test(this.state.languages[3].id)}>
                                <Text style={{ color: '#fff', fontFamily: 'Oswald-Medium', fontWeight: 'bold', fontSize: widthToDp("3.6%") }}>{this.state.languages[3].value}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.playAudio(this.state.languages[3].id)}
                                style={{ width: widthToDp("8%") }}
                            >
                                <Icon
                                    name="microphone"
                                    color="white"
                                    size={20}
                                    style={{ marginLeft: widthToDp("3%") }}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{ marginTop: heightToDp("4%"), backgroundColor: BaseColor.Santhali, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, flexDirection: 'row' }}>
                        <TouchableOpacity 
                            style={{ width: widthToDp("15%") }}
                            onPress={() => this.test(this.state.languages[1].id)}
                        >
                            <Text style={{ color: '#fff', fontFamily: 'Oswald-Medium', fontWeight: 'bold', fontSize: widthToDp("3.6%") }}>{this.state.languages[4].value}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.playAudio(this.state.languages[4].id)}
                            style={{ width: widthToDp("8%") }}
                        >
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginLeft: widthToDp("3%") }}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }
}
