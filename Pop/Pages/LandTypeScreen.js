import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'



const data = [
    { name: 'HIGH LAND', code: 'https://shramajeewiki.com/images/English/00214136.jpg' },
    { name: 'MEDIUM LAND', code: 'https://timesofindia.indiatimes.com/thumb/msid-60012970,imgsize-2640154,width-400,resizemode-4/60012970.jpg' },
    { name: 'LOW LAND', code: 'https://www.biggovernment.news/wp-content/uploads/sites/59/2017/06/farmer-plow-field.jpg' }
]

export default class LandTypeScreen extends Component {
    render() {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor }}>
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

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('IncomeScreen')}>
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
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily:'Oswald-Medium' }}>LAND TYPE</Text>
                {/* <View style={{ flexDirection: 'row', marginTop: heightToDp("5%") }}>
                    
                    <Text style={{ marginTop: heightToDp("2%"), marginLeft: widthToDp("5%") }}>ENGLISH</Text>
                    <View style={{ height: heightToDp("5%"), width: 1, backgroundColor: '#909090', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%") }}></View>
                    <Text style={{ marginTop: heightToDp("2%"), marginLeft: widthToDp("1%") }}>हिन्दी</Text>
                    <View style={{ height: heightToDp("5%"), width: 1, backgroundColor: '#909090', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%") }}></View>
                    <Text style={{ marginTop: heightToDp("2%"), marginLeft: widthToDp("1%") }}>ʤʌgʌr</Text>
                    <View style={{ height: heightToDp("5%"), width: 1, backgroundColor: '#909090', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%") }}></View>
                    <Text style={{ marginTop: heightToDp("2%"), marginLeft: widthToDp("1%") }}>ଓଡ଼ିଆ</Text>
                    <View style={{ height: heightToDp("5%"), width: 1, backgroundColor: '#909090', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%") }}></View>
                    <Text style={{ marginTop: heightToDp("2%"), marginLeft: widthToDp("1%") }}>ᱥᱟᱱᱛᱟᱲᱤ</Text>
                </View> */}
                {/* <Image
                style={{width:30,height:30}}
                source={{uri:'https://upload.wikimedia.org/wikipedia/commons/4/48/Basketball.jpeg'}}
                /> */}
                <View>
                    {/* <FlatGrid
                        style={{ marginTop: heightToDp("1%"), marginBottom: heightToDp("74%") }}
                        bounces={true}
                        itemDimension={130}
                        data={data}
                        bouncesZoom={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <View style={{ backgroundColor: 'white', width: widthToDp("46%"), height: heightToDp("30%"), elevation: 10, borderRadius: 10 }}>
                                    <View style={{ backgroundColor: "#000", height: heightToDp("7%"), borderRadius: 10 }}>
                                        <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1.8%") }}>{item.name}</Text>
                                    </View>
                                    <Image
                                        style={{ width: widthToDp("46%"), height: heightToDp("22.5%") }}
                                        source={{ uri: item.code }}
                                    />
                                </View>
                            </TouchableOpacity>
                        )}
                    /> */}
                    <FlatList
                        data={data}
                        style={{marginBottom:heightToDp("74%")}}
                        renderItem={({ item }) => 
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AnalysisScreen')}>
                            <Card style={{width:widthToDp("94%"),marginLeft:widthToDp("3%"),height:heightToDp("30%"),marginBottom:heightToDp("1%"),borderRadius:20,backgroundColor:BaseColor.Red}}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{width:widthToDp("45%")}}>
                                    <Text style={{color:'white',marginLeft:widthToDp("6%"),marginTop:heightToDp("1%"),fontSize:widthToDp("7%"),fontFamily:'Oswald-Medium'}}>{item.name}</Text>
                                    </View>
                                <Icon
                                name="microphone"
                                size={23}
                                style={{color:'white',marginTop:heightToDp("2%"),marginLeft:widthToDp("36%")}}
                                />
                                </View>
                                
                                <Image
                                style={{ width: widthToDp("93%"), height: heightToDp("22.8%"),marginLeft:widthToDp("0.4%"),borderRadius:2,marginTop:heightToDp("1%"),borderBottomLeftRadius:20,borderBottomRightRadius:20 }}
                                source={{ uri: item.code }}
                                />
                            </Card>
                        </TouchableOpacity>
                }
                    />
                </View>
            </View>
        );
    }
}