import React, { useState, useEffect } from 'react';
import { View, SafeAreaView,Modal,Pressable, ImageBackground, TextInput, Alert, Image, StyleSheet, ActivityIndicator, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EndPoint } from '../Constant/links';
import { globalStyles } from '../Styles/GlobalStyles';
import LottieView from 'lottie-react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import { COLORS, SIZES } from '../Screens/src/Constant';
import LotterViewScreen from '../Screens/LotterViewScreen';
import MinorHeader from '../Header/MinorHeader';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
//import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';


const { width, height } = Dimensions.get('window');

const DukaLakoForm = ({ navigation }) => {
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




const [modalVisible, setModalVisible] = useState(false);
const [isModalVisible, setIsModalVisible] = useState(false); // New state variable
const [displayContentsState, setdisplayContentsState] = useState(false);






    const [PichaYaPost, setPichaYaPost] = useState(null);
  const [extractedText, setExtractedText] = useState('');



//MWANZO WA PICK IMAGE FROM THE PHONE
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
 
      setPichaYaPost(result.assets[0].uri); // Use assets array
      console.log("PROJECT IMAGE", PichaYaPost)
      processImage(); // Use assets array
  };

 const  processImage = ()=>{
    console.log('Converted')
  }

  //MWISHO WA PICK IMAGE FROM THE PHONE







