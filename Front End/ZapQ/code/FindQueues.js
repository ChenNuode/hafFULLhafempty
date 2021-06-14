//imports start
import React,{Component} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
    Button,
    ThemeProvider,
} from 'react-native-elements';

import MapView, {Marker} from "react-native-maps";
import { ListItem } from 'react-native-elements/dist/list/ListItem';

//imports end

export default class FindQueuesPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            markerdata: [],
        }
    };

    componentDidMount(){
        //API Logic
        var markers = [
            {latitude: 1.35097, longitude: 103.87227, id:1},
            {latitude: 1.35111, longitude: 103.84868, id:2},
        ];
        this.setState({markerdata: markers});
    };

    markerPress(id){ 
        console.log(id);
    }


    makeMarkers(){
        /*
        var markers = [
            {latitude: 1.35097, longitude: 103.87227, title: "NEX", description: "Serangoon"},
            {latitude: 1.35111, longitude: 103.84868, title: "Junction 8", description: "Bishan"},
        ]*/

        return this.state.markerdata.map((item) => {
            return (
                <Marker coordinate = {{latitude: item.latitude, longitude: item.longitude}}
                        pinColor = {"red"}
                        key={item.id}
                        onPress={() => this.markerPress(item.id)}/>
            );
        });
    };

    
    render(){
        

        return(
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 1.3521,
                    longitude: 103.8198,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2
                }}>
                {this.makeMarkers()}
            </MapView>
        )
    }
}
