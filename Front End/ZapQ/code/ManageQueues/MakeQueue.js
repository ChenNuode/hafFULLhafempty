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

import MapPicker from "react-native-map-picker";

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
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      Q_description: 'Queue to fk your mom',
      Q_ppl_left: '7',
      Q_ETA: '25',
    },
    {
      Q_name: 'Qname 2',
      Q_initial: 'Q2',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      Q_description: 'Queue to fk your mom again',
      Q_ppl_left: '3',
      Q_ETA: '10',
    },
]*/
  
export default class MakeQueuePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            queues: [],
        }
    };

    componentDidMount(){
        //API Logic
        var queues = [
            {id:1, title: "NEX", people: 200},
            {id:2, title: "Junction 8", people: 150},
            {id:3, title: "Junction 9", people: 50},
            {id:4, title: "Junction 10", people: 100},
        ]
    };

    chooseLocation(latitude, longitude){
        console.log(latitude, longitude);
        this.props.navigation.navigate('Confirm Queue', {lat: latitude, long: longitude});
    }

    render(){
        return(
            <View style={{flex:1}}>
                <MapPicker
                    initialCoordinate={{
                        latitude: 1.35111, longitude: 103.84868,
                    }}
                    onLocationSelect={({latitude, longitude})=>this.chooseLocation(latitude,longitude)}
                />
           </View>
        )
    }
}
