import React,{ Component } from 'react'
import {View,Button} from 'react-native'

export default class GeneralSettingsScreen extends Component{

    go = () => {
        this.props.navigation.reset({
            index:0,
            routes:[{name:"SigninScreen"}]
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