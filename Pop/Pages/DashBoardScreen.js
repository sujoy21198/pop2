import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import AsyncStorage from '@react-native-async-storage/async-storage'


const data = [
    { name: 'Knowledge Center', code: 'https://image.freepik.com/free-photo/fresh-green-vegetables-produce-greenhouse-garden-nursery-farm_33829-312.jpg' },
    { name: 'Important Links', code: 'https://www.jing.fm/clipimg/detail/172-1723685_links-useful-links-icon-png.png' },
    { name: 'Money Manager', code: 'https://cdn.dnaindia.com/sites/default/files/styles/third/public/2019/05/21/826028-rupee-thinkstock.jpg' },
    { name: 'Contact', code: 'http://static.agrostar.in/static/KV%2020%20April%202020kv.jpg' },
    { name: 'Message', code: 'https://boostlikes-bc85.kxcdn.com/blog/wp-content/uploads/2017/06/Automatically-Message-Facebook-Fans.jpg' },
    { name: 'General Settings', code: 'https://www.kisaanhelpline.com/news_image/20012020020200fertilisers-bccl.jpg' }
]


export default class DashBoardScreen extends Component {


    constructor(props) {
        super(props)
        this.state = {
            data: [],
            languages: [],
            textLanguageChange:''
        }

        this.state.languages = Languages
        this.state.data = data
        // this.state.data[0].name = LanguageChange.knowledgeCenter
        // this.state.data[1].name = LanguageChange.importantLinks
        // this.state.data[2].name = LanguageChange.moneyManager
        // this.state.data[3].name = LanguageChange.contact
        // this.state.data[4].name = LanguageChange.message
        // this.state.data[5].name = LanguageChange.generalSettings

    }

    componentDidMount() {
        this.getOfflineData()
        this.setLanguageOnMount()
    }

    getOfflineData = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('cropData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            console.log(specificObject.cropsMaterials)
        } catch (error) {
            console.log(error)
        }
    }

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var knowledgeCenter = specificObject.labels.find((i) => i.type === 22)
            var importantLinks = specificObject.labels.find((i) => i.type === 23)
            var moneyManager = specificObject.labels.find((i) => i.type === 24)
            var contact = specificObject.labels.find((i) => i.type === 25)
            var message = specificObject.labels.find((i) => i.type === 26)
            var generalSettings = specificObject.labels.find((i) => i.type === 27)
            // var pension = specificObject.labels.find((i) => i.type === 51)
            // var others = specificObject.labels.find((i) => i.type === 52)
            if (this.state.textLanguageChange === '0') {
                this.state.data[0].name = knowledgeCenter.nameEnglish
                this.state.data[1].name = importantLinks.nameEnglish
                this.state.data[2].name = moneyManager.nameEnglish
                this.state.data[3].name = contact.nameEnglish
                this.state.data[4].name = message.nameEnglish
                this.state.data[5].name = generalSettings.nameEnglish
                // this.state.data[6].name = pension.nameEnglish
                // this.state.data[7].name = others.nameEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.state.data[0].name = knowledgeCenter.nameHindi
                this.state.data[1].name = importantLinks.nameHindi
                this.state.data[2].name = moneyManager.nameHindi
                this.state.data[3].name = contact.nameHindi
                this.state.data[4].name = message.nameHindi
                this.state.data[5].name = generalSettings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                this.state.data[0].name = knowledgeCenter.nameHo
                this.state.data[1].name = importantLinks.nameHo
                this.state.data[2].name = moneyManager.nameHo
                this.state.data[3].name = contact.nameHo
                this.state.data[4].name = message.nameHo
                this.state.data[5].name = generalSettings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                this.state.data[0].name = knowledgeCenter.nameOdia
                this.state.data[1].name = importantLinks.nameOdia
                this.state.data[2].name = moneyManager.nameOdia
                this.state.data[3].name = contact.nameOdia
                this.state.data[4].name = message.nameOdia
                this.state.data[5].name = generalSettings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                this.state.data[0].name = knowledgeCenter.nameSanthali
                this.state.data[1].name = importantLinks.nameSanthali
                this.state.data[2].name = moneyManager.nameSanthali
                this.state.data[3].name = contact.nameSanthali
                this.state.data[4].name = message.nameSanthali
                this.state.data[5].name = generalSettings.nameSanthali
                // this.state.data[6].name = pension.nameSanthali
                // this.state.data[7].name = others.nameSanthali
            }
            
        } catch (error) {
            alert("Network Error! Data not saved. Please login again. ")
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "LanguageScreen" }]
            });
        }
        this.setState({ crops: specificObject.crops })
    }

    // changeLanguage = (id) => {
    //     //alert(id)
    //     AsyncStorage.setItem('language', id)
    //     LanguageChange.setLanguage(id)
    //     this.setState({ data: data })
    //     this.state.data[0].name = LanguageChange.knowledgeCenter
    //     this.state.data[1].name = LanguageChange.importantLinks
    //     this.state.data[2].name = LanguageChange.moneyManager
    //     this.state.data[3].name = LanguageChange.contact
    //     this.state.data[4].name = LanguageChange.message
    //     this.state.data[5].name = LanguageChange.generalSettings
    // }

    check = (data) => {
        if (data === this.state.data[5].name) {
            this.props.navigation.navigate({
                name: 'GeneralSettingsScreen'
            })
        } else if (data === this.state.data[0].name) {
            this.props.navigation.navigate({
                name: "KnowledgeCenterScreen"
            })
        } else if (data === this.state.data[1].name) {
            this.props.navigation.navigate({
                name: "ImportantLinksScreen"
            })
        } else if (data === this.state.data[3].name) {
            this.props.navigation.navigate({
                name: "ContactScreen"
            })
        } else if (data ===this.state.data[2].name) {
            this.props.navigation.navigate({
                name: "MoneyManagerScreen"
            })
        }
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
        } else if (data === 'hi') {
            this.setState({ textLanguageChange: '1' })
            AsyncStorage.setItem('language', 'hi')
            this.loadlabelsFromStorage()
        } else if (data === 'ho') {
            this.setState({ textLanguageChange: '2' })
            AsyncStorage.setItem('language', 'ho')
            this.loadlabelsFromStorage()
        } else if (data === 'od') {
            this.setState({ textLanguageChange: '3' })
            AsyncStorage.setItem('language', 'od')
            this.loadlabelsFromStorage()
        } else if (data === 'san') {
            AsyncStorage.setItem('language', 'san')
            this.setState({ textLanguageChange: '4' })
            this.loadlabelsFromStorage()
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
                        <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginLeft: widthToDp("5%") }}>{this.state.languages[0].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("3%") }}
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
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("3%") }}
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
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("3%") }}
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
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("3%") }}
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
                <View>
                    <FlatGrid
                        style={{ marginTop: heightToDp("2%"), marginBottom: heightToDp("60%") }}
                        bounces={true}
                        itemDimension={130}
                        data={this.state.data}
                        bouncesZoom={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.check(item.name)}>
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