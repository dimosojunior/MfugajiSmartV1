
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
import MinorHeader from '../Header/MinorHeader';


const {width,height} = Dimensions.get('window');


const UpdateScreen = ({ navigation }) => {



  let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});



 const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

   const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };



    
const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');






//const emailValue = userData.email;

const [email, setEmail] = useState('');
const [username, setUsername] = useState('');
const [phone, setPhone] = useState('');
const [company_name, setcompany_name] = useState('');
const [profileImage, setProfileImage] = useState('');
const [isLoading, setIsLoading] = useState(false);

//setUsername("Juma")
//console.log(emailValue);


  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
    //fetchUserData();
  }, [userData]);


 useEffect(() => {
    checkLoggedIn();


  }, [userToken]);


  const checkLoggedIn = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);
    if (userToken) {
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
       
      setEmail(userData.email);
      setUsername(userData.username);
      setPhone(userData.phone);
      setcompany_name(userData.company_name);
      setIsLoading(false);
       
      } catch (error) {
        handleErrorMessage(error);
        
      }
    }
  };


const [error, setError] = useState(null); // State to hold the error message
const [isPending, setPending] =useState(false);
const emailRegex = /\S+@\S+\.\S+/;

const [errorMessage, setErrorMessage] = useState('');

const handleErrorMessage = (error) => {
    if (error.response) {
      // The request was made and the server responded with an error status code
      // if (error.response.status === 401) {
      //   showAlertFunction('Registration error. Please try again later.');
      // } else if (error.response.status === 404) {
      //   showAlertFunction('Not Found: The requested resource was not found.');

      // } 
      // else {
      //   showAlertFunction('An error occurred while processing your request.');
      // }
    }  if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
    } else {
      showAlertFunction('Kuna tatizo kwenye ubadilishaji wa taarifa zako');
    }
  };


    const handleUpdate = async () => {
        setIsLoading(true);
        const token = await AsyncStorage.getItem('token');    
    // console.log("userToken: ", userToken);

        if (userToken) {
            axios.put(EndPoint + '/Account/update_user/', {
                email, 
                username,
                phone,
                company_name, 
               // profile_image: profileImage
            },
             {
                headers: 
                { 
                   Authorization: `Token ${userToken}`,
                 }
            }).then(response => {
                setIsLoading(false);

                showAlertFunction("Umefanikiwa Kubadilisha taarifa zako");
                //Alert.alert('Success', 'Profile updated successfully');
                console.log("Well");

            }).catch(error => {
                setIsLoading(false);
                console.log(error);
                //Alert.alert('Error', 'Failed to update profile');
                handleErrorMessage(error);
            });
        }
    };

    return (

        <>{!fontsLoaded ? (<View/>):(

              <>
 {!isLoading ? (


        <View style={{ 
            flex: 1, 
            //paddingVertical: 20 
        }}>

         <MinorHeader title="Badili Taarifa"/>

      

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



                <View style={styles.ImageAccountContainer}>
                     <Text style={styles.title}>MFUGAJI SMART</Text>
                        <Text style={styles.subtitle}>Fuga Kidijitali</Text>

                      {/* <Image
                        source={require('../assets/i3.jpg')}
                        style={styles.ImageAccount}
                            
                          />*/}
                    </View>

                     <Text 
                    style={styles.dataContainerFormTitle}
                    >Badilisha taarifa zako </Text>


            <TextInput 
                placeholder='Email yako' 
                value={email} 
                onChangeText={setEmail}
                 placeholderTextColor={COLORS.white}
               
                style={styles.MyTextInput}
            />
            <TextInput 
                placeholder='Jina lako kamili' 
                value={username} 
                onChangeText={setUsername}
                 placeholderTextColor={COLORS.white} 
                style={styles.MyTextInput}
            />
            <TextInput 
                placeholder='Namba yako ya simu' 
                value={phone} 
                onChangeText={setPhone}
                 placeholderTextColor={COLORS.white} 
                style={styles.MyTextInput}
            />

            <TextInput 
                placeholder='Kampuni yako' 
                value={company_name} 
                onChangeText={setcompany_name} 
                 placeholderTextColor={COLORS.white}
                style={styles.MyTextInput}
            />


           {/* <TextInput 
                placeholder='Profile Image URL' 
                value={profileImage} 
                onChangeText={setProfileImage} 
                style={styles.MyTextInput}
            />*/}
            {!isLoading && (
                
        <TouchableOpacity onPress={handleUpdate} 
        style={styles.ButtonContainerUpdate}
        >
            <Text 
            style={styles.ButtonTextUpdate}
            >Badilisha</Text>
        </TouchableOpacity>
            )}



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

    );
};

export default UpdateScreen;

const styles = StyleSheet.create({

MyTextInput:{
    marginBottom: 10,
     borderBottomWidth: 1, 
     padding: 8,
     color:'white',
     //backgroundColor:'red',
     marginHorizontal:10,
     borderBottomColor:'white',
     marginVertical:15,

 },

ButtonContainerUpdate:{
 //backgroundColor: 'blue', 
 padding: 15 ,
 width:'100%',
 justifyContent:'center',
 alignItems:'center',
 marginTop:25,
},
ButtonTextUpdate:{
    color:'white',
    textAlign:'center',
    fontFamily:'Medium',
    backgroundColor: 'blue',
    paddingVertical: 10 ,
    paddingHorizontal:30,
    borderRadius:10,

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
      marginBottom:10,
      textAlign:'center',
      fontFamily:'Medium',

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