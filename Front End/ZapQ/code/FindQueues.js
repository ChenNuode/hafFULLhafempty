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
} from 'react-native-elements';

import MapView, {Marker} from "react-native-maps";
import GetLocation from 'react-native-get-location'
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

const searchList1 = [
    {title: "NEX", id: 0, latitude: 1.35097, longitude: 103.87227,},
    {title: "Junction 8", id: 1, latitude: 1.35111, longitude: 103.84868, },
]

const searchList2 = [
    {title: "Junction 9", id: 2, latitude: 1.35097, longitude: 103.87227,},
    {title: "Junction 10", id: 3, latitude: 1.35111, longitude: 103.84868, },
]

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

    updateSearch = (search) => {
        this.setState({ search: search });

        //api call to get results
        this.setState({currentSearch: (this.state.currentSearch+1%2)});
        if(this.state.currentSearch%2 == 0) this.setState({searchResults: searchList1});
        else this.setState({searchResults: searchList2});

        if(search == "") this.setState({searchResults: []});
    };

    getUserCenter = async() => {
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            console.log(location);
            this.setState({userLocation: location, locationReady: true});
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

    userCenterMap(){
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            console.log(location);
            this.setState({userLocation: location, locationReady: true});
            this.setMapCenter(this.state.userLocation.latitude, this.state.userLocation.longitude)
        })
    }

    showSearchResults(){
        if (this.state.keyboardstate){
            return this.state.searchResults.map((item, i) => {
                return (
                    <ListItem key={i} bottomDivider raised
                              onPress={()=>this.setMapCenter(item.latitude, item.longitude)}>
                              {/*onPress={() => this.props.navigation.navigate('Details', {id: item.id})}>*/}
                        <ListItem.Content>
                            <ListItem.Title style={{fontWeight: "bold",color:"#EE214E"}}>{item.title}</ListItem.Title>
                            {/*<ListItem.Subtitle>{item.people}</ListItem.Subtitle>*/}
                        </ListItem.Content>
                        {/*
                        <Text style={styles.bigtext}>{item.people}</Text>
                        <Text style={styles.bigtext}>"l.Q_ETAmin"</Text>*/}
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

        this.focusListener = this.props.navigation.addListener('focus', this.findQueues)
        
        this.getUserCenter().then(() => {this.findQueues()});
    };

    findQueues = async () => {
        //API Logic
        console.log(this.state.userLocation.latitude, this.state.userLocation.longitude);
        await api.nearbyQueues(this.state.userLocation.latitude, this.state.userLocation.longitude).then((res) => {
            /*this.setState({
                error: res.error,
                resstate: res.state,
            });*/
            console.log(res);
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

    markerPress(id){
        //API LOGIC
        api.getQueueInfo(id).then((res) => {
            /*this.setState({
                error: res.error,
                resstate: res.state,
            });*/
            console.log(res);
            var temp = res;
            temp.id = id;
            this.setState({
                overlayon: true,
                overlaydata: temp,
            });
        }).catch(() => {Alert.alert('Network error!', 'We are unable to retrieve queue details!')});
    };

    queueUp = async(id)=>{
        console.log("queueing for ");
        console.log(id);
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

    makeMarkers(){
        return this.state.markerdata.map((item) => {
            console.log(parseFloat(item.lati));
            return (
                <Marker
                    coordinate = {{latitude: parseFloat(item.lati), longitude: parseFloat(item.longi)}}
                    key={item.queue_id} //threw an warning just now, about unpromised
                    onPress={() => this.markerPress(item.queue_id)}
                >
                <View>
                    <Image
                        style={styles.tinyLogo}
                        //source={{uri: item.picurl }}
                        source={require('./images/defaultQimage2.png')}
                        PlaceholderContent={<Image style={styles.tinyLogo} source={require('./images/defaultQimage2.png')}></Image>}
                    />
                </View>
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
                    }}>
                    {this.makeMarkers()}
                </MapView>
            )
        } else {
            return(
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <ActivityIndicator color="#EE214E" size="large" />
                    <Text h4 style={{marginTop:10}}>Getting your location :)</Text>
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
                        {/*<Avatar rounded size="medium" source={{
                                uri: this.state.overlaydata.picurl,
                            }}
                        />*/}
                        <Text h3 style={{marginLeft:5}}>{this.state.overlaydata.name}</Text>
                    </View>
                    
                    <View style={{flex:3,}}>
                        <Text style={{marginTop:10,color:'gray',fontSize:14,marginBottom:5}}>Queue Description</Text>
                        <Text style={{fontSize:16}}>{this.state.overlaydata.desc}</Text>
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

                    <View style={{height:60,justifyContent:'center',alignItems:'center',paddingTop:10}}>
                        <Button containerStyle={{borderRadius:5}} titleStyle={{color:'black',fontSize:20}} raised round title="Join Queue"
                                onPress={() => this.queueUp(this.state.overlaydata.id)} buttonStyle={{ width:160,backgroundColor:"#2CB76B"}}/>
                    </View>
                </Overlay>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}
