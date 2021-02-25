import React, { Component } from 'react'
import { View ,StyleSheet,TouchableOpacity} from 'react-native'
import BaseColor from '../Core/BaseTheme'
import { Card, Text } from 'native-base'
import TopLogo from '../assets/TopLogo'
import { widthToDp, heightToDp } from '../Responsive'
import FloatingLabel from 'react-native-floating-labels'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome'


export default class ActualCultivationCost extends Component {

    nextScreen = () => {
        alert("coming soon")
    }
    render() {
        return (
            <KeyboardAwareScrollView style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
            <View >
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
                <Text style={{ fontSize: widthToDp("6%"), marginLeft: widthToDp("3%"), marginTop: heightToDp("1%"), fontFamily: 'Oswald-Medium' }}>ACTUAL CULTIVATION COST</Text>
                
                <View style={{ backgroundColor: 'white',height:heightToDp("40%"),width:widthToDp("95%"),alignSelf:'center',marginTop:heightToDp("3%"),borderRadius:10 }}>
                    <Text style={{ fontFamily: 'Oswald-Light',marginLeft:widthToDp("2%"),marginTop:heightToDp("1%") }}>PRODUCTION IN KGs</Text>
                    <FloatingLabel
                        labelStyle={styles.labelInput}
                        inputStyle={styles.input}
                        style={styles.formInput}
                    // onBlur={this.onBlur}
                    >KG</FloatingLabel>
                    <Text style={{ fontFamily: 'Oswald-Light' ,marginLeft:widthToDp("2%"),marginTop:heightToDp("1%")}}>COST PER KG</Text>
                    <FloatingLabel
                        labelStyle={styles.labelInput}
                        inputStyle={styles.input}
                        style={styles.formInput}
                    // onBlur={this.onBlur}
                    >₹</FloatingLabel>
                    <Text style={{ fontFamily: 'Oswald-Light' ,marginLeft:widthToDp("2%"),marginTop:heightToDp("1%")}}>TOTAL EXPENSE</Text>
                    <FloatingLabel
                        labelStyle={styles.labelInput}
                        inputStyle={styles.input}
                        style={styles.formInput}
                    // onBlur={this.onBlur}
                    >₹</FloatingLabel>
                </View>

                <View style={{ height: heightToDp("10%") }}>
                        <TouchableOpacity onPress={()=> {this.nextScreen()}}>
                            <View style={{ backgroundColor: "#fff", height: heightToDp("6%"), width: widthToDp("30%"), borderRadius: 100, alignSelf:'center', marginTop: heightToDp("2%") }}>
                                <Text style={{ fontSize: widthToDp("4%"), color: "#000", marginTop: heightToDp("1.4%"), alignSelf: 'center',fontFamily:'Oswald-Medium' }}>SUBMIT</Text>
                            </View>
                        </TouchableOpacity>
                </View>
            </View>
            </KeyboardAwareScrollView>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 65,
        backgroundColor: 'white',
    },
    labelInput: {
        color: '#000',
        fontSize:widthToDp("4.6%"),
        fontFamily:'Oswald-Medium'
    },
    formInput: {
        borderBottomWidth: 1.5,
        borderColor: '#333',
        width:widthToDp("90%"),
        alignSelf:'center'
    },
    input: {
        borderWidth: 0,
        height:heightToDp("6%"),
        fontSize:widthToDp("5%"),
        fontFamily: 'Oswald-Light'
    }
});
