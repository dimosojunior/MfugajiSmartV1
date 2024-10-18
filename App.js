import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Alert, Linking, Text,SafeAreaView, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import Test from './Screens/Test';

//import MyDrawer from './Drawer/drawer';
import MyTab from './Tab/MyTab';
import MyStack from './Stack/MyStack';

import { NavigationContainer } from '@react-navigation/native';

import React, { useState, useEffect } from 'react';
import { EndPoint } from './Constant/links';
import * as Application from 'expo-application';
import AwesomeAlert from 'react-native-awesome-alerts';
//import registerNNPushToken, { getPushDataObject } from 'native-notify';
export default function App({navigation}) {




  // registerNNPushToken(22686, 'a2QsBx8kDDbDbIpLTkJWAt');

  //   let pushDataObject = getPushDataObject();
  //    useEffect(() => {
  //         console.log(pushDataObject);
  //         //navigation.navigate("PreLoader Stack");
  //    }, [pushDataObject]);


  const checkForUpdate = async () => {
  try {
    const response = await fetch(EndPoint + '/LatestVersionView/');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Ensure it's JSON
    const latestVersion = data.latest_version;

   // const currentVersion = Application.nativeApplicationVersion;
    const currentVersion = "5";

    console.log("currentVersion:", currentVersion);
    console.log("latestVersion:", latestVersion);

    if (currentVersion < latestVersion) {
      Alert.alert(
        'Toleo Jipya Lipo Playstore',
        'Toleo jipya la Mfugaji Smart sasa linapatikana playstore. Tafadhali pakua toleo jipya ili kupata huduma nyingine mpya.',
        [
          { text: 'Pakua sasa', onPress: () => Linking.openURL('https://play.google.com/store/apps/details?id=ttpc.MS') },
          { text: 'Baadae', style: 'cancel' }
        ]
      );
    }
  } catch (error) {
    console.error('Error checking for update:', error.message);
  }
};

 useEffect(() => {
    checkForUpdate(); // Check for updates when the app starts
  }, []);



  return (
    <SafeAreaView style={styles.container}>
    
      
     <NavigationContainer>
          <MyStack />
     </NavigationContainer>
      

      
      <StatusBar backgroundColor="white" barStyle="dark-content" />
    </SafeAreaView>
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
