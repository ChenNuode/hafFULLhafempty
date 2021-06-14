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

import MapView from "react-native-maps";

//imports end

export default class FindQueuesPage extends Component{
    render(){
        return(
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
                }}
            />
        )
    }
}
