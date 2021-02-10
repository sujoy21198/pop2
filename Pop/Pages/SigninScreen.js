import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet,ScrollView } from 'react-native'
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

export default class SigninScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            username: '',
            password: '',
            isLoading: false
        }
    }

    signIn = async () => {
        var load = true
        this.setState({isLoading:true})
        var name = this.state.username
        var redirect = false
        if (this.state.phoneNumber.length != 10) {
            this.setState({isLoading:false})
            return Toast.show({
                text: "Phone number shoud consist of 10 digits",
                duration: 3000,
                type: 'danger'
            })
        }

        await axios.post(DataAccess.BaseUrl +DataAccess.AccessUrl+ DataAccess.SignIn, {
            phone: this.state.phoneNumber,
            username: this.state.username,
            password: this.state.password
        }, {
            headers: {
                'Content-type': 'application/json'
            }
        }).then(function (response) {
            console.log(response.data.data._id)
            console.log(response.data.data.name)
            console.log(response.data.data.token)
            console.log(response.data.data.type)
            console.log(response.data.data.username)
            if(response.data.status === 1){
                console.log("yes")
                redirect = true
                Toast.show({
                    text: "Welcome" + " "+name,
                    type: 'success',
                    duration: 3000
                })
                AsyncStorage.setItem("_id",response.data.data._id)
                AsyncStorage.setItem("name",response.data.data.name)
                AsyncStorage.setItem("token",response.data.data.token)
                AsyncStorage.setItem("type",response.data.data.type)
                AsyncStorage.setItem("username",response.data.data.username)
            }else{
                load = false
                Toast.show({
                    text: response.data.msg,
                    type: 'success',
                    duration: 3000
                })
            }   
            
        }).catch(function (error){
            load = false
            console.log(error)
        })

        if(load === false){
            this.setState({isLoading : false})
        }

        if(redirect === true){
            // this.props.navigation.navigate({
            //     name: 'DashBoardScreen'
            // })
            this.props.navigation.reset({
                index:0,
                routes:[{name:"DashBoardScreen"}]
            });
        }
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
                        <Text style={{ fontSize: widthToDp("7%"), alignSelf: 'center', fontFamily: 'Oswald-SemiBold' }}>SIGN IN</Text>
                    </View>
                    <View style={{ marginTop: heightToDp("2%"), marginLeft: widthToDp("10%") }}>
                        <FloatingLabel
                            labelStyle={styles.labelInput}
                            inputStyle={styles.input}
                            style={styles.formInput}
                            keyboardType='numeric'
                            onChangeText={(text) => { this.setState({ phoneNumber: text }) }}
                        // onBlur={this.onBlur}
                        >CONTACT NUMBER</FloatingLabel>
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
                        >USERNAME</FloatingLabel>
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
                        >PASSWORD</FloatingLabel>
                    </View>
                    {/* <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("80%"), alignSelf: 'center' }}></View> */}
                    <View style={{ marginLeft: widthToDp("60.5%"), marginTop: heightToDp("0.5%") }}>
                        <Text style={{ fontFamily: 'Oswald-Medium' }}>FORGOT PASSWORD</Text>
                    </View>
                    {
                        this.state.isLoading ? <CustomIndicator IsLoading={this.state.isLoading} /> : null
                    }
                    
                    <TouchableOpacity onPress={() => this.signIn()}>
                        <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("5%"), width: widthToDp("37%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
                            <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.5%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>SIGN IN</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: heightToDp('1.5%') }}>
                        <Text style={{ fontFamily: 'Oswald-Medium' }}>You don't have an account?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('RegistrationScreen')}>
                            <Text style={{ color: BaseColor.Red, fontFamily: 'Oswald-Medium' }}> Please Sign up</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ borderBottomColor: BaseColor.Stroke, borderBottomWidth: 1, marginTop: heightToDp('1.5%'), width: widthToDp("100%") }}></View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DashBoardScreen')}>
                        <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("3%"), width: widthToDp("37%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
                            <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.4%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>GUEST SIGN IN</Text>
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
        height:heightToDp("6%"),
        fontSize:widthToDp("5%"),
        fontFamily: 'Oswald-Light'
    }
});