import React, { Component } from 'react'
import { View, Image, TouchableOpacity, FlatList } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Text, Card } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import Languages from '../Core/Languages'
import LanguageChange from '../Core/LanguageChange'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DialogInput from 'react-native-dialog-input';
import { getLastUpdateTime } from 'react-native-device-info'

export default class PatchScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            languages: [],
            data: [],
            isDialogVisible: false,
            cropName: '',
            imageFile: '',
            landType: '',
            highLand:'',
            lowLand:'',
            mediumLand:'',
            patchButtonText:''
        }
        this.state.languages = Languages
        this.state._id = this.props.route.params._id
        this.state.cropName = this.props.route.params.cropName
        this.state.imageFile = this.props.route.params.imageFile
        this.state.landType = this.props.route.params.landType
        //alert(this.state.landType)
    }
    componentDidMount() {
        //this.setPatch()

        this.showData()
        this.setLanguageOnMount()
        this.loadlabelsFromStorage()
        //this.test()
    }


    loadlabelsFromStorage = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            var highLand = specificObject.labels.find((i) => i.type === 53)
            var lowLand = specificObject.labels.find((i) => i.type === 55)
            var mediumLand = specificObject.labels.find((i) => i.type === 54)
            var patchButtonText = specificObject.labels.find((i) => i.type === 58)
            // var message = specificObject.labels.find((i) => i.type === 26)
            // var generalSettings = specificObject.labels.find((i) => i.type === 27)
            // var pension = specificObject.labels.find((i) => i.type === 51)
            // var others = specificObject.labels.find((i) => i.type === 52)
            if (this.state.textLanguageChange === '0') {
                this.setState({highLand : highLand.nameEnglish})
                this.setState({mediumLand : mediumLand.nameEnglish})
                this.setState({lowLand : lowLand.nameEnglish})
                this.setState({patchButtonText : patchButtonText.nameEnglish})
                // this.state.data[4].name = message.nameEnglish
                // this.state.data[5].name = generalSettings.nameEnglish
                // this.state.data[6].name = pension.nameEnglish
                // this.state.data[7].name = others.nameEnglish
                // this.setState({ moneyManagerLabel: moneyManagerLabel.nameEnglish })
                // this.setState({ expenseLabel: expenseLabel.nameEnglish })
                // this.setState({ incomeLabel: incomeLabel.nameEnglish })
                // this.setState({ allTransactionLabel: allTransactionLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {
                this.setState({highLand : highLand.nameHindi})
                this.setState({mediumLand : mediumLand.nameHindi})
                this.setState({lowLand : lowLand.nameHindi})
                this.setState({patchButtonText : patchButtonText.nameHindi})
                // this.state.data[4].name = message.nameHindi
                // this.state.data[5].name = generalSettings.nameHindi
                // this.state.data[6].name = pension.nameHindi
                // this.state.data[7].name = others.nameHindi
            } else if (this.state.textLanguageChange === '2') {
                this.setState({highLand : highLand.nameHo})
                this.setState({mediumLand : mediumLand.nameHo})
                this.setState({lowLand : lowLand.nameHo})
                this.setState({patchButtonText : patchButtonText.nameHo})
                // this.state.data[4].name = message.nameHindi
                // this.state.data[4].name = message.nameHo
                // this.state.data[5].name = generalSettings.nameHo
                // this.state.data[6].name = pension.nameHo
                // this.state.data[7].name = others.nameHo
            } else if (this.state.textLanguageChange === '3') {
                this.setState({highLand : highLand.nameOdia})
                this.setState({mediumLand : mediumLand.nameOdia})
                this.setState({lowLand : lowLand.nameOdia})
                this.setState({patchButtonText : patchButtonText.nameOdia})
                // this.state.data[4].name = message.nameOdia
                // this.state.data[5].name = generalSettings.nameOdia
                // this.state.data[6].name = pension.nameOdia
                // this.state.data[7].name = others.nameOdia
            } else if (this.state.textLanguageChange === '4') {
                this.setState({highLand : highLand.nameSanthali})
                this.setState({mediumLand : mediumLand.nameSanthali})
                this.setState({lowLand : lowLand.nameSanthali})
                this.setState({patchButtonText : patchButtonText.nameSanthali})
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

    setLanguageOnMount = async() => {
        let defaultLanguage = await AsyncStorage.getItem('language')
        if(defaultLanguage === 'en'){
            this.setState({textLanguageChange : '0'})
        }else if(defaultLanguage === 'hi'){
            this.setState({textLanguageChange : '1'})
        }else if(defaultLanguage === 'ho'){
            this.setState({textLanguageChange : '2'})
        }else if(defaultLanguage === 'od'){
            this.setState({textLanguageChange : '3'})
        }else if(defaultLanguage === 'san'){
            this.setState({textLanguageChange : '4'})
        }
    }

    languageChangeFunction = async(data) => {
        
        if(data === 'en'){
            AsyncStorage.setItem('language','en')
            this.setState({textLanguageChange : '0'})
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        }else if(data === 'hi'){
            this.setState({textLanguageChange : '1'})
            AsyncStorage.setItem('language','hi')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        }else if(data === 'ho'){
            this.setState({textLanguageChange : '2'})
            AsyncStorage.setItem('language','ho')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        }else if(data === 'od'){
            this.setState({textLanguageChange : '3'})
            AsyncStorage.setItem('language','od')
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        }else if(data === 'san'){
            AsyncStorage.setItem('language','san')
            this.setState({textLanguageChange : '4'})
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: "DashBoardScreen" }]
            });
        }
    }

    

    setPatch = async (data) => {
        try {

            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user')


            if (this.state.landType === this.state.highLand) {
                const patchObject = { 'name': data }
                let parsed = JSON.parse(user)
                var sepcific = parsed.find((i) => i.username === username)
                sepcific.highLand.push(patchObject)
                await AsyncStorage.setItem('user', JSON.stringify(parsed))
                this.setState({ data: sepcific.highLand })
                this.setState({ isDialogVisible: false })
            } else if (this.state.landType === this.state.lowLand) {
                const patchObject = { 'name': data }
                let parsed = JSON.parse(user)
                var sepcific = parsed.find((i) => i.username === username)
                sepcific.lowLand.push(patchObject)
                await AsyncStorage.setItem('user', JSON.stringify(parsed))
                this.setState({ data: sepcific.lowLand })
                this.setState({ isDialogVisible: false })
            } else if (this.state.landType === this.state.mediumLand) {
                const patchObject = { 'name': data }
                let parsed = JSON.parse(user)
                var sepcific = parsed.find((i) => i.username === username)
                sepcific.mediumLand.push(patchObject)
                await AsyncStorage.setItem('user', JSON.stringify(parsed))
                this.setState({ data: sepcific.mediumLand })
                this.setState({ isDialogVisible: false })
            }


            //var testy = user.filter((i) => i.username === username)


            //sepcific.patch = []

            //console.log(sepcific.patch )

        } catch (error) {
            console.log(error)
        }
    }


    showData = async () => {
        try {
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user')
            let parsed = JSON.parse(user)
            var sepcific = parsed.find((i) => i.username === username)
            if (this.state.landType === this.state.highLand) {
                this.setState({ data: sepcific.highLand })
            } else if (this.state.landType === this.state.lowLand) {
                this.setState({ data: sepcific.lowLand })
            } else if (this.state.landType === this.state.mediumLand) {
                this.setState({ data: sepcific.mediumLand })
            }

            //console.log(JSON.stringify(sepcific.highLand))
        } catch (error) {
            alert(error)
        }
    }





    addDataToArray = (data) => {
        var newPatch = []
        const objToBeSaved = { 'name': data }
        newPatch.push(objToBeSaved)
        this.setState({ data: newPatch })
        this.setState({ isDialogVisible: false })
    }

    showCustomAlert = () => {
        this.setState({ isDialogVisible: true })
    }

    navigateToPatch = async (patchName) => {
        try {
            const patchArrayObject = { 'cropId': this.state._id, 'patchName': patchName, 'landType': this.state.landType, 'step1': '', 'step2': '', 'step3': '', 'step4': '', 'step5': '', 'step6': '', 'step7': '', 'step8': '' }
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user')
            let parsed = JSON.parse(user)
            var sepcific = parsed.find((i) => i.username === username)
            var valueArr = sepcific.patch.map(function (item) { return item.patchName })
            if (valueArr.includes(patchName)) {
                console.log("Already created")
            } else {
                sepcific.patch.push(patchArrayObject)
                await AsyncStorage.setItem('user', JSON.stringify(parsed))
            }

            var jump = sepcific.patch.find((i) => i.patchName === patchName)
            var jumpNavigation = sepcific.costBenifitAnalysis.find((i) => i.patchName === patchName)
            console.log(sepcific.costBenifitAnalysis.find((i) => i.patchName === patchName),"hi")
            if(jump.step1 === '' && jump.step2 === '' && jump.step3 === '' && jump.step4 === '' && jump.step5 === ''){
                this.props.navigation.navigate({
                    name: 'SelectFarmingAreaScreen',
                    params: {
                        _id: this.state._id,
                        cropName: this.state.cropName,
                        imageFile: this.state.imageFile,
                        patchName: patchName,
                        landType: this.state.landType
                    }
                })
            }else if(jump.step2 === ''){
                this.props.navigation.navigate({
                    name: 'StepTwoScreen',
                    params: {
                        cropName: jumpNavigation.cropName,
                        _id: jumpNavigation._id,
                        imageFile: jumpNavigation.imageFile,
                        patchName : jumpNavigation.patchName,
                        landType: jumpNavigation.landType,
                        farmingAreaInDecimal : jumpNavigation.farmingAreaInDecimal,
                        costOfCultivatinPerTenDecimal : jumpNavigation.costOfCultivatinPerTenDecimal,
                        costPerKg : jumpNavigation.costPerKg,
                        productionInKg : jumpNavigation.productionInKg,
                        cost : jumpNavigation.cost,
                        netProfit : jumpNavigation.netProfit
                    }
                })
            }else if(jump.step3 === ''){
                this.props.navigation.navigate({
                    name: 'StepThreeScreen',
                    params: {
                        cropName: jumpNavigation.cropName,
                        _id: jumpNavigation._id,
                        imageFile: jumpNavigation.imageFile,
                        patchName : jumpNavigation.patchName,
                        landType: jumpNavigation.landType,
                        farmingAreaInDecimal : jumpNavigation.farmingAreaInDecimal,
                        costOfCultivatinPerTenDecimal : jumpNavigation.costOfCultivatinPerTenDecimal,
                        costPerKg : jumpNavigation.costPerKg,
                        productionInKg : jumpNavigation.productionInKg,
                        cost : jumpNavigation.cost,
                        netProfit : jumpNavigation.netProfit
                    }
                })
            }else if(jump.step4 === ''){
                this.props.navigation.navigate({
                    name: 'StepFourScreen',
                    params: {
                        cropName: jumpNavigation.cropName,
                        _id: jumpNavigation._id,
                        imageFile: jumpNavigation.imageFile,
                        patchName : jumpNavigation.patchName,
                        landType: jumpNavigation.landType,
                        farmingAreaInDecimal : jumpNavigation.farmingAreaInDecimal,
                        costOfCultivatinPerTenDecimal : jumpNavigation.costOfCultivatinPerTenDecimal,
                        costPerKg : jumpNavigation.costPerKg,
                        productionInKg : jumpNavigation.productionInKg,
                        cost : jumpNavigation.cost,
                        netProfit : jumpNavigation.netProfit
                    }
                })
            }else if(jump.step5 === ''){
                this.props.navigation.navigate({
                    name: 'StepFiveScreen',
                    params: {
                        cropName: jumpNavigation.cropName,
                        _id: jumpNavigation._id,
                        imageFile: jumpNavigation.imageFile,
                        patchName : jumpNavigation.patchName,
                        landType: jumpNavigation.landType,
                        farmingAreaInDecimal : jumpNavigation.farmingAreaInDecimal,
                        costOfCultivatinPerTenDecimal : jumpNavigation.costOfCultivatinPerTenDecimal,
                        costPerKg : jumpNavigation.costPerKg,
                        productionInKg : jumpNavigation.productionInKg,
                        cost : jumpNavigation.cost,
                        netProfit : jumpNavigation.netProfit
                    }
                })
            }
            // sepcific.patch.push(patchArrayObject)

            // await AsyncStorage.setItem('user', JSON.stringify(parsed))
            console.log(sepcific.patch)
            
        } catch (error) {
            console.log(error)
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
                    <TouchableOpacity onPress={() =>this.languageChangeFunction(this.state.languages[0].id)}>
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

                <View style={{ height: heightToDp("10%") }}>
                    <TouchableOpacity onPress={() => this.showCustomAlert()}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf: 'center', marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.patchButtonText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={"ADD PATCH"}
                    // message={"Message for DialogInput #1"}
                    hintInput={"Please enter the name of your patch"}
                    submitInput={(inputText) => { this.setPatch(inputText) }}
                    closeDialog={() => { this.setState({ isDialogVisible: false }) }}>
                </DialogInput>
                <View>

                    <FlatList
                        data={this.state.data}
                        style={{ marginBottom: heightToDp("80%") }}
                        renderItem={({ item }) =>

                            <TouchableOpacity onPress={() => { this.navigateToPatch(item.name) }}>
                                <View style={{ width: widthToDp("90%"), backgroundColor: 'white', margin: widthToDp("3%"), borderRadius: 20, height: heightToDp("5%") }}>
                                    <Text style={{ alignSelf: 'center', justifyContent: 'center', marginTop: heightToDp("0.5%"), fontSize: widthToDp("5%"), color: "#000", fontFamily: 'Oswald-Medium' }}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>

                        }
                    />
                </View>
            </View>
        );
    }
}