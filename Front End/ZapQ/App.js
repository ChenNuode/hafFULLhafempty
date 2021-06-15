import React, {Component} from 'react';
import type {Node} from 'react';
import {
  Text,
  View,
} from 'react-native';

import AppRoot from './code/AppRoot';
import UserAuth from './code/UserAuth';
import AppLoad from './code/loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import { AppRegistry } from 'react-native';

//AppRegistry.registerComponent('your app name',  () => point);
export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loading: true,
      signedin: false,
      userdict: {},
    }
  }


  componentDidMount(){
    this.usercall();
  };


  usercall = async () => {
    AsyncStorage.getItem('@userinfo').then(async (userinfo) => {
      if (userinfo === null) {
        await this.setState({signedin: false});
      } else {
        try {
          const tui = JSON.parse(userinfo);
          const userdict = {username: tui.username, password:tui.password, token: tui.token};
          if (this.state.userinfo !== userdict) {
            await this.setState({userinfo: userdict});
          };
          await this.setState({signedin: true});
        } catch(e) {
          this.userdestroy();
          Alert.alert('User Login Error!', 'There was an error fetching your previous login, please relogin.');
          await this.setState({signedin: false});
        };
      };
    }).then(() =>
      {this.setState({loading: false});}
    );;
  };


  userdestroy = async() => {
    await AsyncStorage.removeItem('@userinfo');
  };

  conditionalRender(){
    if (this.state.signedin){
      return(<AppRoot usercall={this.usercall}/>)
    } else {
      return(<UserAuth loggedin={this.usercall}/>)
    }

  };

  render(){
    if (this.state.loading){
      return(
        <AppLoad />
      )
    }
    return(
      <View style={{flex: 1}}>
        {this.conditionalRender()}
      </View>
    )
  }
};
/*
import React, {Component} from 'react';
import {Alert, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PixoAppRoot from './approot';
import UserHandlePage from './loginpage';
import AppLoad from './loading';
import api from './Pixorift/api';
import TimerMixin from 'react-native-timer-mixin';

export default class PixoRoot extends Component{
  constructor(props){
    super(props);
    this.state = {
      loadstate: 'loading',
      refreshprog: 'f'
    };
    var TimeMixin = require('react-native-timer-mixin');
  };

  tokenrefresh = async (username, password, TimeNow) => {
    api.getLogin(username, password).catch(() => {
      this.tokenfail();
    }).then(
      (res) => {
        this.setState({
          resstate: res.state,
          usertoken: res.token,
        });
        if (this.state.resstate === 'Denied') {
          this.tokenfail();
        } else {
          this.tokensuccess(TimeNow);
        }
      }
    );
  };

  tokensuccess = (TimeNow) => {
    const userdict = this.state.userinfo;
    userdict['login'] = TimeNow;
    userdict['token'] = this.state.usertoken;
    this.userupdate(userdict);
    this.setState({userinfo: userdict});
  };

  tokenfail = () => {
    this.userdestroy();
    Alert.alert('User Login Error!', 'There was an error fetching your previous login, please relogin to Pixorift.');
    this.setState({refreshprog: 'f', loadstate: 'false'});
  };

  userupdate = async(userdict) => {
    const r = await AsyncStorage.getItem('@userinfo');
    if (r !== null){
      await AsyncStorage.setItem('@userinfo', JSON.stringify(userdict)).then(() => {
        this.setState({loadstate: 'true'});
      });
    };
    this.setState({refreshprog: 'f'});
  };

  userdestroy = async() => {
    await AsyncStorage.removeItem('@userinfo');
  };

  trefresh = async () => {
    const TimeNow = Date.parse(new Date());
    const DayInt = Number(86400000);
    const TimeDiff = TimeNow - parseInt(this.state.userinfo.login);
    if (TimeDiff > DayInt) {
      if (this.state.refreshprog === 'f') {
        this.setState({refreshprog: 't'});
        this.tokenrefresh(this.state.userinfo.username, this.state.userinfo.password, TimeNow);
        console.log(TimeDiff);
      };
    };
  };

  usercall = async (init) => {
    if (init === undefined) {
      init === 'f'
    };
    AsyncStorage.getItem('@userinfo').catch(
      async () => {
        if (this.state.loadstate !== 'false'){
          await this.setState({loadstate: 'false'});
        };
      }
    ).then(async (userinfo) => {
      if (userinfo === null) {
        await this.setState({loadstate: 'false'});
      } else {
        try {
          const tui = JSON.parse(userinfo);
          const userdict = {username: tui.username, password:tui.password, token: tui.token, login: tui.login};
          if (this.state.userinfo !== userdict) {
            await this.setState({userinfo: userdict});
          };
          if (init === 't') {
            this.setState({refreshprog: 't'});
            this.tokenrefresh(this.state.userinfo.username, this.state.userinfo.password, Date.parse(new Date()));
            console.log('initializing application');
          } else {
            this.setState({loadstate: 'true'});
          };
        } catch {
          this.userdestroy();
          Alert.alert('User Login Error!', 'There was an error fetching your previous login, please relogin to Pixorift.');
          await this.setState({loadstate: 'false'});
        };
      };
    });
  };

  componentDidMount(){
    this.usercall('t');
    setInterval(() => {
      if (this.state.loadstate === 'true'){
        this.trefresh();
      };
    }, Number(15000));
  };


  conditionalrender = () => {
    if (this.state.loadstate === 'true'){
      return <PixoAppRoot screenProps={{usercheck: this.usercall}}/>;
    } else if (this.state.loadstate === 'false') {
      return <UserHandlePage usercheck={this.usercall}/>;
    } else {
      return <AppLoad />;
    };
  };

  render(){
    return(
      <View style={{flex: 1}}>
        {this.conditionalrender()}
      </View>
    )
  }
};
*/
