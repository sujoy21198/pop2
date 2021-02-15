import React, { Component, useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Button, Text } from 'native-base'
import Logo from '../assets/Logo'
import { heightToDp, widthToDp } from '../Responsive'
import FloatingLabel from 'react-native-floating-labels'
import BaseColor from '../Core/BaseTheme'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Sound = require('react-native-sound')


export default class LanguageScreen extends Component {

    sound = new Sound('http://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg')
    // play = () => {
    //     SoundPlayer.playUrl('http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg')

    // }
    platsound = () => {
        this.sound.play()
    }

    componentDidMount(){
        this.checkSession()
    }

    checkSession = async() => {
        let value = await AsyncStorage.getItem('_id')
        let username = await AsyncStorage.getItem('username')
        let name = await AsyncStorage.getItem('name')
        let token = await AsyncStorage.getItem('token')
        let type = await AsyncStorage.getItem('type')
        console.log(token+" this is token ")
        if(value){
            this.props.navigation.reset({
                index:0,
                routes:[{name:"DashBoardScreen"}]
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
                <View style={{ backgroundColor: '#fff', height: heightToDp("43%"), width: widthToDp("90%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("5%"), borderRadius: 20,elevation:10 }}>
                    <Text style={{ marginTop: heightToDp("4%"), alignSelf: 'center', fontSize: widthToDp("6%"),fontFamily:'Oswald-Medium' }}>SELECT LANGUAGE</Text>
                    <View style={{ flexDirection: 'row', marginTop: heightToDp("5%") }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SigninScreen')}>
                        <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100,flexDirection:'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"),fontFamily:'Oswald-Medium',marginLeft:widthToDp("5%") }}>ENGLISH</Text>
                            <Icon
                            name="microphone"
                            color="white"
                            size={20}
                            style={{marginTop:heightToDp("1.8%"),marginLeft:widthToDp("6%")}}
                            />
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity >
                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100,flexDirection:'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft:widthToDp("5%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>हिन्दी</Text>
                            <Icon
                            name="microphone"
                            color="white"
                            size={20}
                            style={{marginTop:heightToDp("1.8%"),marginLeft:widthToDp("9%")}}
                            />
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: heightToDp("4%") }}>
                        <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Ho, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100,flexDirection:'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), marginLeft:widthToDp("5%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>ʤʌgʌr</Text>
                            <Icon
                            name="microphone"
                            color="white"
                            size={20}
                            style={{marginTop:heightToDp("1.8%"),marginLeft:widthToDp("6.3%")}}
                            />
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("10%"), borderRadius: 100,flexDirection:'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"),marginLeft:widthToDp("4.7%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>ଓଡ଼ିଆ</Text>
                            <Icon
                            name="microphone"
                            color="white"
                            size={20}
                            style={{marginTop:heightToDp("1.8%"),marginLeft:widthToDp("6.9%")}}
                            />
                        </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                    <View style={{ marginTop: heightToDp("4%"),backgroundColor:BaseColor.Santhali, width: widthToDp("30%"), height: heightToDp("6%"),  borderRadius: 100,alignSelf:'center',flexDirection:'row' }}>
                        <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft:widthToDp("3.4%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>ᱥᱟᱱᱛᱟᱲᱤ</Text>
                        <Icon
                            name="microphone"
                            color="white"
                            size={20}
                            style={{marginTop:heightToDp("1.8%"),marginLeft:widthToDp("3%")}}
                            />
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
