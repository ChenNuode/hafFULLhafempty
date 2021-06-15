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
                <ListItem key={i} bottomDivider raised>
                    <ListItem.Content>
                        <ListItem.Title style={{fontWeight: "bold",color:"#EE214E"}}>{item.title}</ListItem.Title>
                        <ListItem.Subtitle>{item.people}</ListItem.Subtitle>
                    </ListItem.Content>
                    
                    <Text style={styles.bigtext}>"l.Q_ppl_left"</Text>
                    <Text style={styles.bigtext}>"l.Q_ETAmin"</Text>
                </ListItem>
                /*<Marker coordinate = {{latitude: item.latitude, longitude: item.longitude}}
                        pinColor = {"red"}
                        key={item.id}
                        onPress={() => this.markerPress(item)}/>*/
            );
        });    
    }

export default class MyQueuesPage extends Component{
    render(){
        return(
            <View style={{flex:1,alignItems: 'flex-start',paddingVertical:20,paddingHorizontal:10,'color':'#333234'}}>
               <Text style={{fontSize: 64}}>
                   My Queues
               </Text>
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
