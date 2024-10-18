
import { COLORS, SIZES } from '../Screens/src/Constant';
//import ChatHeader from '../../Component/Header/ChatHeader';
// create a component
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



import { StyleSheet,Platform,TextInput,ActivityIndicator,
  Pressable, Text,Animated,ScrollView, View,Image, 
  Button, FlatList,TouchableOpacity,Modal,
  TouchableWithoutFeedback, Keyboard,Dimensions,
  ImageBackground,
   
  KeyboardAvoidingView 
   } from 'react-native';
import React, {useState,useRef, useEffect, useContext} from 'react';

import {globalStyles} from '../Styles/GlobalStyles';

import { EndPoint } from "../Constant/links";
import useFetch from '../useFetch';
import { useFonts } from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import LotterViewScreen from '../Screens/LotterViewScreen';
import Header from '../Header/header';
import MinorHeader from '../Header/MinorHeader';

// import theme from '../theme/theme';
// import themeContext from '../theme/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';


import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');





  

const AllChattingScreen = ({ navigation, route }) => {

   const {
    id,
    Title 

  } = route.params;

  const post_id = id;



  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [queryset, setQueryset] = useState([]);
  const [current_page, setCurrentPage] = useState(1);
  //const [isLoading, setIsLoading] = useState(false);
  //const [loading, setLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [isPending, setIsPending] = useState(true);
  const [isPending2, setIsPending2] = useState(false);


 const [userData, setUserData] = useState({});
  //const [userToken, setUserToken] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [company_name, setcompany_name] = useState('');

  const [Location, setLocation] = useState('');
  const [Maelezo, setMaelezo] = useState('');


  const [profileImage, setProfileImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
  }, [userData]);



  useEffect(() => {

   
    checkLoggedIn();
    // Fetch cart items only if the user is authenticated
    if (userToken) {
     
     getItems();
    }

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
        setIsLoading(false);
        setEmail(userData.email);
        setUsername(userData.username);
        setPhone(userData.phone);
        setcompany_name(userData.company_name);
         setMaelezo(userData.Maelezo);
          setLocation(userData.Location);

          // Set selectedMkoa moja kwa moja kwa kutumia ID
        setSelectedMkoa(userData.Mkoa.id);

        setSelectedAinaYaKuku(userData.AinaYaKuku.id);
         setSelectedRole(userData.Role.id);

         setprofile_image(userData.profile_image);
         setIsPicked(false);
        
         // Set selectedMkoa and selectedAinaYaKuku based on user data
        //  const mkoa = Mkoa.find(m => m.id === userData.Mkoa.id);
        // const ainaYaKuku = AinaYaKuku.find(a => a.id === userData.AinaYaKuku.id);

        // setSelectedMkoa(mkoa ? mkoa.id : null);
        // setSelectedAinaYaKuku(ainaYaKuku ? ainaYaKuku.id : null);


      } catch (error) {
        handleErrorMessage(error);

      }
    }
  };

  const [error, setError] = useState(null);
  //const [isPending, setPending] = useState(false);
  const emailRegex = /\S+@\S+\.\S+/;

  const handleErrorMessage = (error) => {
    if (error.response) {
      // Handle server errors here if needed
      setIsLoading(false);
    } if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
      setIsLoading(false);
    } else {
      //showAlertFunction('Kuna tatizo kwenye ubadilishaji wa taarifa zako');
      setIsLoading(false);
    }
  };



//console.log("username",username);
  
  //const [messages, setQueryset] = useState([]);
  const [message, setMessage] = useState('');
    const [replyMessage, setReplyMessage] = useState(null); // Added for reply feature



   const [modalVisible, setModalVisible] = useState(false);
 const [isModalVisible, setIsModalVisible] = useState(false); // New state variable



  
 const showAlertFunction = (message2) => {
    setAlertMessage(message2);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };


  let [fontsLoaded] = useFonts({
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
  });

  useFocusEffect(
    React.useCallback(() => {
      const updateUserToken = async () => {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token || '');
      };
      updateUserToken();
      const unsubscribe = navigation.addListener('updateUserToken', updateUserToken);
      return unsubscribe;
    }, [navigation])
  );




// useEffect(() => {

   
//     checkLoggedIn();
//     // Fetch cart items only if the user is authenticated
//     if (userToken) {
     
//      getItems();
//     }

//   }, [userToken]);


// const checkLoggedIn = async () => {
//   const token = await AsyncStorage.getItem('userToken');
//   setUserToken(token);
  
  
 
