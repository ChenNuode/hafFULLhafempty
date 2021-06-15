import React, {Component} from 'react';
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

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Icon from 'react-native-vector-icons/AntDesign';
import { enableScreens } from 'react-native-screens';
import MyQueuesPage from './MyQueues';
import FindQueuesPage from './FindQueues';
import ManageQueuesPage from './ManageQueues/ManageQueues'
//enableScreens(false);

const Tab = createBottomTabNavigator()
export default class AppRoot extends Component {
    render(){
        return(        
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Find Queues" component={FindQueuesPage} />
                    <Tab.Screen name="My Queues" component={MyQueuesPage} />
                    <Tab.Screen name="Manage Queues" component={ManageQueuesPage} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}


/*
const AppRoot = createBottomTabNavigator({
    FindQueues: {
        screen: MyQueuesPage,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ({ tintColor }) => (
              <Icon name='mail' size={30} color={ tintColor }/>
            )
        }
    },
    MyQueues: {
        screen: MyQueuesPage,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ({ tintColor }) => (
              <Icon name='mail' size={30} color={ tintColor }/>
            )
        }
    },
    MakeQueues:{
        screen: MyQueuesPage,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ({ tintColor }) => (
              <Icon name='mail' size={30} color={ tintColor }/>
            )
        }
    }
},
{
  order: ['FindQueues', 'MyQueues', 'MakeQueues'],
  tabBarOptions: {
    activeTintColor: '#253c78',
    inactiveTintColor: '#7c7c7c',
    style: {
      backgroundColor: 'white'
    },
    showIcon: true,
    showLabel: false
  }
}
)

export default createAppContainer(AppRoot);
*/