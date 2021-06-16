import React,{Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ViewBase,
<<<<<<< HEAD
  RefreshControl,
=======
>>>>>>> 7c984431c5a1f390fea9133179351caf3414defd
} from 'react-native';

import {
    Button,
    Text,
    Divider,
    ListItem,
    Avatar,
    Badge,
    Chip,
    Icon,
} from 'react-native-elements';

//imports end

// in main js
// import MyQueuesPage from 'MyQueues.js';
// createBottomTabNavigator{
//    screen: MyQueuesPage};

<<<<<<< HEAD
var mychipcolor = "black";
=======
var mychipcolor = "rgb(250,250,250)";
>>>>>>> 7c984431c5a1f390fea9133179351caf3414defd

const styles = StyleSheet.create({
    mylabeltext: {
        fontSize: 16,
        color:'#333234',
    },
    listitemstyles: {
        paddingVertical:5,
        width:'99%',
        alignSelf:'center',
        borderRadius:10,
        marginBottom:10,
        shadowColor: '#470000',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.7,
        elevation: 3,
        flexDirection:'column',
    },
    mychip: {
        fontSize: 14,
        fontWeight:'bold',
        color:mychipcolor,
    },
    chipbutton: {
<<<<<<< HEAD
        //backgroundColor:'#7B68EE','salmon' #6CB4EE 
        backgroundColor:'#F0F8FF',
=======
        //backgroundColor:'#7B68EE','salmon'
        backgroundColor:'rgb(50,50,205)',
>>>>>>> 7c984431c5a1f390fea9133179351caf3414defd
        marginHorizontal:0,
        padding:5,
        paddingRight:7
    }

});

var Historylist = [
    {
      name: 'Nex',
      avatar_url: '',
      subtitle: 'Timestamp when user finished this queue'
    },
    {
      name: 'Junction 9',
      avatar_url: '',
      subtitle: '20/12/20 9:00:00pm'
    },
]

<<<<<<< HEAD


=======
>>>>>>> 7c984431c5a1f390fea9133179351caf3414defd
export default class MyQueuesPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            queues: [],
            refreshing: false,
        };
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
    
    _refreshControl() {
        return (
            <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={()=>this._refreshListView()} />
        )
    };

    _refreshListView() {
        //Start Rendering Spinner
        this.setState({refreshing:true})
        //do work
        this.setState({refreshing:false}) //Stop Rendering Spinner
      }
    
    displayQueues(){
        return this.state.queues.map((item, i) => {
            return (
                    <ListItem key={i} containerStyle={styles.listitemstyles} onPress={() => this.props.navigation.navigate('Queue Details', {id:item.id})}>
                        
                            <ListItem.Content style={{flexDirection:'row'}}>
                                <View style={{alignSelf:'center',marginRight:10,marginTop:14}}>
                                    <Avatar rounded size="medium"
                                    source={require("../images/defaultQimage2.png")}
                                    />
                                    
                                    <Badge
                                        status="error"
                                        value=""
                                        containerStyle={{ position: 'absolute', top: -2, left: -2 }}
                                    />
                                </View>
                                <View style={{flex:1}} > 
                                    <ListItem.Title style={{flex:1,fontWeight: "bold",color:"black",fontSize:25}}>{item.title}</ListItem.Title>
                                    {/*<ListItem.Subtitle>{item.people}</ListItem.Subtitle>*/}
                                    
                                    <View style={[styles.mylabeltext,{flex:1,flexDirection:'row'}]}>
                                        <Chip titleStyle={styles.mychip}
                                        buttonStyle={styles.chipbutton}
                                        title={item.ETA + ' min'}
                                            icon={{
                                            name: "timer-sharp",
                                            type: "ionicon",
                                            size: 20,
                                            color: mychipcolor,
                                        }}
                                        />
                                        <Chip titleStyle={styles.mychip} 
                                        buttonStyle={[styles.chipbutton,{marginHorizontal:5}]}
                                        
                                        title={item.people + ' left'}
                                            icon={{
                                            name: "people",
                                            type: "ionicon",
                                            size: 20,
                                            color: mychipcolor,
                                        }}
                                        />
                                        
                                    </View>
                                    
                                    
                                </View>
                                <Icon type="antdesign" name="right" containerStyle={{alignSelf:'center',marginTop:14}}></Icon>
                            </ListItem.Content>
                            <Text style={{alignSelf:'flex-end',fontSize:14}}>Status: <Text style={{color:'green'}}>Waiting</Text></Text>
                    </ListItem>
            );
        });    
    };
    
    render(){
        return(
            <SafeAreaView style={{width:"100%",height:"100%"}}>
            
            <View style={{paddingVertical:20,paddingHorizontal:10,backgroundColor:'snow'}}>
               
               <Text h2>
                   My Queues
               </Text>
               <ScrollView containerStyle={{alignItems: 'flex-start'}} 
                refreshControl={this._refreshControl()}
               >
               <View style={{flex:1,width:'100%',marginVertical:20,marginBottom:10}}>
                
                    <Text style={{fontSize: 22,'color':'#333234',fontWeight: "bold",marginBottom:15}}>Current Queues</Text>
                        {this.displayQueues()}
                </View>
                <Divider orientation="horizontal" />
                <View style={{flex:1,width:'100%',marginVertical:20}}>
                <Text style={{fontSize: 22,'color':'#333234',fontWeight: "bold",marginBottom:10}}>Queue History</Text>
                    
                <View style={{marginBottom:50+10}}>
                {
                    Historylist.map((l, i) => (
                    <ListItem key={i} bottomDivider>
                        <Avatar source={{uri: "https://fastly.4sqi.net/img/general/600x600/29096708_-9AYbBBeHPmaVESz1RFLxJ8hgm2U5NPNcPtGxpIchBs.jpg"}} size='small' />
                        <ListItem.Content>
                        <ListItem.Title style={{fontSize:20}}>{l.name}</ListItem.Title>
                        <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    ))
                }
                </View>

                </View>
                </ScrollView>
           </View>
           </SafeAreaView>
        );
        
    };
}
