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


const months = [
    { 'name': 'JAN', 'vaccine1': 'Deworming', 'vaccine2': 'Lasota' },
    { 'name': 'FEB', 'vaccine1': '', 'vaccine2': 'Lasota' },
    { 'name': 'MAR', 'vaccine1': '', 'vaccine2': '' },
    { 'name': 'APR', 'vaccine1': 'Deworming', 'vaccine2': 'Lasota' },
    { 'name': 'MAY', 'vaccine1': '', 'vaccine2': '' },
    { 'name': 'JUN', 'vaccine1': '', 'vaccine2': '' },
    { 'name': 'JUL', 'vaccine1': 'Deworming', 'vaccine2': 'Lasota' },
    { 'name': 'AUG', 'vaccine1': '', 'vaccine2': '' },
    { 'name': 'SEP', 'vaccine1': '', 'vaccine2': 'Lasota' },
    { 'name': 'OCT', 'vaccine1': 'Deworming', 'vaccine2': 'Pox' },
    { 'name': 'NOV', 'vaccine1': '', 'vaccine2': '' },
    { 'name': 'DEC', 'vaccine1': '', 'vaccine2': '' }
]

const tableHeading = [
    { 'name': '', 'birth': '1st Birth', 'age': '16 months old', 'numbers': '1', 'unitPrice': '4000', 'totalPriceInRupees': '5000' },
    { 'name': 'Age till 2nd year end', 'birth': '2nd Birth', 'age': '8 months old', 'numbers': '1', 'unitPrice': '4000', 'totalPriceInRupees': '5000' },
    { 'name': 'Numbers', 'birth': '3rd Birth', 'age': 'kid', 'numbers': '1', 'unitPrice': '4000', 'totalPriceInRupees': '5000' },
    { 'name': 'Unit Price' },
    { 'name': 'Total Price in rupees' }
]

