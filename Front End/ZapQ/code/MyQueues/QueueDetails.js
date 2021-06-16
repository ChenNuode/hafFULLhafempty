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
  TouchableOpacity,
  RefreshControl,
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
    Chip,
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
var mychipcolor = 'black'
const styles = StyleSheet.create({
    bigtext: {
        fontSize: 20,
    },
    mychip: {
        fontSize: 14,
        fontWeight:'bold',
        color:mychipcolor,
    },
    chipbutton: {
        //backgroundColor:'#7B68EE','salmon' #6CB4EE 
        backgroundColor:'#F0F8FF',
        marginHorizontal:5,
        padding:5,
        paddingRight:7
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

        this.updateTimer = setInterval(() => this.getDetails(), 7000);
        
        this.focusListener = this.props.navigation.addListener('blur', ()=>{clearInterval(this.updateTimer)})
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
        await AsyncStorage.getItem('@userinfo').then((res) => {

            res = JSON.parse(res);
            api.userQueueDetails(res.username, this.props.route.params.id).then((res) => {
                /*this.setState({
                    error: res.error,
                    resstate: res.state,
                });*/
                console.log(res);
                this.setState({queue: res});
            }).catch(() => {Alert.alert('Network error!', 'We are unable to retrieve queue details!')});
        });
    }

    getDirections(){
        this.getUserCenter().then((res) => {
            var url = "https://www.google.com/maps/dir/?api=1&origin="+this.state.userLocation.latitude+","+this.state.userLocation.longitude+"&destination="+this.state.queue.lati+","+this.state.queue.longi;
            console.log(url);
            Linking.openURL(url).catch((err) => console.error('An error occurred', err));
        })   
    }

    //https://www.google.com/maps/dir/?api=1&origin=34.1030032,-118.41046840000001&destination=34.059808,-118.368152

    pushQueue = async () => {
        await AsyncStorage.getItem('@userinfo').then((res) => {

            res = JSON.parse(res);
            api.pushbackQueue(res.username, this.props.route.params.id).then((res) => {
                /*this.setState({
                    error: res.error,
                    resstate: res.state,
                });*/
                this.getDetails()
            }).catch(() => {Alert.alert('Network error!', 'We are unable to retrieve queue details!')});
        });
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

    _refreshControl() {
        return (
            <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={()=>this._refreshListView()} />
        )
    };

    _refreshListView() {
        //Start Rendering Spinner
        this.setState({refreshing:true})
        this.getDetails();
        this.setState({refreshing:false}) //Stop Rendering Spinner
      }

    renderImage(uri){
        if(uri == null){
            return (
                    <Image
                        style={{width:100,height:100,alignSelf:'center',borderRadius:50}}
                        source={require('../images/defaultQimage2.png')}
                        PlaceholderContent={<Image style={styles.tinyLogo} source={require('../images/defaultQimage2.png')}></Image>}
                    />
            )
        } else {
            return (
                    <Image
                        style={{width:100,height:100,alignSelf:'center',borderRadius:50}}
                        source={{uri: api.beurl()+uri}}
                        PlaceholderContent={<Image style={styles.tinyLogo} source={require('../images/defaultQimage2.png')}></Image>}
                    />
            )
        }
    }

    render(){
        return(  
            <View style={{width:'100%',height:'100%','color':'#333234',backgroundColor:'snow'}}> 
                <ScrollView style={{width:'100%'}} contentContainerStyle={{flexGrow:1,alignItems:'center', justifyContent:'center'}} refreshControl={this._refreshControl()} > 
                
                <Card containerStyle={{alignItems:'center',justifyContent:'center',width:'85%',
                marginBottom:30,paddingVertical:20,paddingHorizontal:10}}>
                    <Card.Title h3>{this.state.queue.name}</Card.Title>
                    <Card.Divider/>
                        {this.renderImage(this.state.queue.image)}
                        
                        <View style={{marginTop:10,marginBottom:10,width:250}}>
                            
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:5}}>
                                
                                {/*<Text style={{fontSize:16,padding:2}}>Waiting Time: </Text>*/}
                                <View>
                                    <Chip titleStyle={styles.mychip}
                                        buttonStyle={styles.chipbutton}
                                        title={this.state.queue.eta+' min'}
                                            icon={{
                                            name: "timer-sharp",
                                            type: "ionicon",
                                            size: 32,
                                            color: mychipcolor,
                                        }}
                                    />
                                </View>

                                {/*<Text style={{fontSize:16,padding:2}}>People before me: </Text>*/}

                                <View>
                                    <Chip titleStyle={styles.mychip} 
                                        buttonStyle={[styles.chipbutton,{marginHorizontal:5}]}
                                        
                                        title={this.state.queue.position+ " in front"}
                                            icon={{
                                            name: "people",
                                            type: "ionicon",
                                            size: 32,
                                            color: mychipcolor,
                                        }}
                                        />
                                </View> 

                                {/*<Text h3 style={{flex:1,marginLeft:5,textAlign:'left'}}>{this.state.queue.title}</Text>*/}
                            </View>
                            
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:5}}>
                           
                                {/*<Text h3 style={{flex:1,marginLeft:5,textAlign:'left'}}>{this.state.queue.people}</Text>*/}
                            </View>
                            
                            
                        </View>
                </Card>
                
                <View style={{flexDirection:'row',justifyContent:'space-around',width:'85%'}}>
                    
                    <TouchableOpacity onPress={() => this.getDirections()} style={{flexDirection:'column',alignItems:'center',padding:5,justifyContent:'center'}}>
                        <Icon name='map' type="entypo" color='#333234' />
                        <Text style={{fontSize:14,marginTop:10}}>Get Directions</Text>
                    </TouchableOpacity>
                    
                    <Divider orientation="vertical"></Divider>
                    
                    <TouchableOpacity onPress={()=> this.pushQueue()} style={{flexDirection:'column',alignItems:'center',padding:5,justifyContent:'center'}}>
                        <Icon name='push-outline' type="ionicon" color='#333234' />
                        <Text style={{textAlign:'center',fontSize:12}}>Push Me{"\n"}Back 5 Places</Text>
                    </TouchableOpacity>
                    
                    <Divider orientation="vertical"></Divider>
                        
                    <TouchableOpacity onPress={() => this.leaveQueue()} style={{flexDirection:'column',alignItems:'center',padding:5,justifyContent:'center'}}>
                        <Icon name='cancel' type="material-community" color='#333234' />
                        <Text style={{fontSize:14,marginTop:10}}>Leave Queue</Text>
                    </TouchableOpacity>
                </View> 
                
                </ScrollView>
           </View>
           
           
        )
    }
}
