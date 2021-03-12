import React, { Component } from 'react'
import { View, Image, TouchableOpacity, ScrollView } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Text, Input } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'


const tableHeading = [
    { 'name': 'Items', 'items': 'Dry Fish(without salt)', 'unit': '2', 'unitPrice': 'Rs 500 perKG', 'totalPrice': '1000' },
    { 'name': 'Unit', 'items': 'Dry fish(salted)', 'unit': '2', 'unitPrice': 'Rs 500 perKG', 'totalPrice': '1000' },
    { 'name': 'Unit Price', 'items': 'DryFishSellingSecondTableScreen' },
    { 'name': 'Total Price' },
]

const tableHeading2 = [
    { 'name': 'Items', 'items': 'Category 1(Cereals, pulses,edible oil, Sugar,salt, Spices,Eggs)', 'unit': '2', 'unitPrice': 'Lumpsum', 'totalPrice': '1000' },
    { 'name': 'Unit', 'items': 'Category 2 Soap, detergent,Shampoo, Toothbrush/ paste,broom', 'unit': '2', 'unitPrice': 'Lumpsum', 'totalPrice': '1000' },
    { 'name': 'Total Buying Price', 'items': 'Category 3(Optional)Snacks items(Biscuits, Candy,Chips)', 'unitPrice': 'Lumpsum' },
    { 'name': 'Total Selling price (keeping 20% margin)' },
    { 'name': 'Profit' }
]

export default class SmallGroceryShopSecondTableScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableHeading: [],
            value: '',
            vaccine: [],
            category1BuyingPrice: '3000',
            categor2BuyingPrice: '1500',
            category3BuyingPrice: '500',
            category1SellingPrice: '3600',
            category2SellingPrice: '1800',
            category3SellingPrice: '600',
            category1Profit: '600',
            category2Profit: '300',
            category3Profit: '100',
            totalOfTotalBuyingPrice: '5000',
            totalOfTotalSellingPrice: '6000',
            totalOfProfit: '1000',
            lossPercentage:'40',
            netProfitPerMonth:'1960',
            monthlyBuyingPrice:'10000',
            monthlySellingPrice:'12000',
            monthlyProfit:'2000'
        }
        this.state.tableHeading = tableHeading
        //this.state.value = this.props.route.params.value
        //alert(this.state.value)
    }
    componentDidMount() {
        this.getVaccinesFromOffline()

    }
    getVaccinesFromOffline = async () => {
        try {
            var vaccine = []
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            var livestockwisevaccine = specificObject.vaccination.filter((i) => i.type === this.state.value)
            vaccine = livestockwisevaccine
            this.setState({ vaccine: vaccine })
            //console.log(livestockwisevaccine)
        } catch (error) {
            alert(error)
        }
    }

    calculation = () => {
        var result = this.state.category1BuyingPrice - this.state.category1SellingPrice
        this.setState({ category1Profit: result })
        var result1 = this.state.categor2BuyingPrice - this.state.category2SellingPrice
        this.setState({ category2Profit: result1 })
        var result2 = this.state.category3BuyingPrice - this.state.category3SellingPrice
        this.setState({ category3Profit: result2 })
        var result3 = this.state.category1BuyingPrice + this.state.categor2BuyingPrice + this.state.category3BuyingPrice
        this.setState({ totalOfTotalBuyingPrice: result3 })
        var result4 = this.state.category1SellingPrice + this.state.category2SellingPrice + this.state.category3SellingPrice
        this.setState({ totalOfTotalSellingPrice: result4 })
        var result5 = result + result1 + result2
        this.setState({ totalOfProfit: result5 })
        var result6 = result3 * 2
        this.setState({monthlyBuyingPrice : result6})
        var result7 = result4 * 2
        this.setState({monthlySellingPrice : result7})
        var result8 = result5 * 2
        this.setState({monthlyProfit : result8})
        var result9 = result8 - this.state.lossPercentage
        this.setState({netProfitPerMonth : result9})
    }

    inputValue = (data) => {
        var numberofVaccines = []
        numberofVaccines.concat(data)
        console.log(numberofVaccines)
    }

    next = () => {
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "DashBoardScreen" }]
        })

    }
    render() {
        var tableHeading = []
        tableHeading = this.state.tableHeading
        var vaccine = []
        vaccine = this.state.vaccine
        //console.log(tableHeading)
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

                    <TouchableOpacity >
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
                <ScrollView>
                    <View style={{ backgroundColor: BaseColor.Red, height: heightToDp("210%"), alignSelf: 'center', width: widthToDp("90%"), borderRadius: 10, marginTop: heightToDp('1.5%') }}>
                        <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>Expenditure & Profit </Text>
                        <View style={{ backgroundColor: "white", height: heightToDp("210%"), alignSelf: 'center', width: widthToDp("90%"), marginTop: heightToDp('2%'), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                            <View style={{ borderWidth: 1, height: heightToDp("22%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1.5%"), flexDirection: 'row' }}>
                                {
                                    tableHeading2.map((i) => {
                                        return (
                                            <View style={{ width: widthToDp("16%"), marginLeft: widthToDp("1%") }}>

                                                <Text style={{ marginTop: heightToDp("2%") }}>{i.name}</Text>

                                            </View>

                                        )
                                    })
                                }
                            </View>

                            <View style={{ borderWidth: 1, height: heightToDp("100%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%") }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: widthToDp("15%"), marginLeft: widthToDp("1.5%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>Eggs</Text>
                                        <Text style={{ marginTop: heightToDp("5%") }}>Adult Bird</Text> */}
                                        {
                                            tableHeading2.map((i) => {
                                                return (
                                                    <Text style={{ marginTop: heightToDp("1%") }}>{i.items}</Text>
                                                )
                                            })
                                        }
                                    </View>

                                    <View style={{ width: widthToDp("11%"), marginLeft: widthToDp("1.5%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>Eggs</Text>
                                        <Text style={{ marginTop: heightToDp("5%") }}>Adult Bird</Text> */}
                                        {
                                            tableHeading2.map((i) => {
                                                return (
                                                    <Text style={{ marginTop: heightToDp("10%") }}>{i.unitPrice}</Text>
                                                )
                                            })
                                        }
                                    </View>
                                    <View style={{ width: widthToDp("18%"), marginLeft: widthToDp("4%"), height: heightToDp("30%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>{this.state.eggQuantity}</Text>
                                        <Text style={{ marginTop: heightToDp("5%") }}>{this.state.birdQuantity}</Text> */}
                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("3%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderWidth: 1 }}
                                                onChangeText={(data) => this.setState({ category1BuyingPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("13%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderWidth: 1 }}
                                                onChangeText={(data) => this.setState({ categor2BuyingPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("13%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderWidth: 1 }}
                                                onChangeText={(data) => this.setState({ category3BuyingPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                    </View>
                                    <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("1.5%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>Rs 5.00 per piece</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>Rs 300 per bird</Text> */}
                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("3%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderWidth: 1 }}
                                                onChangeText={(data) => this.setState({ category1SellingPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("13%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderWidth: 1 }}
                                                onChangeText={(data) => this.setState({ category2SellingPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>


                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("13%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderWidth: 1 }}
                                                onChangeText={(data) => this.setState({ category3SellingPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                    </View>
                                    <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("5%") }}>
                                        <Text style={{ marginTop: heightToDp("3%") }}>{this.state.category1Profit}</Text>
                                        <Text style={{ marginTop: heightToDp("13%") }}>{this.state.category2Profit}</Text>
                                        <Text style={{ marginTop: heightToDp("13%") }}>{this.state.category3Profit}</Text>
                                        {/* {
                                            tableHeading.map((i) => {
                                                return (
                                                    <Text style={{ marginTop: heightToDp("4%") }}>{i.totalPrice}</Text>
                                                )
                                            })
                                        } */}

                                    </View>

                                </View>
                            </View>
                            <View style={{ borderWidth: 1, height: heightToDp("18%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <View style={{ width: widthToDp("30%") }}>
                                    <Text>Per cycle (15 days) expenditure and profit</Text>
                                </View>
                                <View style={{ width: widthToDp("17%") }}>
                                    <Text style={{ marginLeft: widthToDp("3%") }}>Rs 9</Text>
                                </View>

                                <View style={{ width: widthToDp("17%") }}>
                                    <Text style={{ marginLeft: widthToDp("3%") }}>Rs {this.state.perdaysellingvaluetotal}</Text>
                                </View>

                                <View style={{ width: widthToDp("17%") }}>
                                    <Text style={{ marginLeft: widthToDp("3%") }}>Rs {this.state.perdaysellingvaluetotal}</Text>
                                </View>

                            </View>


                            <View style={{ borderWidth: 1, height: heightToDp("10%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <View style={{ width: widthToDp("30%") }}>
                                    <Text>Per moth expenditure and profit</Text>
                                </View>
                                <View style={{ width: widthToDp("17%") }}>
                                    <Text style={{ marginLeft: widthToDp("3%") }}>Rs {this.state.monthlyBuyingPrice}</Text>
                                </View>

                                <View style={{ width: widthToDp("17%") }}>
                                    <Text style={{ marginLeft: widthToDp("3%") }}>Rs {this.state.monthlySellingPrice}</Text>
                                </View>

                                <View style={{ width: widthToDp("17%") }}>
                                    <Text style={{ marginLeft: widthToDp("3%") }}>Rs {this.state.monthlyProfit}</Text>
                                </View>

                            </View>
                            <View style={{ borderWidth: 1, height: heightToDp("14%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <View style={{ width: widthToDp("60%") }}>
                                    <Text>Loss (Assuming 2% of profit) due to rodent, insects, termites, and damping of food items</Text>
                                </View>
                                <View style={{ width: widthToDp("17%"),height:heightToDp("5%"),marginTop:heightToDp("2%") }}>
                                    <Input
                                        style={{ borderWidth: 1 }}
                                        onChangeText={(data) => this.setState({ lossPercentage: data })}
                                        keyboardType="number-pad"
                                    />
                                </View>
                            </View>

                            <View style={{ borderWidth: 1, height: heightToDp("10%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <View style={{ width: widthToDp("60%") }}>
                                    <Text>Net profit per month</Text>
                                </View>
                                <View style={{ width: widthToDp("17%"),height:heightToDp("5%"),marginTop:heightToDp("2%") }}>
                                    <Text>Rs {this.state.netProfitPerMonth}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: heightToDp("10%") }}></View>
                </ScrollView>
                <View style={{ flexDirection: 'row', height: heightToDp("10%"), alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf: 'center', marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>BACK</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.calculation() }}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>SAVE</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.next() }}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>NEXT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}