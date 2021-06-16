import React,{Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ViewBase,
  RefreshControl,
  Alert,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

//imports end

// in main js
// import MyQueuesPage from 'MyQueues.js';
// createBottomTabNavigator{
//    screen: MyQueuesPage};

var mychipcolor = "black";

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



export default class MyQueuesPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            queues: [],
            refreshing: false,
        };
    };

    componentDidMount(){
        this.focusListener = this.props.navigation.addListener('focus', this.pullList)

        this.pullList();

        this.updateTimer = setInterval(() => this.pullList(), 7000);

        this.focusListener = this.props.navigation.addListener('blur', ()=>{clearInterval(this.updateTimer)})
    };

    pullList = async () => {
        await AsyncStorage.getItem('@userinfo').then((res) => {

            res = JSON.parse(res);
            api.userQueuedInfo(res.username).then((res) => {

                /*this.setState({
                    error: res.error,
                    resstate: res.state,
                });*/
                this.setState({queues: res});
            }).catch(() => {Alert.alert('Network error!', 'We are unable to retrieve queues!')});
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
        this.pullList();
        this.setState({refreshing:false}) //Stop Rendering Spinner
      }


    lastPerson(number){
      if (number === 0){
        return(
          <Text style={{alignSelf:'flex-end',fontSize:14}}><Text style={{color:'red'}}>Your Turn</Text></Text>
        )
      } else {
        return(
          <Text style={{alignSelf:'flex-end',fontSize:14}}><Text style={{color:'green'}}>Waiting</Text></Text>
        )
      }
    }

    renderAvatar(uri){
        if(uri == null){
            return (
                <Avatar rounded size="medium" source={require('../images/defaultQimage2.png')}/>
            )
        } else {
            return (
                <Avatar rounded size="medium" source={{uri: api.beurl()+uri}}/>
            )
        }
    }

    renderBadge(ppl){
        if(ppl <= 5){
            return (
                <Badge
                    status="error"
                    value=""
                    containerStyle={{ position: 'absolute', top: -2, left: -2 }}
                />
            )
        } else {
            return (
                <Badge
                    status="success"
                    value=""
                    containerStyle={{ position: 'absolute', top: -2, left: -2 }}
                />
            )
        }
    }

    displayQueues(){
        if(this.state.queues.length == 0){
            return (
                <Text style={{marginTop: 25, textAlign: 'center', fontSize: 18, color: "gray"}}>No queues found</Text>
            );
        } else {
            return this.state.queues.map((item, i) => {
                return (
                        <ListItem key={i} underlayColor="transparent" containerStyle={styles.listitemstyles} onPress={() => this.props.navigation.navigate('Queue Details', {id:item.queue_id})}>

                                <ListItem.Content style={{flexDirection:'row'}}>
                                    <View style={{alignSelf:'center',marginRight:10,marginTop:14}}>
                                        {this.renderAvatar(item.image)}
                                        {this.renderBadge(item.position)}
                                    </View>
                                    <View style={{flex:1}} >
                                        <ListItem.Title style={{flex:1,fontWeight: "bold",color:"black",fontSize:25}}>{item.name}</ListItem.Title>
                                        <View style={[styles.mylabeltext,{flex:1,flexDirection:'row'}]}>
                                            <Chip titleStyle={styles.mychip}
                                            buttonStyle={styles.chipbutton}
                                            title={item.eta + ' min'}
                                                icon={{
                                                name: "timer-sharp",
                                                type: "ionicon",
                                                size: 20,
                                                color: mychipcolor,
                                            }}
                                            />
                                            <Chip titleStyle={styles.mychip}
                                            buttonStyle={[styles.chipbutton,{marginHorizontal:5}]}

                                            title={item.position + ' in front'}
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
                                {this.lastPerson(item.position)}
                        </ListItem>
                );
            });
        }
    };

    render(){
        return(
            <SafeAreaView style={{width:"100%",height:"100%"}}>

            <View style={{height:"100%",paddingVertical:20,paddingHorizontal:10,backgroundColor:'snow'}}>

               <Text h2>
                   My Queues
               </Text>
               <ScrollView containerStyle={{alignItems: 'flex-start',backgroundColor:'snow'}}
                refreshControl={this._refreshControl()}
               >
               <View style={{flex:1,width:'100%',marginVertical:20,marginBottom:10}}>
                    <Text style={{fontSize: 22,'color':'#333234',fontWeight: "bold",marginBottom:15}}>Current Queues</Text>            
                    <Divider orientation="horizontal" />
                        {this.displayQueues()}
                </View>
                {/*<View style={{flex:1,width:'100%',marginVertical:20,marginBottom:30,paddingBottom:20}}>
                    <Text style={{fontSize: 22,'color':'#333234',fontWeight: "bold",marginBottom:10,}}>Queue History</Text>

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
                    
                </View>*/}
                </ScrollView>
           </View>
           </SafeAreaView>
        );

    };
}
