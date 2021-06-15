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


var Qlist = [
    {id: 1, title: "NEX", picurl:"https://fastly.4sqi.net/img/general/600x600/29096708_-9AYbBBeHPmaVESz1RFLxJ8hgm2U5NPNcPtGxpIchBs.jpg", description: "Serangoon", peopleinQ:5, ETA:25},
    {id: 2, title: "Junction 8", picurl:"https://fastly.4sqi.net/img/general/600x600/29096708_-9AYbBBeHPmaVESz1RFLxJ8hgm2U5NPNcPtGxpIchBs.jpg", description: "This is the Queue to Junction 8 shopping centre at Bishan. Built in 1993. This school is popularly visited by the Bgay", peopleinQ:5, ETA:25},
]

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
            {id:1, title: "NEX", picurl:"https://fastly.4sqi.net/img/general/600x600/29096708_-9AYbBBeHPmaVESz1RFLxJ8hgm2U5NPNcPtGxpIchBs.jpg",people: 200,ETA:25},
            {id:2, title: "Junction 8", picurl:"https://fastly.4sqi.net/img/general/600x600/29096708_-9AYbBBeHPmaVESz1RFLxJ8hgm2U5NPNcPtGxpIchBs.jpg", people: 150,ETA:25},
            {id:3, title: "Junction 9",picurl:"https://fastly.4sqi.net/img/general/600x600/29096708_-9AYbBBeHPmaVESz1RFLxJ8hgm2U5NPNcPtGxpIchBs.jpg", people: 50,ETA:25},
            {id:4, title: "Junction 10",picurl:"https://fastly.4sqi.net/img/general/600x600/29096708_-9AYbBBeHPmaVESz1RFLxJ8hgm2U5NPNcPtGxpIchBs.jpg", people: 100,ETA:25},
        ]
        this.setState({queues: queues});
    };

    displayQueues(){
        return this.state.queues.map((item, i) => {
            return (
                <ListItem key={i} style={{marginBottom:10,borderWidth:0.5,borderRadius:5}}>
                    <ListItem.Content>
                        <ListItem.Title style={{fontWeight: "bold",color:"#EE214E",fontSize:25}}>{item.title}</ListItem.Title>
                        {/*<ListItem.Subtitle>{item.people}</ListItem.Subtitle>*/}
                    </ListItem.Content>
                    
                    <Text style={styles.bigtext}>{item.people}</Text>
                    <Text style={styles.bigtext}>"l.Q_ETAmin"</Text>
                </ListItem>
                
            );
        });    
    }

    render(){
        return(
            <View style={{flex:1,alignItems: 'flex-start',paddingVertical:20,paddingHorizontal:10,backgroundColor:'white'}}>
               <Text h2>
                   My Queues
               </Text>
               <View style={{flex:1,width:'100%',marginTop:20}}>
                    <Text style={{fontSize: 22,'color':'#333234',fontWeight: "bold",marginBottom:10}}>Current Queues</Text>
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
