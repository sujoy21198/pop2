import React,{ Component } from 'react'
import {View,Button} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default class GeneralSettingsScreen extends Component{

    go = async() => {
        await AsyncStorage.removeItem('_id')
        this.props.navigation.reset({
            index:0,
            routes:[{name:"LanguageScreen"}]
        });
    } 
    render(){
        return(
            <View>
                <Button
                onPress={()=> this.go()}
                title="Logout"
                />
            </View>
        );
    }
}