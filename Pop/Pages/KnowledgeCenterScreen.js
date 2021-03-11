import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import AsyncStorage from '@react-native-async-storage/async-storage'


const data = [
    { name: 'CROPS', code: 'https://pbs.twimg.com/media/Evsaf-4UcAMrsvC.jpg' },
    { name: 'LIVESTOCK', code: 'https://sarkariyojanas.com/wp-content/uploads/2019/11/Dairy-Entrepreneurship-Development-Scheme.jpg' },
    { name: 'SMALL BUSINESS', code: 'https://cdn.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_720,h_396/https://surejob.in/wp-content/uploads/2017/12/handicrafts_small_business.jpg' },
    { name: 'NUTRITION GARDEN', code: 'http://ttol.vietnamnetjsc.vn//2017/05/15/06/58/bien-toi-thanh-dau-9-loi-ich-vo-cung-bat-ngo-ban-nen-biet_5.jpg' }
]

export default class KnowledgeCenterScreen extends Component {

    constructor(props){
        super(props)
        this.state={
            languages:[],
            data:[]
        }
        this.state.languages = Languages
        this.state.data = data
        this.state.data[0].name = LanguageChange.crops
        this.state.data[1].name = LanguageChange.livestock
        this.state.data[2].name = LanguageChange.smallBusiness
        this.state.data[3].name = LanguageChange.nutrition
    }

    changeLanguage = (id) => {
        //alert(id)
        AsyncStorage.setItem('language',id)
        LanguageChange.setLanguage(id)
        this.setState({data : data})
        this.state.data[0].name = LanguageChange.crops
        this.state.data[1].name = LanguageChange.livestock
        this.state.data[2].name = LanguageChange.smallBusiness
        this.state.data[3].name = LanguageChange.nutrition
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "DashBoardScreen" }]
        });
        
    }


    checkNavigation = (data) => {
        //alert(data)
        if(data === LanguageChange.crops){
            this.props.navigation.navigate({
                name: 'CropsScreen'
            })
        }else if(data === LanguageChange.livestock){
            this.props.navigation.navigate({
                name:"LiveStockScreen"
            })
        }else if(data === LanguageChange.nutrition){
            this.props.navigation.navigate({
                name:"NutritionGardenScreen"
            })
        }else if(data === LanguageChange.smallBusiness){
            this.props.navigation.navigate({
                name:"SmallBusinessScreen"
            })
        }
    }

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
                    <TouchableOpacity onPress={() => this.changeLanguage(this.state.languages[0].id)}>
                        <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginLeft: widthToDp("5%") }}>{this.state.languages[0].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.changeLanguage(this.state.languages[1].id)}>
                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100,flexDirection:'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft:widthToDp("5%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>{this.state.languages[1].value}</Text>
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
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), marginLeft:widthToDp("5%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>{this.state.languages[2].value}</Text>
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
                <TouchableOpacity onPress={() => this.changeLanguage(this.state.languages[3].id)}>
                        <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100,flexDirection:'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"),marginLeft:widthToDp("4.7%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>{this.state.languages[3].value}</Text>
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
                        <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft:widthToDp("3.4%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>{this.state.languages[4].value}</Text>
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
                <Text style={{marginLeft:widthToDp("3%"),marginTop:heightToDp("2%"),fontSize:widthToDp("7%"),fontFamily:'Oswald-Medium'}}>{LanguageChange.knowledgeCenter}</Text>
                <View>
                    <FlatGrid
                        style={{ marginTop: heightToDp("1%"), marginBottom: heightToDp("74%") }}
                        bounces={true}
                        itemDimension={130}
                        data={data}
                        bouncesZoom={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.checkNavigation(item.name)}>
                                {/* <View style={{ backgroundColor: 'white', width: widthToDp("46%"), height: heightToDp("30%"), elevation: 10, borderRadius: 10 }}>
                                    <View style={{ backgroundColor: "#000", height: heightToDp("7%"), borderRadius: 10 }}>
                                        <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1.8%"),fontFamily:'Oswald-Medium' }}>{item.name}</Text>
                                    </View>
                                    <Image
                                        style={{ width: widthToDp("46%"), height: heightToDp("22.5%") }}
                                        source={{ uri: item.code }}
                                    />
                                </View>
                                 */}
                                 <View style={{backgroundColor:BaseColor.Red,width:widthToDp("47%"),height:heightToDp("30%"), elevation: 10, borderRadius: 10}}>
                                    <Text style={{color: "#fff", fontSize: widthToDp("5%"),marginLeft:widthToDp("5%"), marginTop: heightToDp("0.4%"),fontFamily:'Oswald-Medium'}}>{item.name}</Text>
                                    <Image
                                style={{ width: widthToDp("47%"), height: heightToDp("25%") ,borderBottomLeftRadius:10,borderBottomRightRadius:10, marginTop: heightToDp("1%")}}
                                source={{ uri: item.code }}
                                />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        );
    }
}