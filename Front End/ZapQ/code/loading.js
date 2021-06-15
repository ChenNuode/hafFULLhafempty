import React, {Component} from 'react';
import {KeyboardAvoidingView, TextInput, Platform, StyleSheet, Text, View, ActivityIndicator, Image} from 'react-native';

export default class AppLoad extends Component {
  render() {
    return(
      <View style={{flex:1,justifyContent: 'center',alignItems: 'center',paddingHorizontal:40}}>
        <ActivityIndicator
            color = '#266DD3'
            size = 'large'
        />
      </View>
    )
  };
};
