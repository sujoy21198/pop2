import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Input, Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64'
import CustomIndicator from '../Core/CustomIndicator'


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
            imageFile:'',
            materialPrice:'',
            numberOfSteps:'',
            pageNumber : '02',
            patchName:'',
            landType:'',
            farmingAreaInDecimal:'',
            costOfCultivatinPerTenDecimal:'',
            costPerKg:'',
            productionInKg:'',
            cost:'',
            netProfit:''
        }
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
        this.getStepDataFromLocal()
        //this.setStepDataIntoPatch()
    }

    setStepDataIntoPatch = async() => {
        try{
            //const patchObject = { 'cropId': this.state._id , 'patchName': this.state.patchName , 'landType': this.state.landType , 'step1' : '' , 'step2':'' , 'step3':'' , 'step4':'' , 'step5':'' , 'step6' : '' , 'step7':'' , 'step8': ''}
            let username = await AsyncStorage.getItem('username')
            let stepTwoPrice = await AsyncStorage.getItem('stepTwo')
            let user = await AsyncStorage.getItem('user')
            let parsed = JSON.parse(user)
            var sepcific = parsed.find((i) => i.username === username)
            var patchFind = sepcific.patch.find((i) => i.patchName === this.state.patchName)
            patchFind.step2 = stepTwoPrice
            await AsyncStorage.setItem('user', JSON.stringify(parsed))

            console.log(patchFind)
        }catch(error){
            console.log(error)
        }

        if(this.state.materialPrice === ''){
            alert("please enter a value")
        }else{
            this.props.navigation.navigate({
                name: 'StepThreeScreen',
                params: {
                    cropName: this.state.cropName,
                    _id: this.state._id,
                    imageFile : this.state.imageFile,
                    patchName : this.state.patchName,
                    landType: this.state.landType,
                    farmingAreaInDecimal : this.state.farmingAreaInDecimal,
                    costOfCultivatinPerTenDecimal : this.state.costOfCultivatinPerTenDecimal,
                    costPerKg : this.state.costPerKg,
                    productionInKg : this.state.productionInKg,
                    cost : this.state.cost,
                    netProfit : this.state.netProfit
                }
            })
        }
    }

    setMaterialPrice = async(data) => {
        AsyncStorage.setItem("stepTwo",data)

        let stepTwoPrice = await AsyncStorage.getItem('stepTwo')
        //console.log(stepOnePrice)
        this.setState({materialPrice : stepTwoPrice})
    }

    getStepDataFromLocal = async () => {
        try {
            var stepData = []
            var decimalPrice, materialName
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specific = parsed.find((i) => i.username === username)
            var cropFilter = specific.cropsMaterials.filter((i) => i.cropId === this.state._id)
            stepData = cropFilter[1].stepData
            decimalPrice = cropFilter[1].decimalPrice
            materialName =cropFilter[1].materialName
            console.log(cropFilter)
            this.setState({ stepData: stepData })
            this.setState({ materialName: materialName })
            this.setState({ decimalPrice: decimalPrice })
            this.setState({numberOfSteps : cropFilter.length})
        } catch (error) {
            alert("No More Steps Available")
            this.props.navigation.navigate({
                name: 'ActualCultivationCostScreen',
                params: {
                    cropName: this.state.cropName,
                    _id: this.state._id,
                    imageFile : this.state.imageFile,
                    patchName : this.state.patchName,
                    landType: this.state.landType,
                    farmingAreaInDecimal : this.state.farmingAreaInDecimal,
                    costOfCultivatinPerTenDecimal : this.state.costOfCultivatinPerTenDecimal,
                    costPerKg : this.state.costPerKg,
                    productionInKg : this.state.productionInKg,
                    cost : this.state.cost,
                    netProfit : this.state.netProfit
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

        await axios.get(DataAccess.BaseUrl + DataAccess.AccessUrl + 'crop/steps/materials/' + this.state._id + '/' + '1', {
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

    stepThreeScreen = () => {
        if(this.state.materialPrice === ''){
            alert("please enter a value")
        }else{
            this.props.navigation.navigate({
                name: 'StepThreeScreen',
                params: {
                    cropName: this.state.cropName,
                    _id: this.state._id,
                    imageFile : this.state.imageFile,
                    patchName : this.state.patchName,
                    landType: this.state.landType,
                    farmingAreaInDecimal : this.state.farmingAreaInDecimal,
                    costOfCultivatinPerTenDecimal : this.state.costOfCultivatinPerTenDecimal,
                    costPerKg : this.state.costPerKg,
                    productionInKg : this.state.productionInKg,
                    cost : this.state.cost,
                    netProfit : this.state.netProfit
                }
            })
        }
        
    }

    saveButton = () => {
        if(this.state.materialPrice === ''){
            alert("please enter a value")
        }else{
            alert("AMOUNT SAVED")
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

    render() {
        var stepData = []
        stepData = this.state.stepData
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SigninScreen')}>
                        <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginLeft: widthToDp("5%") }}>ENGLISH</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("5%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>हिन्दी</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("9%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Ho, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), marginLeft: widthToDp("5%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>ʤʌgʌr</Text>
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
                    <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("4.7%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>ଓଡ଼ିଆ</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6.9%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Santhali, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, marginLeft: widthToDp("2%"), flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("3.4%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>ᱥᱟᱱᱛᱟᱲᱤ</Text>
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
                <Text style={{ fontSize: widthToDp("6%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>STEP - {this.state.pageNumber}/08</Text>
                {
                    this.state.isLoading ? <View style={{ justifyContent: 'center', marginTop: heightToDp("20%"),backgroundColor: BaseColor.BackgroundColor,marginBottom:heightToDp("30%") }}><CustomIndicator IsLoading={this.state.isLoading} /></View> :null
                }
                {
                    stepData.map((i) => {
                        return (
                            <ScrollView>
                                <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("26%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                                    <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{i.name}</Text>
                                    <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("20%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("1%") }}>
                                        <View>
                                            <Image
                                                style={{ height: heightToDp("20%"), width: widthToDp("90%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
                                                source={{ uri: DataAccess.BaseUrl+DataAccess.CropImage+'steps/'+i.imageFile }}
                                            />
                                        </View>
                                    </View>
                                </View>


                                <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("50%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                                    <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>DESCRIPTION</Text>
                                    <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("43%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                                        <Text style={{ marginLeft: widthToDp("2%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Light' }}>{i.english}</Text>
                                    </View>
                                </View>


                                <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("30%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                                    <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>SELECTED ITEM</Text>
                                    <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("23.5%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ marginTop: heightToDp("1%"), marginLeft: widthToDp("2%") }}>
                                                <Text style={{ fontSize: widthToDp("4%"), fontFamily: 'Oswald-Medium' }}>Ploughing Type</Text>
                                                <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Light' }}>{this.state.cropName}</Text>
                                            </View>
                                            <Image
                                                style={{ height: heightToDp("20%"), width: widthToDp("50%"), marginTop: heightToDp("2%"), marginLeft: widthToDp("7%"), borderRadius: 10 }}
                                                source={{ uri: DataAccess.BaseUrl + DataAccess.CropImage + this.state.imageFile }}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("20%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                                    <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>MATERIAL NEEDED</Text>
                                    <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("17%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                                        <View style={{ flexDirection: 'row', marginLeft: widthToDp("3%"), marginTop: heightToDp("2%") }}>
                                            <Text style={{ color: BaseColor.Red, fontFamily: 'Oswald-Medium' }}>Description</Text>
                                            <Text style={{ color: BaseColor.Red, fontFamily: 'Oswald-Medium', marginLeft: widthToDp("50%") }}>Amount</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: widthToDp("3%"), marginTop: heightToDp("2%") }}>
                                            <Text style={{ fontFamily: 'Oswald-Medium', width: widthToDp("30%") }}>{this.state.materialName}</Text>
                                            {/* <Text style={{ marginLeft: widthToDp("35%"), fontFamily: 'Oswald-Medium' }}>₹ {this.state.decimalPrice}</Text> */}
                                            <Input
                                                placeholder= {this.state.decimalPrice}
                                                keyboardType='number-pad'
                                                defaultValue={this.state.decimalPrice}
                                                onChangeText={(data) => this.setMaterialPrice(data)}
                                                style={{marginLeft: widthToDp("33%"), fontFamily: 'Oswald-Medium',width:widthToDp("20%"), marginTop: heightToDp("-2%")}}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginBottom: heightToDp("10%") }}></View>
                            </ScrollView>
                        )
                    })
                }
                <View style={{ flexDirection: 'row', height: heightToDp("10%"),alignSelf:'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf: 'center', marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>BACK</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.saveButton()}}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100,  marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>SAVE</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.setStepDataIntoPatch()}}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("1%"), marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>NEXT</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}