export default class LivestockTableScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberGoats: '1',
            tableHeading: [],
            unitPrice1stBirth: '4000',
            unitPrice2ndBirth: '3000',
            unitPrice3rdBirth: '500',
            totalPrice1stBirth: '5000',
            totalPrice2ndBirth: '4000',
            totalPrice3rdBirth: '500',
            totalValueAfter2years: '9500',
            totalExpenseforNgoats:'130',
            expenseForSupplementary:'120',
            b:'250',
            totalProfitFromNgoats:''
        }
        this.state.tableHeading = tableHeading
    }
    componentDidMount() {
        this.getVaccinesFromOffline()
    }
    getVaccinesFromOffline = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            console.log(specificObject.vaccination)
        } catch (error) {
            alert(error)
        }
    }

    calculation = (data) => {
        this.state.numberGoats = data
        var unitPriceFor1stBirth = this.state.numberGoats * 4000
        var unitPriceFor2ndBirth = this.state.numberGoats * 3000
        var unitPriceFor3rdBirth = this.state.numberGoats * 500
        var totalPrice1stBirth = this.state.numberGoats * 5000
        var totalPrice2ndBirth = this.state.numberGoats * 4000
        var totalPrice3rdBirth = this.state.numberGoats * 500
        var totalValueAfter2years = totalPrice1stBirth + totalPrice2ndBirth + totalPrice3rdBirth
        var totalExpenseforNgoats = this.state.numberGoats * 130
        var expenseForSupplementary = this.state.numberGoats * 120
        var b = totalExpenseforNgoats + expenseForSupplementary
        var totalProfitFromNgoats = totalValueAfter2years - b

        this.setState({ unitPriceFor1stBirth: unitPriceFor1stBirth })
        this.setState({ unitPriceFor2ndBirth: unitPriceFor2ndBirth })
        this.setState({ unitPriceFor3rdBirth: unitPriceFor3rdBirth })
        this.setState({ totalPrice1stBirth: totalPrice1stBirth })
        this.setState({ totalPrice2ndBirth: totalPrice2ndBirth })
        this.setState({ totalPrice3rdBirth: totalPrice3rdBirth })
        this.setState({ totalValueAfter2years: totalValueAfter2years })
        this.setState({ totalExpenseforNgoats : totalExpenseforNgoats})
        this.setState({expenseForSupplementary : expenseForSupplementary})
        this.setState({b : b})
        this.setState({totalProfitFromNgoats : totalProfitFromNgoats})

    }

    saveButton = async () => {
        try {
            const incomeObject = { 'type': 'income', 'category': 'Livestock', 'amount': this.state.totalValueAfter2years }
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            specificObject.moneyManagerData.push(incomeObject)
            await AsyncStorage.setItem('user', JSON.stringify(parsed))
            console.log(specificObject.moneyManagerData)
        } catch (error) {
            console.log(error)
        }
    }

    next = () => {
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "DashBoardScreen" }]
        })
        // this.props.navigation.navigate({
        //     name: 'VaccinationScreen',
        //     params: { value: 0 }
        // })
    }
    render() {
        var tableHeading = []
        tableHeading = this.state.tableHeading
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
                <ScrollView nestedScrollEnabled={true}>
                    <View style={{ backgroundColor: BaseColor.Red, height: heightToDp("90%"), alignSelf: 'center', width: widthToDp("90%"), borderRadius: 10, marginTop: heightToDp('1.5%') }}>
                        <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>Income from mother goats per year</Text>
                        <View style={{ backgroundColor: "white", height: heightToDp("85.5%"), alignSelf: 'center', width: widthToDp("90%"), marginTop: heightToDp('2%'), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium' }}>Income from </Text>
                                <Input
                                    keyboardType='number-pad'
                                    defaultValue={this.state.numberGoats}
                                    onChangeText={(data) => this.calculation(data)}
                                    style={{ marginLeft: widthToDp("1%"), fontFamily: 'Oswald-Medium', width: widthToDp("10%"), marginTop: heightToDp("1%"), borderWidth: 1 }}
                                />
                                <Text style={{ fontSize: widthToDp("5%"), marginLeft: widthToDp("1%"), marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginRight: widthToDp("20%") }}>mother goats</Text>
                            </View>
                            <View>
                                <Text>One mother goat gives birth to 4 to 5 kids per 2 years in an interval of 8 months Out of that 3 kids survive.</Text>
                            </View>
                            <ScrollView nestedScrollEnabled={true}>
                                <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1.5%"), flexDirection: 'row' }}>
                                {
                                    tableHeading.map((i) => {
                                        return (
                                            <View style={{ width: widthToDp("15%"), marginLeft: widthToDp("1.5%") }}>

                                                <Text>{i.name}</Text>

                                            </View>

                                        )
                                    })
                                }
                            </View>

                            <View style={{ borderWidth: 1, height: heightToDp("25%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%") }}>
                                {/* {
                                    tableHeading.map((i) => {
                                        return (
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("1.5%") }}>
                                                    <Text style={{ marginTop: heightToDp("2%") }}>{i.birth}</Text>
                                                </View>
                                                <View style={{ width: widthToDp("17%"), marginLeft: widthToDp("1.5%") }}>
                                                    <Text style={{ marginTop: heightToDp("2%") }}>{i.age}</Text>
                                                </View>
                                                <View style={{ width: widthToDp("10%"), marginLeft: widthToDp("6%") }}>
                                                    <Text style={{ marginTop: heightToDp("2%") }}>{i.numbers}</Text>
                                                </View>
                                                <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("1.5%") }}>
                                                    <Text style={{ marginTop: heightToDp("2%") }}>{i.unitPrice}</Text>
                                                </View>
                                                <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("1.5%") }}>
                                                    <Text style={{ marginTop: heightToDp("2%") }}>{i.totalPriceInRupees}</Text>
                                                </View>
                                            </View>


                                        )
                                    })
                                } */}
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: widthToDp("13%"), marginLeft: widthToDp("1.5%") }}>
                                        <Text style={{ marginTop: heightToDp("2%") }}>1st Birth</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>2nd Birth</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>3rd Birth</Text>
                                    </View>

                                    <View style={{ width: widthToDp("17%"), marginLeft: widthToDp("1.5%") }}>
                                        <Text style={{ marginTop: heightToDp("2%") }}>16 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>8 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>kids</Text>
                                    </View>
                                    <View style={{ width: widthToDp("10%"), marginLeft: widthToDp("6%") }}>
                                        <Text style={{ marginTop: heightToDp("2%") }}>{this.state.numberGoats}</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>{this.state.numberGoats}</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>{this.state.numberGoats}</Text>
                                    </View>
                                    <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("1.5%") }}>
                                        <Text style={{ marginTop: heightToDp("2%") }}>{this.state.unitPrice1stBirth}</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>{this.state.unitPrice2ndBirth}</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>{this.state.unitPrice3rdBirth}</Text>
                                    </View>
                                    <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("1.5%") }}>
                                        <Text style={{ marginTop: heightToDp("2%") }}>Rs {this.state.totalPrice1stBirth}</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>Rs {this.state.totalPrice2ndBirth}</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>Rs {this.state.totalPrice3rdBirth}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <Text>Total value after 2 year</Text>
                                <Text style={{ marginLeft: widthToDp("20%") }}>Rs {this.state.totalValueAfter2years}</Text>
                            </View>
                            <View style={{ marginLeft: widthToDp("3%") }}>
                                <Text>Total value after 2 years from {this.state.numberGoats} mother goat will be Rs {this.state.totalValueAfter2years} per 2 year</Text>
                                <Text style={{ marginTop: heightToDp("3%") }}>Total value annually from 2 mother goat will be Rs 9500.00 (A)</Text>
                            </View>

                            <View style={{ marginLeft: widthToDp("3%"),marginTop:heightToDp("2%") }}>
                                <Text>Total expenses for {this.state.numberGoats} goats in 2 years is Rs {this.state.totalExpenseforNgoats} ({this.state.numberGoats}*130, immunization cost)</Text>
                            </View>

                            <View style={{ marginLeft: widthToDp("3%"),marginTop:heightToDp("2%") }}>
                                <Text>Supplementary feed for 120 days for 1 mother goat per two year @ Rs 1.00 per day = Rs 120.00</Text>
                            </View>

                            <View style={{ marginLeft: widthToDp("3%"),marginTop:heightToDp("2%") }}>
                                <Text>Expense for Supplementary feed for {this.state.numberGoats} mother goats per 2 year : {this.state.numberGoats}*120 = {this.state.expenseForSupplementary}</Text>
                            </View>


                            <View style={{ marginLeft: widthToDp("3%"),marginTop:heightToDp("2%") }}>
                                <Text>Total expenses for {this.state.numberGoats} goats per 2 year : {this.state.totalExpenseforNgoats} + {this.state.expenseForSupplementary} = Rs. {this.state.b} (B)</Text>
                            </View>


                            <View style={{ marginLeft: widthToDp("3%"),marginTop:heightToDp("2%") }}>
                                <Text>TOTAL PROFIT FROM 4 MOTHER GOAT PER 2 YEAR (A)- (B) = Rs {this.state.totalValueAfter2years} – Rs {this.state.b} = Rs {this.state.totalProfitFromNgoats} </Text>
                            </View>

                            </ScrollView>
                            
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
                    <TouchableOpacity onPress={() => { this.saveButton() }}>
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