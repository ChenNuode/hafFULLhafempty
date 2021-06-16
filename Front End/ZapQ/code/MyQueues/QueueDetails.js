import React,{Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ViewBase,
  Linking,
  Alert,
} from 'react-native';

import {
    Button,
    Text,
    Divider,
    ListItem,
    Avatar,
    Badge,
} from 'react-native-elements';
import api from '../api'
import GetLocation from 'react-native-get-location'
import { Directions } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  
export default class QueueDetailsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            queue: {},
            userLocation: {latitude:0,longitude:0},
            locationReady: false,
        }
    };

    componentDidMount(){
        //API Logic
        this.getDetails();
    };
    
    getUserCenter = async() => {
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            this.setState({userLocation: location, locationReady: true});
        })
    }

    getDetails = async () => {
        api.getQueueInfo(this.props.route.params.id).then((res) => {
            /*this.setState({
                error: res.error,
                resstate: res.state,
            });*/
            console.log(res);
            this.setState({queue: res});
        }).catch(() => {Alert.alert('Network error!', 'We are unable to retrieve queue details!')});
    }

    getDirections(){
        this.getUserCenter().then((res) => {
            var url = "https://www.google.com/maps/dir/?api=1&origin="+this.state.userLocation.latitude+","+this.state.userLocation.longitude+"&destination="+this.state.queue.lati+","+this.state.queue.longi;
            console.log(url);
            Linking.openURL(url).catch((err) => console.error('An error occurred', err));
        })   
    }

    //https://www.google.com/maps/dir/?api=1&origin=34.1030032,-118.41046840000001&destination=34.059808,-118.368152

    pushQueue(){
        //API Call to admit
    }

    leaveQueue = async () => {
        //Api call to delete queue
        await AsyncStorage.getItem('@userinfo').then((res) => {
            res = JSON.parse(res);
            console.log(res);

            api.userLeaveQueue(res.username, this.props.route.params.id).then((res) => {
                /*this.setState({
                    error: res.error,
                    resstate: res.state,
                });*/
                console.log(res);
    
                Alert.alert('Success', 'Successfullly left queue');
                
                this.props.navigation.navigate('Queue List', {});
            }).catch(() => {Alert.alert('Network error!', 'We are unable to leave the queue!')});
        });
    }

    render(){
        return(
            <View style={{flex:1,alignItems: 'flex-start',paddingVertical:20,paddingHorizontal:10,'color':'#333234'}}>
                <Text style={{fontSize: 64}}>
                    Details for {this.state.queue.name} (ID {this.props.route.params.id})
                </Text>
                <Text style={{fontSize: 64}}>{this.state.queue.desc}</Text>    
                <Text style={{fontSize: 32}}>{this.state.queue.queue_length} people in queue</Text>
                <Button title="Get directions" 
                    onPress={() => this.getDirections()}
                />
                {/*<Button title="Push me back 5 places" 
                        onPress={() => this.props.navigation.navigate('Queue List', {})}
                />*/}
                <Button title="Leave Queue" 
                        onPress={() => this.leaveQueue()}
                />
           </View>
        )
    }
}
