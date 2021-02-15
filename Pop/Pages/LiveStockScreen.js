import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import { FlatGrid, SectionGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base64 from 'react-native-base64'
import axios from 'axios'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'

export default class LiveStockScreen extends Component {

    constructor(props){
        super(props)
        this.state={
            livestocks:[],
            isLoading:false
        }
    }
    componentDidMount(){
        this.loadLiveStocks()
    }

    loadLiveStocks = async() => {
        this.setState({isLoading:true})
        var load = true
        var username = await AsyncStorage.getItem('username')
        var token = await AsyncStorage.getItem('token')
        var encodedUsername = base64.encode(username)
        var cropsArray = []
        //console.log(token)
        // await axios.get(DataAccess.BaseUrl+DataAccess.Crops,{
        //     headers:{
        //         'Content-type': 'application/json',
        //         'X-Information': this.state.encodedUsername,
        //         'Authorization': 'POP '+ this.state.token
        //     }
        // }).then(function(response){
        //     console.log(response.data)
        // }).catch(function(error){
        //     console.log(error)
        // })
        await axios.get(DataAccess.BaseUrl+DataAccess.AccessUrl+DataAccess.LiveStocks,{
            headers:{
                'Content-type': "accept",
                'X-Information': encodedUsername,
                'Authorization': "POP "+ token
            }
        }).then(function(response){
            //console.log(response.data.data)
            cropsArray = response.data.data
            if(response.data.status === 1){
                load = false
            }
            // console.log(cropsArray)
            // var id = cropsArray
            // console.log(id)
            
        }).catch(function(error){
            console.log(error.message)
        })


        if(load === false){
            this.setState({isLoading:false})
        }

        this.setState({
            livestocks: cropsArray
        })
    }
    
    navigationController = (data,name) => {
        //alert(name)
        this.props.navigation.navigate({
            name: 'BreedScreen',
            params : {_id:data,
                name : name
            }
        })
    }
    render() {
        var livestocksArray = []
        livestocksArray = this.state.livestocks
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor }}>
                <View style={{ backgroundColor: 'white', width: widthToDp("100%"), height: heightToDp("13%"),flexDirection: 'row' }}>
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
                        <View style={{ backgroundColor: BaseColor.Hindi, width: widthToDp("30%"), height: heightToDp("6%"), marginLeft: widthToDp("2%"), borderRadius: 100,flexDirection:'row' }}>
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft:widthToDp("5%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>हिन्दी</Text>
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
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.5%"), marginLeft:widthToDp("5%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>ʤʌgʌr</Text>
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
                            <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"),marginLeft:widthToDp("4.7%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>ଓଡ଼ିଆ</Text>
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
                        <Text style={{ color: '#fff', marginTop: heightToDp("1.7%"), marginLeft:widthToDp("3.4%"),fontWeight:'bold',fontSize:widthToDp("4.3%") }}>ᱥᱟᱱᱛᱟᱲᱤ</Text>
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
                <Text style={{marginLeft:widthToDp("3%"),marginTop:heightToDp("2%"),fontSize:widthToDp("7%"),fontFamily:'Oswald-Medium'}}>LIVESTOCK</Text>
                {
                    this.state.isLoading ? <View style={{justifyContent:'center',marginTop:heightToDp("20%")}}><CustomIndicator IsLoading={this.state.isLoading} /></View> : null
                }
                <View>
                    <FlatGrid
                        style={{ marginTop: heightToDp("1%"), marginBottom: heightToDp("74%") }}
                        bounces={true}
                        itemDimension={130}
                        data={Object.values(livestocksArray)}
                        bouncesZoom={true}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.navigationController(item._id , item.name)}>
                                <View style={{backgroundColor:BaseColor.Red,width:widthToDp("47%"),height:heightToDp("30%"), elevation: 10, borderRadius: 10}}>
                                    <Text style={{color: "#fff", fontSize: widthToDp("5%"),marginLeft:widthToDp("5%"), marginTop: heightToDp("0.4%"),fontFamily:'Oswald-Medium'}}>{(item.name).toUpperCase()}</Text>
                                    <Image
                                style={{ width: widthToDp("47%"), height: heightToDp("25%") ,borderBottomLeftRadius:10,borderBottomRightRadius:10, marginTop: heightToDp("1%")}}
                                source={{ uri: DataAccess.BaseUrl+DataAccess.CropImage+item.imageFile}}
                                />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        );
    }
}