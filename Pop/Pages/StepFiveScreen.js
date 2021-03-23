import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Text, Input } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64'
import CustomIndicator from '../Core/CustomIndicator'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'


export default class StepOneScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            cropName: '',
            stepData: [],
            materialName: '',
            decimalPrice: '',
            isLoading: false,
            imageFile: '',
            materialPrice: '',
            numberOfSteps: '',
            pageNumber: '05',
            patchName: '',
            landType: '',
            farmingAreaInDecimal: '',
            costOfCultivatinPerTenDecimal: '',
            costPerKg: '',
            productionInKg: '',
            cost: '',
            netProfit: '',
            materialQuantity: '',
            languages: [],
            textLanguageChange: '',
            cropNameLanguageChangeArray: [],
            descriptionLabel:'',
            backButtonText:'',
            saveButtonText:'',
            nextButtonText:'',
            selectedItemLabel:'',
            material:'',
            quantityLabel:'',
            amountLabel:'',
            englishDescription: '',
            hindiDescription: '',
            hoDescription: '',
            santhaliDescription: '',
            odiaDescription: '',
            englishTitleDescription: '',
            hindiTitleDescription: '',
            hoTitleDescription: '',
            santhaliTitleDescription: '',
            odiaTitleDescription: '',
            stepImage: '',
            multipleMaterials: []
        }
        this.state.languages = Languages
        this.state._id = this.props.route.params._id
        this.state.cropName = this.props.route.params.cropName
        this.state.imageFile = this.props.route.params.imageFile
        this.state.patchName = this.props.route.params.patchName
        this.state.landType = this.props.route.params.landType
        this.state.farmingAreaInDecimal = this.props.route.params.farmingAreaInDecimal
        this.state.costOfCultivatinPerTenDecimal = this.props.route.params.costOfCultivatinPerTenDecimal
        this.state.costPerKg = this.props.route.params.costPerKg
        this.state.productionInKg = this.props.route.params.productionInKg
        this.state.cost = this.props.route.params.cost
        this.state.netProfit = this.props.route.params.netProfit
    }

    componentDidMount() {
        //this.getStepData()
        this.getOnlSteps()
        this.setLanguageOnMount()
        this.loadlabelsFromStorage()
    }

    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            var descriptionLabel = specificObject.labels.find((i) => i.type === 68)
            var backButtonText = specificObject.labels.find((i) => i.type === 64)
            var saveButtonText = specificObject.labels.find((i) => i.type === 63)
            var nextButtonText = specificObject.labels.find((i) => i.type === 62)
            var selectedItemLabel = specificObject.labels.find((i) => i.type === 76)
            var material = specificObject.labels.find((i) => i.type === 77)
            var quantityLabel = specificObject.labels.find((i) => i.type === 79)
            var amountLabel = specificObject.labels.find((i) => i.type === 69)
            // var message = specificObject.labels.find((i) => i.type === 26)
            // var generalSettings = specificObject.labels.find((i) => i.type === 27)
            // var pension = specificObject.labels.find((i) => i.type === 51)
            // var others = specificObject.labels.find((i) => i.type === 52)
            if (this.state.textLanguageChange === '0') {
                this.setState({descriptionLabel : descriptionLabel.nameEnglish})
                this.setState({backButtonText : backButtonText.nameEnglish})
                this.setState({saveButtonText : saveButtonText.nameEnglish})
                this.setState({nextButtonText : nextButtonText.nameEnglish})
                this.setState({selectedItemLabel : selectedItemLabel.nameEnglish})
                this.setState({material : material.nameEnglish})
                this.setState({quantityLabel : quantityLabel.nameEnglish})
                this.setState({amountLabel : amountLabel.nameEnglish})
                // this.state.data[4].name = message.nameEnglish
                // this.state.data[5].name = generalSettings.nameEnglish
                // this.state.data[6].name = pension.nameEnglish
                // this.state.data[7].name = others.nameEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({descriptionLabel : descriptionLabel.nameHindi})
                this.setState({backButtonText : backButtonText.nameHindi})
                this.setState({saveButtonText : saveButtonText.nameHindi})
                this.setState({nextButtonText : nextButtonText.nameHindi})
                this.setState({selectedItemLabel : selectedItemLabel.nameHindi})
                this.setState({material : material.nameHindi})
                this.setState({quantityLabel : quantityLabel.nameHindi})
                this.setState({amountLabel : amountLabel.nameHindi})
                // this.state.data[4].name = message.nameHindi
                // this.state.data[5].name = generalSettings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                this.setState({descriptionLabel : descriptionLabel.nameHo})
                this.setState({backButtonText : backButtonText.nameHo})
                this.setState({saveButtonText : saveButtonText.nameHo})
                this.setState({nextButtonText : nextButtonText.nameHo})
                this.setState({selectedItemLabel : selectedItemLabel.nameHo})
                this.setState({material : material.nameHo})
                this.setState({quantityLabel : quantityLabel.nameHo})
                this.setState({amountLabel : amountLabel.nameHo})
                // this.state.data[4].name = message.nameHindi
                // this.state.data[4].name = message.nameHo
                // this.state.data[5].name = generalSettings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                this.setState({descriptionLabel : descriptionLabel.nameOdia})
                this.setState({backButtonText : backButtonText.nameOdia})
                this.setState({saveButtonText : saveButtonText.nameOdia})
                this.setState({nextButtonText : nextButtonText.nameOdia})
                this.setState({selectedItemLabel : selectedItemLabel.nameOdia})
                this.setState({material : material.nameOdia})
                this.setState({quantityLabel : quantityLabel.nameOdia})
                this.setState({amountLabel : amountLabel.nameOdia})
                // this.state.data[4].name = message.nameOdia
                // this.state.data[5].name = generalSettings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                this.setState({descriptionLabel : descriptionLabel.nameSanthali})
                this.setState({backButtonText : backButtonText.nameSanthali})
                this.setState({saveButtonText : saveButtonText.nameSanthali})
                this.setState({nextButtonText : nextButtonText.nameSanthali})
                this.setState({selectedItemLabel : selectedItemLabel.nameSanthali})
                this.setState({material : material.nameSanthali})
                this.setState({quantityLabel : quantityLabel.nameSanthali})
                this.setState({amountLabel : amountLabel.nameSanthali})
                // this.state.data[4].name = message.nameSanthali
                // this.state.data[5].name = generalSettings.nameSanthali
                // this.state.data[6].name = pension.nameSanthali
                // this.state.data[7].name = others.nameSanthali
            }
            console.log(this.state.highLand)
            console.log(this.state.mediumLand)
            console.log(this.state.lowLand)
        } catch (error) {
            alert(error)
        }
        this.setState({ crops: specificObject.crops })
        this.showData()
    }

    setMaterialPrice = async (data) => {
        AsyncStorage.setItem("stepFive", data)

        let stepFivePrice = await AsyncStorage.getItem('stepFive')
        //console.log(stepOnePrice)
        this.setState({ materialPrice: stepFivePrice })
    }

    setStepDataIntoPatch = async () => {
        try {
            //const patchObject = { 'cropId': this.state._id , 'patchName': this.state.patchName , 'landType': this.state.landType , 'step1' : '' , 'step2':'' , 'step3':'' , 'step4':'' , 'step5':'' , 'step6' : '' , 'step7':'' , 'step8': ''}
            let username = await AsyncStorage.getItem('username')
            let stepFivePrice = await AsyncStorage.getItem('stepFive')
            let user = await AsyncStorage.getItem('user')
            let parsed = JSON.parse(user)
            var sepcific = parsed.find((i) => i.username === username)
            var patchFind = sepcific.patch.find((i) => i.patchName === this.state.patchName)
            patchFind.step5 = stepFivePrice
            await AsyncStorage.setItem('user', JSON.stringify(parsed))

            console.log(patchFind)
        } catch (error) {
            console.log(error)
        }

        if (this.state.materialPrice === '') {
            alert("Please enter the amount in the material section")
        } else {
            this.props.navigation.navigate({
                name: 'ActualCultivationCostScreen',
                params: {
                    cropName: this.state.cropName,
                    _id: this.state._id,
                    imageFile: this.state.imageFile,
                    patchName: this.state.patchName,
                    landType: this.state.landType,
                    farmingAreaInDecimal: this.state.farmingAreaInDecimal,
                    costOfCultivatinPerTenDecimal: this.state.costOfCultivatinPerTenDecimal,
                    costPerKg: this.state.costPerKg,
                    productionInKg: this.state.productionInKg,
                    cost: this.state.cost,
                    netProfit: this.state.netProfit
                }
            })
        }
    }

    getOnlSteps = async () => {
        try {
            var cropNameLanguageChangeArray = []
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specific = parsed.find((i) => i.username === username)
            var cropFilter = specific.cropSteps.filter((i) => i.cropId === this.state._id)
            cropNameLanguageChangeArray = cropFilter[4].cropData
            this.setState({ englishDescription: cropFilter[4].english })
            this.setState({ hindiDescription: cropFilter[4].hindi })
            this.setState({ hoDescription: cropFilter[4].ho })
            this.setState({ odiaDescription: cropFilter[4].odia })
            this.setState({ santhaliDescription: cropFilter[4].santhali })
            this.setState({ englishTitleDescription: cropFilter[4].nameEnglish })
            this.setState({ hindiTitleDescription: cropFilter[4].nameHindi })
            this.setState({ hoTitleDescription: cropFilter[4].nameHo })
            this.setState({ odiaTitleDescription: cropFilter[4].nameOdia })
            this.setState({ santhaliTitleDescription: cropFilter[4].nameSanthali })
            this.setState({ stepImage: cropFilter[4].imageFile })
            this.setState({ cropNameLanguageChangeArray: cropNameLanguageChangeArray })
            this.getStepDataFromLocal(cropFilter[1]._id)
            // console.log(cropFilter[3].ho,"BICHI")
        } catch (error) {
            console.log(error)
        }
    }


    getStepDataFromLocal = async (id) => {
        try {
            var multipleMaterials = []
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specific = parsed.find((i) => i.username === username)
            var cropFilter = specific.cropsMaterials.filter((i) => i.cropId === this.state._id)
            var stepwiseMaterials = cropFilter.filter((i) => i.stepId === id)
            console.log(stepwiseMaterials, "SUJOY SAHA")
            multipleMaterials = stepwiseMaterials
            this.setState({ multipleMaterials: stepwiseMaterials })
            // // console.log("HI HELLO TATA", specific.cropSteps)
            // stepData = cropFilter[0].stepData
            // decimalPrice = cropFilter[0].decimalPrice
            // //materialName = cropFilter[0].materialNameEnglish
            // materialQuantity = cropFilter[0].qty
            // if (this.state.textLanguageChange === '0') {
            //     this.setState({ materialName: cropFilter[0].materialNameEnglish })

            // } else if (this.state.textLanguageChange === '1') {
            //     this.setState({ materialName: cropFilter[0].materialNameHindi })

            // } else if (this.state.textLanguageChange === '2') {
            //     this.setState({ materialName: cropFilter[0].materialNameHo })

            // } else if (this.state.textLanguageChange === '3') {
            //     this.setState({ materialName: cropFilter[0].materialNameOdia })

            // } else if (this.state.textLanguageChange === '4') {
            //     this.setState({ materialName: cropFilter[0].materialNameSanthali })

            // }
            // //console.log(cropFilter, "hihihihihihihihihihihih")
            // this.setState({ stepData: stepData })
            // //this.setState({ materialName: materialName })
            // this.setState({ decimalPrice: decimalPrice })
            // this.setState({ numberOfSteps: cropFilter.length })
            // this.setState({ materialQuantity: materialQuantity })

        } catch (error) {
            //alert("No More Steps Available")
            this.props.navigation.navigate({
                name: 'ActualCultivationCostScreen',
                params: {
                    cropName: this.state.cropName,
                    _id: this.state._id,
                    imageFile: this.state.imageFile,
                    patchName: this.state.patchName,
                    landType: this.state.landType,
                    farmingAreaInDecimal: this.state.farmingAreaInDecimal,
                    costOfCultivatinPerTenDecimal: this.state.costOfCultivatinPerTenDecimal,
                    costPerKg: this.state.costPerKg,
                    productionInKg: this.state.productionInKg,
                    cost: this.state.cost,
                    netProfit: this.state.netProfit
                }
            })
        }
    }

    getStepData = async () => {
        this.setState({ isLoading: true })
        var load = true
        var username = await AsyncStorage.getItem('username')
        var token = await AsyncStorage.getItem('token')
        var encodedUsername = base64.encode(username)
        var stepData = []
        var decimalPrice, materialName

        await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl + 'crop/steps/materials/' + this.state._id + '/' + '4', {
            headers: {
                'Content-type': "accept",
                'X-Information': encodedUsername,
                'Authorization': "POP " + token
            }
        }).then(function (response) {
            //console.log(response.data.data.stepData)
            stepData = response.data.data.stepData
            materialName = response.data.data.materialName
            decimalPrice = response.data.data.decimalPrice
            if (response.data.status === 1) {
                load = false
            }
            //console.log("coming from array"+ JSON.stringify(stepData))
        }).catch(function (error) {
            console.log(error)
        })

        this.setState({ stepData: stepData })
        this.setState({ materialName: materialName })
        this.setState({ decimalPrice: decimalPrice })
        if (load === false) {
            this.setState({ isLoading: false })
        }

        //console.log("Coming from state" + JSON.stringify(this.state.stepData))
    }

    stepSixScreen = () => {
        // if(this.state.materialPrice === ''){
        //     alert("please enter a value")
        // }else{
        //     this.props.navigation.navigate({
        //         name: 'StepSixScreen',
        //         params: {
        //             cropName: this.state.cropName,
        //             _id: this.state._id
        //         }
        //     })
        // }

        if (this.state.materialPrice === '') {
            alert("please enter a value")
        } else {
            this.props.navigation.navigate({
                name: 'ActualCultivationCostScreen',
                params: {
                    cropName: this.state.cropName,
                    _id: this.state._id,
                    imageFile: this.state.imageFile,
                    patchName: this.state.patchName,
                    landType: this.state.landType,
                    farmingAreaInDecimal: this.state.farmingAreaInDecimal,
                    costOfCultivatinPerTenDecimal: this.state.costOfCultivatinPerTenDecimal,
                    costPerKg: this.state.costPerKg,
                    productionInKg: this.state.productionInKg,
                    cost: this.state.cost,
                    netProfit: this.state.netProfit
                }
            })
        }

    }

    saveButton = () => {
        if (this.state.materialPrice === '') {
            alert("Please enter the amount in the material section")
        } else {
            alert("Saved")
        }

    }
    // getSteps = async() => {
    //     var username = await AsyncStorage.getItem('username')
    //     var token = await AsyncStorage.getItem('token')
    //     var encodedUsername = base64.encode(username)
    //     var steps = []
    //     var name;
    //     var image;
    //     var materialName,qty;
    //     var check = false
    //     await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl +'crop/steps/materials/'+this.state._id+'/'+this.state.count, {
    //         headers: {
    //             'Content-type': "accept",
    //             'X-Information': encodedUsername,
    //             'Authorization': "POP " + token
    //         }
    //     }).then(function (response) {
    //         if(!response.data.data){
    //             return check=true
    //         }
    //         //console.log(response.data.data.qty)
    //         steps = response.data.data.stepData
    //         name = steps.map((i) => i.name)
    //         image = steps.map((i) => i.imageFile)
    //         materialName = response.data.data.materialName
    //         qty = response.data.data.qty

    //         //console.log("steps "+ steps.map((i) => i.name))
    //         // if(response.data.status === 1){
    //         //     load = false
    //         // }
    //         // console.log(cropsArray)
    //         // var id = cropsArray
    //         // console.log(id)

    //     }).catch(function (error) {
    //         console.log(error.message)
    //     })

    //     if(check === true){
    //         alert('No more steps available the next features are Coming soon')
    //         this.props.navigation.navigate({
    //             name: 'DashBoardScreen'
    //         })
    //     }
    //     this.setState({name:name})
    //     this.setState({image : image})
    //     this.setState({materialName : materialName})
    //     this.setState({qty : qty})

    // }


    // increaseCount = () => {
    //     var stepCounter = this.state.stepCounter
    //     this.setState({stepCounter : stepCounter+1})
    //     this.state.count = this.state.count+1
    //     this.getSteps()


    // }

    setLanguageOnMount = async () => {
        let defaultLanguage = await AsyncStorage.getItem('language')
        if (defaultLanguage === 'en') {
            this.setState({ textLanguageChange: '0' })
            this.getStepDataFromLocal()
        } else if (defaultLanguage === 'hi') {
            this.setState({ textLanguageChange: '1' })
            this.getStepDataFromLocal()
        } else if (defaultLanguage === 'ho') {
            this.setState({ textLanguageChange: '2' })
            this.getStepDataFromLocal()
        } else if (defaultLanguage === 'od') {
            this.setState({ textLanguageChange: '3' })
            this.getStepDataFromLocal()
        } else if (defaultLanguage === 'san') {
            this.setState({ textLanguageChange: '4' })
            this.getStepDataFromLocal()
        }
    }


    languageChangeFunction = async (data) => {

        if (data === 'en') {
            AsyncStorage.setItem('language', 'en')
            this.setState({ textLanguageChange: '0' })
            this.getStepDataFromLocal()
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'hi') {
            this.setState({ textLanguageChange: '1' })
            AsyncStorage.setItem('language', 'hi')
            this.getStepDataFromLocal()
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'ho') {
            this.setState({ textLanguageChange: '2' })
            AsyncStorage.setItem('language', 'ho')
            this.getStepDataFromLocal()
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'od') {
            this.setState({ textLanguageChange: '3' })
            AsyncStorage.setItem('language', 'od')
            this.getStepDataFromLocal()
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        } else if (data === 'san') {
            AsyncStorage.setItem('language', 'san')
            this.setState({ textLanguageChange: '4' })
            this.getStepDataFromLocal()
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        }
    }

    render() {
        var stepData = []
        stepData = this.state.stepData
        var cropNameLanguageChangeArray = []
        cropNameLanguageChangeArray = this.state.cropNameLanguageChangeArray
        var multipleMaterials = []
        multipleMaterials = this.state.multipleMaterials
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
                <Text style={{ fontSize: widthToDp("6%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>STEP - {this.state.pageNumber}/08</Text>
                {
                    this.state.isLoading ? <View style={{ justifyContent: 'center', marginTop: heightToDp("20%"), backgroundColor: BaseColor.BackgroundColor, marginBottom: heightToDp("30%") }}><CustomIndicator IsLoading={this.state.isLoading} /></View> : null
                }
                <ScrollView nestedScrollEnabled={true}>
                    <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("26%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                        {
                            this.state.textLanguageChange === '0' ? <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.englishTitleDescription}</Text> : ((this.state.textLanguageChange === '1') ? <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.hindiTitleDescription}</Text> : ((this.state.textLanguageChange === '2') ? <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.hoTitleDescription}</Text> : ((this.state.textLanguageChange === '3') ? <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.odiaTitleDescription}</Text> : ((this.state.textLanguageChange === '4') ? <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.santhaliTitleDescription}</Text> : null))))
                        }

                        <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("20%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("1%") }}>
                            <View>
                                <Image
                                    style={{ height: heightToDp("20%"), width: widthToDp("90%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
                                    source={{ uri: 'file:///storage/emulated/0/Pictures/image_' + this.state.stepImage }}
                                />
                            </View>
                        </View>
                    </View>


                    <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("50%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                        <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.descriptionLabel}</Text>
                        <ScrollView nestedScrollEnabled={true}>
                            <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("43%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                                {
                                    this.state.textLanguageChange === '0' ? <Text style={{ marginLeft: widthToDp("2%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Light' }}>{this.state.englishDescription}</Text> : ((this.state.textLanguageChange === '1') ? <Text style={{ marginLeft: widthToDp("2%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Light' }}>{this.state.hindiDescription}</Text> : ((this.state.textLanguageChange === '2') ? <Text style={{ marginLeft: widthToDp("2%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Light' }}>{this.state.hoDescription}</Text> : ((this.state.textLanguageChange === '3') ? <Text style={{ marginLeft: widthToDp("2%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Light' }}>{this.state.odiaDescription}</Text> : ((this.state.textLanguageChange === '4') ? <Text style={{ marginLeft: widthToDp("2%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Light' }}>{this.state.santhaliDescription}</Text> : null))))
                                }
                            </View>
                        </ScrollView>


                    </View>


                    <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("30%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                        <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.selectedItemLabel}</Text>
                        <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("23.5%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginTop: heightToDp("1%"), marginLeft: widthToDp("2%") }}>
                                    <Text style={{ fontSize: widthToDp("4%"), fontFamily: 'Oswald-Medium' }}>Ploughing Type</Text>
                                    {
                                        cropNameLanguageChangeArray.map((i) => {
                                            return (
                                                <View>
                                                    {
                                                        this.state.textLanguageChange === '0' ? <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Light' }}>{i.nameEnglish}</Text> : ((this.state.textLanguageChange === '1') ? <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Light' }}>{i.nameHindi}</Text> : ((this.state.textLanguageChange === '2') ? <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Light' }}>{i.nameHo}</Text> : ((this.state.textLanguageChange === '3') ? <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Light' }}>{i.nameOdia}</Text> : ((this.state.textLanguageChange === '4') ? <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Light' }}>{i.nameSanthali}</Text> : null))))
                                                    }
                                                </View>
                                            )
                                        })
                                    }

                                </View>
                                <Image
                                    style={{ height: heightToDp("20%"), width: widthToDp("50%"), marginTop: heightToDp("2%"), marginLeft: widthToDp("7%"), borderRadius: 10 }}
                                    source={{ uri: 'file:///storage/emulated/0/Pictures/image_' + this.state.imageFile }}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("20%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                        <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.material}</Text>
                        <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("17%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("3%"), marginTop: heightToDp("2%") }}>
                                <View style={{ width: widthToDp("20%") }}>
                                    <Text style={{ color: BaseColor.Red, fontFamily: 'Oswald-Medium', fontSize: widthToDp("3.5%") }}>{this.state.descriptionLabel}</Text>
                                </View>
                                <View style={{ width: widthToDp("25%") }}>
                                    <Text style={{ color: BaseColor.Red, fontFamily: 'Oswald-Medium', marginLeft: widthToDp("10%"), fontSize: widthToDp("3.5%") }}>{this.state.quantityLabel}</Text>
                                </View>
                                <View style={{ width: widthToDp("30%") }}>
                                    <Text style={{ color: BaseColor.Red, fontFamily: 'Oswald-Medium', marginLeft: widthToDp("15%"), fontSize: widthToDp("3.5%") }}>{this.state.amountLabel}</Text>
                                </View>



                            </View>
                            <ScrollView nestedScrollEnabled={true}>
                                {
                                    multipleMaterials.map((i) => {
                                        return (
                                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("3%"), marginTop: heightToDp("2%") }}>
                                                <View style={{ width: widthToDp("25%") }}>
                                                    <Text style={{ fontFamily: 'Oswald-Medium' }}>{i.materialNameEnglish}</Text>
                                                </View>
                                                <View style={{ width: widthToDp("30%"), marginLeft: widthToDp("9%") }}>
                                                    <Text style={{ fontFamily: 'Oswald-Medium' }}>{i.qty}</Text>
                                                </View>
                                                <View style={{ width: widthToDp("30%"), marginLeft: widthToDp("0%") }}>
                                                    <Input
                                                        placeholder={this.state.decimalPrice}
                                                        keyboardType='number-pad'
                                                        defaultValue={i.decimalPrice}
                                                        onChangeText={(data) => this.setMaterialPrice(data)}
                                                        style={{ marginLeft: widthToDp("0%"), fontFamily: 'Oswald-Medium', width: widthToDp("20%"), marginTop: heightToDp("-2%"), borderWidth: 1, marginRight: widthToDp("5%") }}
                                                    />
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>




                            {/* <Text style={{ marginLeft: widthToDp("35%"), fontFamily: 'Oswald-Medium' }}>₹ {this.state.decimalPrice}</Text> */}




                        </View>
                    </View>

                    <View style={{ marginBottom: heightToDp("10%") }}></View>
                </ScrollView>
                <View style={{ flexDirection: 'row', height: heightToDp("10%"), alignSelf: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf: 'center', marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.backButtonText}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.saveButton() }}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.saveButtonText}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.setStepDataIntoPatch() }}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.nextButtonText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}