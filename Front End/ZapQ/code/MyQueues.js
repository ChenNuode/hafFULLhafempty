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

//imports end

export default class MyQueuesPage extends Component{
    render(){
        return(
           <View>
               <Text h1 h1styles={{}}>
                   It works!
               </Text>
           </View> 
        )
    }
}
