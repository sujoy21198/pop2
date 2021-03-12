import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import tts from 'react-native-tts'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import AsyncStorage from '@react-native-async-storage/async-storage'


const data = [
    { name: 'AGRICULTURE', code: 'https://files.qatarliving.com/styles/image_h_xlarge_1600x900/s3/post/2020/10/15/Global-Handwashing-day-2020-qatar-living.jpg?itok=xGwcmQkE' },
    { name: 'LIVESTOCK', code: 'https://drmehtablog.com/wp-content/uploads/2016/01/Cardiology-1.jpg' },
    { name: 'SMALL BUSINESS', code: 'https://www.universiteitleiden.nl/binaries/content/gallery/ul2/main-images/campus-the-hague/bsk/covid---19-afbeelding.jpg' },
    { name: 'HEALTH', code: 'https://empiawards.files.wordpress.com/2014/05/indian-health-care.jpg' },
    { name: 'EDUCATION', code: 'https://empiawards.files.wordpress.com/2014/05/indian-health-care.jpg' },
    { name: 'LOAN SAVINGS', code: 'https://empiawards.files.wordpress.com/2014/05/indian-health-care.jpg' },
    { name: 'PENSION', code: 'https://empiawards.files.wordpress.com/2014/05/indian-health-care.jpg' },
    { name: 'OTHERS', code: 'https://empiawards.files.wordpress.com/2014/05/indian-health-care.jpg' },
]

export default class MoneyManagerCategoriesScreen extends Component {


    constructor(props) {
        super(props)
        this.state = {
            data: [],
            languages: [],
            type:''
        }

        this.state.languages = Languages
        this.state.data = data
        this.state.type = this.props.route.params.type
        //alert(this.state.type)
    }

    


    selectLandType = (data) => {
        if (data === 'AGRICULTURE') {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: 'AGRICULTURE' , type : this.state.type}
            })
        } else if (data === 'LIVESTOCK') {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: 'LIVESTOCK' , type : this.state.type}
            })
        } else if (data === 'OTHERS') {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: 'OTHERS', type : this.state.type }
            })
        } else if (data === 'SMALL BUSINESS') {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: 'SMALL BUSINESS' , type : this.state.type}
            })
        }else if (data === 'HEALTH') {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: 'HEALTH' , type : this.state.type}
            })
        }else if (data === 'EDUCATION') {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: 'EDUCATION' , type : this.state.type}
            })
        }else if (data === 'LOAN SAVINGS') {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: 'LOAN SAVINGS', type : this.state.type }
            })
        }else if (data === 'PENSION') {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: 'PENSION', type : this.state.type }
            })
        }
    }
    
    render() {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor }}>
                <View style={{ backgroundColor: 'white', width: widthToDp("100%"), height: heightToDp("13%"), flexDirection: 'row' }}>
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
                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("5%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[1].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("9%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <View style={{ backgroundColor: BaseColor.Ho, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), marginLeft: widthToDp("5%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[2].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6.3%") }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%"), alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.changeLanguage(this.state.languages[3].id)}>
                        <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("4.7%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[3].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6.9%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <View style={{ backgroundColor: BaseColor.Santhali, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, marginLeft: widthToDp("2%"), flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("3.4%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[4].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("3%") }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ borderBottomColor: BaseColor.Stroke, borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("100%") }}></View>
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>MONEY MANAGER</Text>

                <View>

                    <FlatGrid
                        style={{ marginTop: heightToDp("2%"), marginBottom: heightToDp("75%") }}
                        bounces={true}
                        itemDimension={130}
                        data={data}
                        bouncesZoom={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.selectLandType(item.name)}>
                                <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("47%"), height: heightToDp("30%"), elevation: 10, borderRadius: 10 }}>
                                    <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("0.4%"), fontFamily: 'Oswald-Medium' }}>{item.name}</Text>
                                    <Image
                                        style={{ width: widthToDp("47%"), height: heightToDp("25%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("1%") }}
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