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


const tableHeading = [
    { 'name': 'Items', 'items': 'Dry Fish(without salt)', 'unit': '2', 'unitPrice': '₹ 500 perKG', 'totalPrice': '1000' },
    { 'name': 'Unit', 'items': 'Dry fish(salted)', 'unit': '2', 'unitPrice': '₹ 500 perKG', 'totalPrice': '1000' },
    { 'name': 'Unit Price (₹)', 'items': 'DryFishSellingSecondTableScreen' },
    { 'name': 'Total Price (₹)' },
]

const tableHeading2 = [
    { 'name': 'Items', 'items': 'Category 1 (Cereals, pulses, edible oil, Sugar, salt, Spices, Eggs)', 'unit': '2', 'unitPrice': 'Lumpsum', 'totalPrice': '1000' },
    { 'name': 'Unit', 'items': 'Category 2 (Soap, detergent, Shampoo, Toothbrush / paste, broom)', 'unit': '2', 'unitPrice': 'Lumpsum', 'totalPrice': '1000' },
    { 'name': 'Total Buying Price (₹)', 'items': 'Category 3 (Optional) Snacks items (Biscuits, Candy, Chips)', 'unitPrice': 'Lumpsum' },
    { 'name': 'Total Selling price (₹, keeping 20% margin)' },
    { 'name': 'Profit (₹)' }
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
            totalOfTotalBuyingPrice: '',
            totalOfTotalSellingPrice: '',
            totalOfProfit: '',
            lossPercentage:'40',
            netProfitPerMonth:'1960',
            monthlyBuyingPrice:'10000',
            monthlySellingPrice:'12000',
            monthlyProfit:'2000',
            catcat2cat3BuyingPrice:'',
            cat1cat2cat3SellingPrice:'',
            cat1cat2cat3Profit:'',
            textLanguageChange: '',
            smallBusinessLabel:'',
            languages: []
        }
        this.state.tableHeading = tableHeading
        this.state.languages = Languages
        //this.state.value = this.props.route.params.value
        //alert(this.state.value)
    }
    componentDidMount() {
        this.getVaccinesFromOffline()
        this.setLanguageOnMount()
        this.loadlabelsFromStorage()

    }

    setLanguageOnMount = async () => {
        let defaultLanguage = await AsyncStorage.getItem('language')
        if (defaultLanguage === 'en') {
            this.setState({ textLanguageChange: '0' })
            this.loadlabelsFromStorage()
        } else if (defaultLanguage === 'hi') {
            this.setState({ textLanguageChange: '1' })
            this.loadlabelsFromStorage()
        } else if (defaultLanguage === 'ho') {
            this.setState({ textLanguageChange: '2' })
            this.loadlabelsFromStorage()
        } else if (defaultLanguage === 'od') {
            this.setState({ textLanguageChange: '3' })
            this.loadlabelsFromStorage()
        } else if (defaultLanguage === 'san') {
            this.setState({ textLanguageChange: '4' })
            this.loadlabelsFromStorage()
        }
    }

    languageChangeFunction = async (data) => {

        if (data === 'en') {
            AsyncStorage.setItem('language', 'en')
            this.setState({ textLanguageChange: '0' })
            this.loadlabelsFromStorage()
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'hi') {
            this.setState({ textLanguageChange: '1' })
            this.loadlabelsFromStorage()
            AsyncStorage.setItem('language', 'hi')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'ho') {
            this.setState({ textLanguageChange: '2' })
            this.loadlabelsFromStorage()
            AsyncStorage.setItem('language', 'ho')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'od') {
            this.setState({ textLanguageChange: '3' })
            this.loadlabelsFromStorage()
            AsyncStorage.setItem('language', 'od')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'san') {
            AsyncStorage.setItem('language', 'san')
            this.setState({ textLanguageChange: '4' })
            this.loadlabelsFromStorage()
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        }
    }


    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
          
            var smallBusinessLabel = specificObject.labels.find((i) => i.type === 62)
            
            //var nutrationGraden = specificObject.labels.find((i) => i.type === 31)
            // var message = specificObject.labels.find((i) => i.type === 26)
            // var generalSettings = specificObject.labels.find((i) => i.type === 27)
            // var pension = specificObject.labels.find((i) => i.type === 51)
            // var others = specificObject.labels.find((i) => i.type === 52)
            // High Land: 53
            // Medium Land: 54
            // Low Land: 55
            // Land Type : 56
            if (this.state.textLanguageChange === '0') {
                
                this.setState({smallBusinessLabel : smallBusinessLabel.nameEnglish})
                //this.setState({ landTypeLabel: landTypeLabel.nameEnglish })
                // this.state.data[4].name = message.nameEnglish
                // this.state.data[5].name = generalSettings.nameEnglish
                // this.state.data[6].name = pension.nameEnglish
                // this.state.data[7].name = others.nameEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                
                this.setState({smallBusinessLabel : smallBusinessLabel.nameHindi})
                // this.state.data[4].name = message.nameHindi
                // this.state.data[5].name = generalSettings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
               
                this.setState({smallBusinessLabel : smallBusinessLabel.nameHo})
                // this.state.data[4].name = message.nameHo
                // this.state.data[5].name = generalSettings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
               
                this.setState({smallBusinessLabel : smallBusinessLabel.nameOdia})
                //this.setState({ landTypeLabel: landTypeLabel.nameOdia })
                // this.state.data[4].name = message.nameOdia
                // this.state.data[5].name = generalSettings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                
                this.setState({smallBusinessLabel : smallBusinessLabel.nameSanthali})
               // this.setState({ landTypeLabel: landTypeLabel.nameSanthali })
                // this.state.data[4].name = message.nameSanthali
                // this.state.data[5].name = generalSettings.nameSanthali
                // this.state.data[6].name = pension.nameSanthali
                // this.state.data[7].name = others.nameSanthali
            }

        } catch (error) {
            alert(error)
        }
        this.setState({ crops: specificObject.crops })
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
        var result =  this.state.category1SellingPrice  - this.state.category1BuyingPrice
        this.setState({ category1Profit: result })
        var result1 = this.state.category2SellingPrice - this.state.categor2BuyingPrice
        this.setState({ category2Profit: result1 })
        var result2 = this.state.category3SellingPrice - this.state.category3BuyingPrice
        this.setState({ category3Profit: result2 })
        var result3 = parseInt(this.state.category1BuyingPrice) + parseInt(this.state.categor2BuyingPrice) + parseInt(this.state.category3BuyingPrice)
        this.setState({ totalOfTotalBuyingPrice: result3 })
        var result4 = parseInt(this.state.category1SellingPrice) + parseInt(this.state.category2SellingPrice) + parseInt(this.state.category3SellingPrice)
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
        Toast.show({
            text: "Calculated",
            duration: 3000, 
            type: 'success'
        })
    }

    inputValue = (data) => {
        var numberofVaccines = []
        numberofVaccines.concat(data)
        console.log(numberofVaccines)
    }

    next = async() => {
        try {
            var date = new Date().getDate()
            var month = new Date().getMonth()+1
            var year = new Date().getFullYear()
            const expenseObject = { 'type': 'expense', 'category': 'Small Grocery Shop', 'amount': this.state.monthlyBuyingPrice , 'date': date + "/" + month + "/" + year }
            const incomeObject = { 'type': 'income', 'category': 'Small Grocery Shop', 'amount': this.state.monthlySellingPrice , 'date': date + "/" + month + "/" + year}
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
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
                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[0].id)}>
                        <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginLeft: widthToDp("5%") }}>{this.state.languages[0].value}</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[1].id)}>
                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("5%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[1].value}</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[2].id)}>
                        <View style={{ backgroundColor: BaseColor.Ho, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), marginLeft: widthToDp("5%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[2].value}</Text>

                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%"), alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[3].id)}>
                        <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("4.7%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[3].value}</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[4].id)}>
                        <View style={{ backgroundColor: BaseColor.Santhali, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, marginLeft: widthToDp("2%"), flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("3.4%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[4].value}</Text>

                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ borderBottomColor: BaseColor.Stroke, borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("100%") }}></View>
                <ScrollView>
                    <View style={{ backgroundColor: BaseColor.Red, height: heightToDp("210%"), alignSelf: 'center', width: widthToDp("90%"), borderRadius: 10, marginTop: heightToDp('1.5%') }}>
                        <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>Expenditure & Profit </Text>
                        <View style={{ backgroundColor: "white", height: heightToDp("210%"), alignSelf: 'center', width: widthToDp("90%"), marginTop: heightToDp('2%'), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                            <View style={{ 
                                borderTopWidth: 1,
                                borderLeftWidth: 1,
                                borderRightWidth: 1,
                                borderBottomWidth: 1.3, 
                                paddingVertical: heightToDp("2%"), 
                                width: widthToDp("83%"), 
                                marginLeft: widthToDp("3%"),
                                marginTop: heightToDp("1.5%"), 
                                flexDirection: 'row' 
                            }}>
                                {
                                    tableHeading2.map((i) => {
                                        return (
                                            <View style={{ width: widthToDp("15%"), marginLeft: widthToDp("1%") }}>

                                                <Text style={{ marginTop: heightToDp("1%"), fontSize: widthToDp("3.3%") }}>{i.name}</Text>

                                            </View>

                                        )
                                    })
                                }
                            </View>

                            <View style={{ borderWidth: 1, height: heightToDp("50%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%") }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: widthToDp("15%"), marginLeft: widthToDp("1.5%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>Eggs</Text>
                                        <Text style={{ marginTop: heightToDp("5%") }}>Adult Bird</Text> */}
                                        {
                                            tableHeading2.map((i) => {
                                                return (
                                                    <Text style={{ marginTop: heightToDp("1%"), fontSize: widthToDp('2.7%') }}>{i.items}</Text>
                                                )
                                            })
                                        }
                                    </View>

                                    <View style={{ width: widthToDp("11%"), marginLeft: widthToDp("1.5%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>Eggs</Text>
                                        <Text style={{ marginTop: heightToDp("5%") }}>Adult Bird</Text> */}
                                        {
                                            tableHeading2.map((i, key) => {
                                                return (
                                                    <Text style={{ marginTop: heightToDp(`${(key + 1) * 4.5}%`), fontSize: widthToDp('2.3%') }}>{i.unitPrice}</Text>
                                                )
                                            })
                                        }
                                    </View>
                                    <View style={{ width: widthToDp("15%"), marginLeft: widthToDp("4%"), height: heightToDp("30%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>{this.state.eggQuantity}</Text>
                                        <Text style={{ marginTop: heightToDp("5%") }}>{this.state.birdQuantity}</Text> */}
                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("1%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3%') }}
                                                placeholder={"3000"}
                                                onChangeText={(data) => this.setState({ category1BuyingPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("5.5%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3%') }}
                                                placeholder={"1500"}
                                                onChangeText={(data) => this.setState({ categor2BuyingPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("9%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3%') }}
                                                placeholder={"500"}
                                                onChangeText={(data) => this.setState({ category3BuyingPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                    </View>
                                    <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("1.5%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>₹ 5.00 per piece</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>₹ 300 per bird</Text> */}
                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("1%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3%') }}
                                                placeholder={"3600"}
                                                onChangeText={(data) => this.setState({ category1SellingPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("5.5%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3%') }}
                                                placeholder={"1800"}
                                                onChangeText={(data) => this.setState({ category2SellingPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>


                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("9%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3%') }}
                                                placeholder={"600"}
                                                onChangeText={(data) => this.setState({ category3SellingPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                    </View>
                                    <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("5%") }}>
                                        <View style={{marginLeft: widthToDp('-2%'), width: widthToDp("10%"), marginTop: widthToDp('5.5%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3%') }}>₹ </Text>
                                            <Text style={{ fontSize: widthToDp('3%') }}>{this.state.category1Profit}</Text>
                                        </View>
                                        <View style={{marginLeft: widthToDp('-2%'), width: widthToDp("10%"), marginTop: widthToDp('20%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3%') }}>₹ </Text>
                                            <Text style={{ fontSize: widthToDp('3%') }}>{this.state.category2Profit}</Text>
                                        </View>
                                        <View style={{marginLeft: widthToDp('-2%'), width: widthToDp("10%"), marginTop: widthToDp('26%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3%') }}>₹ </Text>
                                            <Text style={{ fontSize: widthToDp('3%') }}>{this.state.category3Profit}</Text>
                                        </View>
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
                                <View style={{ width: widthToDp("30%"), marginLeft: widthToDp('1%') }}>
                                    <Text style={{fontSize: widthToDp('3.3%')}}>Per cycle (15 days) expenditure and profit</Text>
                                </View>
                                <View style={{ width: widthToDp("17%"), marginLeft: widthToDp('1%') }}>
                                    <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp('3.3%') }}>₹ {this.state.totalOfTotalBuyingPrice}</Text>
                                </View>

                                <View style={{ width: widthToDp("17%"), marginLeft: widthToDp('1%') }}>
                                    <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp('3.3%') }}>₹ {this.state.totalOfTotalSellingPrice}</Text>
                                </View>

                                <View style={{ width: widthToDp("17%"), marginLeft: widthToDp('1%') }}>
                                    <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp('3.3%') }}>₹ {this.state.totalOfProfit}</Text>
                                </View>
                            </View>


                            <View style={{ borderWidth: 1, height: heightToDp("10%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <View style={{ width: widthToDp("30%"), marginLeft: widthToDp('1%') }}>
                                    <Text style={{fontSize: widthToDp('3.3%')}}>Per month expenditure and profit</Text>
                                </View>
                                <View style={{ width: widthToDp("17%"), marginLeft: widthToDp('1%') }}>
                                    <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp('3.3%') }}>₹ {this.state.monthlyBuyingPrice}</Text>
                                </View>

                                <View style={{ width: widthToDp("17%"), marginLeft: widthToDp('1%') }}>
                                    <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp('3.3%') }}>₹ {this.state.monthlySellingPrice}</Text>
                                </View>

                                <View style={{ width: widthToDp("17%"), marginLeft: widthToDp('1%') }}>
                                    <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp('3.3%') }}>₹ {this.state.monthlyProfit}</Text>
                                </View>

                            </View>
                            <View style={{ borderWidth: 1, height: heightToDp("14%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <View style={{ width: widthToDp("60%"), marginLeft: widthToDp('1%') }}>
                                    <Text style={{fontSize: widthToDp('3.3%')}}>Loss (Assuming 2% of profit) due to rodent, insects, termites, and damping of food items</Text>
                                </View>
                                <View style={{ width: widthToDp("17%"),height:heightToDp("5%"),marginTop:heightToDp("0%") }}>
                                    <Input
                                        style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3.3%') }}
                                        onChangeText={(data) => this.setState({ lossPercentage: data })}
                                        defaultValue={"40"}
                                        keyboardType="number-pad"
                                    />
                                </View>
                            </View>

                            <View style={{ borderWidth: 1, height: heightToDp("10%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <View style={{ width: widthToDp("60%"), marginLeft: widthToDp('1%') }}>
                                    <Text style={{fontSize: widthToDp('3.3%')}}>Net profit per month</Text>
                                </View>
                                
                                <View style={{width: widthToDp("14%"), height:heightToDp("5%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{ fontSize: widthToDp('3%') }}>₹ </Text>
                                    <Text style={{ fontSize: widthToDp('3%') }}>{this.state.netProfitPerMonth}</Text>
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
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>CALCULATE</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.next() }}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>SAVE/EXIT</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}