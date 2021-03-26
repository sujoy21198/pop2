import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import DataAccess from '../Core/DataAccess'
import AsyncStorage from '@react-native-async-storage/async-storage'



const data = [
    { name: 'HIGH LAND', code: 'https://shramajeewiki.com/images/English/00214136.jpg' },
    { name: 'MEDIUM LAND', code: 'https://timesofindia.indiatimes.com/thumb/msid-60012970,imgsize-2640154,width-400,resizemode-4/60012970.jpg' },
    { name: 'LOW LAND', code: 'https://www.biggovernment.news/wp-content/uploads/sites/59/2017/06/farmer-plow-field.jpg' }
]

export default class LandTypeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            landType: '',
            _id: '',
            cropName: '',
            farmingAreaInDecimal: '',
            costOfCultivatinPerTenDecimal: '',
            costPerKg: '',
            productionInKg: '',
            netProfit: '',
            cost: '',
            imageFile: '',
            patchName: ''
        }
        this.state.landType = this.props.route.params.landType
        this.state._id = this.props.route.params._id
        this.state.cropName = this.props.route.params.cropName
        this.state.farmingAreaInDecimal = this.props.route.params.farmingAreaInDecimal
        this.state.costOfCultivatinPerTenDecimal = this.props.route.params.costOfCultivatinPerTenDecimal //expense
        this.state.costPerKg = this.props.route.params.costPerKg //income
        this.state.productionInKg = this.props.route.params.productionInKg
        this.state.cost = this.props.route.params.cost
        this.state.imageFile = this.props.route.params.imageFile
        this.state.patchName = this.props.route.params.patchName

        this.netProfitCalculation()
        //alert(this.state.patchName)
        this.saveToOfflineAnalysis()

    }

    saveToOfflineAnalysis = async () => {
        try {
            const analysisObject = { 'cropName': this.state.cropName, '_id': this.state._id, 'imageFile': this.state.imageFile, 'patchName': this.state.patchName, 'landType': this.state.landType, 'farmingAreaInDecimal': this.state.farmingAreaInDecimal, 'costOfCultivatinPerTenDecimal': this.state.costOfCultivatinPerTenDecimal, 'costPerKg': this.state.costPerKg, 'productionInKg': this.state.productionInKg, 'cost': this.state.cost, 'netProfit': this.state.netProfit }
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user')
            let parsed = JSON.parse(user)
            var sepcific = parsed.find((i) => i.username === username)
            var valueArr = sepcific.costBenifitAnalysis.map(function (item) { return item.patchName })
            if (valueArr.includes(this.state.patchName)) {
                console.log("Already created")
                //console.log(sepcific.costBenifitAnalysis)
            } else {
                sepcific.costBenifitAnalysis.push(analysisObject)
                console.log(sepcific.costBenifitAnalysis)
                await AsyncStorage.setItem('user', JSON.stringify(parsed))
            }
        } catch (error) {
            console.log(error)
        }
    }

    netProfitCalculation = () => {
        var netProfit = this.state.costPerKg - this.state.costOfCultivatinPerTenDecimal //expense - profit
        this.state.netProfit = netProfit
    }

    stepOneScreen = () => {
        this.props.navigation.navigate({
            name: 'StepOneScreen',
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
        //alert(this.state.patchName)
    }

    render() {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SigninScreen')}>
                        <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontFamily: 'Oswald-Medium' }}>ENGLISH</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>हिन्दी</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Ho, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>ʤʌgʌr</Text>

                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%"), alignSelf: 'center' }}>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>ଓଡ଼ିଆ</Text>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Santhali, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, marginLeft: widthToDp("2%"), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>ᱥᱟᱱᱛᱟᱲᱤ</Text>

                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ borderBottomColor: BaseColor.Stroke, borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("100%") }}></View>

                <ScrollView>
                    <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("30%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                        <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium', height: heightToDp("4%") }}>COST BENEFIT ANALYSIS</Text>
                        <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("23.5%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ marginTop: heightToDp("4%"), marginLeft: widthToDp("2%"), width: widthToDp("30%") }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium' }}>LAND TYPE</Text>
                                    <Text style={{ fontFamily: 'Oswald-Light' }}>{this.state.landType}</Text>

                                    <Text style={{ marginTop: heightToDp("3%"), fontFamily: 'Oswald-Medium' }}>AREA</Text>
                                    <Text style={{ fontFamily: 'Oswald-Light' }}>Area {this.state.farmingAreaInDecimal} Decimal</Text>
                                </View>
                                <Image
                                    style={{ height: heightToDp("20%"), width: widthToDp("50%"), marginTop: heightToDp("2%"), marginLeft: widthToDp("7%"), borderRadius: 10 }}
                                    source={{ uri: DataAccess.BaseUrl + DataAccess.CropImage + this.state.imageFile }}
                                />
                            </View>
                        </View>
                    </View>


                    <View style={{ backgroundColor: BaseColor.Red, width: widthToDp("90%"), height: heightToDp("40%"), alignSelf: 'center', marginTop: heightToDp("2%"), borderRadius: 10 }}>
                        <Text style={{ color: 'white', marginLeft: widthToDp("4%"), marginTop: heightToDp('1.5%'), fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium', height: heightToDp("4%") }}>COST BENEFIT ANALYSIS</Text>
                        <View style={{ backgroundColor: 'white', width: widthToDp("90%"), height: heightToDp("55%"), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: heightToDp("2%") }}>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('1%') }}>
                                <View style={{
                                    width
                                        : widthToDp("23%")
                                }}>
                                    <Text style={{
                                        fontFamily: 'Oswald-Medium'
                                    }}>Description</Text>
                                </View>

                                <Text style={{ marginLeft: widthToDp("30%"), fontFamily: 'Oswald-Medium' }}>Amount</Text>
                            </View>
                            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("90%") }}></View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('2%') }}>
                                <View style={{
                                    width
                                        : widthToDp("25%")
                                }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium' }}>Total cost of cultivation</Text>
                                </View>

                                <Text style={{ marginLeft: widthToDp("28%"), fontFamily: 'Oswald-Medium' }}>₹ {this.state.costOfCultivatinPerTenDecimal}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('2%') }}>
                                <View style={{
                                    width
                                        : widthToDp("26%")
                                }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium' }}>Total income from crop</Text>
                                </View>

                                <Text style={{ marginLeft: widthToDp("27%"), fontFamily: 'Oswald-Medium' }}>₹ {this.state.costPerKg}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('2%') }}>
                                <View style={{
                                    width
                                        : widthToDp("25%")
                                }}>
                                    <Text style={{ fontFamily: 'Oswald-Medium'}}>Production</Text>
                                </View>

                                <Text style={{ marginLeft: widthToDp("28%"), fontFamily: 'Oswald-Medium' }}>{this.state.productionInKg} Kgs</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('2%') }}>
                                <View style={{width: widthToDp("25%")}}>
                                <Text style={{ fontFamily: 'Oswald-Medium' }}>Cost Per kg</Text>
                                </View>
                                
                                <Text style={{ marginLeft: widthToDp("28%"), fontFamily: 'Oswald-Medium' }}>₹ {this.state.cost}</Text>
                            </View>
                            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("90%") }}></View>
                            <View style={{ flexDirection: 'row', marginLeft: widthToDp("4%"), marginTop: heightToDp('1%') }}>
                                <View style={{ width: widthToDp("25%")}}>
                                <Text style={{ fontSize: widthToDp("5%"), fontFamily: 'Oswald-Bold' }}>Net Profit</Text>
                                </View>
                                
                                <Text style={{ marginLeft: widthToDp("25%"), fontWeight: 'bold', fontSize: widthToDp("6%"), fontFamily: 'Oswald-Bold' }}>₹ {this.state.netProfit}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: heightToDp("30%") }}></View>
                </ScrollView>
                <View style={{ height: heightToDp("10%") }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("20%"), marginTop: heightToDp("2%") }}>
                                <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.4%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>CANCEL</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.stepOneScreen() }}>
                            <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, marginLeft: widthToDp("2%"), marginTop: heightToDp("2%") }}>
                                <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.4%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>DONE</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        );
    }
}