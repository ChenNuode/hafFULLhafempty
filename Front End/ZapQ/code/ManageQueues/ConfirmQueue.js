import React,{Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {
    Button,
    Text,
    Divider,
    Icon,
    Input,
    Image,

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
    buttone: {
      alignSelf:'center',
      width:200,
      marginBottom:10,
    }
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
            if(response.assets != null){
              var imageState = {
                  name: response.assets[0].fileName,
                  type: response.assets[0].type,
                  uri: response.assets[0].uri,
              }
              this.setState({
                  image: imageState,
              });
            } else {
              Alert.alert('Permissions error!', 'We are unable to open the camera!')
            }
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
            if(response.assets != null){
              var imageState = {
                  name: response.assets[0].fileName,
                  type: response.assets[0].type,
                  uri: response.assets[0].uri,
              }
              this.setState({
                  image: imageState,
              });
            } else {
              Alert.alert('Permissions error!', 'We are unable to open your gallery!')
            }
          }
        });
    }    

    render(){
        return(
            <View style={{flex:1,paddingVertical:20,paddingHorizontal:15}}>
                
                <Text style={{fontSize:24,fontWeight:'bold'}}>Queue Name</Text>
                <Input
                  placeholder="E.g. Queue to get TraceTogether Token..."
                  leftIcon={{ type: 'material-community', name: 'rename-box' }}
                  onChangeText={(text)=>this.setState({name: text})}
                  style={{fontSize:16}}
                />
              
                <Text style={{fontSize:24,fontWeight:'bold'}}>Queue Description</Text>
                <Input
                  placeholder="Queue Description Here!"
                  leftIcon={{ type: 'entypo', name: 'text' }}
                  onChangeText={(text)=>this.setState({description: text})}
                  style={{fontSize:16}}
                />
                <Text style={{fontSize:24,fontWeight:'bold'}}>Upload a Queue Icon</Text>
                <Text style={{fontSize:14,color:'#333234'}}>If empty, a default picture will be given</Text>

               <View style={{flexDirection:'row',justifyContent:'space-around',width:'85%',marginVertical:30,alignSelf:'center'}}>
                    <TouchableOpacity onPress={this.launchCamera}>
                        <Icon name='camera' type="entypo" color='#333234' />
                        <Text style={{fontSize:14}}>Camera</Text>
                    </TouchableOpacity>
                    
                    <Divider orientation="vertical"></Divider>
                    
                    <TouchableOpacity onPress={this.launchImageLibrary}>
                        <Icon name='photograph' type="fontisto" color='#333234' />
                        <Text style={{textAlign:'center',fontSize:14}}>Gallery</Text>
                    </TouchableOpacity>
                </View>

                <Button round buttonStyle={styles.buttone} title="Create Queue" onPress={() => this.createQueue()}/>

           </View>
        )
    }
}
