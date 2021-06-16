import React,{Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ViewBase,
  Alert,
} from 'react-native';

import {
    Button,
    Text,
    Divider,
    ListItem,
    Avatar,
    Badge,
} from 'react-native-elements';

import api from '../api';
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
        var queue = {id:1, title: "NEX", people: 200}
        this.setState({queue: queue});

        this.getDetails();
    };

    
    getDetails = async () => {
        api.getQueueInfo(this.props.route.params.id).then((res) => {
            /*this.setState({
                error: res.error,
                resstate: res.state,
            });*/
            console.log(res);
            this.setState({queue: res});
        }).catch(() => {Alert.alert('Network error!', 'We are unable to retrieve queue details!')});

        /*
        {
            "name": "yourmom",
            "desc": "your mom's house",
            "longi": "0.000000",
            "lati": "0.000000",
            "creator": "nude",
            "eta": 2,
            "queue_length": 1,
            "next_user": {
                "username": "test",
                "id": 1
            }
        }
        */
    }

    admitQueuer(){
        //API Call to admit
        api.advanceQueue(this.props.route.params.id).then((res) => {
            /*this.setState({
                error: res.error,
                resstate: res.state,
            });*/
            console.log(res);

            Alert.alert('Success', 'Successfullly admitted user');

            var temp = this.state.queue
            temp.next_user = res.next_user;
            this.setState({queue: temp});
        }).catch(() => {Alert.alert('Network error!', 'We are unable to admit the next user!')});
    }

    closeQueue(){
        //Api call to delete queue
        api.endQueue(this.props.route.params.id).then((res) => {
            /*this.setState({
                error: res.error,
                resstate: res.state,
            });*/
            console.log(res);

            Alert.alert('Success', 'Successfullly deleted queue');
            
            this.props.navigation.navigate('Created Queues', {});
        }).catch(() => {Alert.alert('Network error!', 'We are unable to end the queue!')});
    }

    checkNextQueuer(){
        if(this.state.queue.next_user != null){
            return this.state.queue.next_user.username;
        } else return "nobody";
    }

    render(){
        return(
            <View style={{flex:1,alignItems: 'flex-start',paddingVertical:20,paddingHorizontal:10,'color':'#333234'}}>
                <Text style={{fontSize: 64}}>
                    Details for {this.state.queue.name} (ID {this.props.route.params.id})
                </Text>
                <Text style={{fontSize: 64}}>{this.state.queue.desc}</Text>    
                <Text style={{fontSize: 32}}>{this.state.queue.queue_length} people in queue</Text>
                <Text style={{fontSize: 32}}>Next Person is {this.checkNextQueuer()}</Text>
                <Button title="Admit Queuer" 
                        onPress={() => this.admitQueuer()}
                />
                <Button title="Close Queue" 
                        onPress={() => this.closeQueue()}
                />
           </View>
        )
    }
}
