import React, {Component} from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from 'react-native';
import api from './api';
import LinearGradient from 'react-native-linear-gradient';

import {
    Text,
    Button,
    ListItem,
    Image,
    Icon,
    Divider,
} from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';
//imports end

//styles
const styles = StyleSheet.create({
  settingitemstyle: {
      backgroundColor:'transparent',
      paddingHorizontal:0,
      paddingVertical:10,
      marginVertical:5,
  },
  itemtext:{
    fontSize:17,
  }

});

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
      
      <View style={{paddingTop:20,paddingHorizontal:15,paddingBottom:10,justifyContent:'flex-end',height:100,backgroundColor:'snow'}}>
          <Text h2 style={{color:"black"}}>Account Settings</Text>
      </View>
      <View style={{backgroundColor:'snow',flex:1,justifyContent:'flex-start','color':'#333234',paddingTop:10,paddingHorizontal:15}}>
        <ScrollView style={{height:'100%'}}>
          <Image
            source={require('./images/QueueArtSetting.png')}
            style={{ width:'100%',height:105}}
            resizeMode="cover"
          />
          <Text h4 style={{marginTop:20}}>Account</Text>
          <ListItem containerStyle={styles.settingitemstyle} bottomDivider>
              <ListItem.Content>
              <ListItem.Title style={styles.itemtext}>Username</ListItem.Title>
              <ListItem.Subtitle>{this.state.userdetails.username}</ListItem.Subtitle>
              </ListItem.Content>
          </ListItem>
          <ListItem containerStyle={styles.settingitemstyle} bottomDivider>
              <ListItem.Content>
              <ListItem.Title style={styles.itemtext}>Email</ListItem.Title>
              <ListItem.Subtitle>{this.state.userdetails.email}</ListItem.Subtitle>
              </ListItem.Content>
          </ListItem>

          <Text h4 style={{marginTop:30,marginBottom:0}}>Help &amp; Feedback</Text>
          <ListItem containerStyle={styles.settingitemstyle} bottomDivider>
              <ListItem.Content>
              <ListItem.Title style={styles.itemtext}>Help</ListItem.Title>
              </ListItem.Content>
          </ListItem>
          <ListItem containerStyle={styles.settingitemstyle} bottomDivider>
              <ListItem.Content>
              <ListItem.Title style={styles.itemtext}>Report Vulnerability</ListItem.Title>
              </ListItem.Content>
          </ListItem>


          <Text h4 style={{marginTop:30,marginBottom:0}}>Others</Text>
          <ListItem containerStyle={styles.settingitemstyle} bottomDivider>
              <ListItem.Content>
              <ListItem.Title style={styles.itemtext}>Privacy Policy</ListItem.Title>
              </ListItem.Content>
          </ListItem>
          <ListItem containerStyle={styles.settingitemstyle} bottomDivider>
              <ListItem.Content>
              <ListItem.Title style={styles.itemtext}>Terms of Use</ListItem.Title>
              </ListItem.Content>
          </ListItem>
          
          
      

          <ListItem containerStyle={[styles.settingitemstyle,{justifyContent:'center'}]}>
            <Button raised title='Logout' buttonStyle={{width:120}} onPress={() => {this.logout()}}/>
          </ListItem>
            

        </ScrollView>

        
      </View>
      </SafeAreaView>

      

    )
  }
}