const [Title, setTitle] = useState('');
const [Maelezo, setMaelezo] = useState('');

  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [company_name, setcompany_name] = useState('');

  const [Location, setLocation] = useState('');
  //const [Maelezo, setMaelezo] = useState('');


  const [profileImage, setProfileImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
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
        setIsLoading(false);
        setEmail(userData.email);
        setUsername(userData.username);
        setPhone(userData.phone);
        setcompany_name(userData.company_name);
         //setMaelezo(userData.Maelezo);
          setLocation(userData.Location);
        
       

      } catch (error) {
        handleErrorMessage(error);

      }
    }
  };

  const [error, setError] = useState(null);
  const [isPending, setPending] = useState(false);
  const emailRegex = /\S+@\S+\.\S+/;

  const handleErrorMessage = (error) => {
    if (error.response) {
      // Handle server errors here if needed
      setIsLoading(false);
    } if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
      setIsLoading(false);
    } else {
      showAlertFunction('Kuna tatizo kwenye ubadilishaji wa taarifa zako');
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('userToken');

    if (userToken) {
      const formData = new FormData();
      
       // Hakikisha kuwa selectedMkoa na selectedAinaYaKuku sio null
        if (Title) {
            formData.append('Title', Title);
        } else {
            showAlertFunction('Tafadhali tuambie hii posti inahusiana na nini ?');
            setIsLoading(false);
            return;
        }


         if (Maelezo) {
            formData.append('Maelezo', Maelezo);
        } else {
            showAlertFunction('Tafadhali weka maelezo ya posti yako ?');
            setIsLoading(false);
            return;
        }

     

      // formData.append('Mkoa', selectedMkoa.id);
      // //formData.append('Level', selectedLevel.id);
      // formData.append('AinaYaKuku', selectedAinaYaKuku.id);


       // Append the image file
    formData.append('PichaYaPost', {
      uri: PichaYaPost,
      name: 'PichaYaPost.jpg',
      type: 'image/jpeg',
    });

    // formData.append('pdf', {
    //   uri: pdf,
    //   name: 'project.pdf',
    //   type: 'application/pdf',
    // });

      axios.post(EndPoint + '/AddDukaLakoView/', formData, {
        headers: {
          Authorization: `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        setIsLoading(false);
        showAlertFunction("Umefanikiwa Kuweka huduma yako mpya");
        setdisplayContentsState(true);
        //console.log("Well");
      }).catch(error => {
        setIsLoading(false);
        setdisplayContentsState(false);
        //console.log(error);
        handleErrorMessage(error);
      });
    }
  };

  return (
    <>
      {!fontsLoaded ? (<View />) : (
        <>
          {!isLoading ? (
            <View style={{ flex: 1 }}>
              <MinorHeader title="Ongeza Huduma" />
              <ImageBackground
                source={require('../assets/bc1.png')}
                style={{ flex: 1, opacity: 1 }}
                resizeMode="cover"
              >
                <ScrollView keyboardShouldPersistTaps="handled">
                  <View style={styles.ImageAccountContainer}>
                    <Text style={styles.title}>MFUGAJI SMART</Text>
                    <Text style={styles.subtitle}>Fuga Kidijitali</Text>
                  </View>


{!displayContentsState && (

<Pressable>


                  <Text style={styles.dataContainerFormTitle}>
                  Jaza sehemu zote hapo chini ili kuweza kuweka huduma
                  mpya </Text>




{/*mwanzo wa input*/}
 <View style={{
          width:'90%',
          //height:100
          marginHorizontal:20,
          marginVertical:0,
          marginTop:40,
         }}>
            <Text style={[globalStyles.haippo,
              {
                //width:'90%',
                color:'wheat',
              }
              ]}>
            Tuambie posti yako inahusiana na nini ?
            </Text>
            </View>

 <TextInput
  //placeholder='Kiasi Cha Mayai'
  value={Title}
  onChangeText={setTitle}
  placeholderTextColor={COLORS.white}
  style={styles.MyTextInput}
/>

{/*mwisho wa input*/}






{/*mwanzo wa picha yako*/}

<View style={{ 
  marginTop: 20,
  marginHorizontal:20,
  width:'90%'
   }}>
  {/*<Text style={{ 
    fontSize: 16,
   marginLeft: 3,
   color:'white'
   }}>Picha Yako </Text>*/}
  <View style={[globalStyles.input,
    {
     // backgroundColor:'green',
     backgroundColor:'rgba(0,0,0,0)',
      //marginHorizontal:20,
      width:'100%',
      borderColor:'white',
      borderWidth:1,
    }

    ]}>
     <TouchableOpacity
      
      onPress={pickImage}
    >
    <FontAwesome
     style={globalStyles.InputIcon} 
     name='image' 
     size ={30}
     color="white"
     />
     </TouchableOpacity>

    <TouchableOpacity
      style={globalStyles.textInputAddNewProjectAddProject}
      onPress={pickImage}
    >
      <Text style={{ 
        color: 'white',
        marginLeft:15, 
      }}>Chagua posti ya picha yako</Text>
    </TouchableOpacity>
  </View>


<View style={{
  width:'100%',
  justifyContent:'center',
  alignItems:'center',
}}>
    {PichaYaPost && (
<Image source={{ uri: PichaYaPost }} style={{ 
width: width-50 ,
height: 200,
borderRadius:10,
marginTop:10,
marginBottom:20,

}} />
)}
</View>


</View>

{/*mwisho wa picha yako*/}







{/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    <Text style={{
                     //fontSize:16,
                      marginLeft:20,
                      color:'white',
                       }}>
                     Andika maelezo ya posti yako</Text>
                    < View style={globalStyles.ProjectBodyinput}>
                        {/*<FontAwesome style={globalStyles.InputIcon} name='pencil'/>*/}
                        <TextInput 
                        style={globalStyles.ProjectBodyInputIcon}  
                        placeholder='weka maelezo yako'
                        placeholderTextColor={COLORS.white}
                        value={Maelezo}
                    onChangeText={setMaelezo}
                       
         multiline={true}  // Enable multiline
          numberOfLines={50}  // Set a maximum number of lines
                           />
                    </View>
                </View>
              {/*mwisho wa field*/}










                  {!isLoading && (
                    <TouchableOpacity onPress={handleUpdate} style={styles.ButtonContainerUpdate}>
                      <Text style={styles.ButtonTextUpdate}>Ongeza Huduma</Text>
                    </TouchableOpacity>
                  )}



</Pressable>
)}




{displayContentsState &&(
<View style={{
  marginTop:50,
  width:'90%',
  marginHorizontal:20,
  justifyContent:'center',
  alignItems:'center',
  flex:1,
}}>
  <Text style={{
    color:'white',
    fontFamily:'Medium',
  }}>
     Ahsante kwa kuweka huduma mpya kwenye programu yetu ya Mfugaji
     Smart, huduma itaanza kuonekana kwa watu baada ya kuhakikiwa
     kama inafaa kuwepo humu, uhakiki utakamilika muda mchache
     baada ya kuweka huduma yako, endelea kutumia Mfugaji Smart.
  </Text>

   <TouchableOpacity 
   onPress={() => {
   setdisplayContentsState(false);
  }}
     style={styles.ButtonContainerUpdate}>
  <Text style={styles.ButtonTextUpdate}>Weka huduma pya</Text>
</TouchableOpacity>

</View>


  )}







                </ScrollView>
              </ImageBackground>




              <AwesomeAlert
                show={showAlert}
                showProgress={false}
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
          ) : (
            <LotterViewScreen />
          )}
        </>
      )}
    </>
  );
};

export default DukaLakoForm;

const styles = StyleSheet.create({
  MyTextInput: {
    marginBottom: 10,
    borderBottomWidth: 1,
    padding: 8,
    color: 'white',
    marginHorizontal: 10,
    borderBottomColor: 'white',
    marginVertical: 15,
  },
  ButtonContainerUpdate: {
    padding: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  ButtonTextUpdate: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Medium',
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  title: {
    color: COLORS.white,
    fontFamily: 'Regular',
    fontSize: 25,
  },
  subtitle: {
    color: 'green',
    paddingTop: 3,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Medium',
  },
  dataContainerFormTitle: {
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Medium',
  },
  ImageAccountContainer: {
    alignItems: 'center',
  },
});
