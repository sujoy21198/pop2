import React, { Component } from 'react'
import { View, Button, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BaseColor from '../Core/BaseTheme'
import Icon from 'react-native-vector-icons/AntDesign'
import { widthToDp, heightToDp } from '../Responsive'
import { TouchableOpacity } from 'react-native-gesture-handler'


export default class GeneralSettingsScreen extends Component {

    go = async () => {
        await AsyncStorage.removeItem('_id')
        
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "LanguageScreen" }]
        });
    }
    refreshApplication = async () => {
        await AsyncStorage.removeItem('offlineData')
        await AsyncStorage.removeItem('cropData')
        await AsyncStorage.removeItem('numberOfCrops')
        await AsyncStorage.removeItem('labelsData')
        
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: "LanguageScreen" }]
        });
    }
    render() {
        return (
            <View style={{ backgroundColor: BaseColor.BackgroundColor, flex: 1 }}>
                {/* <Button
                    onPress={() => this.go()}
                    title="Logout"
                /> */}
                <View style={{ marginTop: heightToDp("50%"), marginLeft: widthToDp("40%") }}>
                    <TouchableOpacity onPress={() => this.refreshApplication()}>
                        <Text>REFRESH APP</Text>
                    </TouchableOpacity>
                    <Icon
                        name="logout"
                        size={60}
                        style={{ marginTop: heightToDp("0%"), marginLeft: widthToDp("0%") }}
                        onPress={() => this.go()}
                    />
                    <Text style={{ fontSize: widthToDp("4%"), marginTop: heightToDp("5%") }}>LOGOUT</Text>
                </View>
            </View>
        );
    }
}