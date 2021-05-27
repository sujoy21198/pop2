import React, { Component } from 'react'
import { View, Button, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BaseColor from '../Core/BaseTheme'
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { widthToDp, heightToDp } from '../Responsive'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Sync from 'react-native-vector-icons/AntDesign'
import Database from 'react-native-vector-icons/FontAwesome'
import NetInfo from '@react-native-community/netinfo'
import axios from 'axios'
import base64 from 'react-native-base64'
import HeaderComponent from '../components/HeaderComponent'
import { ScrollView } from 'react-native'
import Languages from '../Core/Languages'


export default class GeneralSettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isGuest: "",
            refreshLabel: "",
            patch:[],
            moneyManagerData:[],
            costBenifitAnalysis:[],
            patchData : [],
            languages:[],
            textLanguageChange : '',
            dataSyncLabel: ''
        };
        this.state.languages = Languages;
    }

    go = async () => {
        await AsyncStorage.removeItem('_id')
        if(await AsyncStorage.getItem("isGuest") !== null) {
            await AsyncStorage.removeItem("isGuest");
        }
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "LanguageScreen" }]
        });
    }
    refreshApplication = async () => {
        await AsyncStorage.removeItem('offlineData')
        await AsyncStorage.removeItem('cropData')
        await AsyncStorage.removeItem('numberOfCrops')
        await AsyncStorage.removeItem('labelsData')
        await AsyncStorage.removeItem('smallBusiness')
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "LanguageScreen" }]
        });
    }
    componentDidMount = async() => {
        let isGuest = await AsyncStorage.getItem("isGuest");
        this.setState({isGuest});
        this.setLanguageOnMount();
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


    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var refreshLabel = specificObject.labels.find((i) => i.type === 220)
            var updateProfileLabel = specificObject.labels.find((i) => i.type === 230)
            var versionLabel = specificObject.labels.find((i) => i.type === 231)
            var dataSyncLabel = specificObject.labels.find((i) => i.type === 262)
            if (this.state.textLanguageChange === '0') {
                this.setState({ refreshLabel: refreshLabel.nameEnglish })
                this.setState({ updateProfileLabel: updateProfileLabel.nameEnglish })
                this.setState({ versionLabel: versionLabel.nameEnglish })
                this.setState({ dataSyncLabel: dataSyncLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({ refreshLabel: refreshLabel.nameHindi })
                this.setState({ updateProfileLabel: updateProfileLabel.nameHindi })
                this.setState({ versionLabel: versionLabel.nameHindi })
                this.setState({ dataSyncLabel: dataSyncLabel.nameHindi })
            } else if (this.state.textLanguageChange === '2') {
                this.setState({ refreshLabel: refreshLabel.nameHo })
                this.setState({ updateProfileLabel: updateProfileLabel.nameHo })
                this.setState({ versionLabel: versionLabel.nameHo })
                this.setState({ dataSyncLabel: dataSyncLabel.nameHo })
            } else if (this.state.textLanguageChange === '3') {
                this.setState({ refreshLabel: refreshLabel.nameOdia })
                this.setState({ updateProfileLabel: updateProfileLabel.nameOdia })
                this.setState({ versionLabel: versionLabel.nameOdia })
                this.setState({ dataSyncLabel: dataSyncLabel.nameOdia })
            } else if (this.state.textLanguageChange === '4') {
                this.setState({ refreshLabel: refreshLabel.nameSanthali })
                this.setState({ updateProfileLabel: updateProfileLabel.nameSanthali })
                this.setState({ versionLabel: versionLabel.nameSanthali })
                this.setState({ dataSyncLabel: dataSyncLabel.nameSanthali })
            }
        } catch (error) {
            alert(error)
        }
        //this.setState({ crops: specificObject.crops })
        //this.showData()
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


    dataSync  = async() => {
        NetInfo.fetch().then(state => {
            var isConnected = state.isConnected
            if (isConnected === true) {
                return this.getOldData()
            }else{
                return alert("Please connect to internet")
            }
        })
    }


    getOldData = async() => {
        let userId = await AsyncStorage.getItem('_id')
        var username = await AsyncStorage.getItem('username')
        var token = await AsyncStorage.getItem('token')
        var encodedUsername = base64.encode(username)
        var patch = []
        var moneyManagerData= []
        var costBenifitAnalysis = []
        var patchData = []
        await axios.get('https://tupop.in/api/v1//synced-data?info='+userId , {
            headers:{
                'Content-type': "accept",
                'X-Information': encodedUsername,
                'Authorization': "POP " + token
            }
        }).then(function (response){
            var parsed = response.data.syncedData.userData
            var specificObject = parsed.find((i) => i.username === username)
            patch = specificObject.patch
            moneyManagerData = specificObject.moneyManagerData
            costBenifitAnalysis = specificObject.costBenifitAnalysis
            patchData = specificObject.patchData
            console.log(specificObject.patchData)
        }).catch(function (error){
            console.log(error)
        })

        this.state.patch = patch
        this.state.moneyManagerData = moneyManagerData
        this.state.costBenifitAnalysis = costBenifitAnalysis
        this.state.patchData = patchData
        this.setOldData()
    }


    setOldData = async() => {
        try{
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            specificObject.patch = this.state.patch
            specificObject.moneyManagerData = this.state.moneyManagerData
            specificObject.costBenifitAnalysis = this.state.costBenifitAnalysis
            specificObject.patchData = this.state.patchData
            await AsyncStorage.setItem('user', JSON.stringify(parsed))
            console.log(specificObject.patch)
            alert("data synced")
        }catch(error){
            console.log(error)
        }
    }



    render() {
        return (
            <View style={{ 
                backgroundColor: BaseColor.BackgroundColor,   
                flex: 1              
            }}>     
                <HeaderComponent 
                    navigation={this.props.navigation}
                />
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
                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%"), alignSelf: 'center' }}>
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
                <ScrollView
                    style={{
                        paddingHorizontal: widthToDp("15%"),
                        paddingVertical: heightToDp("2%")
                    }}
                >
                    {
                        this.state.isGuest !== "true" &&
                        <TouchableOpacity 
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: heightToDp("5%"),
                                paddingHorizontal: heightToDp("3%"),
                                paddingVertical: heightToDp("2%"),
                                borderWidth: 1,
                                borderRadius: 10,
                                borderColor: BaseColor.SecondaryColor,
                                borderRadius: 40,
                                backgroundColor: BaseColor.SecondaryColor,
                                width: widthToDp("70%")
                            }}
                            onPress={() => this.props.navigation.navigate("EditProfile")}
                        >
                            <Ionicons
                                name={Platform.OS==="android" ? 'md-create-outline' : 'ios-create-outline'}
                                size={40}
                            />
                            <Text style={{
                                fontWeight: '500', 
                                fontSize: widthToDp("7%"), 
                                fontFamily: 'Oswald-Medium',
                                marginLeft: widthToDp("4%")
                            }}>{this.state.updateProfileLabel}</Text>
                        </TouchableOpacity>
                    }           
                    <TouchableOpacity 
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: heightToDp("5%"),
                            paddingHorizontal: heightToDp("5%"),
                            paddingVertical: heightToDp("2%"),
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: BaseColor.SecondaryColor,
                            borderRadius: 40,
                            backgroundColor: BaseColor.SecondaryColor,
                            width: widthToDp("70%")
                        }}
                        onPress={() => this.refreshApplication()}
                    >      
                        <Sync
                            name="sync"
                            size={30}
                            onPress={() => {}}
                        />
                        <Text style={{
                            fontWeight: '500', 
                            fontSize: widthToDp("7%"), 
                            fontFamily: 'Oswald-Medium',
                            marginLeft: widthToDp("4%")
                        }}>{this.state.refreshLabel}</Text>
                    </TouchableOpacity>
                    
                    {
                        this.state.isGuest !== "true" &&
                        <TouchableOpacity 
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: heightToDp("5%"),
                                paddingHorizontal: heightToDp("6%"),
                                paddingVertical: heightToDp("2%"),
                                borderWidth: 1,
                                borderRadius: 10,
                                borderColor: BaseColor.SecondaryColor,
                                borderRadius: 40,
                                backgroundColor: BaseColor.SecondaryColor,
                                width: widthToDp("70%")
                            }}
                            onPress={() => this.dataSync()}
                        >
                            <Database
                                name="database"
                                size={30}
                                onPress={() => {}}
                            />
                            <Text style={{
                                fontWeight: '500', 
                                fontSize: widthToDp("7%"), 
                                fontFamily: 'Oswald-Medium',
                                marginLeft: widthToDp("4%")
                            }}>{this.state.dataSyncLabel}</Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignSelf: 'center',
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: BaseColor.SecondaryColor,
                            borderRadius: 40,
                            backgroundColor: BaseColor.SecondaryColor,
                            padding: heightToDp("2%"),
                            width: widthToDp("20%")
                        }}
                        onPress={() => this.go()}
                    >
                        <Icon
                            name="logout"
                            size={40}
                        />
                    </TouchableOpacity>
                    
                </ScrollView>
                

                <Text style={{
                    position: 'absolute',
                    backgroundColor: '#fff',
                    bottom: 0,
                    width: '100%',
                    textAlign: 'center',
                    fontSize: widthToDp("4%"),
                    paddingVertical: heightToDp("0.8%"),
                    fontWeight: 'bold'
                }}>{this.state.versionLabel} - 1.0</Text>
            </View>
        );
    }
}