import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import { Input } from 'react-native-elements'
import BaseColor from '../Core/BaseTheme'
import { Card, Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/EvilIcons'


export default class SelectFarmingAreaScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            landType: '',
            _id: '',
            horizontalCounter: 0,
            verticalCounter: 0,
            cropName:'',
            imageFile:''
        }
        this.state.landType = this.props.route.params.landType
        this.state._id = this.props.route.params._id
        this.state.cropName = this.props.route.params.cropName
        this.state.imageFile = this.props.route.params.imageFile
        //alert(this.state.cropName)
    }

    verticalCounterControl = (operation) => {
        if (operation === 'plus') {
            this.setState({ verticalCounter: this.state.verticalCounter + 1 })
        } else if (operation === 'minus') {
            this.setState({ verticalCounter: this.state.verticalCounter - 1 })
        }
    }

    horizontalCounterControl = (operation) => {
        if (operation === 'plus') {
            this.setState({ horizontalCounter: this.state.horizontalCounter + 1 })
        } else if (operation === 'minus') {
            this.setState({ horizontalCounter: this.state.horizontalCounter - 1 })
        }
    }

    submitDimensions = () => {
        if(this.state.cropName === 'Bitter Gourd'){

        }else if(this.state.cropName === 'Chilli'){

        }else if(this.state.cropName === 'Onion'){

        }else if(this.state.cropName === 'Paddy'){

        }else if(this.state.cropName === 'Tomato'){
            var length = this.state.horizontalCounter * 5
            var width = this.state.verticalCounter * 5
            var farmingAreaInSqFeet = length*width
            var farmingAreaInDecimal = parseFloat(farmingAreaInSqFeet/436).toFixed(2)
            var productionInKg = parseFloat((400/10)* farmingAreaInDecimal).toFixed(2)
            var costOfCultivatinPerTenDecimal = parseFloat((2810/10)* farmingAreaInDecimal).toFixed(2)//expense
            var costPerKg = parseFloat(35 * productionInKg).toFixed(2) //income

            this.props.navigation.navigate({
                name: 'AnalysisScreen',
                params: {
                    landType: this.state.landType,
                    _id: this.state._id,
                    imageFile: this.state.imageFile,
                    cropName: this.state.cropName,
                    farmingAreaInDecimal: farmingAreaInDecimal,
                    costOfCultivatinPerTenDecimal: costOfCultivatinPerTenDecimal,
                    costPerKg: costPerKg,
                    productionInKg:productionInKg,
                    cost: 35
                }
            })
        }
    }


    // submitDimensions = () => {
    //     var verticalCal
    //     var horizontalCal
    //     var vertical = this.state.vertical
    //     var horizontal = this.state.horizontal

    //     verticalCal = vertical * 5
    //     horizontalCal = horizontal * 5

    //     // this.setState({verticalCal : verticalCal})
    //     // this.setState({horizontalCal : horizontalCal})
    //     this.state.verticalCal = verticalCal
    //     this.state.horizontalCal = horizontalCal

    //     var farmingAreaInSquareFeet = verticalCal * horizontalCal
    //     var farmingAreaInDecimal = parseFloat(farmingAreaInSquareFeet / 436).toFixed(2)

    //     // this.setState({farmingAreaInSquareFeet : farmingAreaInSquareFeet})
    //     // this.setState({farmingAreaInDecimal : farmingAreaInDecimal})


    //     this.state.farmingAreaInSquareFeet = farmingAreaInSquareFeet
    //     this.state.farmingAreaInDecimal = farmingAreaInDecimal

    //     //10 decimal produces : 400 KG
    //     var productionInKg = Math.round(40 * farmingAreaInDecimal)

    //     // this.setState({productionInKg : productionInKg})
    //     this.state.productionInKg = productionInKg

    //     //Expense / Cost of cultivation per 10 decimal of land : Rs. 2810
    //     var expense = 281 * farmingAreaInDecimal

    //     // this.setState({expense : expense})
    //     this.state.expense = expense

    //     //Cost per KG : Rs. 35 (assumed)
    //     var totalIncomeFromCrop = Math.round(35 * productionInKg).toFixed(2)

    //     //this.setState({totalIncomeFromCrop : totalIncomeFromCrop})
    //     this.state.totalIncomeFromCrop = totalIncomeFromCrop


    //     if (!this.state.vertical) {
    //         return alert("enter a value")
    //     } else if (!this.state.horizontal) {
    //         return alert("enter a value")
    //     }

    //     this.props.navigation.navigate({
    //         name: 'AnalysisScreen',
    //         params: {
    //             landType: this.state.landType,
    //             farmingAreaInDecimal: this.state.farmingAreaInDecimal,
    //             expense: this.state.expense,
    //             totalIncomeFromCrop: this.state.totalIncomeFromCrop,
    //             productionInKg: this.state.productionInKg,
    //             _id: this.state._id
    //         }
    //     })
    // }


    render() {
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
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>SELECTING FARMING AREA</Text>
                <View style={{ backgroundColor: BaseColor.Red, borderRadius: 20, height: heightToDp("40%"), width: widthToDp("80%"), alignSelf: 'center', marginTop: heightToDp('1.5%') }}>
                    {/* <ImageBackground 
                    source={{uri:'https://shramajeewiki.com/images/English/00214136.jpg'}}
                    imageStyle={{borderRadius:20}}
                    style={{width:widthToDp("80%"),height:heightToDp("40%")}}>
                        
                    </ImageBackground> */}
                    <Text style={{ color: 'white', marginLeft: widthToDp("6%"), marginTop: heightToDp("1%"), fontSize: widthToDp("5.5%"), fontFamily: 'Oswald-Light' }}>MEASURE USING 5 FEET LONG STICK</Text>
                    <View style={{ backgroundColor: 'white', height: heightToDp("28%"), width: widthToDp("70%"), alignSelf: 'center', marginTop: heightToDp("4%"), borderRadius: 20 }}>
                        <View style={{ flexDirection: 'row', marginTop: heightToDp("2%"), marginLeft: widthToDp("4%") }}>
                            <Image
                                source={require('../assets/5FeetLongStick-Horizental.png')}
                                style={{ height: heightToDp("10%"), width: widthToDp("6%") }}
                            />
                            <View style={{ borderWidth: 1, width: widthToDp("35%"), marginLeft: widthToDp("20%"), height: heightToDp("7%"), flexDirection: 'row', borderRadius: 11 }}>
                                <TouchableOpacity onPress={() => { this.horizontalCounterControl('plus') }}>
                                    <View style={{ backgroundColor: 'black', width: widthToDp("10%"), borderTopLeftRadius: 10, borderBottomLeftRadius: 10, height: heightToDp("6.7%") }}>
                                        <Icon2
                                            name='plus'
                                            style={{ color: 'white', marginTop: heightToDp("2%"), alignSelf: 'center' }}
                                            size={25}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: widthToDp("15%") }}>
                                    <Text style={{ marginTop: heightToDp("0.5%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium', alignSelf: 'center' }}>{this.state.horizontalCounter}</Text>
                                </View>
                                <TouchableOpacity onPress={() => { this.horizontalCounterControl('minus') }}>
                                    <View style={{ backgroundColor: 'black', width: widthToDp("10%"), borderTopRightRadius: 10, borderBottomRightRadius: 10, height: heightToDp("6.7%") }}>
                                        <Icon2
                                            name='minus'
                                            style={{ color: 'white', marginTop: heightToDp("2%"), alignSelf: 'center' }}
                                            size={25}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: heightToDp("6%"), marginLeft: widthToDp("4%") }}>
                            <Image
                                source={require('../assets/5FeetLongStick-Vertical.png')}
                                style={{ height: heightToDp("3%"), width: widthToDp("18%") }}
                            />
                            <View style={{ borderWidth: 1, width: widthToDp("35%"), marginLeft: widthToDp("6.7%"), height: heightToDp("7%"), flexDirection: 'row', borderRadius: 11 }}>
                                <TouchableOpacity onPress={() => { this.verticalCounterControl('plus') }}>
                                    <View style={{ backgroundColor: 'black', width: widthToDp("10%"), borderTopLeftRadius: 10, borderBottomLeftRadius: 10, height: heightToDp("6.7%") }}>
                                        <Icon2
                                            name='plus'
                                            style={{ color: 'white', marginTop: heightToDp("2%"), alignSelf: 'center' }}
                                            size={25}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: widthToDp("15%") }}>
                                    <Text style={{ marginTop: heightToDp("0.5%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium', alignSelf: 'center' }}>{this.state.verticalCounter}</Text>
                                </View>
                                <TouchableOpacity onPress={() => { this.verticalCounterControl('minus') }}>
                                    <View style={{ backgroundColor: 'black', width: widthToDp("10%"), borderTopRightRadius: 10, borderBottomRightRadius: 10, height: heightToDp("6.7%") }}>
                                        <Icon2
                                            name='minus'
                                            style={{ color: 'white', marginTop: heightToDp("2%"), alignSelf: 'center' }}
                                            size={25}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>
                </View>
                <TouchableOpacity onPress={() => this.submitDimensions()}>
                    <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("3%"), width: widthToDp("37%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
                        <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.4%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>SUBMIT</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}