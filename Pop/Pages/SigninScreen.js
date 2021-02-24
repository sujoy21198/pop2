import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Text, Toast } from 'native-base'
import { heightToDp, widthToDp } from '../Responsive'
import BaseColor from '../Core/BaseTheme'
import Logo from '../assets/Logo'
import Icon from 'react-native-vector-icons/AntDesign'
import FloatingLabel from 'react-native-floating-labels'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RBSheet from "react-native-raw-bottom-sheet"
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LanguageChange from '../Core/LanguageChange'
import DeviceInfo from 'react-native-device-info'

export default class SigninScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            username: '',
            password: '',
            isLoading: false,
            selectedLanguage: '',
            loadPhoneNumber: false
        }

        this.state.selectedLanguage = this.props.route.params.selectedLanguage
        //alert(this.state.languageCode)
    }

    componentDidMount() {
        this.getCustodianMobileNumber()
       
    }

    getCustodianMobileNumber = async () => {
        
        let deviceId = await DeviceInfo.getAndroidId()
        var load = true
        this.setState({ loadPhoneNumber: true })
        var phone
        await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.CustodianNumber + deviceId, {
        }).then(function (response) {
            load = false
            console.log(response.data.data.phone)
            phone = response.data.data.phone
        }).catch(function (error) {
            console.log(error)
        })

        if (load === false) {
            this.setState({ loadPhoneNumber: false })
        }
        this.setState({ phoneNumber: phone })

    }

    signIn = async () => {
        var load = true
        this.setState({ isLoading: true })
        var name = this.state.username
        var redirect = false


        if(this.state.username === ''){
            Toast.show({
                text: "please enter username",
                type: 'danger',
                duration: 3000
            })
        }else if(this.state.password === ''){
            Toast.show({
                text: "please enter password",
                type: 'danger',
                duration: 3000
            })
        }

        await axios.post(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.SignIn, {
            phone: this.state.phoneNumber,
            username: this.state.username,
            password: this.state.password
        }, {
            headers: {
                'Content-type': 'application/json'
            }
        }).then(function (response) {
            // console.log(response.data.data._id)
            // console.log(response.data.data.name)
            // console.log(response.data.data.token)
            // console.log(response.data.data.type)
            // console.log(response.data.data.username)
            if (response.data.status === 1) {
                console.log("yes")
                redirect = true
                Toast.show({
                    text: "Welcome" + " " + name,
                    type: 'success',
                    duration: 3000
                })
                AsyncStorage.setItem("_id", response.data.data._id)
                AsyncStorage.setItem("name", response.data.data.name)
                AsyncStorage.setItem("token", response.data.data.token)
                AsyncStorage.setItem("username", response.data.data.username)
            } else {
                load = false
                Toast.show({
                    text: response.data.msg,
                    type: 'danger',
                    duration: 3000
                })
            }

        }).catch(function (error) {
            load = false
            console.log(error)
        })

        if (load === false) {
            this.setState({ isLoading: false })
        }

        let _id = await AsyncStorage.getItem('_id')
        let reqname = await AsyncStorage.getItem('name')
        let token = await AsyncStorage.getItem('token')
        let username = await AsyncStorage.getItem('username')

        const userToBeSaved = {'_id': _id , 'name' : reqname, 'token':token, 'username':username , 'syncStatus':false, 'cropData' : [], 'livestockData':[], 'moneyManagerData':[] }
        const exsistingUser = await AsyncStorage.getItem('user')
        let newUser = JSON.parse(exsistingUser)
        if(!newUser){
            newUser = []
        }

        var valueArr = newUser.map(function(item){return item._id})
        if(valueArr.includes(_id)){
            console.log("NO")
        }else{
            newUser.push(userToBeSaved)
        }

        await AsyncStorage.setItem("user", JSON.stringify(newUser))
            .then(() => {
                console.log('‘It was saved successfully’')
            })
            .catch(() => {
                console.log('‘There was an error saving the product’')
            })

        if (redirect === true) {
            // this.props.navigation.navigate({
            //     name: 'DashBoardScreen'
            // })
            this.props.navigation.reset({
                index: 0,
                routes: [
                    { name: "DashBoardScreen" }
                ]
            });
        }
    }

    displayData = async() => {
        try {
            //var count = 8
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            console.log(JSON.stringify(parsed))
            // var valueArr = parsed.map(function(item){ return item.userId });
            // alert(valueArr)
            // var specificObject = parsed.find((i) => i.userId === count)
            // console.log(specificObject.userId)

            //console.log(specificObject.userId = count+1)
            // console.log(specificObject.userId = 6)
            //await AsyncStorage.setItem('products',JSON.stringify(parsed))


            //alert(parsed[0].item = "bitch")
            // await AsyncStorage.setItem('products',JSON.stringify(parsed))
            // console.log(JSON.stringify(parsed))
            //alert(JSON.stringify(parsed));
            // console.log(JSON.stringify(parsed))
        }
        catch (error) {
            alert(error)
        }
    }


    navigateToRegistration = () => {
        LanguageChange.setLanguage(this.state.selectedLanguage)
        this.props.navigation.navigate('RegistrationScreen')
        this.props.navigation.navigate({
            name: 'RegistrationScreen',
            params: { selectedLanguage: this.state.selectedLanguage }
        })
    }

    render() {
        return (
            <KeyboardAwareScrollView style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}
                keyboardShouldPersistTaps='handled'
            >
                <View >
                    <View style={{ marginTop: heightToDp("3%"), alignSelf: "center" }}>
                        <Logo />
                    </View>
                    <View style={{ marginTop: heightToDp("5%") }}>
                        <Text style={{ fontSize: widthToDp("7%"), alignSelf: 'center', fontFamily: 'Oswald-SemiBold' }}>{LanguageChange.signIn}</Text>
                    </View>
                    <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%") }}>
                    {
                        this.state.loadPhoneNumber ? <CustomIndicator IsLoading={this.state.loadPhoneNumber} /> : null
                    }
                        <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>{this.state.phoneNumber}</Text>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("2%") }}></View>
                    </View>
                    {/* <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("10%") }}>
                    <Text style={{ fontSize: widthToDp("5%") }}>CONTACT NUMBER</Text>
                </View>
                <View style={{ marginTop: heightToDp("1%"), marginLeft: widthToDp("10%") }}>
                    <Text style={{ fontSize: widthToDp("6%") }}>1234567890</Text>
                </View>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("80%"), alignSelf: 'center' }}></View> */}
                    <View style={{ marginTop: heightToDp("2%"), marginLeft: widthToDp("10%") }}>
                        <FloatingLabel
                            labelStyle={styles.labelInput}
                            inputStyle={styles.input}
                            style={styles.formInput}
                            // onBlur={this.onBlur}
                            onChangeText={(text) => { this.setState({ username: text }) }}
                        >{LanguageChange.username}</FloatingLabel>
                    </View>
                    {/* <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("80%"), alignSelf: 'center' }}></View> */}
                    <View style={{ marginTop: heightToDp("2%"), marginLeft: widthToDp("10%"), flexDirection: 'row' }}>
                        <FloatingLabel
                            labelStyle={styles.labelInput}
                            inputStyle={styles.input}
                            style={styles.formInput}
                            password={true}

                            onChangeText={(text) => { this.setState({ password: text }) }}
                        // onBlur={this.onBlur}
                        >{LanguageChange.password}</FloatingLabel>
                    </View>
                    {/* <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("80%"), alignSelf: 'center' }}></View> */}
                    <View style={{ marginLeft: widthToDp("60.5%"), marginTop: heightToDp("0.5%") }}>
                        <Text style={{ fontFamily: 'Oswald-Medium' }}>{LanguageChange.forgotPassword}</Text>
                    </View>
                    {
                        this.state.isLoading ? <CustomIndicator IsLoading={this.state.isLoading} /> : null
                    }

                    <TouchableOpacity onPress={() => this.signIn()}>
                        <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("5%"), width: widthToDp("37%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
                            <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.5%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{LanguageChange.signIn}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: heightToDp('1.5%') }}>
                        <Text style={{ fontFamily: 'Oswald-Medium' }}>{LanguageChange.noAccount}</Text>
                        <TouchableOpacity onPress={() => this.navigateToRegistration()}>
                            <Text style={{ color: BaseColor.Red, fontFamily: 'Oswald-Medium' }}> {LanguageChange.pleaseSignUp}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ borderBottomColor: BaseColor.Stroke, borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("100%") }}></View>

                    <TouchableOpacity onPress={() => this.displayData()}>
                        <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("3%"), width: widthToDp("37%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
                            <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.4%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{LanguageChange.guestSignIn}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    labelInput: {
        color: '#000',
        fontSize: widthToDp("4.6%"),
        fontFamily: 'Oswald-Medium'
    },
    formInput: {
        borderBottomWidth: 1.5,
        borderColor: '#333',
        width: widthToDp("80%")
    },
    input: {
        borderWidth: 0,
        height: heightToDp("6%"),
        fontSize: widthToDp("5%"),
        fontFamily: 'Oswald-Light'
    }
});