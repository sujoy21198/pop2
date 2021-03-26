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
    { 'name': 'Items', 'items': '2 to 3 Sessional vegetable', 'unit': '40Kg', 'unitPrice': '30', 'totalPrice': '1200' },
    { 'name': 'Unit', 'items': 'Spices', 'unit': '2Kg', 'unitPrice': '80', 'totalPrice': '160' },
    { 'name': 'Unit Price (₹)', 'items': 'Miscellaneous', 'unit': 'LS', 'totalPrice': '100' },
    { 'name': 'Total Price (₹)' },
]

const tableHeading2 = [
    { 'name': 'Items', 'items': 'Sessional vegetable', 'unit': '2', 'unitPrice': '₹ 500 perKG', 'totalPrice': '1000' },
    { 'name': 'Unit (Kgs)', 'items': 'Spices', 'unit': '2', 'unitPrice': '₹ 500 perKG', 'totalPrice': '1000' },
    { 'name': 'Selling Price (₹)' },
    { 'name': 'Total Selling price (₹, keeping 20% margin)' },
]

export default class DryFishSellingSecondTableScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableHeading: [],
            value: '',
            sessionalVegInput: '40',
            spicesInput: '2',
            sessionalVegTotal: '1200',
            spicesTotal: '160',
            expenditurePerDayA: '1460',
            sessionalVegProfitUnit: '40',
            sessionalVegProfitUnitPrice: '36',
            spicesProfitUnit: '2',
            spicesProfitUnitPrice: '86',
            perDaySellingValue: '1612',
            sessionalVegSellingPrice: '1440',
            spicesVegSellingPrice: '172',
            profit: '152',
            profit15: '2280',
            textLanguageChange: '',
            smallBusinessLabel: '',
            languages: [],
            backButtontext: '',
            saveButtonText: '',
            nextButtonText: '',
            oneTimeExpenditureLabel: '',
            expVegUnitPrice: '',
            expSpiceUnitPrice: ''
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
            var specificObject = parsed[0]
            var backButtontext = specificObject.labels.find((i) => i.type === 64)
            var saveButtonText = specificObject.labels.find((i) => i.type === 186)
            var nextButtonText = specificObject.labels.find((i) => i.type === 62)
            var oneTimeExpenditureLabel = specificObject.labels.find((i) => i.type === 101)
            // var message = specificObject.labels.find((i) => i.type === 26)
            // var generalSettings = specificObject.labels.find((i) => i.type === 27)
            // var pension = specificObject.labels.find((i) => i.type === 51)
            // var others = specificObject.labels.find((i) => i.type === 52)
            if (this.state.textLanguageChange === '0') {
                this.setState({ backButtontext: backButtontext.nameEnglish })
                this.setState({ saveButtonText: saveButtonText.nameEnglish })
                this.setState({ nextButtonText: nextButtonText.nameEnglish })
                this.setState({ oneTimeExpenditureLabel: oneTimeExpenditureLabel.nameEnglish })
                // this.state.data[4].name = message.nameEnglish
                // this.state.data[5].name = generalSettings.nameEnglish
                // this.state.data[6].name = pension.nameEnglish
                // this.state.data[7].name = others.nameEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({ backButtontext: backButtontext.nameHindi })
                this.setState({ saveButtonText: saveButtonText.nameHindi })
                this.setState({ nextButtonText: nextButtonText.nameHindi })
                this.setState({ oneTimeExpenditureLabel: oneTimeExpenditureLabel.nameHindi })
                // this.state.data[4].name = message.nameHindi
                // this.state.data[5].name = generalSettings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ backButtontext: backButtontext.nameHo })
                this.setState({ saveButtonText: saveButtonText.nameHo })
                this.setState({ nextButtonText: nextButtonText.nameHo })
                this.setState({ oneTimeExpenditureLabel: oneTimeExpenditureLabel.nameHo })
                // this.state.data[4].name = message.nameHindi
                // this.state.data[4].name = message.nameHo
                // this.state.data[5].name = generalSettings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ backButtontext: backButtontext.nameOdia })
                this.setState({ saveButtonText: saveButtonText.nameOdia })
                this.setState({ nextButtonText: nextButtonText.nameOdia })
                this.setState({ oneTimeExpenditureLabel: oneTimeExpenditureLabel.nameOdia })
                // this.state.data[4].name = message.nameOdia
                // this.state.data[5].name = generalSettings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ backButtontext: backButtontext.nameSanthali })
                this.setState({ saveButtonText: saveButtonText.nameSanthali })
                this.setState({ nextButtonText: nextButtonText.nameSanthali })
                this.setState({ oneTimeExpenditureLabel: oneTimeExpenditureLabel.nameSanthali })
                // this.state.data[4].name = message.nameSanthali
                // this.state.data[5].name = generalSettings.nameSanthali
                // this.state.data[6].name = pension.nameSanthali
                // this.state.data[7].name = others.nameSanthali
            }

        } catch (error) {
            alert(error)
        }
        //this.setState({ crops: specificObject.crops })
        //this.showData()
    }

    getVaccinesFromOffline = async () => {
        try {
            var vaccine = []
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var livestockwisevaccine = specificObject.vaccination.filter((i) => i.type === this.state.value)
            vaccine = livestockwisevaccine
            this.setState({ vaccine: vaccine })
            //console.log(livestockwisevaccine)
        } catch (error) {
            alert(error)
        }
    }

    calculation = () => {
        //alert(this.state.sessionalVegInput)
        var sessionalVegTotal = this.state.sessionalVegInput * this.state.expVegUnitPrice
        var spicesTotal = this.state.spicesInput * this.state.expSpiceUnitPrice
        var expenditurePerDayA = sessionalVegTotal + spicesTotal + 100
        var sessionalVegSellingPrice = this.state.sessionalVegProfitUnit * this.state.sessionalVegProfitUnitPrice
        var spicesVegSellingPrice = this.state.spicesProfitUnit * this.state.spicesProfitUnitPrice

        var perdaysellingvaluetotal = sessionalVegSellingPrice + spicesVegSellingPrice
        var profit = perdaysellingvaluetotal - expenditurePerDayA
        var profit15 = profit * 15

        this.setState({ sessionalVegTotal: sessionalVegTotal })
        this.setState({ spicesTotal: spicesTotal })
        this.setState({ expenditurePerDayA: expenditurePerDayA })
        this.setState({ sessionalVegSellingPrice: sessionalVegSellingPrice })
        this.setState({ spicesVegSellingPrice: spicesVegSellingPrice })
        this.setState({ perDaySellingValue: perdaysellingvaluetotal })
        this.setState({ profit: profit })
        this.setState({ profit15: profit15 })
        Toast.show({ text: "Calculated", duration: 3000, type: 'success' });

    }

    inputValue = (data) => {
        var numberofVaccines = []
        numberofVaccines.concat(data)
        console.log(numberofVaccines)
    }

    next = async () => {
        try {
            var date = new Date().getDate()
            var month = new Date().getMonth() + 1
            var year = new Date().getFullYear()
            const expenseObject = { 'type': 'expense', 'category': 'Vegetable vending', 'amount': this.state.perDaySellingValue, 'date': date + "/" + month + "/" + year }
            const incomeObject = { 'type': 'income', 'category': 'Vegetable Vending', 'amount': this.state.profit15, 'date': date + "/" + month + "/" + year }
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
                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[3].id)}>
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
                <ScrollView>
                    <View style={{ backgroundColor: BaseColor.Red, height: heightToDp("120%"), alignSelf: 'center', width: widthToDp("90%"), borderRadius: 10, marginTop: heightToDp('1.5%') }}>
                        <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>Expenditure & Profit </Text>
                        <View style={{ backgroundColor: "white", height: heightToDp("120%"), alignSelf: 'center', width: widthToDp("90%"), marginTop: heightToDp('2%'), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                            {/* <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium' }}>Income from </Text>
                                <Input
                                    keyboardType='number-pad'
                                    defaultValue={this.state.numberhens}
                                    onChangeText={(data) => this.calculation(data)}
                                    style={{ marginLeft: widthToDp("1%"), fontFamily: 'Oswald-Medium', width: widthToDp("10%"), marginTop: heightToDp("1%"), borderWidth: 1 }}
                                />
                                <Text style={{ fontSize: widthToDp("5%"), marginLeft: widthToDp("1%"), marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginRight: widthToDp("20%") }}>hens</Text>
                            </View>
                            <View>
                                <Text>One desi hen gives 50 eggs in a year If a farmer keeps 4 hens, then he will get 200 eggs in a year.</Text>
                            </View> */}
                            <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1.5%"), flexDirection: 'row' }}>
                                {
                                    tableHeading.map((i, key) => {
                                        return (
                                            <View style={{ width: widthToDp(`${key === 0 ? 24 : key === 1 ? 14 : 19}%`), marginLeft: widthToDp("1.5%") }}>

                                                <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>{i.name}</Text>

                                            </View>

                                        )
                                    })
                                }
                            </View>

                            <View style={{ borderWidth: 1, height: heightToDp("35%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%") }}>
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
                                    <View style={{ width: widthToDp("23%"), marginLeft: widthToDp("1.5%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>Eggs</Text>
                                        <Text style={{ marginTop: heightToDp("5%") }}>Adult Bird</Text> */}
                                        {
                                            tableHeading.map((i) => {
                                                return (
                                                    <Text style={{ marginTop: heightToDp("4%"), fontSize: widthToDp('3.3%') }}>{i.items}</Text>
                                                )
                                            })
                                        }
                                    </View>

                                    {/* <View style={{ width: widthToDp("17%"), marginLeft: widthToDp("1.5%") }}>
                                        <Text style={{ marginTop: heightToDp("2%") }}>16 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>8 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>kids</Text>
                                    </View> */}
                                    <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("6%"), height: heightToDp("30%") }}>
                                        <View style={{ width: widthToDp("10%"), height: heightToDp("5%"), marginTop: heightToDp("3.5%"), flexDirection: 'row' }}>
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3.3%') }}
                                                placeholder="40"
                                                onChangeText={(data) => this.setState({ sessionalVegInput: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                        <View style={{ width: widthToDp("10%"), height: heightToDp("5%"), marginTop: heightToDp("3.5%"), flexDirection: 'row' }}>
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3.3%') }}
                                                placeholder="2"
                                                onChangeText={(data) => this.setState({ spicesInput: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                        <View style={{ width: widthToDp("10%"), height: heightToDp("5%"), marginTop: heightToDp("3.5%"), flexDirection: 'row' }}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>LS</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("0%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>₹ 5.00 per piece</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>₹ 300 per bird</Text> */}
                                        {/* {
                                            tableHeading.map((i, key) => {
                                                if(i.unitPrice) {
                                                    return (
                                                        <View style={{marginTop: heightToDp(`${key===0 ? 5.2 : 6.3}%`), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                            {i.unitPrice && <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>}
                                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{i.items ? i.unitPrice : "-"}ko</Text>
                                                        </View>
                                                    )
                                                }                                                
                                            })
                                        } */}
                                        <View style={{ width: widthToDp("10%"), height: heightToDp("5%"), marginTop: heightToDp("3.5%"), flexDirection: 'row' }}>
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3.3%') }}
                                                placeholder="30"
                                                onChangeText={(data) => this.setState({ expVegUnitPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                        <View style={{ width: widthToDp("10%"), height: heightToDp("5%"), marginTop: heightToDp("3.5%"), flexDirection: 'row' }}>
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3.3%') }}
                                                placeholder="80"
                                                onChangeText={(data) => this.setState({ expSpiceUnitPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                    </View>
                                    <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("5%") }}>
                                        <View style={{ marginTop: heightToDp('5.2%'), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.sessionalVegTotal}</Text>
                                        </View>
                                        <View style={{ marginTop: heightToDp('6.2%'), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.spicesTotal}</Text>
                                        </View>
                                        <View style={{ marginTop: heightToDp('4%'), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>100</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <View style={{ marginLeft: widthToDp('1%') }}>
                                    <Text style={{ fontSize: widthToDp('3.3%') }}>Expenditure per day/lot (A)</Text>
                                </View>
                                <View style={{ width: widthToDp("13%"), marginLeft: widthToDp('22%'), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>
                                    <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.expenditurePerDayA}</Text>
                                </View>

                            </View>

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
                                            <View style={{ width: widthToDp("19%"), marginLeft: widthToDp("1%") }}>

                                                <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>{i.name}</Text>

                                            </View>

                                        )
                                    })
                                }
                            </View>

                            <View style={{ borderWidth: 1, height: heightToDp("20%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%") }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: widthToDp("20%"), marginLeft: widthToDp("1.5%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>Eggs</Text>
                                        <Text style={{ marginTop: heightToDp("5%") }}>Adult Bird</Text> */}
                                        {
                                            tableHeading2.map((i, key) => {
                                                return (
                                                    <Text style={{ marginTop: heightToDp(`${key === 0 ? 1 : 5}%`), fontSize: widthToDp('3.3%') }}>{i.items}</Text>
                                                )
                                            })
                                        }
                                    </View>

                                    {/* <View style={{ width: widthToDp("17%"), marginLeft: widthToDp("1.5%") }}>
                                        <Text style={{ marginTop: heightToDp("2%") }}>16 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>8 months old</Text>
                                        <Text style={{ marginTop: heightToDp("2%") }}>kids</Text>
                                    </View> */}
                                    <View style={{ width: widthToDp("18%"), marginLeft: widthToDp("4%"), height: heightToDp("30%") }}>
                                        {/* <Text style={{ marginTop: heightToDp("2%") }}>{this.state.eggQuantity}</Text>
                                        <Text style={{ marginTop: heightToDp("5%") }}>{this.state.birdQuantity}</Text> */}
                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("1%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue', fontSize: widthToDp('3.3%') }}
                                                placeholder={"40"}
                                                onChangeText={(data) => this.setState({ sessionalVegProfitUnit: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("3%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue' }}
                                                placeholder={"2"}
                                                onChangeText={(data) => this.setState({ spicesProfitUnit: data })}
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
                                                style={{ borderBottomWidth: 1, borderColor: 'blue' }}
                                                placeholder={"36"}
                                                onChangeText={(data) => this.setState({ sessionalVegProfitUnitPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                        <View style={{ height: heightToDp("6%"), marginTop: heightToDp("3%") }}>
                                            {/* <Text style={{ marginBottom: heightToDp("1.5%") }}>{i.noOfTime}</Text> */}
                                            <Input
                                                style={{ borderBottomWidth: 1, borderColor: 'blue' }}
                                                placeholder={"86"}
                                                onChangeText={(data) => this.setState({ spicesProfitUnitPrice: data })}
                                                keyboardType="number-pad"
                                            />
                                        </View>

                                    </View>
                                    <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("5%") }}>
                                        <View style={{ marginTop: heightToDp("3%"), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.sessionalVegSellingPrice}</Text>
                                        </View>
                                        <View style={{ marginTop: heightToDp("6.5%"), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.spicesVegSellingPrice}</Text>
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
                            <View style={{ borderWidth: 1, height: heightToDp("4%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <Text style={{
                                    marginLeft: widthToDp('1%'),
                                    fontSize: widthToDp('3.3%')
                                }}>Per day selling value (B)</Text>
                                <View style={{ marginLeft: heightToDp("13%"), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>
                                    <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.perDaySellingValue}</Text>
                                </View>
                            </View>
                            <View style={{ borderWidth: 1, height: heightToDp("4%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <Text style={{
                                    marginLeft: widthToDp('1%'),
                                    fontSize: widthToDp('3.3%')
                                }}>Profit per day/lot</Text>
                                <View style={{ marginLeft: heightToDp("18%"), width: widthToDp("12%"), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text>
                                    <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.profit}</Text>
                                </View>
                            </View>
                            <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                <Text style={{
                                    marginLeft: widthToDp('1%'),
                                    fontSize: widthToDp('3.3%')
                                }}>15 lot selling per month. (monthly profit) =  ₹ {this.state.profit}*15=  ₹ {this.state.profit15}</Text>
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