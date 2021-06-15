//imports start
import React,{Component} from 'react';
import {
  View,
} from 'react-native';

import {
    Button,
    Input,
    Text,
    Badge,
} from 'react-native-elements';

//imports end

// in main js
// import MyQueuesPage from 'MyQueues.js';
// createBottomTabNavigator{
//    screen: MyQueuesPage};

export default class LoginScreen extends Component{
    render(){
        return(
           <View style={{flex:1,justifyContent: 'center',alignItems: 'center',paddingHorizontal:40}}>
               <Text h1 h1Style={{fontSize: 35, textAlign: 'center','color':'#333234'}}>Welcome to ZapQ</Text>
               <Text style={{fontSize:16,marginTop:10}}>New to ZapQ? <Text style={{color:'#2a9df4',fontWeight: "bold"}}>Sign Up</Text> instead!</Text>
                <Input containerStyle={{ width:'100%',marginTop:30,marginBottom:0}}
                placeholder='Username'
                />

                <Input containerStyle={{ width:'100%',marginTop:0,marginBottom:20}} placeholder="Password" secureTextEntry={true} errorStyle={{ color: 'red',fontSize:14}}
                errorMessage='Error message goes here'/>

                <Button
                    raised
                    buttonStyle={{ width: 160,backgroundColor:"#2CB76B"}}
                    containerStyle={{ marginVertical: 10}}
                    onPress={() => alert("TENGGO with the login API")}
                    title="Log In"
                    titleStyle={{color:'black',fontSize:17}}
                    />
                
                
           </View> 
        )
    }
}
