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
  Image,
  Alert,
  TouchableOpacity
} from 'react-native';

import {
    Button,
    Text,
    Divider,
    ListItem,
    Avatar,
    Badge,
    Card,
    Icon,
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
            <View style={{flex:1,'color':'#333234',backgroundColor:'snow',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}>
                
                <Card containerStyle={{alignItems:'center',justifyContent:'center',width:'85%',
                marginBottom:30,paddingVertical:20,paddingHorizontal:10}}>
                    <Card.Title h3>My Queue Ticket</Card.Title>
                    <Card.Divider/>
                    
                        <Image source={require('../images/defaultQimage2.png')} 
                        style={{width:100,height:100,alignSelf:'center'}} />
                        
                        <View style={{marginTop:10}}>
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{flex:1,fontSize:16}}>Queue name: </Text>
                                <Text h3 style={{flex:1,marginLeft:5,textAlign:'left'}}>{this.state.queue.title}{/*(ID {this.props.route.params.id})*/}</Text>
                            </View>
                            
                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                                <Text style={{flex:1,fontSize:12,padding:2}}>People before me: </Text>
                                <Text h3 style={{flex:1,marginLeft:5,textAlign:'left'}}>{this.state.queue.people}</Text>
                            </View>
                        </View>
                </Card>
                
                <View style={{flexDirection:'row',justifyContent:'space-around',width:'85%'}}>
                    
                    <TouchableOpacity onPress={() => this.getDirections()} style={{flexDirection:'column',alignItems:'center',padding:5,justifyContent:'center'}}>
                        <Icon name='map' type="entypo" color='#333234' />
                        <Text style={{fontSize:14,marginTop:10}}>Get directions</Text>
                    </TouchableOpacity>
                    
                    <Divider orientation="vertical"></Divider>
                    
                    <TouchableOpacity onPress={()=> {alert('Run function here')}} style={{flexDirection:'column',alignItems:'center',padding:5,justifyContent:'center'}}>
                        <Icon name='push-outline' type="ionicon" color='#333234' />
                        <Text style={{textAlign:'center',fontSize:12}}>Push me{"\n"}back 5 places</Text>
                    </TouchableOpacity>
                    
                    <Divider orientation="vertical"></Divider>
                        
                    <TouchableOpacity onPress={() => this.leaveQueue()} style={{flexDirection:'column',alignItems:'center',padding:5,justifyContent:'center'}}>
                        <Icon name='cancel' type="material-community" color='#333234' />
                        <Text style={{fontSize:14,marginTop:10}}>Leave Queue</Text>
                    </TouchableOpacity>
                </View>
           </View>
        )
    }
}
