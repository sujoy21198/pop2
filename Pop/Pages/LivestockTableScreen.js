import React, { Component } from 'react'
import { View, Image, TouchableOpacity , ScrollView} from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'

const months = [
    {'name':'JAN','vaccine1':'Deworming', 'vaccine2':'Lasota'},
    {'name': 'FEB','vaccine1':'', 'vaccine2':'Lasota'},
    {'name': 'MAR','vaccine1':'', 'vaccine2':''},
    {'name': 'APR','vaccine1':'Deworming', 'vaccine2':'Lasota'},
    {'name': 'MAY','vaccine1':'', 'vaccine2':''},
    {'name': 'JUN','vaccine1':'', 'vaccine2':''},
    {'name': 'JUL','vaccine1':'Deworming', 'vaccine2':'Lasota'},
    {'name': 'AUG','vaccine1':'', 'vaccine2':''},
    {'name': 'SEP','vaccine1':'', 'vaccine2':'Lasota'},
    {'name': 'OCT','vaccine1':'Deworming', 'vaccine2':'Pox'},
    {'name': 'NOV','vaccine1':'', 'vaccine2':''},
    {'name': 'DEC','vaccine1':'', 'vaccine2':''}
]

export default class LivestockTableScreen extends Component{
    render(){
        return(
            <View style={{ backgroundColor: BaseColor.BackgroundColor,flex:1 }}>
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
                <ScrollView>
                    <View style={{backgroundColor:BaseColor.Red,height:heightToDp("60%"),alignSelf:'center',width:widthToDp("90%"),borderRadius:10, marginTop: heightToDp('1.5%')}}>
                    <Text style={{color: "#fff", fontSize: widthToDp("5%"),marginLeft:widthToDp("5%"), marginTop: heightToDp("1%"),fontFamily:'Oswald-Medium'}}>Immunisation Calendar</Text>
                        <View style={{backgroundColor:"white",height:heightToDp("54.5%"),alignSelf:'center',width:widthToDp("90%"), marginTop: heightToDp('2%'),borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                            <View style={{borderWidth:1,height:heightToDp("40%"), width:widthToDp("85%"),marginTop:heightToDp("2%"),marginLeft:widthToDp("2%")}}>
                                <View style={{flexDirection:'row'}}>
                                <View style={{borderWidth:1,height:heightToDp("38%"), width:widthToDp("28%"),marginTop:heightToDp("2%")}}>
                                    {
                                        months.map((i) => {
                                            return(
                                                <View>
                                                    <Text style={{fontSize:widthToDp("5%")}}>{i.name}</Text>
                                                    <View style={{ borderBottomColor: "black", borderBottomWidth: 1,width: widthToDp("84%") }}></View>
                                                </View>
                                                
                                            )
                                        })
                                    }
                                </View>
                                <View style={{borderWidth:1,height:heightToDp("38%"), width:widthToDp("28%"),marginTop:heightToDp("2%")}}>
                                {
                                        months.map((i) => {
                                            return(
                                                <View>
                                                    <Text style={{fontSize:widthToDp("5%")}}>{i.vaccine1}</Text>
                                                    <View style={{ borderBottomColor: "black", borderBottomWidth: 1,width: widthToDp("0%") }}></View>
                                                </View>
                                                
                                            )
                                        })
                                    }
                                </View>
                                <View style={{borderWidth:1,height:heightToDp("38%"), width:widthToDp("28.50%"),marginTop:heightToDp("2%")}}>
                                {
                                        months.map((i) => {
                                            return(
                                                <View>
                                                    <Text style={{fontSize:widthToDp("5%")}}>{i.vaccine2}</Text>
                                                    <View style={{ borderBottomColor: "black", borderBottomWidth: 1,width: widthToDp("0%") }}></View>
                                                </View>
                                                
                                            )
                                        })
                                    }
                                </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: heightToDp("10%") }}></View>
                </ScrollView>
                <View style={{ height: heightToDp("10%") }}>
                        <TouchableOpacity onPress={() => this.nextButton()}>
                            <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf:'center', marginTop: heightToDp("2%") }}>
                                <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center',fontFamily:'Oswald-Medium' }}>NEXT</Text>
                            </View>
                        </TouchableOpacity>
                </View>
            </View>
        );
    }
}