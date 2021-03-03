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

export default class PatchScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            languages: [],
            data: [],
            isDialogVisible: false,
            cropName:'',
            imageFile: ''
        }
        this.state.languages = Languages
        this.state._id = this.props.route.params._id
        this.state.cropName = this.props.route.params.cropName
        this.state.imageFile = this.props.route.params.imageFile
    }
    componentDidMount(){
        //this.setPatch()

        this.showData()
    }

    setPatch = async(data) => {
        try{
            const patchObject = { 'name' : data}
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user')
            let parsed = JSON.parse(user)
            //var testy = user.filter((i) => i.username === username)
            var sepcific = parsed.find((i) => i.username === username)
            sepcific.patch.push(patchObject)
            //sepcific.patch = []
            
            //console.log(sepcific.patch )
            await AsyncStorage.setItem('user',JSON.stringify(parsed))
            this.setState({ data: sepcific.patch})
            this.setState({ isDialogVisible: false })
        }catch(error){
            console.log(error)
        }
    }


    showData = async() => {
        try{
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('user')
            let parsed = JSON.parse(user)
            var sepcific = parsed.find((i) => i.username === username)
            this.setState({ data: sepcific.patch})
            console.log(JSON.stringify(parsed))
        }catch(error){
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

    navigateToPatch = () => {
        this.props.navigation.navigate({
            name: 'LandTypeScreen',
            params: {
                _id: this.state._id,
                cropName: this.state.cropName,
                imageFile : this.state.imageFile
            }
        })
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
                    <TouchableOpacity onPress={() => this.changeLanguage(this.state.languages[0].id)}>
                        <View style={{ backgroundColor: BaseColor.English, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), fontFamily: 'Oswald-Medium', marginLeft: widthToDp("5%") }}>{this.state.languages[0].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.changeLanguage(this.state.languages[1].id)}>
                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("5%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[1].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("9%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <View style={{ backgroundColor: BaseColor.Ho, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), marginLeft: widthToDp("5%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[2].value}</Text>
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
                    <TouchableOpacity onPress={() => this.changeLanguage(this.state.languages[3].id)}>
                        <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100, flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft: widthToDp("4.7%"), fontWeight: 'bold', fontSize: widthToDp("4.3%") }}>{this.state.languages[3].value}</Text>
                            <Icon
                                name="microphone"
                                color="white"
                                size={20}
                                style={{ marginTop: heightToDp("1.8%"), marginLeft: widthToDp("6.9%") }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity >
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

                <View style={{ height: heightToDp("10%") }}>
                    <TouchableOpacity onPress={() => this.showCustomAlert()}>
                        <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf: 'center', marginTop: heightToDp("2%") }}>
                            <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.3%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>ADD PATCH</Text>
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

                            <TouchableOpacity onPress={() => {this.navigateToPatch()}}>
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