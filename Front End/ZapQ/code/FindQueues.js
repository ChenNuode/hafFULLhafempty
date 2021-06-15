//imports start
import React,{Component} from 'react';

import {
  View,
  Image,
  StyleSheet
} from 'react-native';

import {
    Button,
    ThemeProvider,
    Overlay,
    SearchBar,
    Text,
    Avatar,
} from 'react-native-elements';

import MapView, {Marker} from "react-native-maps";
import GetLocation from 'react-native-get-location'

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

export default class FindQueuesPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            markerdata: [],
            overlayon: false,
            overlaydata: {},
            location: {latitude:0,longitude:0},
            locationReady: false,
            search: "",
        }
    }; 
    updateSearch = (search) => {
        console.log("Someone is typing")
        this.setState({ search: "a" });
    };

    componentDidMount(){
        //API Logic
        var markers = [
            {latitude: 1.35097, longitude: 103.87227, id: 1, title: "NEX", picurl:"https://fastly.4sqi.net/img/general/600x600/29096708_-9AYbBBeHPmaVESz1RFLxJ8hgm2U5NPNcPtGxpIchBs.jpg", description: "Serangoon", peopleinQ:5, ETA:25},
            {latitude: 1.35111, longitude: 103.84868, id: 2, title: "Junction 8", picurl:"https://fastly.4sqi.net/img/general/600x600/29096708_-9AYbBBeHPmaVESz1RFLxJ8hgm2U5NPNcPtGxpIchBs.jpg", description: "This is the Queue to Junction 8 shopping centre at Bishan. Built in 1993. This school is popularly visited by the Bgay", peopleinQ:5, ETA:25},
        ]
        this.setState({markerdata: markers});

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            console.log(location);
            this.setState({location: location, locationReady: true});
        })
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
        });
    };

    mapRender(){
        if(this.state.locationReady){
            return(
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: this.state.location.latitude,
                        longitude: this.state.location.longitude,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.002,
                    }}>
                    {this.makeMarkers()}
                </MapView>
            )
        } else {
            return(
                <Text>Loading Map</Text>
            )
        }
    }

    render(){
        return(
            <View style={{ height: '100%', width: '100%' }}>
                <View style={{backgroundColor:"snow",paddingTop:20,paddingHorizontal:14,'color':'#333234'}}>
                    <Text h2>Explore Queues</Text>    
                    <SearchBar  
                        placeholder="What would you like to join?"
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                        containerStyle={{backgroundColor:"snow",borderTopColor:'transparent',borderBottomColor:'transparent',paddingHorizontal:0}}
                        inputContainerStyle={{backgroundColor:"rgba(100,100,100,0.1)"}}
                        round
                        showCancel
                        cancelButtonTitle="Cancel"
                    />
                </View>
                {this.mapRender()}
                <Overlay isVisible={this.state.overlayon} onBackdropPress={() => this.setState({overlayon: false})} overlayStyle={styles.Ocontainer} round>
                    
                    <View style={{flexDirection:'row',flex:1,alignItems:'center',marginVertical:10}}>
                        <Avatar rounded size="medium" source={{
                                uri: this.state.overlaydata.picurl,
                            }}
                        />
                        <Text h3 style={{marginLeft:5}}>{this.state.overlaydata.title}</Text>
                    </View>
                    
                    <View style={{flex:2}}>
                        <Text style={{marginTop:10,color:'gray',fontSize:14}}>Description</Text>
                        <Text style={{fontSize:16}}>{this.state.overlaydata.description}</Text>
                    </View>
                    
                    <View style={{flex:1,justifyContent:'center'}}>
                        
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1,alignItems:'center'}}>
                                <Text h3>{this.state.overlaydata.peopleinQ}</Text>
                                <Text style={{fontSize:15}}>People In Queue</Text>
                            </View>     
                            <View style={{flex:1,alignItems:'center'}}>
                                <Text h3>{this.state.overlaydata.ETA}</Text>
                                <Text style={{fontSize:18,marginBottom:10}}>min</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{height:60,justifyContent:'center',alignItems:'center',paddingTop:10}}>
                        <Button containerStyle={{borderRadius:5}} titleStyle={{color:'black'}} round title="Join Queue" raised
                                onPress={() => this.queueUp()} buttonStyle={{ width:200,backgroundColor:"#2CB76B"}}/>
                     </View>

                </Overlay>
            </View>
        )
    }
}
