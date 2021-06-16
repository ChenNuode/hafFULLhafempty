import React, {Component} from 'react';
import { Icon } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import MyQueuesPage from './MyQueues/MyQueues';
import FindQueuesPage from './FindQueues';
import ManageQueuesPage from './ManageQueues/ManageQueues';
import AccountPage from './account';
//enableScreens(false);

const Tab = createBottomTabNavigator()
export default class AppRoot extends Component {
    render(){
        return(
            <NavigationContainer>
                <Tab.Navigator
                  screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
                      //icon configuration, add more icons here for more pages
                      if (route.name === 'Find Queues') {
                        return <Icon type='material-community' name='radar' size={size} color={color} />;
                      } else if (route.name === 'My Queues') {
                        return <Icon type='font-awesome-5' name='list' size={size} color={color} />;
                      } else if (route.name === 'Manage Queues') {
                        return <Icon type='antdesign' name='plussquareo' size={size} color={color} />;
                      } else if (route.name === 'Account') {
                        return <Icon type='font-awesome-5' name='user' size={size} color={color} />;
                      }


                    },
                  })}
                  tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                    labelStyle: {fontSize:13},
                    style:{height:55}
                    //keyboardHidesTabBar:true,
                  }}
                >
                  <Tab.Screen name="Find Queues" component={FindQueuesPage} />
                  <Tab.Screen name="My Queues" component={MyQueuesPage} />
                  <Tab.Screen name="Manage Queues" component={ManageQueuesPage} />
                  <Tab.Screen name="Account" children={()=><AccountPage usercall={this.props.usercall}/>} />
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
