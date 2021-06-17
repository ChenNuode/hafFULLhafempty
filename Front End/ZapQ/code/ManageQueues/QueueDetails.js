import React,{Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {
    Button,
    Text,
    Divider,
    Card,
    Image,
    Chip,
    Icon,
    Avatar,
} from 'react-native-elements';

import api from '../api';
//imports end

// in main js
// import MyQueuesPage from 'MyQueues.js';
// createBottomTabNavigator{
//    screen: MyQueuesPage};

var mychipcolor = 'black'
const styles = StyleSheet.create({
    bigtext: {
        fontSize: 20,
    },
    mychip: {
        fontSize: 14,
        fontWeight:'bold',
        color:mychipcolor,
    },
    chipbutton: {
        //backgroundColor:'#7B68EE','salmon' #6CB4EE 
        backgroundColor:'#F0F8FF',
        marginHorizontal:5,
        padding:5,
        paddingRight:7
    },
});
  
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

            this.getDetails();
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
        } else return "Nobody";
    }

    renderAvatar(uri){
        if(uri == null){
            return (
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Avatar rounded size="medium" source={require('../images/defaultQimage2.png')}/>
                    <Text h3 style={{flex:1,marginLeft:10}}>{this.state.queue.name}</Text>
                </View>
            )
        } else {
            return (
                <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                    <Avatar rounded size="medium" source={{uri: api.beurl()+uri}}/>
                    <Text h3 style={{flexGrow:1,marginLeft:10}}>{this.state.queue.name}</Text>
                </View>
            )
        }
    }

    render(){
        return(
 
           <View style={{width:'100%',height:'100%','color':'#333234',backgroundColor:'snow',alignItems:'center', justifyContent:'center'}}> 
                
                <Card containerStyle={{alignItems:'center',justifyContent:'center',width:'85%',
                marginBottom:30,paddingVertical:20,paddingHorizontal:10}}>
                    
                    <Card.Title style={{width:'100%'}}>
                        {this.renderAvatar(this.state.queue.image)}
                    </Card.Title>
                    <Card.Divider/>
                                          
                        <Text style={{marginTop:10,color:'gray',fontSize:14,marginBottom:5}}>Queue Description</Text>
                        <Text style={{fontSize:18}}>{this.state.queue.desc}</Text>

                        <View style={{marginTop:40,marginBottom:10,width:250}}>
                            
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:5}}>
                                
                                {/*<Text style={{fontSize:16,padding:2}}>No of people in Queue: </Text>*/}
                                <View>
                                    <Chip titleStyle={styles.mychip}
                                        buttonStyle={styles.chipbutton}
                                        title={this.state.queue.queue_length+" in queue"}
                                            icon={{
                                            name: "md-people-sharp",
                                            type: "ionicon",
                                            size: 32,
                                            color: mychipcolor,
                                        }}
                                    />
                                </View>

                                {/*<Text h3 style={{flex:1,marginLeft:5,textAlign:'left'}}>{this.state.queue.title}</Text>*/}
                            </View>
                            
                            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:5}}>
                                
                            <Text style={{fontSize:20,padding:2}}>Next Person is: </Text>
                            <Text style={{fontSize:22,fontWeight:'bold'}}>{this.checkNextQueuer()}</Text>
                            </View>
                            
                            
                        </View>
                </Card>
                
                <View style={{flexDirection:'row',justifyContent:'space-around',width:'85%'}}>
                    
                    <TouchableOpacity onPress={() => this.admitQueuer()} style={{flexDirection:'column',alignItems:'center',padding:5,justifyContent:'center'}}>
                        <Icon name='navigate-next' type="material" color='#333234' />
                        <Text style={{fontSize:14,marginTop:10}}>Admit Next Person</Text>
                    </TouchableOpacity>
                    
                    <Divider orientation="vertical"></Divider>
            
                    <TouchableOpacity onPress={() => this.closeQueue()} style={{flexDirection:'column',alignItems:'center',padding:5,justifyContent:'center'}}>
                        <Icon name='closecircleo' type="antdesign" color='#EE214E' />
                        <Text style={{fontSize:14,marginTop:10,color:'#EE214E'}}>Close Queue</Text>
                    </TouchableOpacity>

                </View> 
                
                
           </View>
           
        )
    }
}
