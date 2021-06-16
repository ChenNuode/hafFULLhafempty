import React, {Component} from 'react';
import {
    View,
    SafeAreaView,
} from 'react-native';
import api from './api';
import {
    Text,
    Button,
    Input,
    Badge,
} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class AccountPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      userdetails: ''
    };
  };

  usercall = async () => {
    await AsyncStorage.getItem('@userinfo').then((res) => {this.setState({apireq: JSON.parse(res)})});
    api.getUserInfo(this.state.apireq.username).then((res) => {
      this.setState({userdetails: res[0]});
    });
  };

  logout = async () => {
    await AsyncStorage.removeItem('@userinfo').catch((res) => {console.log(res)}).then(this.props.usercall());
  };

  componentDidMount(){
    this.usercall();
  };

  render() {
    return(
      <SafeAreaView style={{width:"100%",height:"100%"}}>
      <View style={{paddingVertical:20,paddingHorizontal:10,backgroundColor:'snow',flex:1,justifyContent:'flex-start'}}>
        
        <Text h2>Account Settings</Text>

        <Text style={{fontSize: 22,'color':'#333234',fontWeight: "bold",marginVertical:20}}>Account</Text>
        
        <Text> {this.state.userdetails.username} </Text>
        <Text> {this.state.userdetails.email}</Text>
        <Button
          title='Logout'
          onPress={() => {
            this.logout()
          }}
        />

        
      </View>
      </SafeAreaView>

      

    )
  }
}
