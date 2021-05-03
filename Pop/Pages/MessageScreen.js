import React, { Component } from 'react'
import { View, Button, Text, FlatList, TouchableOpacity } from 'react-native'
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


export default class MessageScreen extends Component {

    constructor(props){
        super(props)
        this.state={
            languageSelected : '',
            messages:[]
        }
    }

    getMessageTemplate = async() => {
        var messages = []
        let value = await AsyncStorage.getItem('language')
        if(value === 'en'){
            this.state.languageSelected = 'English'
        }else if(value === 'hi'){
            this.state.languageSelected = 'Hindi'
        }else if(value === 'ho'){
            this.state.languageSelected = 'Ho'
        }else if(value === 'od'){
            this.state.languageSelected = 'Odisa'
        }else if(value === 'san'){
            this.state.languageSelected = 'Santhali'
        }

        await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.GetMessageTemplate + this.state.languageSelected,{
            headers:{
                'Content-type': "accept"
            }
        }).then(function(response) {
            console.log(response.data)
        }).catch(function (error){
            console.log(error)
        })
        
    }
    render() {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
                <TouchableOpacity onPress={() => this.getMessageTemplate()}>
                    <View style={{ marginTop: heightToDp("20%"), alignSelf: 'center' }}>
                        <Text>GET MESSAGE TEMPLATE</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}