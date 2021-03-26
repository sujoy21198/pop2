import React, { Component } from 'react'
import { View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Text } from 'native-base'
import BaseColor from '../Core/BaseTheme'
import { heightToDp, widthToDp } from '../Responsive'
import TopLogo from '../assets/TopLogo'
import Income from '../assets/Income'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'


export default class IncomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type:'',
            category:'',
            amount:'0',
            languages: [],
            clearButtonText:'',
            nextButtontext:''
        }
        this.state.languages = Languages
        this.state.type = this.props.route.params.type
        this.state.category = this.props.route.params.category
        //alert(this.state.type)
    }

    componentDidMount() {
        this.loadlabelsFromStorage()
        this.setLanguageOnMount()
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

    clear = () => {
        this.setState({amount : '0'})
    }

    calculation = (data) => {
        var result = parseInt(this.state.amount) + parseInt(data)
        this.setState({amount : result})
    }

    doneButton = async() => {
        try{
            var date = new Date().getDate()
            var month = new Date().getMonth()+1
            var year = new Date().getFullYear()
            const moneyObject={'type':this.state.type,'category':this.state.category,'amount':this.state.amount, 'date': date + "/" + month + "/" + year}
            //const incomeObject ={'type':'income','category':'Crops','amount':this.state.totalincomefromcrop}
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            specificObject.moneyManagerData.push(moneyObject)
            await AsyncStorage.setItem('user', JSON.stringify(parsed))
            console.log(specificObject.moneyManagerData)
        }catch(error){
            console.log(error)
        }

        this.props.navigation.navigate({
            name: 'MoneyManagerScreen'
        })
    }

    languageChangeFunction = async (data) => {
        //alert(data)
        if (data === 'en') {
            AsyncStorage.setItem('language', 'en')
            
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
            LanguageChange.setLanguage(id)
        } else if (data === 'hi') {
            
            AsyncStorage.setItem('language', 'hi')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
            LanguageChange.setLanguage(id)
        } else if (data === 'ho') {
          
            AsyncStorage.setItem('language', 'ho')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'od') {
            
            AsyncStorage.setItem('language', 'od')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'san') {
            AsyncStorage.setItem('language', 'san')
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
            var clearButtonText = specificObject.labels.find((i) => i.type === 38)
            var nextButtonText = specificObject.labels.find((i) => i.type === 62)
            console.log(nextButtonText.nameHindi)
            if (this.state.textLanguageChange === '0') {
                this.setState({ clearButtonText: clearButtonText.nameEnglish })
                this.state.nextButtontext = nextButtonText.nameEnglish
               
            } else if (this.state.textLanguageChange === '1') {
                this.setState({ clearButtonText: clearButtonText.nameHindi })
                this.state.nextButtontext = nextButtonText.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ clearButtonText: clearButtonText.nameHo })
                this.state.nextButtontext = nextButtonText.nameHo
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ clearButtonText: clearButtonText.nameOdia })
                this.state.nextButtontext = nextButtonText.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ clearButtonText: clearButtonText.nameSanthali })
                this.state.nextButtontext = nextButtonText.nameSanthali
            }
            //console.log(moneyManagerLabel.nameEnglish)
        } catch (error) {
            alert(error)
        }
        //this.setState({ crops: specificObject.crops })
    }
    render() {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
                <View style={{ backgroundColor: 'white', width: widthToDp("100%"), height: heightToDp("13%"),flexDirection: 'row' }}>
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
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>{this.state.category}</Text>
                <View style={{ backgroundColor: BaseColor.Red, height: heightToDp("6%"), width: widthToDp("90%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1%"), borderRadius: 10 }}>
                    <View style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("0.7%"), flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', width: widthToDp("20%") }}>
                            <Income />
                            <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium', color: 'white' }}>{this.state.type}</Text>
                        </View>
                        <Text style={{ marginLeft: widthToDp("45%"), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium', color: 'white' }}>₹</Text>
                        <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium', color: 'white' }}>{this.state.amount}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', marginTop: heightToDp("2%"), marginLeft: widthToDp("3%"), backgroundColor: 'white', borderRadius: 10, width: widthToDp("40%"), height: heightToDp("8%") }}>
                        <View style={{ width: widthToDp("8%"), height: heightToDp("9%") }}>
                            <Text style={{ marginLeft: widthToDp("3%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium', color: 'black', marginTop: heightToDp("1.3%") }}>₹</Text>
                        </View>
                        <Text style={{ marginLeft: widthToDp("8%"), fontSize: widthToDp("8%"), fontFamily: 'Oswald-Medium', color: 'black', marginTop: heightToDp("1%") }}>{this.state.amount}</Text>
                    </View>

                    <TouchableOpacity onPress={() => this.clear()}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("25%"), borderRadius: 100, marginTop: heightToDp("3.5%"), marginLeft: widthToDp("24%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.5%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.clearButtonText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    <View style={{ flexDirection: 'row', marginTop: heightToDp("3%"), marginLeft: widthToDp("3%") }}>
                        <TouchableOpacity onPress={() => this.calculation(2000)}>
                        <Image
                            source={require('../assets/2000-Note.png')}
                            style={{ height: heightToDp("9%"), width: widthToDp("45%"), borderRadius: 10 }}
                        />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.calculation(500)}>
                        <Image
                            source={require('../assets/500-Note.jpg')}
                            style={{ height: heightToDp("9%"), width: widthToDp("40%"), borderRadius: 10, marginLeft: widthToDp("3.5%") }}
                        />
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: heightToDp("3%"), marginLeft: widthToDp("3%") }}>

                        <TouchableOpacity onPress={() => this.calculation('200')}>
                        <Image
                            source={require('../assets/200-Note.jpg')}
                            style={{ height: heightToDp("9%"), width: widthToDp("45%"), borderRadius: 10 }}
                        />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => this.calculation(100)}>
                        <Image
                            source={require('../assets/100-Note.png')}
                            style={{ height: heightToDp("9%"), width: widthToDp("40%"), borderRadius: 10, marginLeft: widthToDp("3.5%") }}
                        />
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: heightToDp("3%"), marginLeft: widthToDp("3%") }}>

                        <TouchableOpacity onPress={() => this.calculation(50)}>
                        <Image
                            source={require('../assets/50-Note.jpg')}
                            style={{ height: heightToDp("9%"), width: widthToDp("45%"), borderRadius: 10 }}
                        />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.calculation(20)}>
                        <Image
                            source={require('../assets/20-Note.png')}
                            style={{ height: heightToDp("9%"), width: widthToDp("40%"), borderRadius: 10, marginLeft: widthToDp("3.5%") }}
                        />
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: heightToDp("3%"), marginLeft: widthToDp("3%") }}>
                        <TouchableOpacity onPress={() => this.calculation(10)}>
                        <Image
                            source={require('../assets/10-Note.png')}
                            style={{ height: heightToDp("9%"), width: widthToDp("45%"), borderRadius: 10 }}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.calculation(5)}>
                        <Image
                            source={require('../assets/5-Note.jpg')}
                            style={{ height: heightToDp("9%"), width: widthToDp("40%"), borderRadius: 10, marginLeft: widthToDp("3.5%") }}
                        />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => this.doneButton()}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf: 'center', marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.7%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.nextButtontext}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{marginBottom:heightToDp("3%")}}></View>
                </ScrollView>
            </View>
        );
    }
}