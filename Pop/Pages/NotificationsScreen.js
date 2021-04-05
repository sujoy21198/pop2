import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Text } from 'native-base'
import Logo from '../assets/Logo'
import TopLogo from '../assets/TopLogo'
import { heightToDp, widthToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64'
import { ActivityIndicator } from 'react-native'

const data = [
    { name: 'TURQUOISE', code: '#1abc9c' },
    { name: 'EMERALD', code: '#2ecc71' },
    { name: 'PETER RIVER', code: '#3498db' },
    { name: 'AMETHYST', code: '#9b59b6' },
    { name: 'WET ASPHALT', code: '#34495e' },
    { name: 'GREEN SEA', code: '#16a085' },
    { name: 'NEPHRITIS', code: '#27ae60' },
    { name: 'BELIZE HOLE', code: '#2980b9' },
    { name: 'WISTERIA', code: '#8e44ad' },
    { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
    { name: 'SUN FLOWER', code: '#f1c40f' },
    { name: 'CARROT', code: '#e67e22' },
    { name: 'ALIZARIN', code: '#e74c3c' },
    { name: 'CLOUDS', code: '#ecf0f1' },
    { name: 'CONCRETE', code: '#95a5a6' },
    { name: 'ORANGE', code: '#f39c12' },
    { name: 'PUMPKIN', code: '#d35400' },
    { name: 'POMEGRANATE', code: '#c0392b' },
    { name: 'SILVER', code: '#bdc3c7' },
    { name: 'ASBESTOS', code: '#7f8c8d' },
]

export default class NotificationScreen extends Component {
    state = {
        notificationList: [],
        isLoading: true
    };
    componentDidMount = async () => {
        this.setLanguageOnMount();
        try {
            let username = base64.encode(await AsyncStorage.getItem('username'));
            let token = await AsyncStorage.getItem('token')
            let response = await axios.get("http://161.35.122.165:3020/api/v1/notifications?info=604240ff4b9a872502ab64d0", {
                headers: {
                    'Content-type': "application/json",
                    'X-Information': username,
                    'Authorization': "POP " + token
                }
            })
            this.setState({notificationList: response.data.notifications, isLoading: false})
        } catch (e) {
            console.log(e)
            this.setState({isLoading: false})
        }        
    }

    getDateTime = (timeStamp, type) => {
        switch(type) {
            case "date" :
                return timeStamp.split("T")[0].split("-")[2] + "-" + timeStamp.split("T")[0].split("-")[1] + "-" + timeStamp.split("T")[0].split("-")[0];
            case "time" :
                return timeStamp.split("T")[1].split(".")[0];
            default: 
                break;
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

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var landTypeLabel = specificObject.labels.find((i) => i.type === 56)
            if (this.state.textLanguageChange === '0') {
            } else if (this.state.textLanguageChange === '1') {
            } else if (this.state.textLanguageChange === '2') {
            } else if (this.state.textLanguageChange === '3') {
            } else if (this.state.textLanguageChange === '4') {
            }

        } catch (error) {
            alert(error)
        }
    }

    render() {
        return (
            <View style={{backgroundColor:BaseColor.BackgroundColor}}>
                <View style={{backgroundColor:'white',width:widthToDp("100%"),height:heightToDp("13%"), flexDirection: 'row'}}>
                    <View style={{marginTop:heightToDp("4%"),marginLeft:widthToDp("3%")}}>
                        <TopLogo />
                    </View>
                    <FontAwesome
                        name="home"
                        size={30}
                        style={{ marginTop: heightToDp("4.6%"), marginLeft: widthToDp("42%") }}
                        onPress={() => this.props.navigation.navigate('DashBoardScreen')}
                    />
                    <FontAwesome
                        name="bell"
                        size={30}
                        style={{ marginTop: heightToDp("4.6%"), marginLeft: widthToDp("5%") }}
                        onPress={() => this.props.navigation.navigate('NotificationsScreen')}
                    />
                    <View style={{
                        position: 'absolute',
                        top: heightToDp("3.2%"),
                        right: widthToDp("3.3%"),
                        width: 20,
                        height: 20, 
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20 / 2,
                        backgroundColor: '#1b1b1b'
                    }}>
                        <Text style={{
                            fontSize: widthToDp("3.3%"),
                            color: '#fff'
                        }}>{this.state.notificationList.length}</Text>
                    </View>
                </View>
                {
                    !this.state.isLoading ?
                    <>
                        <View style={{ marginTop: heightToDp("5%") }}>
                            <Text style={{ fontSize: widthToDp("7%"), alignSelf: 'center',fontFamily:'Oswald-SemiBold' }}>NOTIFICATIONS</Text>
                        </View>
                        <View>
                            {
                                this.state.notificationList.length === 0 ?
                                <View
                                    style={{
                                        marginBottom: heightToDp("80%"),
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text style={{color: '#fff', fontSize: widthToDp("4%")}}>No Notifications Found</Text>
                                </View> : 
                                <FlatGrid
                                    style={{ marginTop: heightToDp("2%"), marginBottom: heightToDp("50%") }}
                                    bounces={true}
                                    itemDimension={130}
                                    data={this.state.notificationList}
                                    bouncesZoom={true}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity 
                                            onPress={
                                                () => 
                                                this.props.navigation.navigate('NotificationDetailsScreen', {
                                                    notificationText: 
                                                        this.state.textLanguageChange==="0" ? item.notificationEnglish.trim() :
                                                        this.state.textLanguageChange==="1" ? item.notificationHindi.trim() :
                                                        this.state.textLanguageChange==="2" ? item.notificationHo.trim() :       
                                                        this.state.textLanguageChange==="3" ? item.notificationOdia.trim() :
                                                        item.notificationSanthali.trim(),
                                                    dateTime: item.created_at
                                                })
                                            }
                                            style={{
                                                height: heightToDp("35%"),
                                                backgroundColor: '#fff',
                                                padding: widthToDp("3%"),
                                                borderRadius: 10
                                            }}
                                        >
                                            <View style={{
                                                height: heightToDp("24%")
                                            }}>
                                                <Text numberOfLines={8} style={{fontFamily:'Oswald-Light',fontSize:widthToDp("4%")}}>
                                                    {
                                                        this.state.textLanguageChange==="0" ? item.notificationEnglish.trim() :
                                                        this.state.textLanguageChange==="1" ? item.notificationHindi.trim() :
                                                        this.state.textLanguageChange==="2" ? item.notificationHo.trim() :       
                                                        this.state.textLanguageChange==="3" ? item.notificationOdia.trim() :
                                                        item.notificationSanthali.trim()
                                                    }
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: widthToDp("2%"), alignItems: 'center' }}>
                                                <Icon
                                                    name="calendar"
                                                    size={15}
                                                />
                                                <Text style={{ marginLeft: widthToDp("2%"),fontFamily:'Oswald-Light' }}>{this.getDateTime(item.created_at, "date")}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: widthToDp("2%"), alignItems: 'center' }}>
                                                <Icon
                                                    name="clockcircleo"
                                                    size={15}
                                                />
                                                <Text style={{ marginLeft: widthToDp("2%"),fontFamily:'Oswald-Light' }}>{this.getDateTime(item.created_at, "time")}</Text>
                                            </View>
                                            {/* <View style={{ backgroundColor: 'white', width: widthToDp("45%"), height: heightToDp("30%"), elevation: 10 }}>
                                                <Text style={{ marginLeft: widthToDp("1%") ,fontFamily:'Oswald-Light'}}>From: Admin</Text>
                                                <Text style={{ marginLeft: widthToDp("1%"), fontSize: widthToDp("5%"),fontFamily:'Oswald-Medium' }}>{item.name}</Text>
                                                <View style={{ marginLeft: widthToDp("1%"), height: heightToDp("25%") }}>
                                                    
                                                </View>
                                                
                                            </View> */}
                                        </TouchableOpacity>
                                    )}
                                />
                            }
                        </View>
                    </> :
                    <View
                        style={{
                            flex: 1, 
                            backgroundColor: BaseColor.BackgroundColor,
                            marginTop: heightToDp("5%"),
                            marginBottom: heightToDp("90%")
                        }}
                    >
                        <ActivityIndicator 
                            size="large"
                            color={"#fff"}                        
                        />
                    </View>                    
                }
            </View>
        );
    }
}