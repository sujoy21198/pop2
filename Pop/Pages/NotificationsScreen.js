import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Text } from 'native-base'
import Logo from '../assets/Logo'
import TopLogo from '../assets/TopLogo'
import { heightToDp, widthToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/AntDesign'

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

    render() {
        return (
            <View style={{backgroundColor:BaseColor.BackgroundColor}}>
                <View style={{backgroundColor:'white',width:widthToDp("100%"),height:heightToDp("13%")}}>
                    <View style={{marginTop:heightToDp("4%"),marginLeft:widthToDp("3%")}}>
                    <TopLogo />
                    </View>
                </View>
                <View style={{ marginTop: heightToDp("5%") }}>
                    <Text style={{ fontSize: widthToDp("7%"), alignSelf: 'center',fontFamily:'Oswald-SemiBold' }}>NOTIFICATIONS</Text>
                </View>
                <View>
                    <FlatGrid
                        style={{ marginTop: heightToDp("2%"), marginBottom: heightToDp("50%") }}
                        bounces={true}
                        itemDimension={130}
                        data={data}
                        bouncesZoom={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('NotificationDetailsScreen')}>
                                <View style={{ backgroundColor: 'white', width: widthToDp("45%"), height: heightToDp("30%"), elevation: 10 }}>
                                    <Text style={{ marginLeft: widthToDp("1%") ,fontFamily:'Oswald-Light'}}>From: Admin</Text>
                                    <Text style={{ marginLeft: widthToDp("1%"), fontSize: widthToDp("5%"),fontFamily:'Oswald-Medium' }}>{item.name}</Text>
                                    <View style={{ marginLeft: widthToDp("1%"), height: heightToDp("18%") }}>
                                        <Text style={{fontFamily:'Oswald-Light',fontSize:widthToDp("5%")}}>this is the body of notification multiline text which will be filled with notification</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginLeft: widthToDp("2%") }}>
                                        <Icon
                                            name="calendar"
                                            size={15}
                                        />
                                        <Text style={{ marginLeft: widthToDp("2%"),fontFamily:'Oswald-Light' }}>12-01-2021</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginLeft: widthToDp("2%") }}>
                                        <Icon
                                            name="clockcircleo"
                                            size={15}
                                        />
                                        <Text style={{ marginLeft: widthToDp("2%"),fontFamily:'Oswald-Light' }}>10:12 AM</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        );
    }
}