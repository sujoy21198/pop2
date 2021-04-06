import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Text, Input, InputGroup, Icon } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import tts from 'react-native-tts'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default class ForgetPasswordScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            languages: [],
            smallBusinessLabel: ''
        }

        this.state.languages = Languages
    }


    render() {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
                <View style={{ backgroundColor: 'white', width: widthToDp("100%"), height: heightToDp("13%"), flexDirection: 'row' }}>
                    <View style={{ marginTop: heightToDp("3%"), marginLeft: widthToDp("3%") }}>
                        <TopLogo />
                    </View>
                </View>

                <View style={{ marginLeft: widthToDp("10%") }}>
                    <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>USERNAME</Text>
                </View>

                <View style={{ width: widthToDp("80%"), alignSelf: 'center', marginTop: heightToDp("0%") }}>
                    <InputGroup underline={true}>
                        <Input placeholder='Username' />
                        {/* <Icon name='ios-checkmark-circle' style={{ color: 'red' }} /> */}
                    </InputGroup>
                </View>

                <View style={{ marginLeft: widthToDp("10%") }}>
                    <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>USERNAME</Text>
                </View>

                <View style={{ width: widthToDp("80%"), alignSelf: 'center', marginTop: heightToDp("0%") }}>
                    <InputGroup underline={true}>
                        <Input placeholder='Username' />
                        {/* <Icon name='ios-checkmark-circle' style={{ color: 'red' }} /> */}
                    </InputGroup>
                </View>

                <View style={{ marginLeft: widthToDp("10%") }}>
                    <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>USERNAME</Text>
                </View>

                <View style={{ width: widthToDp("80%"), alignSelf: 'center', marginTop: heightToDp("0%") }}>
                    <InputGroup underline={true}>
                        <Input placeholder='Username' />
                        {/* <Icon name='ios-checkmark-circle' style={{ color: 'red' }} /> */}
                    </InputGroup>
                </View>

                <View style={{ height: heightToDp("10%"), marginTop: heightToDp("3%") }}>
                    <TouchableOpacity onPress={() => {}}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf: 'center', marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.nextButtonText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}