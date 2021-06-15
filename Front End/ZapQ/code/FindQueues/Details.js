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

    };

    queueUp(){
        console.log("queueing for ");
        console.log(this.props.route.params.id);
        
        //redirect to the my queues page
    }

    
    render(){
        return(
            <View>
                <Text>{this.props.route.params.id}</Text>
                <Button containerStyle={{borderRadius:5}} titleStyle={{color:'black'}} round title="Join Queue" raised
                                onPress={() => this.queueUp()} buttonStyle={{ width:200,backgroundColor:"#2CB76B"}}/>
            </View>
        )
    }
}