import React,{Component} from 'react';
import {
  View,
} from 'react-native';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';

export default class UserAuth extends Component{
  constructor(props){
    super(props);
    this.state = {
      login: true,
    }
  };

  conditionalRender(){
    if (this.state.login){
      return(<LoginScreen />)
    } else {
      return(<SignupScreen />)
    }
  };

  render(){
    return(
      <View style={{flex: 1}}>
        {this.conditionalRender()}
      </View>
    )
  }
}
