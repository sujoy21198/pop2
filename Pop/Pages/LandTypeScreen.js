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
import AsyncStorage from '@react-native-async-storage/async-storage'




const data = [
    { name: 'HIGH LAND', code: require('../assets/00214136.jpg') },
    { name: 'MEDIUM LAND', code: require('../assets/60012970.jpg') },
    { name: 'LOW LAND', code: require('../assets/farmer-plow-field.jpg') }
]

export default class LandTypeScreen extends Component {


    constructor(props){
        super(props)
        this.state={
            _id : '',
            languages:[],
            cropName:'',
            imageFile:'',
        }
        this.state.languages = Languages
        this.state._id = this.props.route.params._id
        this.state.cropName = this.props.route.params.cropName
        this.state.imageFile = this.props.route.params.imageFile
    }

    componentDidMount(){
        this.loadlabelsFromStorage()
    }

    loadlabelsFromStorage = async() => {
        try{
            let username = await AsyncStorage.getItem('username')
            let user = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(user);
            var specificObject = parsed.find((i) => i.username === username)
            var labelsFilter = specificObject.labels.find((i) => i.nameEnglish === 'No Account')
            console.log(labelsFilter)
        }catch(error){
            alert(error)
        }
        this.setState({crops : specificObject.crops})
    }



    selectLandType = (data) => {
        if(data === 'HIGH LAND'){
            this.props.navigation.navigate({
                name: 'PatchScreen',
                params : {landType:data, _id:this.state._id , cropName: this.state.cropName , imageFile: this.state.imageFile}
            })
        }else if(data === 'MEDIUM LAND'){
            this.props.navigation.navigate({
                name: 'PatchScreen',
                params : {landType:data, _id:this.state._id, cropName: this.state.cropName, imageFile: this.state.imageFile}
            })
        }else if(data === 'LOW LAND'){
            this.props.navigation.navigate({
                name: 'PatchScreen',
                params : {landType:data, _id:this.state._id, cropName: this.state.cropName, imageFile: this.state.imageFile}
            })
        }
    }
    speak = (data) => {
        if(data === 'HIGH LAND'){
            tts.speak('HIGH LAND')
        }else if(data === 'MEDIUM LAND'){
            tts.speak('MEDIUM LAND')
        }else if(data === 'LOW LAND'){
            tts.speak('LOW LAND')
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
                    <TouchableOpacity>
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

                    <TouchableOpacity >
                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100,flexDirection:'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft:widthToDp("5%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>{this.state.languages[1].value}</Text>
                            <Icon
                            name="microphone"
                            color="white"
                            size={20}
                            style={{marginTop:heightToDp("1.8%"),marginLeft:widthToDp("9%")}}
                            />
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Ho, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100,flexDirection:'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), marginLeft:widthToDp("5%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>{this.state.languages[2].value}</Text>
                            <Icon
                            name="microphone"
                            color="white"
                            size={20}
                            style={{marginTop:heightToDp("1.8%"),marginLeft:widthToDp("6.3%")}}
                            />
                        </View>
                        </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: heightToDp("1%"), marginLeft: widthToDp("1%"),alignSelf:'center' }}>
                <TouchableOpacity>
                        <View style={{ backgroundColor: BaseColor.Uridia, width: widthToDp("30%"), height: heightToDp("6%"), borderRadius: 100,flexDirection:'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"),marginLeft:widthToDp("4.7%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>{this.state.languages[3].value}</Text>
                            <Icon
                            name="microphone"
                            color="white"
                            size={20}
                            style={{marginTop:heightToDp("1.8%"),marginLeft:widthToDp("6.9%")}}
                            />
                        </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                    <View style={{backgroundColor:BaseColor.Santhali, width: widthToDp("30%"), height: heightToDp("6%"),  borderRadius: 100, marginLeft: widthToDp("2%"),flexDirection:'row' }}>
                        <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft:widthToDp("3.4%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>{this.state.languages[4].value}</Text>
                        <Icon
                            name="microphone"
                            color="white"
                            size={20}
                            style={{marginTop:heightToDp("1.8%"),marginLeft:widthToDp("3%")}}
                            />
                    </View>
                    </TouchableOpacity>
                </View>
                <View style={{ borderBottomColor: BaseColor.Stroke, borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("100%") }}></View>
                <Text style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("2%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>LAND TYPE</Text>
                
                <View>
                   
                    <FlatList
                        data={data}
                        style={{ marginBottom: heightToDp("74%") }}
                        renderItem={({ item }) =>

                            <Card style={{ width: widthToDp("94%"), marginLeft: widthToDp("3%"), height: heightToDp("30%"), marginBottom: heightToDp("1%"), borderRadius: 20, backgroundColor: BaseColor.Red }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: widthToDp("45%") }}>
                                        <Text style={{ color: 'white', marginLeft: widthToDp("6%"), marginTop: heightToDp("1%"), fontSize: widthToDp("7%"), fontFamily: 'Oswald-Medium' }}>{item.name}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.speak(item.name)}>
                                    <Icon
                                        name="microphone"
                                        size={23}
                                        style={{ color: 'white', marginTop: heightToDp("2%"), marginLeft: widthToDp("36%") }}
                                    />
                                    </TouchableOpacity>
                                    
                                </View>
                                <TouchableOpacity onPress={() => this.selectLandType(item.name)}>
                                    <Image
                                        style={{ width: widthToDp("93%"), height: heightToDp("22.8%"), marginLeft: widthToDp("0.4%"), borderRadius: 2, marginTop: heightToDp("1%"), borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
                                        source={item.code}
                                    />
                                </TouchableOpacity>
                            </Card>

                        }
                    />
                </View>
            </View>
        );
    }
}