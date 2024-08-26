import React, { useState, useEffect } from 'react';

import { View,SafeAreaView,ImageBackground,Button, TextInput, Alert, Image, StyleSheet, ActivityIndicator, Text, Dimensions, ScrollView, Touchable, TouchableOpacity } from 'react-native';

import axios from 'axios';
import { EndPoint } from '../Constant/links';
import {globalStyles} from '../Styles/GlobalStyles';
import LottieView from 'lottie-react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Ionicons, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {useFonts} from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import { COLORS, SIZES } from '../Screens/src/Constant';
import LotterViewScreen from '../Screens/LotterViewScreen';
const { width, height } = Dimensions.get('window');

const SendOTPScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const sendOTP = () => {
    axios.post(EndPoint + '/Account/send-otp/', { email })
      .then(response => {
        Alert.alert('Success', 'OTP sent to your email.');
        navigation.navigate('Verify OTP Screen', { email });
      })
      .catch(error => {
        Alert.alert('Error', error.response.data.error || 'An error occurred.');
      });
  };

  return (
    
       <ImageBackground

        source={require('../assets/bc1.png')}
        style={{
            flex: 1,
            opacity:1,
            justifyContent:'center',
           alignItems:'center',

            //justifyContent:'center'

        }}
        resizeMode= "cover"
            >

      <Text>Enter your email to receive OTP:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        style={[styles.textinput,{
          width:width-100
      }]} 
      />
      <Button title="Send OTP" onPress={sendOTP} />



      </ImageBackground>
   
  );
};

export default SendOTPScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
    },
    topContainer: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent:'center',

    },
    title: {
        color: COLORS.white,
        // fontWeight: 'bold',
        // fontSize: SIZES.h1 * 1.5,
        fontFamily:'Regular',
        fontSize:25
    },
    subtitle: {
        color: 'green',
        // fontSize: SIZES.h4,
        paddingTop: 3,
        textAlign:'center',
        marginBottom:15,
        fontFamily:'Medium',
    },
    dataContainer: {
        marginTop: 10,
        alignItems: 'center',
         
    },
    dataContainerFormTitle:{
      color:'white',
      marginBottom:20,

    },

    dataContainerForPassword: {
      color: COLORS.white,
        fontSize: SIZES.h3,
        // borderBottomColor: COLORS.lightGrey,
        borderColor: COLORS.lightGrey,
        borderWidth: 1,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginTop: 50,
        padding:10,
        borderRadius:8,
        width:width-100,
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1,
        
         
    },

    textinput: {
        color: COLORS.white,
        //fontSize: SIZES.h3,
        // borderBottomColor: COLORS.lightGrey,
        borderColor: COLORS.lightGrey,
        borderWidth: 1,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginVertical: 5,
        padding:10,
        borderRadius:8,
        fontFamily:'Light',
    },

    textinputi: {
        color: COLORS.white,
        //fontSize: SIZES.h3,
        fontFamily:'Light',
        
        
        marginHorizontal: 0,
        
        padding:0,
        
    },

    btnContainer: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        //width:'100%',

    },
    button1: {
        backgroundColor: '#1f1f1f',
        padding: 20,
        marginHorizontal: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        width:'50%',
        borderWidth:1,
        borderColor:'white',
    },
    btnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: SIZES.h4,
    },
    button2: {
        flexDirection: 'row',
        backgroundColor: COLORS.blue,
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 30,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        marginRight: 10,
    },
    text: {
        color: 'lightblue',
        textAlign: 'center',
        marginTop: 10,
        //fontWeight: '600',
        //fontSize: SIZES.h5,
        // fontSize:18,
        fontFamily:'Light'
    },
    bottomContainer: {
        justifyContent: 'center',
        marginTop: 20,
    },


ImageAccountContainer:{
  alignItems:'center',


},

ImageAccount:{
   // width: width/2 + 120,
  //  width: width/2 - 130,
  // height: height/10,
   width: 80,
  height: 80,
  marginBottom: 10,
  borderRadius: 100,
  // borderWidth:1,
  // borderColor:'white',
  // opacity:1,
  // borderTopRightRadius:200,
  // borderBottomLeftRadius:50,

},


});
