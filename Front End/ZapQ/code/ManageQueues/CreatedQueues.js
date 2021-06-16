//This is the list of queues created

import React,{Component, useCallback} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  ViewBase,
  Alert,
  RefreshControl,
  Avatar,
} from 'react-native';

import {
    Button,
    Text,
    Divider,
    ListItem,
    Icon,
    Chip,
    Badge,
} from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
import { useFocusEffect } from '@react-navigation/native';
//imports end

var mychipcolor = "black";

const styles = StyleSheet.create({
    bigtext: {
        fontSize: 20,
    },
    newbutton: {
        width:120,
        borderRadius:10,
       backgroundColor:'#2CB76B',
        //borderColor: '#2CB76B',
        alignItems:'center',
        justifyContent:'center',
    },
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
        //backgroundColor:'#7B68EE','salmon' #6CB4EE 
        backgroundColor:'#F0F8FF',
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
  
export default class CreatedQueuesPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            queues: [],
            refreshing: false,
            userdata: {username: ""},
        }
        this.pullList = this.pullList.bind(this);
    };

    pullList = async () => {
        console.log("pull");

        await AsyncStorage.getItem('@userinfo').then((res) => {

            res = JSON.parse(res);
            console.log(res);
            api.listMadeQueues(res.username).then((res) => {
                
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
        this.focusListener = this.props.navigation.addListener('focus', this.pullList)
    }

    componentWillUnmount(){
        //this.focusListener.remove();
    }

    //useFocusEffect(
    //   useCallback(() => { this.pullList() }, []);
    //);

    displayQueues(){
        return this.state.queues.map((item, i) => {
            return (
                    
                   
                    
                <ListItem key={i} underlayColor="transparent" containerStyle={styles.listitemstyles} onPress={() => this.props.navigation.navigate('Queue Details', {id:item.queue_id})}>
                        
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
                                    <ListItem.Title style={{fontWeight: "bold",color:"black",fontSize:25}}>{item.name}</ListItem.Title>
                                    {/*<ListItem.Subtitle>{item.people}</ListItem.Subtitle>*/}
                                    
                                    <View style={[styles.mylabeltext,{flex:1,flexDirection:'row'}]}>
                                        
                                        <Chip titleStyle={styles.mychip} 
                                        buttonStyle={[styles.chipbutton,{marginHorizontal:5}]}
                                        
                                        title={item.queue_length + 'people in queue'}
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
    }

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

    render(){
        return(
            <SafeAreaView style={{width:"100%",height:"100%"}}>
            <View style={{flex:1,paddingVertical:20,paddingHorizontal:10,backgroundColor:'snow'}}>
        
            <Text h2 style={{marginBottom:10}}>Creator Dashboard</Text>
            <Divider orientation="horizontal" />

            <ScrollView containerStyle={{alignItems: 'flex-start'}} refreshControl={this._refreshControl()} >
            
            <View style={{flex:1,width:'100%',marginTop:20,marginBottom:0}}>
                
                    <Text style={{fontSize: 22,'color':'#333234',fontWeight: "bold",marginBottom:15}}>Active Created Queues</Text>
                    
                    <Button containerStyle={styles.newbutton} onPress={() => this.props.navigation.navigate('Make Queue', {})}
                    icon={
                        <Icon
                        name="add"
                        type="ionicon"
                        size={15}
                        color="white"
                        />
                    }
                    title="New Queue"
                    buttonStyle={{backgroundColor:'transparent'}}
                    />

                    <View style={{flex:1,width:'100%',marginTop:10,marginBottom:30}}>
                        {this.displayQueues()}
                    </View>
            
            </View>
        
            <View style={{flex:1,width:'100%',marginVertical:0}}>
                <Text style={{fontSize: 22,'color':'#333234',fontWeight: "bold",marginBottom:10}}>Past Created Queues</Text>
                    
                <View style={{marginBottom:50+10}}>
                {
                    Historylist.map((l, i) => (
                    <ListItem key={i} bottomDivider>
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
        )
    }
}
