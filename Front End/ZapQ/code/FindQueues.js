//imports start
import React,{Component} from 'react';

import {
  Text,
  View,
} from 'react-native';

import {
    Button,
    ThemeProvider,
    Overlay,
    SearchBar,
} from 'react-native-elements';

import MapView, {Marker} from "react-native-maps";
import GetLocation from 'react-native-get-location'

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
            {latitude: 1.35097, longitude: 103.87227, id: 1, title: "NEX", description: "Serangoon"},
            {latitude: 1.35111, longitude: 103.84868, id: 2, title: "Junction 8", description: "Bishan"},
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
                <Marker coordinate = {{latitude: item.latitude, longitude: item.longitude}}
                        pinColor = {"red"}
                        key={item.id}
                        onPress={() => this.markerPress(item)}/>
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
                <SearchBar  
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                    containerStyle={{backgroundColor:"snow",borderTopColor:'transparent',borderBottomColor:'transparent'}}
                    inputContainerStyle={{backgroundColor:"rgba(100,100,100,0.1)"}}
                    round
                    showCancel
                    cancelButtonTitle="Cancel"
                />
                {this.mapRender()}
                <Overlay isVisible={this.state.overlayon}
                         onBackdropPress={() => this.setState({overlayon: false})}>
                    <Text>{this.state.overlaydata.title}</Text>
                    <Text>Description</Text>
                    <Text>People</Text>     
                    <Text>ETA</Text>
                    <Button title="Q"
                            onPress={() => this.queueUp()}/>
                </Overlay>
            </View>
        )
    }
}
