import React, { Component } from 'react'
import { View, Button, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BaseColor from '../Core/BaseTheme'
import Icon from 'react-native-vector-icons/AntDesign'
import { widthToDp, heightToDp } from '../Responsive'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Sync from 'react-native-vector-icons/AntDesign'


export default class GeneralSettingsScreen extends Component {

    go = async () => {
        await AsyncStorage.removeItem('_id')
        
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "LanguageScreen" }]
        });
    }
    refreshApplication = async () => {
        await AsyncStorage.removeItem('offlineData')
        await AsyncStorage.removeItem('cropData')
        await AsyncStorage.removeItem('labelsData')
        
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "LanguageScreen" }]
        });
    }
    render() {
        return (
            <View style={{ 
                backgroundColor: BaseColor.BackgroundColor, 
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center' 
            }}>                
                <TouchableOpacity 
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: heightToDp("5%"),
                        padding: heightToDp("2%"),
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#fff',
                        backgroundColor: '#fff'
                    }}
                    onPress={() => this.refreshApplication()}
                >
                    <Sync
                        name="sync"
                        size={30}
                        onPress={() => this.syncData()}
                    />
                    <Text style={{
                        fontSize: 30,
                        marginLeft: widthToDp("4%")
                    }}>REFRESH APP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#fff',
                        backgroundColor: '#fff',
                        padding: heightToDp("2%"),
                    }}
                    onPress={() => this.go()}
                >
                    <Icon
                        name="logout"
                        size={40}
                    />
                    <Text style={{ fontSize: widthToDp("10%"), marginLeft: widthToDp("4%") }}>LOGOUT</Text>
                </TouchableOpacity>
                {/* <View style={{ 
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                 }}>
                    <TouchableOpacity 
                    style={{
                        paddingBottom: heightToDp("5%"),

                    }}
                    onPress={() => this.refreshApplication()}>
                        <Text>REFRESH APP</Text>
                    </TouchableOpacity>
                    
                </View> */}
            </View>
        );
    }
}