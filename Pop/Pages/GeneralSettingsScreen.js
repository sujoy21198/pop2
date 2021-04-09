import React, { Component } from 'react'
import { View, Button, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BaseColor from '../Core/BaseTheme'
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { widthToDp, heightToDp } from '../Responsive'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Sync from 'react-native-vector-icons/AntDesign'
import Database from 'react-native-vector-icons/FontAwesome'
import NetInfo from '@react-native-community/netinfo'


export default class GeneralSettingsScreen extends Component {
    state = {
        refreshLabel: ""
    };
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
        await AsyncStorage.removeItem('numberOfCrops')
        await AsyncStorage.removeItem('labelsData')
        await AsyncStorage.removeItem('smallBusiness')
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "LanguageScreen" }]
        });
    }
    componentDidMount = async() => this.setLanguageOnMount();

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


    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var refreshLabel = specificObject.labels.find((i) => i.type === 220)
            if (this.state.textLanguageChange === '0') {
                this.setState({ refreshLabel: refreshLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({ refreshLabel: refreshLabel.nameHindi })
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ refreshLabel: refreshLabel.nameHo })
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ refreshLabel: refreshLabel.nameOdia })
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ refreshLabel: refreshLabel.nameSanthali })
            }
        } catch (error) {
            alert(error)
        }
        //this.setState({ crops: specificObject.crops })
        //this.showData()
    }


    dataSync  = async() => {
        NetInfo.fetch().then(state => {
            var isConnected = state.isConnected
            if (isConnected === true) {
                return alert(isConnected)
            }else{
                return alert("Please connect to internet")
            }
        })
    }



    render() {
        return (
            <View style={{ 
                backgroundColor: BaseColor.BackgroundColor, 
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center' 
            }}>     
                {/* <TouchableOpacity 
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
                    onPress={() => this.props.navigation.navigate("EditProfile")}
                >
                    <Ionicons
                        name={Platform.OS==="android" ? 'md-create-outline' : 'ios-create-outline'}
                        size={40}
                        color={"#1b1b1b"}
                    />
                    <Text style={{
                        fontSize: 30,
                        marginLeft: widthToDp("4%")
                    }}>EDIT PROFILE</Text>
                </TouchableOpacity>            */}
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
                        onPress={() => {}}
                    />
                    <Text style={{
                        fontSize: 30,
                        marginLeft: widthToDp("4%")
                    }}>{this.state.refreshLabel}</Text>
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
                </TouchableOpacity>
                
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
                        backgroundColor: '#fff',
                        marginTop:heightToDp("5%")
                    }}
                    onPress={() => this.dataSync()}
                >
                    <Database
                        name="database"
                        size={30}
                        onPress={() => {}}
                    />
                    <Text style={{
                        fontSize: 30,
                        marginLeft: widthToDp("4%")
                    }}>DATA SYNC</Text>
                </TouchableOpacity>

                <Text style={{
                    position: 'absolute',
                    backgroundColor: '#fff',
                    bottom: 0,
                    width: '100%',
                    textAlign: 'center',
                    fontSize: widthToDp("4%"),
                    paddingVertical: heightToDp("0.8%"),
                    fontWeight: 'bold'
                }}>Version - 1.0</Text>
            </View>
        );
    }
}