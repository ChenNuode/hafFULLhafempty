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
//imports end


export default class DetailsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            //markerdata: [],
        }
    };

    componentDidMount(){
        //API Logic
        /*var markers = [
            {latitude: 1.35097, longitude: 103.87227, id:1},
            {latitude: 1.35111, longitude: 103.84868, id:2},
        ];
        this.setState({markerdata: markers});*/
    };

    
    render(){
        return(
            <View>
                <Text>gay</Text>
            </View>
        )
    }
}