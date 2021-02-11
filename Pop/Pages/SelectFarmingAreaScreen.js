import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import { Input } from 'react-native-elements'
import BaseColor from '../Core/BaseTheme'
import { Card, Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import Icon3 from 'react-native-vector-icons/EvilIcons'


export default class SelectFarmingAreaScreen extends Component {

    constructor(props){
        super(props)
        this.state={
            landType:'',
            vertical:'',
            horizontal:'',
            verticalCal:'',
            horizontalCal:'',
            farmingAreaInSquareFeet : '',
            farmingAreaInDecimal : '',
            productionInKg : '',
            expense : '',
            totalIncomeFromCrop : ''
        }
        this.state.landType = this.props.route.params.landType
        //alert(this.state.landType)
    }


    submitDimensions = () => {
        var verticalCal
        var horizontalCal
        var vertical = this.state.vertical
        var horizontal = this.state.horizontal

        verticalCal = vertical * 5
        horizontalCal = horizontal * 5

        // this.setState({verticalCal : verticalCal})
        // this.setState({horizontalCal : horizontalCal})
        this.state.verticalCal = verticalCal
        this.state.horizontalCal = horizontalCal

        var farmingAreaInSquareFeet = verticalCal * horizontalCal
        var farmingAreaInDecimal = parseFloat(farmingAreaInSquareFeet / 436).toFixed(2)

        // this.setState({farmingAreaInSquareFeet : farmingAreaInSquareFeet})
        // this.setState({farmingAreaInDecimal : farmingAreaInDecimal})


        this.state.farmingAreaInSquareFeet = farmingAreaInSquareFeet
        this.state.farmingAreaInDecimal = farmingAreaInDecimal

        //10 decimal produces : 400 KG
        var productionInKg = Math.round(40*farmingAreaInDecimal)

        // this.setState({productionInKg : productionInKg})
        this.state.productionInKg = productionInKg

        //Expense / Cost of cultivation per 10 decimal of land : Rs. 2810
        var expense = 281*farmingAreaInDecimal

        // this.setState({expense : expense})
        this.state.expense = expense

        //Cost per KG : Rs. 35 (assumed)
        var totalIncomeFromCrop = Math.round(35 * productionInKg).toFixed(2)

        //this.setState({totalIncomeFromCrop : totalIncomeFromCrop})
        this.state.totalIncomeFromCrop = totalIncomeFromCrop

        this.props.navigation.navigate({
            name: 'AnalysisScreen',
            params: {
                landType : this.state.landType,
                farmingAreaInDecimal : this.state.farmingAreaInDecimal,
                expense : this.state.expense,
                totalIncomeFromCrop : this.state.totalIncomeFromCrop,
                productionInKg : this.state.productionInKg,
            }
        })
    }


    render() {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
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
                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("5%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>हिन्दी</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("9%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Ho, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), marginLeft: widthToDp("5%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>ʤʌgʌr</Text>
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
                    <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("4.7%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>ଓଡ଼ିଆ</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6.9%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Santhali, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, marginLeft: widthToDp("2%"), flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("3.4%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>ᱥᱟᱱᱛᱟᱲᱤ</Text>
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
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>SELECTING FARMING AREA</Text>
                <View style={{ backgroundColor: BaseColor.Red, borderRadius: 20, height: heightToDp("40%"), width: widthToDp("80%"), alignSelf: 'center', marginTop: heightToDp('1.5%') }}>
                    {/* <ImageBackground 
                    source={{uri:'https://shramajeewiki.com/images/English/00214136.jpg'}}
                    imageStyle={{borderRadius:20}}
                    style={{width:widthToDp("80%"),height:heightToDp("40%")}}>
                        
                    </ImageBackground> */}
                    <Text style={{ color: 'white', marginLeft: widthToDp("6%"), marginTop: heightToDp("1%"), fontSize: widthToDp("5.5%"), fontFamily: 'Oswald-Light' }}>MEASURE USING 5 FEET LONG STICK</Text>
                    <View style={{ backgroundColor: 'white', height: heightToDp("28%"), width: widthToDp("65%"), alignSelf: 'center', marginTop: heightToDp("4%"), borderRadius: 20 }}>
                        <View style={{ marginTop: heightToDp("5%") }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon2
                                    name="ellipsis-v"
                                    color="black"
                                    size={widthToDp("10%")}
                                    style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("8%") }}
                                />
                                <Icon3
                                    name="close"
                                    color="black"
                                    size={widthToDp("5%")}
                                    style={{ marginTop: heightToDp("3%"), marginLeft: widthToDp("6%") }}
                                />
                                <Input
                                    placeholder='Number of sticks'
                                    containerStyle={{ width: widthToDp("40%") }}
                                    keyboardType='numeric'
                                    onChangeText={(text) => this.setState({vertical:text})}
                                />
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Icon2
                                    name="ellipsis-h"
                                    color="black"
                                    size={widthToDp("10%")}
                                    style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("2%") }}
                                />
                                <Icon3
                                    name="close"
                                    color="black"
                                    size={widthToDp("5%")}
                                    style={{ marginTop: heightToDp("3%"), marginLeft: widthToDp("6%") }}
                                />
                                <Input
                                    placeholder='Number of sticks'
                                    containerStyle={{ width: widthToDp("40%") }}
                                    keyboardType='numeric'
                                    onChangeText={(text) => this.setState({horizontal:text})}
                                />
                            </View>
                        </View>

                    </View>
                </View>
                <TouchableOpacity onPress={() => this.submitDimensions()}>
                    <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("3%"), width: widthToDp("37%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
                        <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.4%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>SUBMIT</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}