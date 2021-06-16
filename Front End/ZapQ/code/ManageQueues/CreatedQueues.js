import React,{Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ViewBase,
} from 'react-native';

import {
    Button,
    Text,
    Divider,
    ListItem,
    Avatar,
    Badge,
} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  
export default class CreatedQueuesPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            queues: [],
            userdata: {username: ""},
            update: false,
        }
    };

    usercall = async () => {
        await AsyncStorage.getItem('@userinfo').then((res) => {this.setState({userdata: JSON.parse(res)})});
    };

    pullList(){
        console.log("pull");
        this.usercall().then(()=>{
            //working
            api.listMadeQueues(this.state.userdata.username).then((res) => {
                /*this.setState({
                    error: res.error,
                    resstate: res.state,
                });*/
                console.log(res);
                this.setState({queues: res});
            }).catch(() => {Alert.alert('Network error!', 'We are unable to retrieve queues!')});
        });
    }


    componentDidMount(){
        this.props.navigation.addListener('focus', () => {this.pullList()})
    };

    componentWillUnmount(){
        
    };

    displayQueues(){
        return this.state.queues.map((item, i) => {
            return (
                <ListItem key={i} 
                          onPress={() => this.props.navigation.navigate('Queue Details', {id: item.queue_id})}
                          bottomDivider raised>
                    <ListItem.Content>
                        <ListItem.Title style={{fontWeight: "bold",color:"#EE214E"}}>{item.name}</ListItem.Title>
                        {/*<ListItem.Subtitle>{item.people}</ListItem.Subtitle>*/}
                    </ListItem.Content>
                    
                    <Text style={styles.bigtext}>{item.queue_length}</Text>
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
            <View style={{flex:1,alignItems: 'flex-start',paddingVertical:20,paddingHorizontal:10,'color':'#333234'}}>
               <Text style={{fontSize: 64}}>
                   Created Queues
               </Text>
               <Button title="+" 
                onPress={() => this.props.navigation.navigate('Make Queue', {})}/>
               <View style={{flex:1,width:'100%',marginTop:30}}>
                    {/*<Text style={{fontSize: 22,'color':'#333234',fontWeight: "bold",marginBottom:10}}>Current Queues</Text>*/}
                    {this.displayQueues()}
                </View>
                {/*<View style={{flex:2,width:'100%',marginTop:50}}>
                    <Text style={{fontSize: 22,'color':'#333234',fontWeight: "bold",marginBottom:10}}>Past Queues</Text>
                    {this.displayQueues()}
                </View>*/}
           </View>
        )
    }
}
