import React,{Component} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
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

export default class LoginScreen extends Component{
    constructor(props){
      super(props);
      this.state = {
        error: '',
        keyboardstate: 'f',
      };
      this._keyboardDidHide = this._keyboardDidHide.bind(this);
      this._keyboardDidShow = this._keyboardDidShow.bind(this);
    };

    componentDidMount(){
      this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this._keyboardDidShow,
      );
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this._keyboardDidHide,
      );
    };

    componentWillUnmount() {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    };

    _keyboardDidShow(){
      this.setState({keyboardstate: 't'});
    };

    _keyboardDidHide(){
      this.setState({keyboardstate: 'f'});
    };

    onLogin(){
      if (this.state.username !== undefined && this.state.password !== undefined) {
        api.getLogin(this.state.username, this.state.password).then((res) => {
          this.setState({
            error: res.error,
            resstate: res.state,
            usertoken: res.token,
          })
          this.logincheck();
        }).catch(() => {Alert.alert('Network error!', 'We are unable to log you in!')});
      } else {
        this.setState({error: 'Please enter both a Username and Password!'});
      };
    };

    logincheck = async () => {
      if (this.state.resstate === 'Success'){
        const LoginInfo = {username: this.state.username, password: this.state.password, token: this.state.usertoken};
        await AsyncStorage.setItem('@userinfo', JSON.stringify(LoginInfo)).then(
          () => {
            console.log('Login was successful!');
        }
        ).catch(
          () => {this.setState({
            error: "Can't store account into device AsyncStorage!",
          })}
        ).then(
          () => {this.props.loggedin();}
        );
      } else if (this.state.resstate === 'Denied') {
        this.username.clear();
        this.password.clear();
      }
    };

    render(){
        return(
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
           <View style={{flex:1,justifyContent: 'center',alignItems: 'center',paddingHorizontal:40}}>
               <Text h1 h1Style={{fontSize: 35, textAlign: 'center','color':'#333234'}}>Welcome to ZapQ</Text>
               <Text style={{fontSize:16,marginTop:10}}>New to ZapQ? <Text style={{color:'#2a9df4',fontWeight: "bold"}} onPress={() => this.props.signupPage()}>Sign Up</Text> instead!</Text>
                <Input containerStyle={{ width:'100%',marginTop:30,marginBottom:0}}
                placeholder='Username'
                ref = {input => {this.username = input}}
                onChangeText = {(text) => this.setState({username: text})}
                />

                <Input containerStyle={{ width:'100%',marginTop:0,marginBottom:20}} placeholder="Password" secureTextEntry={true} errorStyle={{ color: 'red',fontSize:14}}
                errorMessage={this.state.error}
                ref = {input => {this.password = input}}
                onChangeText = {(text) => this.setState({password: text})}
                />

                <Button
                    raised
                    buttonStyle={{ width: 160,backgroundColor:"#2CB76B"}}
                    containerStyle={{ marginVertical: 10}}
                    onPress={() => {this.onLogin();}}
                    title="Log In"
                    titleStyle={{color:'black',fontSize:17}}
                    />


           </View>
          </TouchableWithoutFeedback>
        )
    }
}