// };





  const getItems = () => {
 
    //setIsPending(true);
    setIsPending(true);
    const url = `${EndPoint}/GetChatMessagesView/?post_id=${post_id}`;
    fetch(url, {
      method: 'GET',
      //headers: { 'Authorization': `Token ${userToken}` },
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.queryset.length > 0) {
        //setQueryset([...queryset, ...data.queryset]);
        setQueryset(data.queryset); 
       
        setIsPending(false);
       // console.log("Data Obtained");
      } else {
       
        setIsPending(false);
        //console.log("Data NOT Obtained");
          
      }
     

    })
    // .catch(() => {
    //   setIsPending(false);
    // });

  
  };


 const sendMessage = async () => {
    setIsPending2(true);
    const token = await AsyncStorage.getItem('userToken');

    if (token) {
      const formData = new FormData();
      formData.append('message', message);
      if (replyMessage) formData.append('reply_to', replyMessage.id); // Append the reply message ID if replying

      try {
        const response = await axios.post(EndPoint + `/AddChatMessageView/${post_id}/`, formData, {
          headers: { Authorization: `Token ${token}`, 'Content-Type': 'multipart/form-data' }
        });
        setQueryset((prev) => [...prev, response.data]);
        setMessage('');
        setReplyMessage(null); // Reset reply state after sending
      } catch (error) {
        console.log("Message not sent:", error);
      } finally {
        setIsPending2(false);
      }
    }
  };

  const handleReply = (message) => {
    setReplyMessage(message);
  };








