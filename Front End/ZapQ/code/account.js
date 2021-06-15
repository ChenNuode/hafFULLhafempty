import React, {Component} from 'react';
import {Text, View} from 'react-native';
import api from './api';
import {
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
      <View>
        <Text> {this.state.userdetails.username} </Text>
        <Text> {this.state.userdetails.email}</Text>
        <Button
          title='Logout'
          onPress={() => {
            this.logout()
          }}
        />
      </View>
    )
  }
}
