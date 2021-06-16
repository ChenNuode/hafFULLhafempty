import React,{Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ViewBase,
  TextInput,
  Alert,
} from 'react-native';

import {
    Button,
    Text,
    Divider,
    ListItem,
    Avatar,
    Badge,
} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

import * as ImagePicker from 'react-native-image-picker';
//imports end

// in main js
// import MyQueuesPage from 'MyQueues.js';
// createBottomTabNavigator{
//    screen: MyQueuesPage};

const styles = StyleSheet.create({
    bigtext: {
        fontSize: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
});

export default class ConfirmQueuePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            image: {},
        }
    };

    createQueue = async () => {
        if(this.state.name == ""){
            Alert.alert(
                "Error",
                "Cannot have empty Queue Title",
                [
                    { text: "OK" }
                ]
            );
            return;
        };

        await AsyncStorage.getItem('@userinfo').then((res) => {
            res = JSON.parse(res);
            //Tested
            api.makeQueue(res.username, this.state.name, this.state.description, this.props.route.params.lat, this.props.route.params.long, this.state.image).then((res) => {
                /*this.setState({
                    error: res.error,
                    resstate: res.state,
                });*/
                this.props.navigation.navigate('Created Queues', {});
            }).catch(() => {Alert.alert('Network error!', 'We are unable to create a queue!')});
        });
    }

    launchCamera = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchCamera(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            var imageState = {
                name: response.assets[0].fileName,
                type: response.assets[0].type,
                uri: response.assets[0].uri,
            }
            this.setState({
                image: imageState,
            });
          }
        });
    }

    launchImageLibrary = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            var imageState = {
                name: response.assets[0].fileName,
                type: response.assets[0].type,
                uri: response.assets[0].uri,
            }
            console.log(imageState);
            this.setState({
                image: imageState,
            });
          }
        });
    }    

    render(){
        return(
            <View style={{flex:1}}>
                <Text>Queue Name</Text>
                <TextInput style={styles.input} onChangeText={(text)=>this.setState({name: text})}/>
                <Text>Queue Description</Text>
                <TextInput style={styles.input} onChangeText={(text)=>this.setState({description: text})}/>
               <Button title="Camera" onPress={this.launchCamera}/>
               <Button title="Gallery" onPress={this.launchImageLibrary}/>
               <Button title="Create Queue" onPress={() => this.createQueue()}/>
           </View>
        )
    }
}
