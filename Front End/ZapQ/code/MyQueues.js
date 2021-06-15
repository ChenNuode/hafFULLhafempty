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
  ViewBase,
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
    Overlay,
    SearchBar,
    ListItem,
} from 'react-native-elements';

export default class MyQueuesPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            queues: [],
        }
    };

    componentDidMount(){
        //API Logic
        var queues = [
            {id:1, title: "NEX", people: 200},
            {id:2, title: "Junction 8", people: 150},
            {id:3, title: "Junction 9", people: 50},
            {id:4, title: "Junction 10", people: 100},
        ]
        this.setState({queues: queues});
    };

    displayQueues(){
        return this.state.queues.map((item, i) => {
            return (
                <ListItem key={i} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                        <ListItem.Subtitle>{item.people}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                /*<Marker coordinate = {{latitude: item.latitude, longitude: item.longitude}}
                        pinColor = {"red"}
                        key={item.id}
                        onPress={() => this.markerPress(item)}/>*/
            );
        });    
    }

    render(){
        return(
            <View style={{ height: '100%', width: '100%' }}>
               <Text style={{fontSize: 64}}>
                   My Queues
               </Text>
               {this.displayQueues()}
           </View> 
        )
    }
}
