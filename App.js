import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import Test from './Screens/Test';

//import MyDrawer from './Drawer/drawer';
import MyTab from './Tab/MyTab';
import MyStack from './Stack/MyStack';

import { NavigationContainer } from '@react-navigation/native';

import React, { useState, useEffect } from 'react';
//import registerNNPushToken, { getPushDataObject } from 'native-notify';
export default function App({navigation}) {

  // registerNNPushToken(22686, 'a2QsBx8kDDbDbIpLTkJWAt');

  //   let pushDataObject = getPushDataObject();
  //    useEffect(() => {
  //         console.log(pushDataObject);
  //         //navigation.navigate("PreLoader Stack");
  //    }, [pushDataObject]);


  return (
    <View style={styles.container}>
    
      
     <NavigationContainer>
          <MyStack />
     </NavigationContainer>
      

      
      <StatusBar backgroundColor="white" barStyle="dark-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
