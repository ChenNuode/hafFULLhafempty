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

  loginPage = () => {
    this.setState({login: true});
  };

  signupPage = () => {
    this.setState({login: false});
  };

  conditionalRender(){
    if (this.state.login){
      return(<LoginScreen loggedin={this.props.loggedin} signupPage={this.signupPage} />)
    } else {
      return(<SignupScreen loggedin={this.props.loggedin} loginPage={this.loginPage} />)
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
