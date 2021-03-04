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
import NetInfo from '@react-native-community/netinfo'
import base64 from 'react-native-base64'


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
        this.setCustodianNumber()
        //this.getAllData()
    }


    getAllData = async() => {
        var allusername = await AsyncStorage.getItem('username')
        var token = await AsyncStorage.getItem('token')
        var encodedUsername = base64.encode(this.state.username)
        var cropObjectsToBeSaved,cropStepsObjectsToBeSaved,cropsMaterialsObjectsToBeSaved,livestockObjectsToBeSaved,liveStockStepMaterialsObjectsToBeSaved,liveStockBreedsObjectsToBeSaved,breedCategoriesObjectsToBeSaved,importantLinksObjectsToBeSaved;
        await axios.get("http://161.35.122.165:3021/api/v1/get-all-data",{
            headers:{
                'Content-type': "application/json",
                'X-Information': encodedUsername,
                'Authorization': "POP " + token
            }
        }).then(function(response){
            console.log(response.data,"CROPS NAMES")
            var crops = response.data.crops
            //var cropObjects = crops.substring(1,crops.length-1)
            cropObjectsToBeSaved = crops
            var cropSteps = response.data.cropSteps
            cropStepsObjectsToBeSaved = cropSteps
            var cropsMaterials = response.data.cropsMaterials
            //var cropsMaterialsObjects = cropsMaterials.substring(1,cropsMaterials.length-1)
            cropsMaterialsObjectsToBeSaved = cropsMaterials
            var livestock = response.data.livestock
            //var livestockObjects = livestock.substring(1,livestock.length-1)
            livestockObjectsToBeSaved = livestock
            var liveStockStepMaterials = response.data.liveStockStepMaterials
            //var liveStockStepMaterialsObjects = liveStockStepMaterials.substring(1,liveStockStepMaterials.length-1)
            liveStockStepMaterialsObjectsToBeSaved = liveStockStepMaterials
            var liveStockBreeds = response.data.liveStockBreeds
            //var liveStockBreedsObjects = liveStockBreeds.substring(1,liveStockBreeds.length-1)
            liveStockBreedsObjectsToBeSaved = liveStockBreeds
            var breedCategories = response.data.breedCategories
            //var breedCategoriesObjects = breedCategories.substring(1,breedCategories.length-1)
            breedCategoriesObjectsToBeSaved = breedCategories
            var importantLinks = response.data.importantLinks
            //var importantLinksObjects = importantLinks.substring(1,importantLinks.length-1)
            importantLinksObjectsToBeSaved = importantLinks
            //console.log(importantLinksObjectsToBeSaved)
        }).catch(function(error){
            console.log(error)
        })

        const offlineDataToBeSaved = {'username': this.state.username , 'crops':cropObjectsToBeSaved ,'cropSteps':cropStepsObjectsToBeSaved,'cropsMaterials':cropsMaterialsObjectsToBeSaved,'livestock':livestockObjectsToBeSaved , 'liveStockStepMaterials':liveStockStepMaterialsObjectsToBeSaved , 'liveStockBreeds':liveStockBreedsObjectsToBeSaved , 'breedCategories':breedCategoriesObjectsToBeSaved , 'importantLinks':importantLinksObjectsToBeSaved }
        // offlineDataToBeSaved.crops.push(cropObjectsToBeSaved)
        // offlineDataToBeSaved.cropsMaterials.push(cropsMaterialsObjectsToBeSaved)
        // offlineDataToBeSaved.livestock.push(livestockObjectsToBeSaved)
        // offlineDataToBeSaved.liveStockStepMaterials.push(liveStockStepMaterialsObjectsToBeSaved)
        // offlineDataToBeSaved.liveStockBreeds.push(liveStockBreedsObjectsToBeSaved)
        // offlineDataToBeSaved.breedCategories.push(breedCategoriesObjectsToBeSaved)
        // offlineDataToBeSaved.importantLinks.push(importantLinksObjectsToBeSaved)

        const exsistingOfflineData = await AsyncStorage.getItem('offlineData')
        let newOfflineData = JSON.parse(exsistingOfflineData)
        if(!newOfflineData){
            newOfflineData = []
        }

        var offlineArr = newOfflineData.map(function(item){return item.username})
        if(offlineArr.includes(this.state.username)){
            console.log("NO")
        }else{
            newOfflineData.push(offlineDataToBeSaved)
        }


        await AsyncStorage.setItem("offlineData", JSON.stringify(newOfflineData))
            .then(() => {
                alert('‘Offline Data saved successfully’')
            })
            .catch(() => {
                console.log('‘There was an error saving the product’')
            })

    }

    setCustodianNumber  =  async() => {
        let cus = await AsyncStorage.getItem("cus")
        this.setState({ loadPhoneNumber: false })
        this.setState({phoneNumber: cus})
    }

    checkConnection = () => {
        NetInfo.fetch().then(state => {
            var isConnected = state.isConnected
            console.log(isConnected)
            if(isConnected === true){
                return this.signIn()
            }else{
                return this.offlineMode()
            }
        })
    }

    offlineMode = async() => {
        // let user = await AsyncStorage.getItem('user')
        // let parsed = JSON.stringify(user)
        // console.log(JSON.stringify(parsed))
        // var specificObject = parsed.find((i) => i.username === this.state.username)
        // console.log(specificObject.username)
        try {
            //var count = 8
            var offlinePassword
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            console.log(JSON.stringify(parsed))
            var specificObject = parsed.find((i) => i.username === this.state.username)
            console.log(specificObject.password)
            offlinePassword = specificObject.password
            if(offlinePassword === this.state.password){
                this.props.navigation.reset({
                    index: 0,
                    routes: [
                        { name: "DashBoardScreen" }
                    ]
                });
            }else{
                alert("please enter a valid password")
            }
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

    getCustodianMobileNumber = async () => {
        
        let deviceId = await DeviceInfo.getAndroidId()
        //var load = true
        //this.setState({ loadPhoneNumber: true })
        var phone
        await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.CustodianNumber + deviceId, {
        }).then(function (response) {
            //load = false
            console.log(response.data.data.phone)
            phone = response.data.data.phone
            AsyncStorage.setItem("cus",JSON.stringify(response.data.data.phone))
        }).catch(function (error) {
            console.log(error)
        })

        // if (load === false) {
        //     this.setState({ loadPhoneNumber: false })
        // }
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

        const userToBeSaved = {'_id': _id , 'name' : reqname,'password': this.state.password, 'token':token, 'username':username , 'syncStatus':false, 'patch':[], 'cropData' : [], 'livestockData':[], 'moneyManagerData':[] }
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

        this.getAllData()
    }

    displayData = async() => {
        try {
            //var count = 8
            let user = await AsyncStorage.getItem('offlineData');
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

                    <TouchableOpacity onPress={() => this.checkConnection()}>
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