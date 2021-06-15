import React,{Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ViewBase,
} from 'react-native';

import {
    Button,
    Text,
    Divider,
    ListItem,
    Avatar,
    Badge,
} from 'react-native-elements';

//imports end

// in main js
// import MyQueuesPage from 'MyQueues.js';
// createBottomTabNavigator{
//    screen: MyQueuesPage};

const styles = StyleSheet.create({
    bigtext: {
        fontSize: 20,
    },

});

/*
const list = [
    {
      Q_name: 'Qname 1',
      Q_initial: 'Q1',
      Q_description: 'Queue to fk your mom',
      Q_ppl_left: '7',
      Q_ETA: '25',
    },
    {
      Q_name: 'Qname 2',
      Q_initial: 'Q2',
      Q_description: 'Queue to fk your mom again',
      Q_ppl_left: '3',
      Q_ETA: '10',
    },
]*/
  
export default class AccountPage extends Component{
        
    render(){
        return(
            <View style={{flex:1,alignItems: 'flex-start',paddingVertical:20,paddingHorizontal:10,'color':'#333234'}}>
               <Text h2>
                My Profile
               </Text>
               <View style={{flex:1,width:'100%',marginTop:30}}>
                    {/*<Text style={{fontSize: 22,'color':'#333234',fontWeight: "bold",marginBottom:10}}>Current Queues</Text>*/}
                </View>
                {/*<View style={{flex:2,width:'100%',marginTop:50}}>
                    <Text style={{fontSize: 22,'color':'#333234',fontWeight: "bold",marginBottom:10}}>Past Queues</Text>
                    {this.displayQueues()}
                </View>*/}
           </View>
        )
    }
}
