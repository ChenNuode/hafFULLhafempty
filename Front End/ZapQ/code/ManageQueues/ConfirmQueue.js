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
            name: "",
            description: "",
            userdata: {username: ""},
        }
    };

    usercall = async () => {
      await AsyncStorage.getItem('@userinfo').then((res) => {this.setState({userdata: JSON.parse(res)})});
    };

    createQueue(){
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
        this.usercall().then(()=>{console.log(this.state.userdata.username)})
        console.log(this.state.name, this.state.description);
        console.log(this.props.route.params.lat, this.props.route.params.long);
        //Tested
        api.makeQueue(this.state.userdata.username, this.state.name, this.state.description, this.props.route.params.lat, this.props.route.params.long).then((res) => {
            /*this.setState({
                error: res.error,
                resstate: res.state,
            });*/
            this.props.navigation.navigate('Created Queues', {});
        }).catch(() => {Alert.alert('Network error!', 'We are unable to create a queue!')});
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Text>Queue Name</Text>
                <TextInput style={styles.input} onChangeText={(text)=>this.setState({name: text})}/>
                <Text>Queue Description</Text>
                <TextInput style={styles.input} onChangeText={(text)=>this.setState({description: text})}/>
               <Button title="Create Queue" onPress={() => this.createQueue()}/>
           </View>
        )
    }
}
