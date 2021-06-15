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
} from 'react-native-elements';

import MapView, {Marker} from "react-native-maps";
import GetLocation from 'react-native-get-location'

const searchList1 = [
    {title: "NEX", id: 0, latitude: 1.35097, longitude: 103.87227,},
    {title: "Junction 8", id: 1, latitude: 1.35111, longitude: 103.84868, },
]

const searchList2 = [
    {title: "Junction 9", id: 2, latitude: 1.35097, longitude: 103.87227,},
    {title: "Junction 10", id: 3, latitude: 1.35111, longitude: 103.84868, },
]

//search result then moves to marker
//gps button to move to our location
//show your location

const styles = StyleSheet.create({
    tinyLogo: {
      width: 35,
      height: 50, //aspect ratio of w-h is 317:456
    },
    Ocontainer : {
        width:"80%",
        height:"50%",
        borderRadius:20,
        padding:20,
        justifyContent:'space-around',
        flexDirection:'column',
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

    setMapCenter(latitude, longitude){
        this.setState({location: {latitude:latitude, longitude: longitude}});
        mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0065,
            longitudeDelta: 0.0065,
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

    getMapCenter(){
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            console.log(location);
            this.setState({userLocation: location, locationReady: true});
        })
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
        //API Logic
        var markers = [
            {latitude: 1.35097, longitude: 103.87227, id: 1, title: "NEX", picurl:"https://fastly.4sqi.net/img/general/600x600/29096708_-9AYbBBeHPmaVESz1RFLxJ8hgm2U5NPNcPtGxpIchBs.jpg", description: "Serangoon", peopleinQ:5, ETA:25},
            {latitude: 1.35111, longitude: 103.84868, id: 2, title: "Junction 8", picurl:"https://fastly.4sqi.net/img/general/600x600/29096708_-9AYbBBeHPmaVESz1RFLxJ8hgm2U5NPNcPtGxpIchBs.jpg", description: "This is the Queue to Junction 8 shopping centre at Bishan. Built in 1993. This school is popularly visited by the Bgay", peopleinQ:5, ETA:25},
        ]
        this.setState({markerdata: markers});

        this.getMapCenter();
    };

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

    markerPress(item){
        //API LOGIC
        this.setState({
            overlayon: true,
            overlaydata: item
        });
    };

    queueUp(){
        console.log("queueing for ");
        console.log(id);
        
        //redirect to the my queues page
    }

    makeMarkers(){
        return this.state.markerdata.map((item) => {
            return (
                <Marker 
                    coordinate = {{latitude: item.latitude, longitude: item.longitude}}
                    pinColor = {"red"}
                    key={item.id}
                    onPress={() => this.markerPress(item)}
                    
                >
                <View>
                    
                    <Image
                        style={styles.tinyLogo}
                        source={require('./images/queue317_456.png')}
                    />
                </View>
                </Marker>
            );
        }).concat((
            <Marker 
                coordinate = {this.state.userLocation}
                pinColor = {"red"}
                key={0}
            >
            <View>
                <Image
                    style={styles.tinyLogo}
                    source={require('./images/queue317_456.png')}
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
                        containerStyle={{backgroundColor:"snow",borderTopColor:'transparent',borderBottomColor:'transparent',paddingHorizontal:0}}
                        inputContainerStyle={{backgroundColor:"rgba(100,100,100,0.1)"}}
                        round
                        showCancel
                        cancelButtonTitle="Cancel"
                    />
                    <View style={{paddingBottom: 10}}>
                        {this.showSearchResults()}
                    </View>
                </View>
                {this.mapRender()}
                <FAB title="Center Map" style={{zIndex:2, elevation:2, position: "absolute", top: "90%", left: "60%"}} onPress={() => this.setMapCenter(this.state.userLocation.latitude, this.state.userLocation.longitude)}/>
                <Overlay isVisible={this.state.overlayon} onBackdropPress={() => this.setState({overlayon: false})} overlayStyle={styles.Ocontainer} round>
                    
                    <View style={{flexDirection:'row',flex:1,alignItems:'center',marginVertical:10}}>
                        <Avatar rounded size="medium" source={{
                                uri: this.state.overlaydata.picurl,
                            }}
                        />
                        <Text h3 style={{marginLeft:5}}>{this.state.overlaydata.title}</Text>
                    </View>
                    
                    <View style={{flex:3,}}>
                        <Text style={{marginTop:10,color:'gray',fontSize:14,marginBottom:5}}>Queue Description</Text>
                        <Text style={{fontSize:16}}>{this.state.overlaydata.description}</Text>
                    </View>
                    
                    <View style={{flex:2,justifyContent:'center',}}>
                        
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Text h4>{this.state.overlaydata.peopleinQ}</Text>
                                <Text h5>No. In Queue</Text>
                            </View>     
                            <View style={{flex:1,alignItems:'center'}}>
                                <Text h4>{this.state.overlaydata.ETA}</Text>
                                <Text h5>ETA</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{height:60,justifyContent:'center',alignItems:'center',paddingTop:10}}>
                        <Button containerStyle={{borderRadius:5}} titleStyle={{color:'black',fontSize:20}} round title="Join Queue"
                                onPress={() => this.queueUp()} buttonStyle={{ width:160,backgroundColor:"#2CB76B"}}/>
                     </View>

                </Overlay>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}
