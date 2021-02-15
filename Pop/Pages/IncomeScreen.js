import React, { Component } from 'react'
import { View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Text } from 'native-base'
import BaseColor from '../Core/BaseTheme'
import { heightToDp, widthToDp } from '../Responsive'
import TopLogo from '../assets/TopLogo'
import Income from '../assets/Income'
import Icon from 'react-native-vector-icons/FontAwesome'


export default class IncomeScreen extends Component {
    render() {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
                <View style={{ backgroundColor: 'white', width: widthToDp("100%"), height: heightToDp("13%"),flexDirection: 'row' }}>
                    <View style={{ marginTop: heightToDp("3%"), marginLeft: widthToDp("3%") }}>
                        <TopLogo />
                    </View>
                    <Icon
                        name="bell"
                        size={30}
                        style={{ marginTop: heightToDp("4.6%"), marginLeft: widthToDp("52%") }}
                        onPress={() => this.props.navigation.navigate('NotificationsScreen')}
                    />
                </View>
                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%") }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SigninScreen')}>
                        <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginLeft: widthToDp("5%") }}>ENGLISH</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100,flexDirection:'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft:widthToDp("5%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>हिन्दी</Text>
                            <Icon
                            name="microphone"
                            color="white"
                            size={20}
                            style={{marginTop:heightToDp("1.8%"),marginLeft:widthToDp("9%")}}
                            />
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Ho, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100,flexDirection:'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), marginLeft:widthToDp("5%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>ʤʌgʌr</Text>
                            <Icon
                            name="microphone"
                            color="white"
                            size={20}
                            style={{marginTop:heightToDp("1.8%"),marginLeft:widthToDp("6.3%")}}
                            />
                        </View>
                        </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%"),alignSelf:'center' }}>
                <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100,flexDirection:'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"),marginLeft:widthToDp("4.7%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>ଓଡ଼ିଆ</Text>
                            <Icon
                            name="microphone"
                            color="white"
                            size={20}
                            style={{marginTop:heightToDp("1.8%"),marginLeft:widthToDp("6.9%")}}
                            />
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                    <View style={{backgroundColor:BaseColor.Santhali, width: widthToDp("30%"), height: heightToDp("6%"),  borderRadius: 100, marginLeft: widthToDp("2%"),flexDirection:'row' }}>
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
                <View style={{ borderBottomColor: BaseColor.Stroke, borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("100%") }}></View>
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>LIVESTOCK</Text>
                <View style={{ backgroundColor: BaseColor.Red, height: heightToDp("6%"), width: widthToDp("90%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1%"), borderRadius: 10 }}>
                    <View style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("0.7%"), flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', width: widthToDp("20%") }}>
                            <Income />
                            <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium', color: 'white' }}>INCOME</Text>
                        </View>
                        <Text style={{ marginLeft: widthToDp("45%"), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium', color: 'white' }}>₹</Text>
                        <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium', color: 'white' }}>6000</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', marginTop: heightToDp("2%"), marginLeft: widthToDp("3%"), backgroundColor: 'white', borderRadius: 10, width: widthToDp("40%"), height: heightToDp("8%") }}>
                        <View style={{ width: widthToDp("8%"), height: heightToDp("9%") }}>
                            <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium', color: 'black', marginTop: heightToDp("1.3%") }}>₹</Text>
                        </View>
                        <Text style={{ marginLeft: widthToDp("8%"), fontSize: widthToDp("8%"), fontFamily: 'Oswald-Medium', color: 'black', marginTop: heightToDp("1%") }}>23000</Text>
                    </View>

                    <TouchableOpacity>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("25%"), borderRadius: 100, marginTop: heightToDp("3.5%"), marginLeft: widthToDp("24%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.5%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>CLEAR</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <View style={{ flexDirection: 'row', marginTop: heightToDp("3%"), marginLeft: widthToDp("3%") }}>
                        <TouchableOpacity>
                        <Image
                            source={require('../assets/2000-Note.png')}
                            style={{ height: heightToDp("9%"), width: widthToDp("45%"), borderRadius: 10 }}
                        />
                        </TouchableOpacity>

                        <TouchableOpacity>
                        <Image
                            source={require('../assets/500-Note.jpg')}
                            style={{ height: heightToDp("9%"), width: widthToDp("40%"), borderRadius: 10, marginLeft: widthToDp("3.5%") }}
                        />
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: heightToDp("3%"), marginLeft: widthToDp("3%") }}>

                        <TouchableOpacity>
                        <Image
                            source={require('../assets/200-Note.jpg')}
                            style={{ height: heightToDp("9%"), width: widthToDp("45%"), borderRadius: 10 }}
                        />
                        </TouchableOpacity>
                        
                        <TouchableOpacity>
                        <Image
                            source={require('../assets/100-Note.png')}
                            style={{ height: heightToDp("9%"), width: widthToDp("40%"), borderRadius: 10, marginLeft: widthToDp("3.5%") }}
                        />
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: heightToDp("3%"), marginLeft: widthToDp("3%") }}>

                        <TouchableOpacity>
                        <Image
                            source={require('../assets/50-Note.jpg')}
                            style={{ height: heightToDp("9%"), width: widthToDp("45%"), borderRadius: 10 }}
                        />
                        </TouchableOpacity>

                        <TouchableOpacity>
                        <Image
                            source={require('../assets/20-Note.png')}
                            style={{ height: heightToDp("9%"), width: widthToDp("40%"), borderRadius: 10, marginLeft: widthToDp("3.5%") }}
                        />
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: heightToDp("3%"), marginLeft: widthToDp("3%") }}>
                        <TouchableOpacity>
                        <Image
                            source={require('../assets/10-Note.png')}
                            style={{ height: heightToDp("9%"), width: widthToDp("45%"), borderRadius: 10 }}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <Image
                            source={require('../assets/5-Note.jpg')}
                            style={{ height: heightToDp("9%"), width: widthToDp("40%"), borderRadius: 10, marginLeft: widthToDp("3.5%") }}
                        />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf: 'center', marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.7%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>NEXT</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{marginBottom:heightToDp("3%")}}></View>
                </ScrollView>
            </View>
        );
    }
}