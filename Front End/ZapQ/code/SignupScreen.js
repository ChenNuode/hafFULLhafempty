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

function triggerlogin() {
    alert("Hello binner login")
}

export default class SignupScreen extends Component{
    render(){
        return(
           <View style={{flex:1,justifyContent: 'center',alignItems: 'center',paddingHorizontal:40}}>
               <Text h1 h1Style={{fontSize: 40, textAlign: 'center','color':'#333234'}}>Register</Text>
               <Text style={{fontSize:16,marginTop:10}}>Have an account? <Text style={{color:'#2CB76B',fontWeight: "bold"}} onPress={() => triggerlogin()}>Log in</Text> instead!</Text>
                <Input containerStyle={{ width:'100%',marginTop:20,marginBottom:0}}
                placeholder='Username'

                />

                <Input containerStyle={{ width:'100%'}} placeholder="Password" secureTextEntry={true}/>

                <Input containerStyle={{ width:'100%',marginTop:0,marginBottom:15}} placeholder="Confirm Password" secureTextEntry={true} errorStyle={{ color: 'red',fontSize:14}}
                errorMessage='Error message goes here'/>
                <Button
                    raised
                    buttonStyle={{ width: 160,backgroundColor:"#2a9df4"}}
                    containerStyle={{ margin: 10,marginBottom:20}}
                    onPress={() => alert("TENGGO with the signup API")}
                    title="Sign Up"
                    titleStyle={{color:'black',fontSize:17}}
                />

           </View>
        )
    }
}
