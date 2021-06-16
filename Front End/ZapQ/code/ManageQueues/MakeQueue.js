// This is the map picker


import React,{Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ViewBase,
  ActivityIndicator,
} from 'react-native';

import {
    Button,
    Text,
    Divider,
    ListItem,
    Avatar,
    Badge,
} from 'react-native-elements';

import MapPicker from "react-native-map-picker";
import GetLocation from 'react-native-get-location'

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
  
export default class MakeQueuePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            queues: [],
            location: {latitude:0,longitude:0},
            locationReady: false,
        }
    };

    getMapCenter(){
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            console.log(location);
            this.setState({location: location, locationReady: true});
        })
    }

    componentDidMount(){
        //API Logic

        this.getMapCenter();
    };

    chooseLocation(latitude, longitude){
        console.log(latitude, longitude);
        this.props.navigation.navigate('Confirm Queue', {lat: latitude, long: longitude});
    }

    
    mapRender(){
        if(this.state.locationReady){
            return(
                <MapPicker
                    initialCoordinate={{
                        latitude: this.state.location.latitude,
                        longitude: this.state.location.longitude,
                    }}
                    onLocationSelect={({latitude, longitude})=>this.chooseLocation(latitude,longitude)}
                    buttonStyle={{backgroundColor:'tomato',width:200}}
                    textStyle={{fontSize:18,fontWeight:'bold',padding:8}}
                />
                
            )
        } else {
            return(

                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <ActivityIndicator color="#EE214E" size="large" />
                    <Text h4 style={{marginTop:10}}>Getting your location :)</Text>
                    <Text h4 style={{marginTop:10}}>(Turn Location Permissions on!)</Text>
                </View>
            )
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                {this.mapRender()}
           </View>
        )
    }
}
