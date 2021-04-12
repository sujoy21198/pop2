import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Toast } from 'native-base';
import BaseColor from '../Core/BaseTheme';
import Logo from '../assets/Logo';
import { heightToDp, widthToDp } from '../Responsive';
import { TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import DataAccess from '../Core/DataAccess';
import CustomIndicator from '../Core/CustomIndicator';
import NetInfo from '@react-native-community/netinfo';

export default class EditProfile extends React.Component {
    state = {
        fullName: "",
        age: "",
        contactNumber: "",
        fullNameLabel: "",
        ageLabel: "",
        contactLabel: "",
        headerLabel: ""
    }

    componentDidMount = async () => {
        this.fetchProfileDetails()
        this.setLanguageOnMount();
        this.loadlabelsFromStorage();
    }    

    fetchProfileDetails = async () => {
        let name = await AsyncStorage.getItem("name")
        let id = await AsyncStorage.getItem("_id")
        let age = Number(await AsyncStorage.getItem("age"))
        let phone = Number(await AsyncStorage.getItem("phone"))
        this.setState({
            fullName: name,
            age,
            contactNumber: phone,
            id
        });
    }

    setLanguageOnMount = async () => {
        let defaultLanguage = await AsyncStorage.getItem('language')
        if (defaultLanguage === 'en') {
            this.setState({ textLanguageChange: '0' })
        } else if (defaultLanguage === 'hi') {
            this.setState({ textLanguageChange: '1' })
        } else if (defaultLanguage === 'ho') {
            this.setState({ textLanguageChange: '2' })
        } else if (defaultLanguage === 'od') {
            this.setState({ textLanguageChange: '3' })
        } else if (defaultLanguage === 'san') {
            this.setState({ textLanguageChange: '4' })
        }
    }

    loadlabelsFromStorage = async () => {
        try {
            let user = await AsyncStorage.getItem('labelsData');
            let parsed = JSON.parse(user);
            var specificObject = parsed[0]
            var headerLabel = specificObject.labels.find((i) => i.type === 230)
            var fullNameLabel = specificObject.labels.find((i) => i.type === 227)
            var ageLabel = specificObject.labels.find((i) => i.type === 228)
            var contactLabel = specificObject.labels.find((i) => i.type === 229)
            if (this.state.textLanguageChange === '0') {

                this.setState({ headerLabel: headerLabel.nameEnglish })
                this.setState({ fullNameLabel: fullNameLabel.nameEnglish })
                this.setState({ ageLabel: ageLabel.nameEnglish })
                this.setState({ contactLabel: contactLabel.nameEnglish })
            } else if (this.state.textLanguageChange === '1') {

                this.setState({ headerLabel: headerLabel.nameHindi })
                this.setState({ fullNameLabel: fullNameLabel.nameHindi })
                this.setState({ ageLabel: ageLabel.nameHindi })
                this.setState({ contactLabel: contactLabel.nameHindi })
            } else if (this.state.textLanguageChange === '2') {

                this.setState({ headerLabel: headerLabel.nameHo })
                this.setState({ fullNameLabel: fullNameLabel.nameHo })
                this.setState({ ageLabel: ageLabel.nameHo })
                this.setState({ contactLabel: contactLabel.nameHo })
            } else if (this.state.textLanguageChange === '3') {

                this.setState({ headerLabel: headerLabel.nameOdia })
                this.setState({ fullNameLabel: fullNameLabel.nameOdia })
                this.setState({ ageLabel: ageLabel.nameOdia })
                this.setState({ contactLabel: contactLabel.nameOdia })
            } else if (this.state.textLanguageChange === '4') {
                
                this.setState({ headerLabel: headerLabel.nameSanthali })
                this.setState({ fullNameLabel: fullNameLabel.nameSanthali })
                this.setState({ ageLabel: ageLabel.nameSanthali })
                this.setState({ contactLabel: contactLabel.nameSanthali })
            }
        } catch (error) {
            alert(error)
        }
        this.setState({ crops: specificObject.crops })
        //this.showData()
    }

    signUp = async () => {
        if(this.state.fullName === "") {
            return Toast.show({
                type: "warning",
                text: "Please enter your name",
                duration: 3000
            })
        } else if(Number(this.state.age) === 0) {
            return Toast.show({
                type: "warning",
                text: "Please enter your age",
                duration: 3000
            })
        } else if(Number(this.state.age) < 12 || Number(this.state.age) > 100) {
            return;
        } else if(Number(this.state.contactNumber) === 0) {
            return Toast.show({
                type: "warning",
                text: "Please enter your contact number",
                duration: 3000
            })
        } else if(String(this.state.contactNumber).length !== 10) {
            return;
        }

        let isOnline = await NetInfo.fetch().then(state => state.isConnected);

        if(isOnline) {
            this.setState({isLoading: true})
            await axios.patch(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.SignUp, {
                "name": this.state.fullName,
                "age": this.state.age,
                "phone": this.state.contactNumber,
                "info": this.state.id,
            }, {
                headers: {
                'Content-type': 'application/json'
                }
            }).then(async response => {
                if(response.data.status === 1) {
                    await AsyncStorage.setItem("name", this.state.fullName);
                    await AsyncStorage.setItem("age", String(this.state.age));
                    await AsyncStorage.setItem("phone", String(this.state.contactNumber));
                    this.setState({isLoading: false});
                    return Toast.show({
                        type: 'success',
                        text: "Profile has been updated successfully.",
                        duration: 3000
                    })
                } else {
                    this.setState({isLoading: false});
                    return Toast.show({
                        type: 'danger',
                        text: "Some error occurred",
                        duration: 3000
                    })
                }
            }).catch(err => {                
                this.setState({isLoading: false});
                return Toast.show({
                    type: 'danger',
                    text: "Network Error - Please try later",
                    duration: 3000
                })
            })     
            
        } else {
            return Toast.show({
                type: 'warning',
                text: 'Please be online to update own profile',
                duration: 3000
            })
        }
    }

    render = () => (
        <KeyboardAwareScrollView
            style={{
                backgroundColor: BaseColor.BackgroundColor, 
                flex: 1,
            }}
            keyboardShouldPersistTaps='handled'
        >
            <View style={{ marginTop: heightToDp("3%"), alignSelf: "center" }}>
                <Logo />
            </View>
            <View style={{ marginTop: heightToDp("5%") }}>
                <Text style={{ fontSize: widthToDp("7%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{this.state.headerLabel}</Text>
            </View>

            <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%") }}>
                <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{this.state.fullNameLabel}</Text>
                <TextInput
                    style={[styles.input, styles.formInput]}
                    onChangeText={text => this.setState({fullName: text})}
                    defaultValue={this.state.fullName}
                    // onChangeText={(value) => console.warn(value)}
                />
            </View>
            <View style={{ marginTop: heightToDp("3%"), marginLeft: widthToDp("8%") }}>
                <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{this.state.ageLabel}</Text>
                <TextInput
                    style={[styles.input, styles.formInput]}
                    onChangeText={text => this.setState({age: Number(text)})}
                    keyboardType="numeric"
                    defaultValue={String(this.state.age)}
                    // onChangeText={(value) => console.warn(value)}
                />
            </View>
            {
                (Number(this.state.age) < 12 || Number(this.state.age) > 100) &&
                <Text style={styles.validationStyle}>Age must be within 12 and 100 years</Text>
            }
            <View style={{ marginTop: heightToDp("3%"), marginLeft: widthToDp("8%") }}>
                <Text style={[styles.labelInput, { marginLeft: widthToDp("2%") }]}>{this.state.contactLabel}</Text>
                <TextInput
                    style={[styles.input, styles.formInput]}
                    onChangeText={text => this.setState({contactNumber: Number(text)})}
                    keyboardType="numeric"
                    defaultValue={String(this.state.contactNumber)}
                    // onChangeText={(value) => console.warn(value)}
                />
            </View>
            {
                (String(this.state.contactNumber).length !== 10) &&
                <Text style={styles.validationStyle}>Contact Number must be of 10 digit</Text>
            }

            {
                this.state.isLoading ?
                <View style={{marginTop: heightToDp("2%")}}>
                    <CustomIndicator IsLoading={this.state.isLoading} />
                </View>:
                <TouchableOpacity onPress={this.signUp} disabled={this.state.isLoading}>
                    <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("5%"), width: widthToDp("40%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
                        <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.5%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{this.state.headerLabel}</Text>
                    </View>
                </TouchableOpacity>
            }
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({    
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
    height: heightToDp("6%"),
    fontSize: widthToDp("5%"),
    fontFamily: 'Oswald-Light'
  },
  validationStyle: { marginLeft: widthToDp("8%"), color: '#8B0000' }
})