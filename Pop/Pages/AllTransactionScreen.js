import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList, Linking, ScrollView } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import tts from 'react-native-tts'
import base64 from 'react-native-base64'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'


export default class AllTransactionScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            languages: [],
            moneyManagerData: [],
            textLanguageChange:'',
            allTransactionsLabel:''
        }
        this.state.languages = Languages
        //alert(this.state.value)
    }

    componentDidMount() {
        this.getUserData()
        this.setLanguageOnMount()
    }

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            var allTransactions = specificObject.labels.find((i) => i.type === 44)
            if (this.state.textLanguageChange === '0') {
                //this.state.allTransactionsLabel = allTransactions.nameEnglish
                this.setState({allTransactionsLabel: allTransactions.nameEnglish})
                // this.state.data[1].name = livestock.nameEnglish
                // this.state.data[2].name = smallBusiness.nameEnglish
                // this.state.data[3].name = health.nameEnglish
                // this.state.data[4].name = education.nameEnglish
                // this.state.data[5].name = loanSavings.nameEnglish
                // this.state.data[6].name = pension.nameEnglish
                // this.state.data[7].name = others.nameEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                //this.state.allTransactionsLabel = allTransactions.nameHindi
                this.setState({allTransactionsLabel: allTransactions.nameHindi})
                // this.state.data[1].name = livestock.nameHindi
                // this.state.data[2].name = smallBusiness.nameHindi
                // this.state.data[3].name = health.nameHindi
                // this.state.data[4].name = education.nameHindi
                // this.state.data[5].name = loanSavings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                //this.state.data[0].name = allTransactions.nameHo
                this.setState({allTransactionsLabel: allTransactions.nameHo})
                // this.state.data[1].name = livestock.nameHo
                // this.state.data[2].name = smallBusiness.nameHo
                // this.state.data[3].name = health.nameHo
                // this.state.data[4].name = education.nameHo
                // this.state.data[5].name = loanSavings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                //this.state.data[0].name = allTransactions.nameOdia
                this.setState({allTransactionsLabel: allTransactions.nameOdia})
                // this.state.data[1].name = livestock.nameOdia
                // this.state.data[2].name = smallBusiness.nameOdia
                // this.state.data[3].name = health.nameOdia
                // this.state.data[4].name = education.nameOdia
                // this.state.data[5].name = loanSavings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                //this.state.data[0].name = allTransactions.nameSanthali
                this.setState({allTransactionsLabel: allTransactions.nameSanthali})
                // this.state.data[1].name = livestock.nameSanthali
                // this.state.data[2].name = smallBusiness.nameSanthali
                // this.state.data[3].name = health.nameSanthali
                // this.state.data[4].name = education.nameSanthali
                // this.state.data[5].name = loanSavings.nameSanthali
                // this.state.data[6].name = pension.nameSanthali
                // this.state.data[7].name = others.nameSanthali
            }
            
        } catch (error) {
            alert(error)
        }
        this.setState({ crops: specificObject.crops })
    }

    getUserData = async () => {
        try {
            var moneyManagerData = []
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            moneyManagerData = specificObject.moneyManagerData;
            console.log(specificObject.moneyManagerData)
        } catch (error) {
            console.log(error)
        }
        this.setState({ moneyManagerData: moneyManagerData })
    }


    setLanguageOnMount = async() => {
        let defaultLanguage = await AsyncStorage.getItem('language')
        if(defaultLanguage === 'en'){
            this.setState({textLanguageChange : '0'})
            this.loadlabelsFromStorage()
        }else if(defaultLanguage === 'hi'){
            this.setState({textLanguageChange : '1'})
            this.loadlabelsFromStorage()
        }else if(defaultLanguage === 'ho'){
            this.setState({textLanguageChange : '2'})
            this.loadlabelsFromStorage()
        }else if(defaultLanguage === 'od'){
            this.setState({textLanguageChange : '3'})
            this.loadlabelsFromStorage()
        }else if(defaultLanguage === 'san'){
            this.setState({textLanguageChange : '4'})
            this.loadlabelsFromStorage()
        }
    }

    languageChangeFunction = async(data) => {
        
        if(data === 'en'){
            AsyncStorage.setItem('language','en')
            this.setState({textLanguageChange : '0'})
            this.loadlabelsFromStorage()
        }else if(data === 'hi'){
            this.setState({textLanguageChange : '1'})
            AsyncStorage.setItem('language','hi')
            this.loadlabelsFromStorage()
        }else if(data === 'ho'){
            this.setState({textLanguageChange : '2'})
            AsyncStorage.setItem('language','ho')
            this.loadlabelsFromStorage()
        }else if(data === 'od'){
            this.setState({textLanguageChange : '3'})
            AsyncStorage.setItem('language','od')
            this.loadlabelsFromStorage()
        }else if(data === 'san'){
            AsyncStorage.setItem('language','san')
            this.setState({textLanguageChange : '4'})
            this.loadlabelsFromStorage()
        }
    }

    render() {
        var moneyManagerData = []
        moneyManagerData = this.state.moneyManagerData
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
                    <TouchableOpacity onPress={() =>this.languageChangeFunction(this.state.languages[0].id)}>
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

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[1].id)}>
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

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[2].id)}>
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
                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[3].id)}>
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

                    <TouchableOpacity onPress={() => this.languageChangeFunction(this.state.languages[4].id)}>
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
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>{this.state.allTransactionsLabel}</Text>
                <ScrollView>
                {
                    moneyManagerData.map((i) => {
                        return (
                            <View style={{ backgroundColor: 'white', paddingVertical: widthToDp('5%'), alignSelf: 'center', width: widthToDp("85%"), borderRadius: 20, marginTop: heightToDp("3%"), paddingRight: widthToDp('2%'), justifyContent: 'center' }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: widthToDp('5%')
                                }}>
                                    <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp("4%"), fontFamily: 'Oswald-Light' }}>{"Date : " + i.date}</Text>
                                    <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp("4%"), fontFamily: 'Oswald-Light' }}>{i.type}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{i.category}</Text>
                                    <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{i.amount ? "₹ " + i.amount : ""}</Text>
                                </View>
                            </View>
                        )
                    })
                }
                <View style={{margin:20}}></View>
                </ScrollView>
                

            </View>
        );
    }
}