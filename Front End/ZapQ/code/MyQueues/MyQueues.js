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
import QueueDetailsPage from  "./QueueDetails";
import QueueListPage from "./QueueList";

const Stack = createStackNavigator();

export default class MyQueuesPage extends Component{
    render(){
        return(
            <Stack.Navigator screenOptions={{headerStyle: { backgroundColor: 'snow', }}}>
                <Stack.Screen name="Queue List" component={QueueListPage} options={{headerShown:false}}/>
                <Stack.Screen name="Queue Details" component={QueueDetailsPage} />
            </Stack.Navigator>
        )
    }
}
