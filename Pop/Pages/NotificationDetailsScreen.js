import React, { Component } from 'react'
import { View } from 'react-native'
import { Text } from 'native-base'
import BaseColor from '../Core/BaseTheme'
import TopLogo from '../assets/TopLogo'
import { heightToDp, widthToDp } from '../Responsive'
import Icon from 'react-native-vector-icons/AntDesign'

export default class NotificationDetailsScreen extends Component {
    render() {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
                <View style={{ backgroundColor: 'white', width: widthToDp("100%"), height: heightToDp("13%") }}>
                    <View style={{ marginTop: heightToDp("4%"), marginLeft: widthToDp("3%") }}>
                        <TopLogo />
                    </View>
                </View>
                <View style={{ marginTop: heightToDp("5%") }}>
                    <Text style={{ fontSize: widthToDp("7%"), alignSelf: 'center',fontFamily:'Oswald-SemiBold' }}>NOTIFICATIONS</Text>
                </View>
                <View style={{ backgroundColor: '#fff', height: heightToDp("43%"), width: widthToDp("90%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("5%"), borderRadius: 20, elevation: 10 }}>
                    <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("3%"), fontSize: widthToDp("5%"),fontFamily:'Oswald-Light' }}>From : Admin</Text>
                    <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("1%"), fontSize: widthToDp("6%"),fontFamily:'Oswald-SemiBold' }}>Title of the notification</Text>
                    <View style={{  height: heightToDp("25%"), marginTop: heightToDp("1%"), width: widthToDp("90%") }}>
                        <Text style={{ marginLeft: widthToDp("3%"),fontFamily:'Oswald-Light',fontSize:widthToDp("6%") }}>this is the body of notification and it will contain the details of the notification</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: widthToDp("39%"),marginTop:heightToDp("2%") }}>
                        <Icon
                            name="calendar"
                            size={15}
                            style={{marginTop:heightToDp("0.6%")}}
                        />
                        <Text style={{ marginLeft: widthToDp("2%"),marginRight:widthToDp("3%"),fontFamily:'Oswald-Light' }}>12-01-2021</Text>
                        <Icon
                            name="clockcircleo"
                            size={15}
                            style={{marginTop:heightToDp("0.6%")}}
                        />
                        <Text style={{ marginLeft: widthToDp("2%"),fontFamily:'Oswald-Light' }}>10:12 AM</Text>
                    </View>
                </View>
            </View>
        );
    }
}