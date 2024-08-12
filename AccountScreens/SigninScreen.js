
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
const SigninScreen = ({ navigation }) => {

     const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };



    //const [isPending, setIsPending] = useState(false);
let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});



  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //TO MAKE A LOADING MESSAGE ON A BUTTON
  const [isPending, setPending] = useState(false);

  //const navigation = useNavigation();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      try {
        const userResponse = await axios.get(
          EndPoint + '/Account/user_data/',
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const userData = userResponse.data;
        // Fetch and set cart data here
        // const cartResponse = await axios.get(
        //   'https://hotelappapisv1.pythonanywhere.com/Hotel/Cart/',
        //   {
        //     headers: {
        //       Authorization: `Token ${token}`,
        //     },
        //   }
        // );

        // const cartData = cartResponse.data;
        // // Update the cart state with the fetched data
        // setCart(cartData);

        // navigation.replace('Home Stack', { userData });
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home Stack' }],
        });
      } catch (error) {
        
      }
    }
  };


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
      showAlertFunction('Taarifa zako sio sahihi');
    }
  };

  const handleLogin = async () => {
    

    if (!username && !password) {
      //setError('Please fill in all fields correctly');
      showAlertFunction("Tafadhali jaza taarifa zote kwa usahihi");
      return;
    }

    if (!username) {
     // setError('Please enter your registration username correctly');
      showAlertFunction("Tafadhali ingiza jina lako kwa usahihi");
      return;
    }

      // Validate email format
  
  // if (!emailRegex.test(email)) {
  //   showAlertFunction("Please enter a valid email address");
  //   return;
  // }

    if (!password) {
      //setError('Please enter your registration password correctly');
      showAlertFunction("Tafadhali ingiza password yako kwa usahihi");
      return;
    }
    setPending(true);

    try {
      const response = await axios.post(EndPoint + '/Account/login_user/', {
        username: username,
        password: password,
      });

      const token = response.data.token;
      await AsyncStorage.setItem('userToken', token);
      //navigation.emit('updateUserToken', token);

      // Now, make another request to get user data
      const userResponse = await axios.get(EndPoint + '/Account/user_data/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const userData = userResponse.data;
      // Save user data to AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      // Emit the 'updateUserToken' event
      // hii inasaidia kupata a login user token automatically without
      // page refreshing
      EventRegister.emit('updateUserToken', token);



      // Pass the userData to Home Stack
      // navigation.replace('MainScreen', { userData });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home Stack' }],
      });
    } catch (error) {
      //setError('Invalid credentials');
      // showAlertFunction("Invalid credentials");
      
      handleErrorMessage(error);
      setPending(false);
    }
  };




  const [isPasswordVisible, setPasswordVisible] = useState(false);


    return(

        <>{!fontsLoaded ? (<View/>):(

          <>
 {!isPending ? (

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
                    >Thibitisha taarifa zako kwa usahihi</Text>
                        <TextInput 
                        placeholder='Jina Unalotumia' 
                        style={[styles.textinput,{
                            width:width-100
                        }]} 
                        placeholderTextColor={COLORS.white}
                        // keyboardType={'email-address'}
                        value={username}
                        onChangeText={text => setUsername(text)} 
                        />

         <View 
            style={styles.dataContainerForPassword}
          >
          <TextInput
          style= {[styles.textinputi,{ color: 'white',width:'60%'}]}
          placeholder="Neno siri"
          secureTextEntry={!isPasswordVisible} // Toggle secureTextEntry based on isPasswordVisible state
          value={password}
          onChangeText={(text) => setPassword(text)}
        placeholderTextColor={COLORS.white}
        />

        <View style={{
          width:'40%',
          justifyContent:"center",
        }}>

         {/* Add a button to toggle password visibility */}
        <TouchableOpacity
          onPress={() => setPasswordVisible(!isPasswordVisible)}
          style={{ alignSelf: 'flex-end', marginRight: 50,color:'white' }}>
          <Text style={{ color: 'white', fontSize: 16,fontWeight:'bold' }}>
            {/*{isPasswordVisible ? 'Hide' : 'Show'} Password*/}
            {isPasswordVisible ? (
              <FontAwesome size={25} color="white" name="eye-slash" />
            ):(
              <FontAwesome size={25} color="white" name="eye" />
            )}
          </Text>
        </TouchableOpacity>

        </View>
        </View>

                    </View>

                    {!isPending &&
                <TouchableOpacity 
                        onPress={handleLogin}
                        >
                    <View style={styles.btnContainer}>
                        
                            <View style={styles.button1}>
                                <Text style={styles.btnText}>Ingia</Text>
                            </View>
                        
                        </View>
                    </TouchableOpacity>}

                      {/*{isPending &&
                         <View style={styles.btnContainer}>
                        <TouchableOpacity 
                        
                        >
                            <View style={styles.button1}>
                               
                             <ActivityIndicator size="large" color="red" /> 
                            </View>
                        </TouchableOpacity>
                     
                    </View>}*/}


                    <View style={styles.bottomContainer}>
                        <TouchableOpacity 
                         onPress={() => navigation.navigate("Signup Stack")}
                        >
                            <Text style={styles.text}>Bado hujajisajili? | Jisajili hapa</Text>
                        </TouchableOpacity>
                    </View>
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




        ):(

<LotterViewScreen />

)}

    </>

         )}</>
    )
}

export default SigninScreen;



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