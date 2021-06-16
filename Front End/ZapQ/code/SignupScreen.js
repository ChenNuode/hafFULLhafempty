import React,{Component} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import {
    Button,
    Input,
    Text,
    Badge,
} from 'react-native-elements';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

//imports end

// in main js
// import MyQueuesPage from 'MyQueues.js';
// createBottomTabNavigator{
//    screen: MyQueuesPage};


export default class SignupScreen extends Component{
    constructor(props){
      super(props);
      this.state={
        error: '',
        usernameerror: '',
        emailerror: '',
        passworderror:''
      };
    };

    signUp(){
      if (this.state.password !== this.state.password2) {
        this.setState({error: 'Passwords do not match! Please re-enter!'});
      } else {
        var submission = {username: this.state.username, email: this.state.email, password: this.state.password};
        api.createUser(submission).then((res) => {
          console.log(res);
          if (res.state === 'Denied') {
            if (res.errors.username != null) {
              var usernameerror = res.errors.username[0];
            } else {
              var usernameerror = ''
            };
            if (res.errors.email != null) {
              var emailerror = res.errors.email[0]
            } else {
              var emailerror = ''
            };
            if (res.errors.password != null) {
              var passworderror = res.errors.password[0]
            } else {
              var passworderror = ''
            };
            this.setState({
              usernameerror: usernameerror,
              passworderror: passworderror,
              emailerror: emailerror
            });
          } else if (res.state === 'Success') {
            this.setState({
              username: this.state.username,
              password: this.state.password1,
              usertoken: res.token
            });
            this.logincheck().then(() => {this.props.loggedin();});
        }}).catch(() => {
          Alert.alert('Network error!', 'We are unable to sign you up!')
        });
      }
    };

    logincheck = async () => {
      const LoginInfo = {username: this.state.username, password: this.state.password, token: this.state.usertoken};
      await AsyncStorage.setItem('@userinfo', JSON.stringify(LoginInfo)).then(
        () => {
          console.log('Login was successful!');
      }
      ).catch(
        () => {this.setState({
          error: "Can't store account into device AsyncStorage!",
        })}
      );
    }

    render(){
        return(
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
           <View style={{flex:1,justifyContent: 'center',alignItems: 'center',paddingHorizontal:40}}>
               <Text h1 h1Style={{fontSize: 40, textAlign: 'center','color':'#333234'}}>Register</Text>
               <Text style={{fontSize:16,marginTop:10}}>Have an account? <Text style={{color:'#2CB76B',fontWeight: "bold"}} onPress={() => this.props.loginPage()}>Log in</Text> instead!</Text>
                <Input containerStyle={{ width:'100%',marginTop:20,marginBottom:0}}
                placeholder='Username'
                errorMessage={this.state.usernameerror}
                ref = {input => {this.username = input}}
                onChangeText = {(text) => this.setState({username: text})}
                />
                <Input containerStyle={{ width:'100%'}}
                placeholder='Email'
                errorMessage={this.state.emailerror}
                ref = {input => {this.email = input}}
                onChangeText = {(text) => this.setState({email: text})}
                />

                <Input containerStyle={{ width:'100%'}} placeholder="Password" secureTextEntry={true}
                ref = {input => {this.password = input}}
                errorMessage={this.state.passworderror}
                onChangeText = {(text) => this.setState({password: text})}
                />

                <Input containerStyle={{ width:'100%',marginTop:0,marginBottom:15}} placeholder="Confirm Password" secureTextEntry={true} errorStyle={{ color: 'red',fontSize:14}}
                errorMessage={this.state.error}
                ref = {input => {this.password2 = input}}
                onChangeText = {(text) => this.setState({password2: text})}
                />
                <Button
                    raised
                    buttonStyle={{ width: 160,backgroundColor:"#2a9df4"}}
                    containerStyle={{ margin: 10,marginBottom:20}}
                    onPress={() => this.signUp()}
                    title="Sign Up"
                    titleStyle={{color:'black',fontSize:17}}
                />

           </View>
          </TouchableWithoutFeedback>
        )
    }
}
