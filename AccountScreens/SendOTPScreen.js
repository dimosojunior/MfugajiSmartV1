
import React, { useState, useEffect } from 'react';

import { View,SafeAreaView,ImageBackground, TextInput, Alert, Image, StyleSheet, ActivityIndicator, Text, Dimensions, ScrollView, Touchable, TouchableOpacity } from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
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

     const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };



   // const [isPending, setPending] = useState(false);
let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});



  const [error, setError] = useState('');
  //TO MAKE A LOADING MESSAGE ON A BUTTON
  const [isPending, setPending] = useState(false);


// const [error, setError] = useState(null);
const [errorMessage, setErrorMessage] = useState('');
const emailRegex = /\S+@\S+\.\S+/;

const handleErrorMessage = (error) => {
    if (error.response) {
      // The request was made and the server responded with an error status code
      // if (error.response.status === 401) {
      //   showAlertFunction('Authentication Error: You are not authorized.');
      // } 
      // else if (error.response.status === 404) {
      //   showAlertFunction('Not Found: The requested resource was not found.');

      // } 
      //else if{
      //   showAlertFunction('An error occurred while processing your request.');
      // }
    }  if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
    } else {
      showAlertFunction('kuna tatizo kwenye taarifa zako, tafadhali ingiza email uliyojisajilia', error.response.data.error);
    }
  };



   const [email, setEmail] = useState('');

  const sendOTP = () => {
   setPending(true);
     if (!email) {
      //setError('please enter your valid email');
       showAlertFunction("Tafadhali ingiza email yako kwa usahihi");
       setPending(false);
      return;
    }

    if (!emailRegex.test(email)) {
    showAlertFunction("Tafadhali fuata kanuni za kuandika email, @");
    setPending(false);
    return;
  }

    axios.post(EndPoint + '/Account/send-otp/', { email })
      .then(response => {
        setPending(false);
        showAlertFunction('Angalia OTP codes zimetumwa kwenye email yako.');
        navigation.navigate('Verify OTP Screen', { email });
      })
      .catch(error => {
        setPending(false);
        handleErrorMessage(error);
        //showAlertFunction('Error', error.response.data.error || 'An error occurred.');
      });
  };



    return(

        <>{!fontsLoaded ? (<View/>):(

        

        <View style={styles.container}>
            <ImageBackground

                source={require('../assets/bc1.png')}
                style={{
                    flex: 1,
                    opacity:1,
                    //justifyContent:'center'

                }}
                resizeMode= "cover"
            >
                <ScrollView 
                keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.topContainer}>
                  
                 {/*mwanzo Image container*/}
                    <View style={styles.ImageAccountContainer}>
                     <Text style={styles.title}>MFUGAJI SMART</Text>
                        <Text style={styles.subtitle}>Fuga Kidijitali</Text>

                      {/* <Image
                        source={require('../assets/i3.jpg')}
                        style={styles.ImageAccount}
                            
                          />*/}
                    </View>

                  {/*mwisho Image container*/}

                       
                    </View>
                    <View style={styles.dataContainer}>
                    <Text 
                    style={styles.dataContainerFormTitle}
                    >Tafadhali ingiza email yako kuendelea</Text>
                       

                        <TextInput 
                        placeholder='Ingiza email yako' 
                        style={[styles.textinput,{
                            width:width-100
                        }]} 
                        placeholderTextColor={COLORS.white}
                        value={email}
                        onChangeText={setEmail}
                        
                        keyboardType="email-address"
                        />

        

                    </View>

                 {!isPending &&  
                <TouchableOpacity 
                  onPress={sendOTP}
                  >
                    <View style={styles.btnContainer}>
                        
                            <View style={styles.button1}>
                                <Text style={styles.btnText}>Omba Codes</Text>
                            </View>
                        
                        </View>
                    </TouchableOpacity>}

                      {isPending &&
                         <View style={styles.btnContainer}>
                        <TouchableOpacity 
                        
                        >
                            <View style={styles.button1}>
                               
                             <ActivityIndicator size="large" color="green" /> 
                            </View>
                        </TouchableOpacity>
                     
                    </View>}


                  


                </ScrollView>
            </ImageBackground>

           
               <AwesomeAlert
                show={showAlert}
                showProgress={false}
                // title="Overdose Stores"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor="green"
                onConfirmPressed={hideAlert}
                 confirmButtonStyle={globalStyles.alertButton}
                contentContainerStyle={globalStyles.alertContainer}
                customView={
                  <View style={globalStyles.alertContent}>
                    <Image source={require('../assets/i2.jpg')} style={globalStyles.alertImage} />
                    <Text style={globalStyles.alertTitle}>Mfugaji Smart</Text>
                    <Text style={globalStyles.alertMessage}>{alertMessage}</Text>
                  </View>
                }
              />


        </View>




 

         )}</>
    )
}

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
        justifyContent:'center',
        flex:1,
         
    },
    dataContainerFormTitle:{
      color:'white',
      marginBottom:20,
      marginTop:height/10,

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