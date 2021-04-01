import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import RNFetchBlob from 'rn-fetch-blob';
import { heightToDp, widthToDp } from '../Responsive';

var Sound = require('react-native-sound');
export default class LabelComponent extends React.Component {
    state = {};

    checkAudioFileExistence = async () => {
        let files = await RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.PictureDir);
        if(files.includes(this.state.stepAudio)) {
            return true;
        } else {
            return false;
        }
    }
    
    playSound = () => {
        if(this.checkAudioFileExistence()) {
            var sound = new Sound(this.state.stepAudio, Sound.MAIN_BUNDLE, (error) => {
                console.warn(this.state.stepAudio)
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log(
                'duration in seconds: ' + sound.getDuration() + 
                ', number of channels: ' + sound.getNumberOfChannels()
            );
            
            // Play the sound with an onEnd callback
            sound.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
            });
        } else return;
    }

    componentDidMount = async() => {
        try {
            let language = await AsyncStorage.getItem('language')
            let labelData = JSON.parse(await AsyncStorage.getItem("labelsData"));
            switch(language) {
                case "en" : 
                    this.setState({stepAudio: "/storage/emulated/0/Pictures/image_" + labelData[0].labels[0].audioEnglish})
                    break;
                case "hi" :
                    this.setState({stepAudio: "/storage/emulated/0/Pictures/image_" + labelData[0].labels[0].audioHindi})
                    break;
                case "ho" :
                    this.setState({stepAudio: "/storage/emulated/0/Pictures/image_" + labelData[0].labels[0].audioHo})
                    break;
                case "od" :
                    this.setState({stepAudio: "/storage/emulated/0/Pictures/image_" + labelData[0].labels[0].audioOdia})
                    break;
                case "san" :
                    this.setState({stepAudio: "/storage/emulated/0/Pictures/image_" + labelData[0].labels[0].audioSanthali})
                    break;
                default: 
                    break;
            }
        } catch (e) {
            console.log(e);
        }
    }

    render = () => (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: widthToDp("3%"), 
            marginVertical: heightToDp("1.5%")
        }}>
            <Text 
                style={{ 
                    color: "#fff", 
                    width: widthToDp("77%"),
                    fontSize: widthToDp("5%"), 
                    fontFamily: 'Oswald-Medium' 
                }}
            >
                {this.props.stepName}
            </Text>
            <TouchableOpacity 
                style={{width: widthToDp("20%")}}
                onPress={this.playSound}
            >
                <Icon
                    name="microphone"
                    size={30}
                    color={"#fff"}
                    // onPress={this.playSound}
                />
            </TouchableOpacity>
        </View>
    )
}