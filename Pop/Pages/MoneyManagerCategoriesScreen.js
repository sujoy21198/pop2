import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import tts from 'react-native-tts'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import AsyncStorage from '@react-native-async-storage/async-storage'


const data = [
    { name: 'AGRICULTURE', code: 'https://spontaneousorder.in/wp-content/uploads/2020/02/Swatantra.jpg' },
    { name: 'LIVESTOCK', code: 'https://d3hnfqimznafg0.cloudfront.net/images/Article_Images/ImageForArticle_838(1).jpg' },
    { name: 'SMALL BUSINESS', code: 'https://www.sba.gov/build/71bd57d80e04f91d53641835ce6d7acc.png' },
    { name: 'HEALTH', code: 'https://images.hu-production.be/static/img/home/homepageicons-03.png' },
    { name: 'EDUCATION', code: 'https://prod-discovery.edx-cdn.org/media/course/image/ee4f4f12-e6ec-45ac-94df-b90b4b022903-aaf6257f767b.jpeg' },
    { name: 'LOAN SAVINGS', code: 'https://cdn.corporatefinanceinstitute.com/assets/Loans-1.jpeg' },
    { name: 'PENSION', code: 'https://img.theweek.in/content/dam/week/news/biz-tech/images/2019/2/1/pension-plan.jpg' },
    { name: 'OTHERS', code: 'https://logos.flamingtext.com/Word-Logos/others-design-sketch-name.png' },
]

export default class MoneyManagerCategoriesScreen extends Component {


    constructor(props) {
        super(props)
        this.state = {
            data: [],
            languages: [],
            type:'',
            textLanguageChange:''
        }

        this.state.languages = Languages
        this.state.data = data
        this.state.type = this.props.route.params.type
        //alert(this.state.type)
    }
    componentDidMount(){
        this.loadlabelsFromStorage()
        this.setLanguageOnMount()
    }

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            var agriculture = specificObject.labels.find((i) => i.type === 47)
            var livestock = specificObject.labels.find((i) => i.type === 29)
            var smallBusiness = specificObject.labels.find((i) => i.type === 30)
            var health = specificObject.labels.find((i) => i.type === 33)
            var education = specificObject.labels.find((i) => i.type === 49)
            var loanSavings = specificObject.labels.find((i) => i.type === 50)
            var pension = specificObject.labels.find((i) => i.type === 51)
            var others = specificObject.labels.find((i) => i.type === 52)
            if (this.state.textLanguageChange === '0') {
                this.state.data[0].name = agriculture.nameEnglish
                this.state.data[1].name = livestock.nameEnglish
                this.state.data[2].name = smallBusiness.nameEnglish
                this.state.data[3].name = health.nameEnglish
                this.state.data[4].name = education.nameEnglish
                this.state.data[5].name = loanSavings.nameEnglish
                this.state.data[6].name = pension.nameEnglish
                this.state.data[7].name = others.nameEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.state.data[0].name = agriculture.nameHindi
                this.state.data[1].name = livestock.nameHindi
                this.state.data[2].name = smallBusiness.nameHindi
                this.state.data[3].name = health.nameHindi
                this.state.data[4].name = education.nameHindi
                this.state.data[5].name = loanSavings.nameHindi
                this.state.data[6].name = pension.nameHindi
                this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                this.state.data[0].name = agriculture.nameHo
                this.state.data[1].name = livestock.nameHo
                this.state.data[2].name = smallBusiness.nameHo
                this.state.data[3].name = health.nameHo
                this.state.data[4].name = education.nameHo
                this.state.data[5].name = loanSavings.nameHo
                this.state.data[6].name = pension.nameHo
                this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                this.state.data[0].name = agriculture.nameOdia
                this.state.data[1].name = livestock.nameOdia
                this.state.data[2].name = smallBusiness.nameOdia
                this.state.data[3].name = health.nameOdia
                this.state.data[4].name = education.nameOdia
                this.state.data[5].name = loanSavings.nameOdia
                this.state.data[6].name = pension.nameOdia
                this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                this.state.data[0].name = agriculture.nameSanthali
                this.state.data[1].name = livestock.nameSanthali
                this.state.data[2].name = smallBusiness.nameSanthali
                this.state.data[3].name = health.nameSanthali
                this.state.data[4].name = education.nameSanthali
                this.state.data[5].name = loanSavings.nameSanthali
                this.state.data[6].name = pension.nameSanthali
                this.state.data[7].name = others.nameSanthali
            }
            
        } catch (error) {
            alert(error)
        }
        this.setState({ crops: specificObject.crops })
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
            AsyncStorage.setItem('language', 'hi')
            this.loadlabelsFromStorage()
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'ho') {
            this.setState({ textLanguageChange: '2' })
            AsyncStorage.setItem('language', 'ho')
            this.loadlabelsFromStorage()
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'od') {
            this.setState({ textLanguageChange: '3' })
            AsyncStorage.setItem('language', 'od')
            this.loadlabelsFromStorage()
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

    


    selectLandType = (data) => {
        if (data === this.state.data[0].name) {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: this.state.data[0].name , type : this.state.type}
            })
        } else if (data === this.state.data[1].name) {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: this.state.data[1].name , type : this.state.type}
            })
        } else if (data === this.state.data[2].name) {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: this.state.data[2].name, type : this.state.type }
            })
        } else if (data === this.state.data[3].name) {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: this.state.data[3].name , type : this.state.type}
            })
        }else if (data === this.state.data[4].name) {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: this.state.data[4].name , type : this.state.type}
            })
        }else if (data === this.state.data[5].name) {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: this.state.data[5].name , type : this.state.type}
            })
        }else if (data === this.state.data[6].name) {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category:this.state.data[6].name, type : this.state.type }
            })
        }else if (data === this.state.data[7].name) {
            this.props.navigation.navigate({
                name: 'IncomeScreen',
                params: { category: this.state.data[7].name, type : this.state.type }
            })
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
                <View>

                    <FlatGrid
                        style={{ marginTop: heightToDp("2%"), marginBottom: heightToDp("60%") }}
                        bounces={true}
                        itemDimension={130}
                        data={data}
                        bouncesZoom={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.selectLandType(item.name)}>
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