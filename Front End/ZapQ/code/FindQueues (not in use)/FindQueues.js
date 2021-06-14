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

import { ListItem } from 'react-native-elements/dist/list/ListItem';
import { createStackNavigator } from '@react-navigation/stack';
import MapPage from "./Map";
import DetailsPage from "./Details"

const Stack = createStackNavigator();

export default class FindQueuesPage extends Component{
    render(){
        return(
            <Stack.Navigator>
                <Stack.Screen name="Map" component={MapPage} />
                <Stack.Screen name="Details" component={DetailsPage} />
            </Stack.Navigator>
        )
    }
}