import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, PermissionsAndroid } from 'react-native'
import { Text, Item, ListItem, Right, Left, Picker, Toast, Input } from 'native-base'
import { heightToDp, widthToDp } from '../Responsive';
import BaseColor from '../Core/BaseTheme';
import Logo from '../assets/Logo';
import Icon from 'react-native-vector-icons/EvilIcons'
import Calendar from 'react-native-vector-icons/AntDesign'
import FloatingLabel from 'react-native-floating-labels'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-datepicker'
import DeviceInfo from 'react-native-device-info'
import axios from 'axios';
import RBSheet from "react-native-raw-bottom-sheet"
import RBSheet2 from "react-native-raw-bottom-sheet"
import RBSheet3 from "react-native-raw-bottom-sheet"
import RBSheet4 from "react-native-raw-bottom-sheet"
import RBSheet5 from "react-native-raw-bottom-sheet"
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import DataAccess from '../Core/DataAccess'
import CustomIndicator from '../Core/CustomIndicator'
import LanguageChange from '../Core/LanguageChange'
import Language from '../Core/Languages'


const radio_props = [
  { label: "OTP", value: 0 },
  { label: "FIELD OFFICER PASSWORD", value: 1 }
]

export default class RegistrationScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      date: '',
      age: 'AGE',
      deviceId: '',
      genderPicker: LanguageChange.gender,
      fullname: '',
      phoneNumber: '',
      username: '',
      password: '',
      confirmPassword: '',
      state: LanguageChange.state,
      district: LanguageChange.district,
      gram: LanguageChange.gramPanchayat,
      village: LanguageChange.village,
      participantNumber: '',
      fieldOfficerPass: '',
      value: '',
      status: '',
      passwordVisibility: true,
      isLoading: false,
      selectedLanguage: ''
    }

    this.state.selectedLanguage = this.props.route.params.selectedLanguage
  }

  componentDidMount() {
    this.getDeviceId()

  }

  checkStatus = (value) => {
    this.setState({ value: value })
    if (value === 1) {
      this.setState({ status: true })
    } else {
      this.setState({ status: false })
    }
  }

  getDeviceId = async () => {
    var deviceId = await DeviceInfo.getAndroidId()
    this.setState({ deviceId: deviceId })
  }

  signup = async () => {

    var name = this.state.fullname
    var redirect = false;
    var load = true
    this.setState({ isLoading: true })
    if (this.state.age < 12) {
      this.setState({ isLoading: false })
      return Toast.show({
        text: "Age must be grater than 12",
        duration: 3000,
        type: 'danger'
      })
    } else if (this.state.password != this.state.confirmPassword) {
      this.setState({ isLoading: false })
      return Toast.show({
        text: "Password doesn't match",
        duration: 3000,
        type: 'danger'
      })
    } else if (this.state.phoneNumber.length != 10) {
      this.setState({ isLoading: false })
      return Toast.show({
        text: "Phone number shoud consist of 10 digits",
        duration: 3000,
        type: 'danger'
      })
    }
    // await axios.get('http://127.0.0.1:3000/api/v1/token').then(function (response) {
    //   console.log(response)
    // }).catch(function (error){
    //   console.log(error)
    // })
    await axios.post(DataAccess.BaseUrl + DataAccess.AccessUrl + DataAccess.SignUp, {
      name: this.state.fullname,
      gender: this.state.genderPicker,
      age: this.state.age,
      phone: this.state.phoneNumber,
      username: this.state.username,
      password: this.state.password,
      state: this.state.state,
      district: this.state.district,
      panchayat: this.state.gram,
      village: this.state.village,
      participantNumber: this.state.participantNumber,
      officerPassword: this.state.fieldOfficerPass,
      deviceId: this.state.deviceId
    }, {
      headers: {
        'Content-type': 'application/json'
      }
    }).then(function (response) {
      console.log(response.data)
      // alert(response.data.msg)
      if (response.data.status === 1) {
        console.log("yes")
        redirect = true
        Toast.show({
          text: name + ' ' + response.data.msg,
          type: 'success',
          duration: 3000
        })
      } else {
        load = false
        Toast.show({
          text: response.data.msg,
          type: 'success',
          duration: 3000
        })
      }

    }).catch(function (error) {
      console.log(error)
    })

    if (load === false) {
      this.setState({ isLoading: false })
    }

    if (redirect === true) {
      // this.props.navigation.navigate({
      //     name: 'DashBoardScreen'
      // })
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "SigninScreen" ,
      params : {selectedLanguage:this.state.selectedLanguage}}]
      });
    }
  }

  ageCalculator = (date) => {

    var currentyear = new Date().getFullYear();
    //alert(JSON.stringify(date).length)
    var dateFormat = JSON.stringify(date)
    var format = dateFormat.toString().replace(/['"]+/g, '')
    var year = format.substr(format.length - 4)
    var age = currentyear - year
    this.setState({ date: date })
    this.setState({ age: age })
  }

  genderPicker = (value) => {
    this.setState({
      genderPicker: value
    })
    this.RBSheet.close()
    // this.setState({
    //   genderPicker: value
    // })
  }

  statePicker = (value) => {
    this.setState({
      state: value
    })
    this.RBSheet3.close()
  }

  districtPicker = (value) => {
    this.setState({
      district: value
    })
    this.RBSheet4.close()
  }

  gramPicker = (value) => {
    this.setState({
      gram: value
    })

    this.RBSheet2.close()
  }

  villagePicker = (value) => {
    this.setState({
      village: value
    })
    this.RBSheet5.close()
  }



  FullName = (value) => {
    this.setState({
      fullname: value
    })
  }

  render() {
    return (
      <KeyboardAwareScrollView style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}
        keyboardShouldPersistTaps='handled'>

        <View style={{ marginTop: heightToDp("3%"), alignSelf: "center" }}>
          <Logo />
        </View>
        <View style={{ marginTop: heightToDp("5%") }}>
          <Text style={{ fontSize: widthToDp("7%"), alignSelf: 'center', fontFamily: 'Oswald-Medium' }}>{LanguageChange.registration}</Text>
        </View>

        <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%") }}>
          <FloatingLabel
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            style={styles.formInput}
            onChangeText={(value) => this.FullName(value)}
          >{LanguageChange.fullname}</FloatingLabel>
        </View>
        <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%"), flexDirection: 'row' }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.RBSheet.open()}>
            <View style={{ width: widthToDp("30%") }}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>{this.state.genderPicker}</Text>
            </View>

            <Icon
              name="chevron-down"
              size={40}
              style={{ marginLeft: widthToDp("43%") }}
            />
          </TouchableOpacity>
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={heightToDp("20%")}
            // openDuration={250}
            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'rgba(51,204,51,0.9)',
                borderRadius: 30
              }
            }}
          >
            <TouchableOpacity onPress={() => this.genderPicker("MALE")}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>MALE</Text>
            </TouchableOpacity>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
            <TouchableOpacity onPress={() => this.genderPicker("FEMALE")}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium', marginTop: heightToDp('3%') }}>FEMALE</Text>
            </TouchableOpacity>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
            <TouchableOpacity onPress={() => this.genderPicker("NON-BINARY")}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium', marginTop: heightToDp('3%') }}>NON-BINARY</Text>
            </TouchableOpacity>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
          </RBSheet>
          {/* <Picker
              mode="dropdown"
              
              selectedValue={this.state.genderPicker}
              onValueChange={(value) => this.pickerValue(value)}
              style={{ width: widthToDp("83%") }}
            >
              <Picker.Item label="Gender" value="gender" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Others" value="others" />
            </Picker> */}
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>

        <View style={{ marginTop: heightToDp("2.5%"), marginLeft: widthToDp("8%") }}>
          <FloatingLabel
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            style={styles.formInput}
            keyboardType='numeric'
            onChangeText={(text) => { this.setState({ age: text }) }}
          // onBlur={this.onBlur}
          >{LanguageChange.age}</FloatingLabel>
        </View>
        <View style={{ marginTop: heightToDp("2.5%"), marginLeft: widthToDp("8%") }}>
          <FloatingLabel
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            style={styles.formInput}
            keyboardType='numeric'
            onChangeText={(text) => { this.setState({ phoneNumber: text }) }}
          // onBlur={this.onBlur}
          >{LanguageChange.contactNumber}</FloatingLabel>
        </View>
        <View style={{ marginTop: heightToDp("2.5%"), marginLeft: widthToDp("8%") }}>
          <FloatingLabel
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            style={styles.formInput}
            onChangeText={(text) => { this.setState({ username: text }) }}
          // onBlur={this.onBlur}
          >{LanguageChange.username}</FloatingLabel>
        </View>
        <View style={{ marginTop: heightToDp("2.5%"), marginLeft: widthToDp("8%") }}>
          <FloatingLabel
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            style={styles.formInput}
            password={this.state.passwordVisibility}
            onChangeText={(text) => { this.setState({ password: text }) }}
          // onBlur={this.onBlur}
          >{LanguageChange.password}</FloatingLabel>
        </View>
        <View style={{ marginTop: heightToDp("2.5%"), marginLeft: widthToDp("8%") }}>
          <FloatingLabel
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            style={styles.formInput}
            password={this.state.passwordVisibility}
            onChangeText={(text) => { this.setState({ confirmPassword: text }) }}
          // onBlur={this.onBlur}
          >{LanguageChange.confirmPassword}</FloatingLabel>
        </View>
        <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%") }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.RBSheet3.open()}>
            <View style={{ width: widthToDp("30%") }}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>{this.state.state}</Text>
            </View>

            <Icon
              name="chevron-down"
              size={40}
              style={{ marginLeft: widthToDp("43%") }}
            />
          </TouchableOpacity>
          <RBSheet3
            ref={ref => {
              this.RBSheet3 = ref;
            }}
            height={heightToDp("20%")}
            // openDuration={250}
            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'rgba(51,204,51,0.9)',
                borderRadius: 30
              }
            }}
          >
            <TouchableOpacity onPress={() => this.statePicker("JHARKHAND")}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>JHARKHAND</Text>
            </TouchableOpacity>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
          </RBSheet3>
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
        {/* <View style={{ marginTop: heightToDp("2.5%"), marginLeft: widthToDp("8%") }}>
            <FloatingLabel
              labelStyle={styles.labelInput}
              inputStyle={styles.input}
              style={styles.formInput}
            // onBlur={this.onBlur}
            >DISTRICT</FloatingLabel>
          </View> */}
        <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%") }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.RBSheet4.open()}>
            <View style={{ width: widthToDp("30%") }}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>{this.state.district}</Text>
            </View>

            <Icon
              name="chevron-down"
              size={40}
              style={{ marginLeft: widthToDp("43%") }}
            />
          </TouchableOpacity>
          <RBSheet4
            ref={ref => {
              this.RBSheet4 = ref;
            }}
            height={heightToDp("20%")}
            // openDuration={250}
            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'rgba(51,204,51,0.9)',
                borderRadius: 30
              }
            }}
          >
            <TouchableOpacity onPress={() => this.districtPicker("BOKARO")}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>BOKARO</Text>
            </TouchableOpacity>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
          </RBSheet4>
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>

        <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%") }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.RBSheet2.open()}>
            <View style={{ width: widthToDp("31%") }}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>{this.state.gram}</Text>
            </View>

            <Icon
              name="chevron-down"
              size={40}
              style={{ marginLeft: widthToDp("42%") }}
            />
          </TouchableOpacity>
          <RBSheet2
            ref={ref => {
              this.RBSheet2 = ref;
            }}
            height={heightToDp("20%")}
            // openDuration={250}
            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'rgba(51,204,51,0.9)',
                borderRadius: 30
              }
            }}
          >
            <TouchableOpacity onPress={() => this.gramPicker("JHARGRAM")}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>JHARGRAM</Text>
            </TouchableOpacity>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
            <TouchableOpacity onPress={() => this.gramPicker("LALGARH")}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium', marginTop: heightToDp('3%') }}>LALGARH</Text>
            </TouchableOpacity>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
            <TouchableOpacity onPress={() => this.gramPicker("BINPUR")}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium', marginTop: heightToDp('3%') }}>BINPUR</Text>
            </TouchableOpacity>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
          </RBSheet2>
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>

        <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%") }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.RBSheet5.open()}>
            <View style={{ width: widthToDp("31%") }}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>{this.state.village}</Text>
            </View>

            <Icon
              name="chevron-down"
              size={40}
              style={{ marginLeft: widthToDp("42%") }}
            />
          </TouchableOpacity>
          <RBSheet5
            ref={ref => {
              this.RBSheet5 = ref;
            }}
            height={heightToDp("20%")}
            // openDuration={250}
            customStyles={{
              container: {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'rgba(51,204,51,0.9)',
                borderRadius: 30
              }
            }}
          >
            <TouchableOpacity onPress={() => this.villagePicker("CHATRA")}>
              <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>CHATRA</Text>
            </TouchableOpacity>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>

          </RBSheet5>
        </View>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("8.2%") }}></View>
        <View style={{ marginTop: heightToDp("2.5%"), marginLeft: widthToDp("8%") }}>
          <FloatingLabel
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            style={styles.formInput}
            onChangeText={(text) => { this.setState({ participantNumber: text }) }}
          // onBlur={this.onBlur}
          >{LanguageChange.participantNumber}</FloatingLabel>
        </View>
        <View style={{ marginTop: heightToDp("5%"), marginLeft: widthToDp("8%") }}>
          {/* <FloatingLabel
              labelStyle={styles.labelInput}
              inputStyle={styles.input}
              style={styles.formInput}
            // onBlur={this.onBlur}
            >{this.state.deviceId}</FloatingLabel> */}
          <Text style={{ fontSize: widthToDp("4.6%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>{this.state.deviceId}</Text>
          <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop: heightToDp('0.1%'), width: widthToDp("80%"), marginLeft: widthToDp("1%") }}></View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: heightToDp("5%"), marginLeft: widthToDp("4%") }}>
          {/* <RadioForm
          formHorizontal={true}
          radio_props={radio_props}
          initial={1}
          animation={true}
          onPress={(value) => {this.setState({value:value})}}
          buttonColor="#000" 
        /> */}
          <RadioForm
            formHorizontal={true}
            animation={true}

          >
            {
              radio_props.map((obj, i) => (
                <RadioButton
                  labelHorizontal={true} key={i}

                >
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={this.state.value === i}
                    onPress={(value) => this.checkStatus(value)}
                    buttonOuterColor={"#000"}
                    buttonStyle={{ marginLeft: widthToDp("1%") }}
                    buttonWrapStyle={{ marginLeft: widthToDp("5%") }}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    onPress={() => { }}
                    labelStyle={{ fontFamily: 'Oswald-Medium', marginLeft: widthToDp("2%") }}
                  />
                </RadioButton>
              ))
            }
          </RadioForm>
          {/* <Radio
              selected={false}
              style={{ marginLeft: widthToDp("3%"), marginTop: heightToDp("1%") }}
            />
            <Text style={{ color: "#fff", marginTop: heightToDp("1%"), marginLeft: widthToDp("2%"), fontFamily: 'Oswald-Medium' }}>OTP</Text>

            <Radio
              selected={true}
              style={{ marginLeft: widthToDp("20%"), marginTop: heightToDp("1%") }}
            />
            <Text style={{ color: "#fff", marginTop: heightToDp("1%"), marginLeft: widthToDp("1%"), fontFamily: 'Oswald-Medium' }}>FIELD OFFICER PASSWORD</Text> */}
        </View>
        {
          this.state.status ? <View style={{ backgroundColor: '#55b550', width: widthToDp("30%"), alignSelf: 'center', marginTop: heightToDp("3%"), borderRadius: 20 }}>
            <Input
              style={{ marginLeft: widthToDp("2%") }}
              autoFocus={false}
              onChangeText={(text) => this.setState({ fieldOfficerPass: text })}
            />
          </View> : null
        }

        <TouchableOpacity onPress={() => this.signup()}>
          <View style={{ backgroundColor: BaseColor.SecondaryColor, marginTop: heightToDp("5%"), width: widthToDp("37%"), alignSelf: 'center', height: heightToDp("5%"), borderRadius: 100 }}>
            <Text style={{ alignSelf: 'center', marginTop: heightToDp("0.5%"), fontWeight: '500', fontSize: widthToDp("5%"), fontFamily: 'Oswald-Medium' }}>{LanguageChange.signUp}</Text>
          </View>
        </TouchableOpacity>
        {
          this.state.isLoading ? <CustomIndicator IsLoading={this.state.isLoading} /> : null
        }
        <View style={{ flexDirection: 'row', marginTop: heightToDp("4%"), alignSelf: 'center' }}>
          <Text style={{ color: "#fff", fontFamily: 'Oswald-Medium' }}>{LanguageChange.noAccount}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SigninScreen')}>
            <Text style={{ color: BaseColor.SecondaryColor, fontFamily: 'Oswald-Medium' }}>{LanguageChange.signIn}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: heightToDp("10%") }}></View>

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
  }
});