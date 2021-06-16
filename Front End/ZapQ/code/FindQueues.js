//imports start
import React,{Component} from 'react';

import {
  View,
  Image,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

import {
    Button,
    ThemeProvider,
    Overlay,
    SearchBar,
    Text,
    Avatar,
    ListItem,
    FAB,
    Icon,
    Divider,
} from 'react-native-elements';

import MapView, {Marker} from "react-native-maps";
import GetLocation from 'react-native-get-location'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, {beurl} from './api';

const styles = StyleSheet.create({
    tinyLogo: {
      width: 40,
      height: 40, //aspect ratio of w-h is 317:456
      borderRadius:40/2,

    },
    tinyuserlogo: {
        width: 35,
        height: 35,
        //aspect ratio of w-h
      },
    Ocontainer : {
        width:"80%",
        height:"50%",
        borderRadius:20,
        padding:20,
        justifyContent:'space-around',
        flexDirection:'column',
    },
    myFAB : {
        width:62,
        borderRadius:50,
        height:62,
        paddingLeft:17,
    }
  });

const mapRef = React.createRef();

export default class FindQueuesPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            markerdata: [],
            overlayon: false,
            overlaydata: {},
            location: {latitude:0,longitude:0},
            userLocation: {latitude:0,longitude:0},
            locationReady: false,
            search: "",
            searchResults: [],
            keyboardstate: false,
            currentSearch: 1,
        }
        this._keyboardDidHide = this._keyboardDidHide.bind(this);
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
    };

    updateSearch = async (search) => {
        this.setState({ search: search });
        
        if(search == ""){ this.setState({searchResults: []}); return; }
        //API Logic
        await api.searchQueue(search).then((res) => {
            /*this.setState({
                error: res.error,
                resstate: res.state,
            });*/
            this.setState({searchResults: res});
        }).catch(() => {/*Alert.alert('Network error!', 'We are unable to retrieve searches!')*/});
    };

    getUserCenter = async() => {
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            this.setState({userLocation: location, locationReady: true});
            this.setState({location: location})
        })
    }

    setMapCenter(latitude, longitude){
        Keyboard.dismiss();
        this.setState({location: {latitude:latitude, longitude: longitude}});
        mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0065,
            longitudeDelta: 0.0065,
        })
    }

    userCenterMap = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            this.setState({userLocation: location, locationReady: true});
            this.setState({location: location})
            this.setMapCenter(this.state.userLocation.latitude, this.state.userLocation.longitude)
        })
    }

    showSearchResults(){
        if (this.state.keyboardstate){
            return this.state.searchResults.map((item, i) => {
                return (
                    <ListItem key={i} bottomDivider raised
                              onPress={()=>{
                                  this.setMapCenter(parseFloat(item.lati), parseFloat(item.longi));
                              }}>
                        <ListItem.Content>
                            <ListItem.Title style={{fontWeight: "bold",color:"#EE214E"}}>{item.name}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                );
            });
        };
    }

    componentDidMount(){
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );

        this.focusListener = this.props.navigation.addListener('focus', this.userCenterMap)
        
        this.getUserCenter().then(() => {this.findQueues()});

        this.updateTimer = setInterval(() => this.findQueues(), 7000);
        
        this.focusListener = this.props.navigation.addListener('blur', ()=>{clearInterval(this.updateTimer)})
    };

    findQueues = async () => {
        //API Logic]
        await api.nearbyQueues(this.state.location.latitude, this.state.location.longitude).then((res) => {
            /*this.setState({
                error: res.error,
                resstate: res.state,
            });*/
            this.setState({markerdata: res});
        }).catch(() => {Alert.alert('Network error!', 'We are unable to retrieve queues!')});
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    };

    _keyboardDidShow(){
        this.setState({keyboardstate: true});
    };

    _keyboardDidHide(){
        this.setState({keyboardstate: false});
    };

    markerPress = async (id) => {

        await AsyncStorage.getItem('@userinfo').then((res) => {

            res = JSON.parse(res);
            api.userQueueInfo(res.username, id).then((res) => {
                /*this.setState({
                    error: res.error,
                    resstate: res.state,
                });*/
                var temp = res;
                temp.id = id;
                this.setState({
                    overlayon: true,
                    overlaydata: temp,
                });
            }).catch(() => {Alert.alert('Network error!', 'We are unable to retrieve queue details!')});
        });
    };

    queueUp = async(id)=>{
        await AsyncStorage.getItem('@userinfo').then((res) => {

            res = JSON.parse(res);
            //Tested
            api.userJoinQueue(res.username, id).then((res) => {
                /*this.setState({
                    error: res.error,
                    resstate: res.state,
                });*/
                this.setState({overlayon: false});
                this.props.navigation.navigate('My Queues', {});
                
                //redirect to the my queues page
            }).catch(() => {Alert.alert('Network error!', 'We are unable to queue up!')});
        });
    }

    renderImage(uri){
        if(uri == null){
            return (
                <View>
                    <Image
                        style={styles.tinyLogo}
                        source={require('./images/defaultQimage2.png')}
                        PlaceholderContent={<Image style={styles.tinyLogo} source={require('./images/defaultQimage2.png')}></Image>}
                    />
                </View>
            )
        } else {
            return (
                <View>
                    <Image
                        style={styles.tinyLogo}
                        source={{uri: api.beurl()+uri}}
                        PlaceholderContent={<Image style={styles.tinyLogo} source={require('./images/defaultQimage2.png')}></Image>}
                    />
                </View>
            )
        }
    }

    renderAvatar(uri){
        if(uri == null){
            return (
                <View>
                    <Avatar rounded size="medium" source={require('./images/defaultQimage2.png')}/>
                </View>
            )
        } else {
            return (
                <View>
                    <Avatar rounded size="medium" source={{uri: api.beurl()+uri}}/>
                </View>
            )
        }
    }

    makeMarkers(){
        return this.state.markerdata.map((item) => {
            return (
                <Marker
                    coordinate = {{latitude: parseFloat(item.lati), longitude: parseFloat(item.longi)}}
                    key={item.queue_id} //threw an warning just now, about unpromised
                    onPress={() => this.markerPress(item.queue_id)}
                >
                {this.renderImage(item.image)}
                </Marker>
            );
        }).concat((
            <Marker
                coordinate = {this.state.userLocation}
                key={0}
            >
            <View>
                <Image
                    style={styles.tinyuserlogo}
                    source={require('./images/user.png')}
                />
            </View>
            </Marker>

            ));
    };

    joinButton(){
        if(!this.state.overlaydata.in_queue){
            return (
                <View style={{height:60,justifyContent:'center',alignItems:'center',paddingTop:10}}>
                    <Button containerStyle={{borderRadius:5}} titleStyle={{color:'black',fontSize:20}} raised round title="Join Queue"
                            onPress={() => this.queueUp(this.state.overlaydata.id)} buttonStyle={{ width:160,backgroundColor:"#2CB76B"}}/>
                </View>
            )
        } else {
            return (
                <View style={{height:60,justifyContent:'center',alignItems:'center',paddingTop:10}}>
                    <Button containerStyle={{borderRadius:5}} titleStyle={{color:'black',fontSize:20}} raised round disabled={true} title="In Queue"
                            buttonStyle={{ width:160,backgroundColor:"#2CB76B"}}/>
                </View>
            )
        }
    }

    mapRender(){
        if(this.state.locationReady){
            return(
                <MapView
                    ref={mapRef}
                    style={{ flex: 1, zIndex:1, elevation:1}}
                    initialRegion={{
                        latitude: this.state.userLocation.latitude,
                        longitude: this.state.userLocation.longitude,
                        latitudeDelta: 0.0065,
                        longitudeDelta: 0.0065,
                    }}
                    onRegionChangeComplete={(region)=>{
                        this.setState({location: {latitude: region.latitude, longitude: region.longitude}});
                        this.findQueues();
                    }}
                    >
                    {this.makeMarkers()}
                </MapView>
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
    };

    render(){
        return(
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ height: '100%', width: '100%'}}>
                <View style={{width: "100%", zIndex:2, elevation:2, position: "absolute", backgroundColor:"snow",paddingTop:20,paddingHorizontal:14,'color':'#333234'}}>
                    <Text h2>Explore Queues</Text>
                    <SearchBar
                        placeholder="What would you like to join?"
                        onChangeText={(res) => this.updateSearch(res)}
                        value={this.state.search}
                        containerStyle={{backgroundColor:"transparent",borderTopColor:'transparent',borderBottomColor:'transparent',paddingHorizontal:0}}
                        inputContainerStyle={{backgroundColor:"rgba(177,201,210,0.2)"}}
                        round
                        showCancel
                        cancelButtonTitle="Cancel"
                    />
                    <View style={{paddingBottom: 10}}>
                        {this.showSearchResults()}
                    </View>
                </View>
                {this.mapRender()}            
                <FAB title={<Icon type='material-community' name='crosshairs-gps' size={30} />} color="tomato" style={{zIndex:2, elevation:2, position: "absolute", bottom: "5%", right: "10%"}} onPress={() => this.userCenterMap()} buttonStyle={styles.myFAB} containerStyle={{justifyContent:'center',alignItems:'center'}}/>
                <Overlay isVisible={this.state.overlayon} onBackdropPress={() => this.setState({overlayon: false})} overlayStyle={styles.Ocontainer} round>

                    <View style={{flexDirection:'row',flex:1,alignItems:'center',marginVertical:10}}>
                        {this.renderAvatar(this.state.overlaydata.image)}
                        <Text h3 style={{marginLeft:5}}>{this.state.overlaydata.name}</Text>
                    </View>
                    <Divider></Divider>
                    <View style={{flex:3,}}>
                        <Text style={{marginTop:10,color:'gray',fontSize:14,marginBottom:5}}>Queue Description</Text>
                        <Text style={{fontSize:18}}>{this.state.overlaydata.desc}</Text>
                    </View>

                    <View style={{flex:2,justifyContent:'center',}}>

                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Text style={{fontWeight:'bold',fontSize:30}}>{this.state.overlaydata.queue_length}</Text>
                                <Text style={{fontSize:16}}>No. In Queue</Text>
                            </View>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Text style={{fontWeight:'bold',fontSize:30}}>{this.state.overlaydata.eta}</Text>
                                <Text style={{fontSize:16}}>ETA</Text>
                            </View>
                        </View>
                    </View>
                    {this.joinButton()}
                </Overlay>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}
