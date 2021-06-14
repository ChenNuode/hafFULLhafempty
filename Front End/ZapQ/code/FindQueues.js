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
                    latitude: 1.3521,
                    longitude: 103.8198,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2
                }}
            />
        )
    }
}
