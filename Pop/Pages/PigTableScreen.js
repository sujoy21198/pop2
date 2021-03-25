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
    { 'name': 'Mother Pig', 'unitCost': '2500', 'heading': 'Items' },
    { 'name': 'Male Pig', 'unitCost': '2500', 'heading': 'Qnty' },
    { 'name': 'Young Pig', 'unitCost': '1500', 'heading': 'Unit Cost (₹)' },
    { 'name': 'Piglet', 'unitCost': '500', 'heading': 'Total Value after 1 year (₹)' },
]


export default class PigTableScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberPigs: '1',
            tableHeading: [],
            unitCostmotherPig: '2500',
            unitCostmalePig: '2500',
            total: '8500',
            unitCostshedConstruction: '1000',
            totalCostmotherpig: '2500',
            totalcostMalePig: '2500',
            totalCostShedConstruction: '1000',
            totalCostfeeding: '2000',
            totalcostVaccine: '500',
            numberOfMalePig: '1',
            numberOfYoungPig: '6',
            numberOfPiglets: '6',
            totalValueAfteroneYearForMotherPig: '2500',
            totalValueAfteroneYearForMalePig: '2500',
            totalValueAfteroneYearForYoungPig: '9000',
            totalValueAfteroneYearForPigletPig: '3000',
            totalValueAfteroneYearTotal: '17000',
            netProfit:'8500',
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
            var specificObject = parsed.find((i) => i.username === username)
            console.log(specificObject.vaccination)
        } catch (error) {
            alert(error)
        }
    }

    calculation = (data) => {
        this.state.numberPigs = data
        var unitCostmotherPig = this.state.numberPigs * 2500
        var unitCostmalePig = this.state.numberPigs * 2500
        var unitCostshedConstruction = this.state.numberPigs * 1000
        var totalCostmotherpig = this.state.numberPigs * 2500
        var totalcostMalePig = this.state.numberPigs * 2500
        var totalCostShedConstruction = this.state.numberPigs * 1000
        var total = totalCostmotherpig + totalcostMalePig + totalCostShedConstruction + 2000 + 500
        var youngPig = 6 * data
        var piglet = 6 * this.state.numberPigs
        var totalValueAfteroneYearForMotherPig = 2500 * this.state.numberPigs
        var totalValueAfteroneYearForYoungPig = 1500 * youngPig
        var totalValueAfteroneYearForPigletPig = 500 * piglet
        var totalValueAfteroneYearTotal = totalValueAfteroneYearForMotherPig + totalValueAfteroneYearForPigletPig + totalValueAfteroneYearForYoungPig + 2500

        var netProfit = totalValueAfteroneYearTotal - total


        this.setState({ unitCostmotherPig: unitCostmotherPig })
        this.setState({ unitCostmalePig: unitCostmalePig })
        this.setState({ unitCostshedConstruction: unitCostshedConstruction })
        this.setState({ totalCostmotherpig: totalCostmotherpig })
        this.setState({ totalcostMalePig: totalcostMalePig })
        this.setState({ totalCostShedConstruction: totalCostShedConstruction })
        this.setState({ total: total })
        this.setState({ numberOfYoungPig: youngPig })
        this.setState({ numberOfPiglets: piglet })
        this.setState({ totalValueAfteroneYearForMotherPig: totalValueAfteroneYearForMotherPig })
        this.setState({ totalValueAfteroneYearForYoungPig: totalValueAfteroneYearForYoungPig })
        this.setState({ totalValueAfteroneYearForPigletPig: totalValueAfteroneYearForPigletPig })
        this.setState({ totalValueAfteroneYearTotal: totalValueAfteroneYearTotal })
        this.setState({netProfit : netProfit})


    }
    next = async() => {
        try {
            var date = new Date().getDate()
            var month = new Date().getMonth() + 1
            var year = new Date().getFullYear()
            const expenseObject = { 'type': 'expense', 'category': 'Pig livestock', 'amount': this.state.total, 'date': date + "/" + month + "/" + year }
            const incomeObject = { 'type': 'income', 'category': 'Pig livestock', 'amount': this.state.totalValueAfteroneYearTotal, 'date': date + "/" + month + "/" + year }
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
        // this.props.navigation.navigate({
        //     name: 'VaccinationScreen',
        //     params: { value: 2 }
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
                        <Text style={{ color: "#fff", fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>Income from mother pig per year</Text>
                        <View style={{ backgroundColor: "white", height: heightToDp("85.5%"), alignSelf: 'center', width: widthToDp("90%"), marginTop: heightToDp('2%'), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: widthToDp("5%"), marginLeft: widthToDp("5%"), marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium' }}>Income from </Text>
                                <Input
                                    keyboardType='number-pad'
                                    defaultValue={this.state.numberPigs}
                                    onChangeText={(data) => this.calculation(data)}
                                    style={{ marginLeft: widthToDp("1%"), fontFamily: 'Oswald-Medium', width: widthToDp("10%"), marginTop: heightToDp("1%"), borderBottomWidth: 1, borderColor: 'blue' }}
                                />
                                <Text style={{ fontSize: widthToDp("5%"), marginLeft: widthToDp("1%"), marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginRight: widthToDp("20%") }}>{`mother ${Number(this.state.numberPigs) === 1 ? "pig" : "pigs"}`}</Text>
                            </View>
                            <View style={{paddingHorizontal: widthToDp('2%')}}>
                                <Text>One mother pig gives birth to 16 to 24 kids per years in an interval of 6 months. Let’s assume 12 pig survived till the year end.</Text>
                            </View>
                            <ScrollView nestedScrollEnabled={true}>
                                <View style={{ borderWidth: 1, paddingVertical: heightToDp("2%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1.5%"), flexDirection: 'row' }}>
                                    {
                                        tableHeading.map((i, key) => {
                                            return (
                                                <View style={{ width: widthToDp(`${key===0 ? 19 : key === 1 ? 18 : 19}%`), marginLeft: widthToDp("1.5%") }}>

                                                    <Text style={{fontSize: widthToDp('3.3%')}}>{i.name}</Text>

                                                </View>

                                            )
                                        })
                                    }
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
                                    <View style={{marginTop: widthToDp("2%"), flexDirection: 'row', width: widthToDp("100%")}}>
                                        <View style={{width: widthToDp("21%"), marginLeft: widthToDp("1.3%")}}>
                                            <Text style={{fontSize: widthToDp('3.3%')}}>Mother Pig(Gilt)</Text>
                                        </View>                
                                        <View style={{width: widthToDp("21%")}}>
                                            <Text style={{fontSize: widthToDp('3.3%')}}>{this.state.numberPigs}</Text>
                                        </View>
                                        <View style={{width: widthToDp("17%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.unitCostmotherPig}</Text>
                                        </View>
                                        <View style={{width: widthToDp("15%"), marginLeft: widthToDp('3%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalCostmotherpig}</Text>
                                        </View>
                                    </View>
                                    <View style={{marginTop: widthToDp("2%"), flexDirection: 'row', width: widthToDp("100%")}}>
                                        <View style={{width: widthToDp("21%"), marginLeft: widthToDp("1.3%")}}>
                                            <Text style={{fontSize: widthToDp('3.3%')}}>Male Pig(Boar)</Text>
                                        </View>             
                                        <View style={{width: widthToDp("21%")}}>
                                            <Text style={{fontSize: widthToDp('3.3%')}}>{this.state.numberPigs}</Text>
                                        </View>   
                                        <View style={{width: widthToDp("17%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.unitCostmalePig}</Text>
                                        </View>
                                        <View style={{width: widthToDp("15%"), marginLeft: widthToDp('3%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalcostMalePig}</Text>
                                        </View>
                                    </View>
                                    <View style={{marginTop: widthToDp("2%"), flexDirection: 'row', width: widthToDp("100%")}}>
                                        <View style={{width: widthToDp("21%"), marginLeft: widthToDp("1.3%")}}>
                                            <Text style={{fontSize: widthToDp('3.3%')}}>Shed construction</Text>
                                        </View>             
                                        <View style={{width: widthToDp("21%")}}>
                                            <Text style={{fontSize: widthToDp('3.3%')}}>{this.state.numberPigs}</Text>
                                        </View>  
                                        <View style={{width: widthToDp("17%"), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.unitCostshedConstruction}</Text>
                                        </View>  
                                        <View style={{width: widthToDp("15%"), marginLeft: widthToDp('3%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalCostShedConstruction}</Text>
                                        </View>
                                    </View>
                                    <View style={{marginTop: widthToDp("2%"), flexDirection: 'row', width: widthToDp("100%")}}>
                                        <View style={{width: widthToDp("21%"), marginLeft: widthToDp("1.3%")}}>
                                            <Text style={{fontSize: widthToDp('3.3%')}}>Vaccination Per year</Text>
                                        </View>             
                                        <View style={{width: widthToDp("21%")}}>
                                            <Text style={{fontSize: widthToDp('3.3%')}}>2 (adults) & 12 piglets</Text>
                                        </View>   
                                        <View style={{width: widthToDp("17%"), flexDirection: 'row', justifyContent: 'flex-end'}}>
                                            <Text style={{fontSize: widthToDp('3.3%')}}>LS</Text>
                                        </View>  
                                        <View style={{width: widthToDp("15%"), marginLeft: widthToDp('3%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalCostfeeding}</Text>
                                        </View>
                                    </View>
                                    <View style={{marginTop: widthToDp("2%"), flexDirection: 'row', width: widthToDp("100%")}}>
                                        <View style={{width: widthToDp("21%"), marginLeft: widthToDp("1.3%")}}>
                                            <Text style={{fontSize: widthToDp('3.3%')}}>Feeding per year</Text>
                                        </View>           
                                        <View style={{width: widthToDp("21%")}}>
                                            <Text style={{fontSize: widthToDp('3.3%')}}>2 (adults) & 12 piglets</Text>
                                        </View>  
                                        <View style={{width: widthToDp("17%"), flexDirection: 'row', justifyContent: 'flex-end'}}>
                                            <Text style={{fontSize: widthToDp('3.3%')}}>LS</Text>
                                        </View>  
                                        <View style={{width: widthToDp("15%"), marginLeft: widthToDp('3%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalcostVaccine}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ borderWidth: 1, height: heightToDp("6%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                    <View style={{width: widthToDp('22%')}}>
                                        <Text style={{marginLeft: widthToDp('1.3%'), fontSize: widthToDp('3.3%')}}>Total (A)</Text>
                                    </View>
                                    <View style={{width: widthToDp("15%"), marginLeft: widthToDp('41%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                        <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.total}</Text>
                                    </View>
                                </View>




                                {/* table2 */}

                                <View style={{ borderWidth: 1, paddingVertical: heightToDp("1%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1.5%"), flexDirection: 'row' }}>
                                    {
                                        tableHeading2.map((i,key) => {
                                            return (
                                                <View style={{ width: widthToDp(`${key===0 ? 21 : key === 1 ? 11 : 19}%`), marginLeft: widthToDp("1.5%") }}>

                                                    <Text style={{fontSize: widthToDp('3.3%')}}>{i.heading}</Text>

                                                </View>

                                            )
                                        })
                                    }
                                </View>

                                <View style={{ borderWidth: 1, paddingVertical: heightToDp("2%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%") }}>
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
                                                        <View style={{ marginTop: widthToDp("3.8%") }}>
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
                                        <View style={{ width: widthToDp("10%"), marginLeft: widthToDp("6%") }}>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>{this.state.numberPigs}</Text>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>{this.state.numberOfMalePig}</Text>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>{this.state.numberOfYoungPig}</Text>
                                            <Text style={{ marginTop: heightToDp("2%"), fontSize: widthToDp('3.3%') }}>{this.state.numberOfPiglets}</Text>

                                        </View>
                                        <View style={{ width: widthToDp("17%"), marginLeft: widthToDp("1.5%") }}>
                                            {
                                                tableHeading2.map((i, key) => {
                                                    return (                                                        
                                                        <View style={{marginTop: heightToDp(`2%`), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                            <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                                            <Text style={{ fontSize: widthToDp('3.3%') }}>{i.unitCost}</Text>
                                                        </View>
                                                    )
                                                })
                                            }

                                        </View>
                                        <View style={{ width: widthToDp("14%"), marginLeft: widthToDp("4.5%") }}>                                                    
                                            <View style={{marginTop: heightToDp('2%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalValueAfteroneYearForMotherPig}</Text>
                                            </View>
                                            <View style={{marginTop: heightToDp('2%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalValueAfteroneYearForMalePig}</Text>
                                            </View>
                                            <View style={{marginTop: heightToDp('2%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalValueAfteroneYearForYoungPig}</Text>
                                            </View>
                                            <View style={{marginTop: heightToDp('2%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                                <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalValueAfteroneYearForPigletPig}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ borderWidth: 1, height: heightToDp("8%"), width: widthToDp("83%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("0%"), flexDirection: 'row' }}>
                                    <View style={{width: widthToDp('22%'), marginLeft: widthToDp('1%')}}>
                                        <Text style={{fontSize: widthToDp('3.3%')}}>Total (B)</Text>
                                    </View>
                                    <View style={{marginLeft: widthToDp('36%'), width: widthToDp('14%'), flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{ fontSize: widthToDp('3.3%') }}>₹ </Text> 
                                        <Text style={{ fontSize: widthToDp('3.3%') }}>{this.state.totalValueAfteroneYearTotal}</Text>
                                    </View>
                                </View>

                                <View style={{ marginLeft: widthToDp("3%"), marginTop: ("4%") }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>NET PROFIT (B -A) = </Text>
                                        <Text>{"₹ " + this.state.netProfit}</Text>
                                    </View>

                                </View>
                                <View style={{margin: widthToDp('3%')}}>
                                    <Text>Note: The capital cost is not being considered in case of buying a new Pig.</Text>
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
                    <TouchableOpacity onPress={() => Toast.show({text: "Calculated", duration: 3000, type: "success"})}>
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