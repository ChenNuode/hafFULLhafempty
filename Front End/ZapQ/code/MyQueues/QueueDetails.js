import React,{Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ViewBase,
  Linking,
} from 'react-native';

import {
    Button,
    Text,
    Divider,
    ListItem,
    Avatar,
    Badge,
} from 'react-native-elements';

//imports end

// in main js
// import MyQueuesPage from 'MyQueues.js';
// createBottomTabNavigator{
//    screen: MyQueuesPage};

const styles = StyleSheet.create({
    bigtext: {
        fontSize: 20,
    },

});

/*
const list = [
    {
      Q_name: 'Qname 1',
      Q_initial: 'Q1',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      Q_description: 'Queue to fk your mom',
      Q_ppl_left: '7',
      Q_ETA: '25',
    },
    {
      Q_name: 'Qname 2',
      Q_initial: 'Q2',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      Q_description: 'Queue to fk your mom again',
      Q_ppl_left: '3',
      Q_ETA: '10',
    },
]*/
  
export default class QueueDetailsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            queue: {},
        }
    };

    componentDidMount(){
        //API Logic
        var queue = {id:1, title: "NEX", people: 200, latitude: 1.35097, longitude: 103.87227, }
        this.setState({queue: queue});
    };

    getDirections(){
        var url = "https://www.google.com/maps/dir/?api=1&origin="+"1.35111"+","+"103.84868"+"&destination="+this.state.queue.latitude+","+this.state.queue.longitude;
        console.log(url);
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }

    //https://www.google.com/maps/dir/?api=1&origin=34.1030032,-118.41046840000001&destination=34.059808,-118.368152

    pushQueue(){
        //API Call to admit
    }

    leaveQueue(){
        //Api call to delete queue
    }

    render(){
        return(
            <View style={{flex:1,alignItems: 'flex-start',paddingVertical:20,paddingHorizontal:10,'color':'#333234'}}>
               <Text style={{fontSize: 64}}>
                   Details for {this.state.queue.title} (ID {this.props.route.params.id})
               </Text>
                <Text style={{fontSize: 64}}>{this.state.queue.people} people in queue</Text>
                <Button title="Get directions" 
                        onPress={() => this.getDirections()
                }/>
                <Button title="Push me back 5 places" 
                        onPress={() => this.props.navigation.navigate('Queue List', {})
                }/>
                <Button title="Leave Queue" 
                        onPress={() => this.props.navigation.navigate('Queue List', {})
                }/>
           </View>
        )
    }
}