const removeUserSubmittedData = async (postId) => {
  //setIsPending(true);
    const token = await AsyncStorage.getItem('token');
    //setUserToken(token);
    //console.log("postId", postId);
    try {
       await axios.delete(EndPoint + `/DeleteYourChatMessageView/${postId}/delete/`, {
      //await axios.delete(EndPoint + `/DeleteKumbushoLaMabadilikoYaLisheByUserItsSelfView/?KumbushoID=${KumbushoID}`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
       setQueryset(queryset.filter((item) => item.id !== postId));
      //setIsPending(false);

      //showAlertFunction('Umefanikiwa kufuta kumbusho');
     // navigation.navigate('Historia Za Kumbusho Za Kusafisha Banda');  // Navigate back to the previous screen
    

    } catch (error) {
       //setIsPending(false);
      //showAlertFunction('Imeshindikana kufuta kumbusho');
     
      //console.log(error);
    }
  };





  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
 








const MsgComponent = ({ item, index }) => (
    <View style={{
        width:'100%',
        alignItems:'flex-end',

    }}>

{/* mwanzo wa view ya Message Container*/}
    <View style={[styles.messageContainer, item.sender === username ? styles.sender : styles.receiver]}>
      

     {/* mwanzo wa view ya kulia*/}
      <View style={{
        width:'60%',

      }}>

    

       {item.sender &&  (
      <Text style={[styles.senderName,
        {
            color:'green',
            marginTop:0,
            fontFamily:'Medium',
        }

        ]}>{item.sender}</Text>
      )}

      <Text style={styles.messageText}>{item.message}</Text>

          {item.reply_to && <Text style={{ color: 'grey' }}>
        Replied Message: {item.reply_to.message}</Text>}

      </View>

       {/* mwisho wa view ya kulia*/}


        {/* mwanzo wa view ya kushoto*/}
     
      <View style={{
        width:'30%',

      }}>

       {item.SenderImage ? ( 
               <Image

                  style={[globalStyles.SenderProfileImage,
                    {
                      // width:'100%',
                      // height:height/11,
                      // borderRadius:40,
                    }

                    ]}
                   source={{
                      uri: EndPoint + '/' + item.SenderImage
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.SenderProfileImage}
                   source={require('../assets/profile.jpg')} 
                  >
                  </Image>
                )}

   {item.created_at &&  (
      <Text style={[styles.senderName,
        {
            color:'green'
        }

        ]}>{formatDate(item.created_at)}</Text>
      )}

      </View>
  {/* mwisho wa view ya kushoto*/}

    </View>
{/* mwisho wa view ya Message Container*/}



{username === item.sender && (
<TouchableOpacity
onPress={() => removeUserSubmittedData(item.id)}
style={{
    marginRight:20,
    //marginBottom:20,
}}
>


<MaterialCommunityIcons

        style={{
            // marginHorizontal: 15,
            //color: COLORS.white
        }}
        name="delete"
        size={17}
          //color="black" 
          color="red" 
        
    />

</TouchableOpacity>
)}


<TouchableOpacity
onPress={() => handleReply(item)}
style={{
    marginRight:20,
    //marginBottom:20,
}}
>


<FontAwesome

        style={{
            // marginHorizontal: 15,
            //color: COLORS.white
        }}
        name="phone"
        size={17}
          //color="black" 
          color="blue" 
        
    />

</TouchableOpacity>

    </View>
  );


    return (

          <>{!fontsLoaded ? (<View/>):(


    <>


 {!isPending ? (




           <View style={[
      globalStyles.container
     ,
         { 
          backgroundColor: isModalVisible ? 
          COLORS.black : COLORS.white,

           opacity: isModalVisible ? 
          0.1 : 1,

           }
     ]}>
        
           {/* <ChatHeader data={data} />*/}
            <ImageBackground
                source={require('../assets/bc1.png')} 
                style={{
                    flex: 1,
                    width:'100%',
                    margin:0,
                    padding:0,
                }}
            >




<Text
style={[globalStyles.AppChaguaHudumaTextHomeScreen,
    {
        color:'white',
        textAlign:'center',
        marginTop:height/15,
    }

    ]}  

>Posti inahusiana na: {Title}</Text>





             {queryset && queryset.length > 0 ? (

                  <>

                 <FlatList
                data={queryset}
               keyExtractor={(item, index) => index.toString()}
                renderItem={MsgComponent}
                //style={styles.chatContainer}
                style={{ 
                    flex: 1,
                    marginTop:15,
                    marginBottom:50,
                }}
              />


                 {replyMessage && (
        <View style={{ padding: 10, backgroundColor: '#f0f0f0' }}>
          <Text>Replying to: {replyMessage.message}</Text>
          <TouchableOpacity onPress={() => setReplyMessage(null)}>
            <Text style={{ color: 'red' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}



</>

   ) :(
   <View style={[globalStyles.noitemTextContainer,{

    justifyContent:'center',
    alignItems:'center',
    flex:1,
   }]}>

  <Text style={globalStyles.noitemText}>hukuna ujumbe unaohusiana na hii posti kwasasa !!
  </Text>



</View>

  )} 

     </ImageBackground>







            <View
                style={{
                    backgroundColor: 'lightgreen', 
                    elevation: 5,
                    // height: 60,
                    flexDirection:'row',
                    alignItems:'center',
                    paddingVertical:7,
                    justifyContent:'space-evenly'
                }}
            >

                <TextInput
                    style={{
                        backgroundColor: COLORS.white,
                        width:'80%',
                        borderRadius:8,
                        borderWidth:0.5,
                        borderColor: COLORS.white,
                        paddingHorizontal: 15,
                        color: COLORS.black,
                        paddingVertical:20,
                    }}
                    placeholder = "Andika ujumbe"
                    placeholderTextColor = "green"
                    multiline = {true}
                    value={message}
                       onChangeText={setMessage}
                />
             
             {!isPending2 ? (
               <TouchableOpacity
              onPress={sendMessage}
               >


                <FontAwesome
                        style={{
                            // marginHorizontal: 15,
                            color: "green",
                            fontFamily:"Medium",
                            // backgroundColor:'black',
                            // padding:10,
                        }}
                        name="paper-plane-o"
                        size={30}
                          //color="black" 
                          color="green" 
                        
                    />

               </TouchableOpacity>
                ):(

                <TouchableOpacity
              onPress={sendMessage}
               >


               <ActivityIndicator size="large" color="green" />

               </TouchableOpacity>
                )}

            </View>










 <AwesomeAlert
                show={showAlert}
                showProgress={false}
                // title="Vyakula Stores"
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

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },


      masBox: {
        alignSelf: 'flex-end',
        marginHorizontal: 10,
        minWidth: 80,
        maxWidth: '80%',
        paddingHorizontal: 10,
        marginVertical: 5,
        paddingTop: 5,
        borderRadius: 8
    },
    timeText: {
        fontFamily: 'AveriaSerifLibre-Light',
        fontSize: 10
    },
    dayview: {
        alignSelf: 'center',
        height: 30,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: COLORS.white,
        borderRadius: 30,
        marginTop: 10
    },
    iconView: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: COLORS.blackcolor,
    },
    TriangleShapeCSS: {
        position: 'absolute',
        // top: -3,
        width: 0,
        height: 0,
        // borderBottomLeftRadius:5,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 15,
        borderRightWidth: 5,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        // borderBottomColor: '#757474'
    },
    left: {
        borderBottomColor: COLORS.white,
        left: 2,
        bottom: 10,
        transform: [{ rotate: '0deg' }]
    },
    right: {
        borderBottomColor: COLORS.black,
        right: 2,
        // top:0,
        bottom: 5,
        transform: [{ rotate: '103deg' }]
    },








 container: { 
  flex: 1,
   padding: 10
   },

  chatContainer: { 
    flex: 1 ,
    //backgroundColor:'red',
   // flex:1,
    marginBottom:200,
  },
  input: { 
    borderWidth: 1, 
    padding: 10,
    paddingVertical:50,
     marginVertical: 5,
     borderRadius:10,
     width:'75%', 
     //textAlign:'left',
   },


  messageContainer: {
   padding: 10, 
   marginTop: 20,
    borderRadius: 30,
     width: '90%',
     //marginLeft:20,
     alignItems:'center',
     justifyContent:'space-between',
     flexDirection:'row',
     flex:1,
     borderTopRightRadius:0,
     //marginTop:30,
     //marginBottom:300,
     },

  sender: {
   backgroundColor: '#DCF8C6', 
   alignSelf: 'flex-end',
   alignItems:'flex-end',

    },
  receiver: {
   backgroundColor: 'wheat', //'#E4E6EB', 
   alignSelf: 'flex-start',
   alignItems:'flex-start', 
},


  messageText: { 
    //fontSize: 16
    fontFamily:'Light',
    //width:'60%',
     },
  senderName: { fontSize: 12, color: 'grey' },


});

//make this component available to the app
export default AllChattingScreen;