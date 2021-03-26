import React, { Component } from 'react'
import { View, Image, TouchableOpacity, ScrollView } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Text, Input, Toast } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'
import Languages from '../Core/Languages'


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
    { 'name': 'Items', 'birth': '1st Birth', 'age': '16 months old', 'numbers': '1', 'unitPrice': '4000', 'totalPriceInRupees': '5000' },
    { 'name': 'Qnty', 'birth': '2nd Birth', 'age': '8 months old', 'numbers': '1', 'unitPrice': '4000', 'totalPriceInRupees': '5000' },
    { 'name': 'Unit Cost (₹)', 'birth': '3rd Birth', 'age': 'kid', 'numbers': '1', 'unitPrice': '4000', 'totalPriceInRupees': '5000' },
    { 'name': 'Total Cost (₹)' },
]

const tableHeading2 = [
    { 'name': 'Items', 'unitCost': '2500' },
    { 'name': 'Feed', 'unitCost': '2500' },
    { 'name': 'Deworming and vaccination', 'unitCost': '1500' }
]

export default class PultryTableScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberhens: '1',
            tableHeading: [],
            totalPriceEggs: '150',
            totalPriceAdultBrids: '2400',
            eggQuantity: '30',
            birdQuantity: '8',
            total: '2550',
            netProfit: '1550',
            feed: '125',
            vaccination: '125',
            totalB: '250',
            languages:[]
        }
        this.state.tableHeading = tableHeading
        this.state.languages = Languages
    }
    componentDidMount() {
        this.getVaccinesFromOffline()
        this.setLanguageOnMount()
    }
    setLanguageOnMount = async () => {
        let defaultLanguage = await AsyncStorage.getItem('language')
        if (defaultLanguage === 'en') {
            this.setState({ textLanguageChange: '0' })
            this.loadBreedFromStorage()
        } else if (defaultLanguage === 'hi') {
            this.setState({ textLanguageChange: '1' })
            this.loadBreedFromStorage()
        } else if (defaultLanguage === 'ho') {
            this.setState({ textLanguageChange: '2' })
            this.loadBreedFromStorage()
        } else if (defaultLanguage === 'od') {
            this.setState({ textLanguageChange: '3' })
            this.loadBreedFromStorage()
        } else if (defaultLanguage === 'san') {
            this.setState({ textLanguageChange: '4' })
            this.loadBreedFromStorage()
        }
    }

    languageChangeFunction = async (data) => {

        if (data === 'en') {
            AsyncStorage.setItem('language', 'en')
            this.setState({ textLanguageChange: '0' })
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'hi') {
            this.setState({ textLanguageChange: '1' })
            AsyncStorage.setItem('language', 'hi')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'ho') {
            this.setState({ textLanguageChange: '2' })
            AsyncStorage.setItem('language', 'ho')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'od') {
            this.setState({ textLanguageChange: '3' })
            AsyncStorage.setItem('language', 'od')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'san') {
            AsyncStorage.setItem('language', 'san')
            this.setState({ textLanguageChange: '4' })
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        }
    }
    getVaccinesFromOffline = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            console.log(specificObject.vaccination)
        } catch (error) {
            alert(error)
        }
    }

    calculation = (data) => {
        //alert(data)
        this.state.numberhens = data

        var eggQuantity = 30 * data
        var birdQuantity = 8 * data
        var totalPriceAdultBrids = birdQuantity * 300
        var totalPriceEggs = eggQuantity * 5
        var total = totalPriceAdultBrids + totalPriceEggs

        var feed = 125 * data
        var vaccination = 125 * data
        var totalB = feed + vaccination
        var netProfit = total - totalB


        this.setState({ totalPriceEggs: totalPriceEggs })
        this.setState({ eggQuantity: eggQuantity })
        this.setState({ birdQuantity: birdQuantity })
        this.setState({ totalPriceAdultBrids: totalPriceAdultBrids })
        this.setState({ netProfit: netProfit })
        this.setState({ feed: feed })
        this.setState({ vaccination: vaccination })
        this.setState({ totalB: totalB })


        this.setState({ total: total })

    }

    next = async() => {



        try {
            var date = new Date().getDate()
            var month = new Date().getMonth() + 1
            var year = new Date().getFullYear()
            const expenseObject = { 'type': 'expense', 'category': 'Poultry livestock', 'amount': this.state.totalB, 'date': date + "/" + month + "/" + year }
            const incomeObject = { 'type': 'income', 'category': 'Poultry livestock', 'amount': this.state.total, 'date': date + "/" + month + "/" + year }
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            specificObject.moneyManagerData.push(expenseObject)
            specificObject.moneyManagerData.push(incomeObject)
            await AsyncStorage.setItem('user', JSON.stringify(parsed))
            console.log(specificObject.moneyManagerData)
        } catch (error) {
            console.log(error)
        }
        Toast.show({
            text: "Your data has been saved in MONEY MANAGER under ALL TRANSACTIONS",
            duration: 3000,
            type: 'success'
        });
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "DashBoardScreen" }]
        })
        // this.props.navigation.navigate({
        //     name: 'VaccinationScreen',
        //     params: { value: 1 }
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
                        name="home"
                        size={30}
                        style={{ marginTop: heightToDp("4.6%"), marginLeft: widthToDp("45%") }}
                        onPress={() => this.props.navigation.navigate('DashBoardScreen')}
                    />
                    <Icon
                        name="bell"
                        size={30}
                        style={{ marginTop: heightToDp("4.6%"), marginLeft: widthToDp("5%") }}
                        onPress={() => this.props.navigation.navigate('NotificationsScreen')}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%") }}>
                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[0].id)}>
                        <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontFamily: 'Oswald-Medium' }}>{this.state.languages[0].value}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[1].id)}>
                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[1].value}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[2].id)}>
                        <View style={{ backgroundColor: BaseColor.Ho, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[2].value}</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%"), alignSelf: 'center' }}>
                    <TouchableOpacity onPress= {() => this.languageChangeFunction(this.state.languages[3].id)}>
                        <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[3].value}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[4].id)}>
                        <View style={{ backgroundColor: BaseColor.Santhali, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, marginLeft: widthToDp("2%"), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[4].value}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ borderBottomColor: BaseColor.Stroke, borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("100%") }}></View>
                <ScrollView nestedScrollEnabled={true}>
                    <View style={{ backgroundColor: BaseColor.Red, height: heightToDp("90%"), alignSelf: 'center', width: widthToDp("90%"), borderRadius: 10, marginTop: heightToDp('1.5%') }}>
                        <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>Income from hen per year</Text>
                        <View style={{ backgroundColor: "white", height: heightToDp("85.5%"), alignSelf: 'center', width: widthToDp("90%"), marginTop: heightToDp('2%'), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium' }}>Income from </Text>
                                <Input
                                    keyboardType='number-pad'
                                    defaultValue={this.state.numberhens}
                                    onChangeText={(data) => this.calculation(data)}
                                    style={{ marginLeft: widthToDp("1%"), fontFamily: 'Oswald-Medium', width: widthToDp("10%"), marginTop: heightToDp("1%"), borderBottomWidth: 1, borderColor: 'blue' }}
                                />
                                <Text style={{ fontSize: widthToDp("5%"), marginLeft: widthToDp("1%"), marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginRight: widthToDp("20%") }}>{Number(this.state.numberhens) === 1 ? "hen" : "hens"}</Text>
                            </View>
                            <View style={{paddingHorizontal: widthToDp('2%')}}>
                                <Text>One desi hen gives 50 eggs in a year If a farmer keeps 4 hens, then he will get 200 eggs in a year.</Text>
                            </View>
                            <ScrollView nestedScrollEnabled={true}>
                                <View style={{ borderWidth: 1, height: heightToDp("10%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1.5%"), flexDirection: 'row' }}>
                                    {
                                        tableHeading.map((i, key) => {
                                            return (
                                                <View style={{ width: widthToDp(`${key===0 ? 23 : key === 1 ? 11 : 20}%`), marginLeft: widthToDp("1.5%") }}>

                                                    <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>{i.name}</Text>

                                                </View>

                                            )
                                        })
                                    }
                                </View>

                                <View style={{ borderWidth: 1, paddingVertical: heightToDp("3%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%") }}>
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
                                        <View style={{ width: widthToDp("18%"), marginLeft: widthToDp("1.5%") }}>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>Eggs</Text>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>Adult Bird</Text>
                                        </View>

                                        {/* <View style={{ width: widthToDp("17%"), marginLeft: widthToDp("1.5%") }}>
                                        <Text style={{ marginTop: heightToDp("2%") }}>16 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>8 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>kids</Text>
                                    </View> */}
                                        <View style={{ width: widthToDp("12%"), marginLeft: widthToDp("6%") }}>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3%') }}>{this.state.eggQuantity}</Text>
                                            <Text style={{ marginTop: heightToDp("2.5%"), fontSize: widthToDp('3%') }}>{this.state.birdQuantity}</Text>

                                        </View>
                                        <View style={{ width: widthToDp("20%"), marginLeft: widthToDp("1.5%") }}>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3%') }}>₹ 5.00 / pc</Text>
                                            <Text style={{ marginTop: heightToDp("2.5%"), fontSize: widthToDp('3%') }}>₹ 300 / bird</Text>

                                        </View>
                                        <View style={{ width: widthToDp("18%"), marginLeft: widthToDp("1.5%") }}>
                                            <View style={{marginTop: heightToDp("2%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3%') }}>{this.state.totalPriceEggs}</Text>
                                            </View>
                                            <View style={{marginTop: heightToDp("2.5%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3%') }}>{this.state.totalPriceAdultBrids}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                    <View style={{width: widthToDp('20%'), marginLeft: widthToDp('1%')}}>
                                        <Text style={{fontSize: widthToDp('3.3%')}}>Total (A)</Text>
                                    </View>
                                    <View style={{marginLeft: widthToDp("40%"), flex: 0.8, flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{ fontSize: widthToDp('3%') }}>₹ </Text> 
                                        <Text style={{ fontSize: widthToDp('3%') }}>{this.state.total}</Text>
                                    </View>
                                </View>


                                {/* table2 */}

                                <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1.5%"), flexDirection: 'row' }}>
                                    <View style={{ width: widthToDp("80%"), marginLeft: widthToDp("1.5%") }}>

                                        <Text style={{ marginTop: heightToDp("2%") }}>Total expenditure for all poultry birds</Text>

                                    </View>
                                </View>

                                <View style={{ borderWidth: 1, paddingVertical: heightToDp("1%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%") }}>
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
                                        <View style={{ width: widthToDp("18%"), marginLeft: widthToDp("1.5%") }}>
                                            {
                                                tableHeading2.map((i) => {
                                                    return (
                                                        <View style={{ marginTop: widthToDp("4%") }}>
                                                            <Text style={{fontSize: widthToDp('3.3%')}}>{i.name}</Text>
                                                        </View>
                                                    );
                                                })
                                            }
                                        </View>

                                        {/* <View style={{ width: widthToDp("17%"), marginLeft: widthToDp("1.5%") }}>
                                        <Text style={{ marginTop: heightToDp("2%") }}>16 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>8 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>kids</Text>
                                    </View> */}
                                        <View style={{ width: widthToDp("18%"), marginLeft: widthToDp("6%") }}>
                                            <Text style={{ marginTop: heightToDp("2%") }}>LS</Text>
                                            <Text style={{ marginTop: heightToDp("1.3%") }}>LS</Text>
                                            <Text style={{ marginTop: heightToDp("1.8%") }}>LS</Text>
                                        </View>
                                        <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("1.5%") }}>
                                            <View style={{ marginTop: heightToDp("2%") }}>
                                                <View style={{marginTop: heightToDp("4%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                    <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.feed ? "₹ " : ""}</Text>
                                                    <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.feed ? this.state.feed : "-"}</Text>
                                                </View>
                                                <View style={{marginTop: heightToDp("2.3%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                    <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.vaccination ? "₹ " : ""}</Text>
                                                    <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.vaccination ? this.state.vaccination : "-"}</Text>
                                                </View>
                                            </View>

                                        </View>

                                    </View>
                                </View>
                                <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                    <Text style={{marginLeft: widthToDp('1%')}}>Total (B)</Text>
                                    <View style={{marginLeft: widthToDp("48%"), flex: 0.75, flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                        <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalB}</Text>
                                    </View>
                                </View>

                                <View style={{ marginLeft: widthToDp("3%"), marginTop: ("4%") }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>NET PROFIT(A-B) = </Text>
                                        <Text>{"₹ " + this.state.netProfit}</Text>
                                    </View>

                                </View>
                                
                                <View style={{margin: widthToDp('3%')}}>
                                    <Text>Note: The capital cost is not being considered in case of buying a new Hen.</Text>
                                </View>

                                <View style={{ marginTop: heightToDp("10%") }}></View>
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
                    <TouchableOpacity onPress={() => Toast.show({text: "Calculated", duration: 3000, type: 'success'})}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>CALCULATE</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.next() }}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>SAVE & EXIT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}