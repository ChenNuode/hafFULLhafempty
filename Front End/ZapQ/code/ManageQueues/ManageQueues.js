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

import CreatedQueuesPage from './CreatedQueues';
import QueueDetailsPage from './QueueDetails';
import MakeQueuePage from './MakeQueue';
import ConfirmQueuePage from './ConfirmQueue';

const Stack = createStackNavigator();

export default class ManageQueuesPage extends Component{
    render(){
        return(
            <Stack.Navigator screenOptions={{headerStyle: { backgroundColor: 'snow', }}}>
                <Stack.Screen name="Created Queues" component={CreatedQueuesPage} options={{headerShown:false,}}/>
                <Stack.Screen name="Queue Details" component={QueueDetailsPage} />
                <Stack.Screen name="Make Queue" component={MakeQueuePage} />
                <Stack.Screen name="Confirm Queue" component={ConfirmQueuePage} />
            </Stack.Navigator>
        )
    }
}
