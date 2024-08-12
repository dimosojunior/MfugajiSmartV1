import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ImageBackground, TextInput, Alert, Image, StyleSheet, ActivityIndicator, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
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








    const [profile_image, setprofile_image] = useState(null);
  const [extractedText, setExtractedText] = useState('');



//MWANZO WA PICK IMAGE FROM THE PHONE
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
 
      setprofile_image(result.assets[0].uri); // Use assets array
      console.log("PROJECT IMAGE", profile_image)
      processImage(); // Use assets array
  };

 const  processImage = ()=>{
    console.log('Converted')
  }

  //MWISHO WA PICK IMAGE FROM THE PHONE


//MWANZO WA PICK PDF FROM THE PHONE

// Add PDF state
const [pdf, setPdf] = useState(null);

// Add PDF picker function
const pickPdf = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf'
    });
    if (!result.cancelled) {
      setPdf(result.assets[0].uri);
      console.log("result URI:", result);
      console.log("PDF URI:", pdf); // Log PDF URI after setting
    }
  };
//MWISHO WA PICK PDF FROM THE PHONE






// State variable to store the RoomClasses data
  const [Mkoa, setMkoa] = useState([]);
 const [selectedMkoa, setSelectedMkoa] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    fetch(`${EndPoint}/Add/AllMikoa/`)
      .then((response) => response.json())
      .then((data) => {
        setMkoa(data);
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);


// State variable to store the RoomClasses data
  const [Level, setLevel] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
 
 
  // Fetch Universities
  useEffect(() => {
    fetch(`${EndPoint}/Add/LevelZaWafugaji/`)
      .then((response) => response.json())
      .then((data) => {
        setLevel(data);
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);



// State variable to store the RoomClasses data
  const [AinaYaKuku, setAinaYaKuku] = useState([]);
 const [selectedAinaYaKuku, setSelectedAinaYaKuku] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    fetch(`${EndPoint}/Add/AinaZaKukuViewSet/`)
      .then((response) => response.json())
      .then((data) => {
        setAinaYaKuku(data);
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);












  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [company_name, setcompany_name] = useState('');
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
  const [isPending, setPending] = useState(false);
  const emailRegex = /\S+@\S+\.\S+/;

  const handleErrorMessage = (error) => {
    if (error.response) {
      // Handle server errors here if needed
    } if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
    } else {
      showAlertFunction('Kuna tatizo kwenye ubadilishaji wa taarifa zako');
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('userToken');

    if (userToken) {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('username', username);
      formData.append('phone', phone);
      formData.append('company_name', company_name);

         // Hakikisha kuwa selectedMkoa na selectedAinaYaKuku sio null
        if (selectedMkoa && selectedMkoa.id) {
            formData.append('Mkoa', selectedMkoa.id);
        } else {
            showAlertFunction('Tafadhali chagua Mkoa.');
            setIsLoading(false);
            return;
        }

        if (selectedAinaYaKuku && selectedAinaYaKuku.id) {
            formData.append('AinaYaKuku', selectedAinaYaKuku.id);
        } else {
            showAlertFunction('Tafadhali chagua Aina ya Kuku.');
            setIsLoading(false);
            return;
        }


      // formData.append('Mkoa', selectedMkoa.id);
      // //formData.append('Level', selectedLevel.id);
      // formData.append('AinaYaKuku', selectedAinaYaKuku.id);


       // Append the image file
    formData.append('profile_image', {
      uri: profile_image,
      name: 'profile_image.jpg',
      type: 'image/jpeg',
    });

    // formData.append('pdf', {
    //   uri: pdf,
    //   name: 'project.pdf',
    //   type: 'application/pdf',
    // });

      axios.put(EndPoint + '/Account/update_user/', formData, {
        headers: {
          Authorization: `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        setIsLoading(false);
        showAlertFunction("Umefanikiwa Kubadilisha taarifa zako");
        //console.log("Well");
      }).catch(error => {
        setIsLoading(false);
        console.log(error);
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
              <MinorHeader title="Badili Taarifa" />
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

                  <Text style={styles.dataContainerFormTitle}>Badilisha taarifa zako </Text>

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





  {/*  mwanzo wa picker*/}
 <View style={{ marginTop: 20 }}>
        

        < View style={globalStyles.inputTax}>
            <Text style={globalStyles.TaxTypeAddNewProject}>
                 Mkoa
            </Text>

     <View style={globalStyles.picker}>

            
          <Picker
           style={globalStyles.pickerInputAddNewProject}
            selectedValue={selectedMkoa}
            onValueChange={(itemValue) => setSelectedMkoa(itemValue)}
          >

            {Mkoa.map((x) => (
              <Picker.Item
                key={x.id}
                label={x.JinaLaMkoa}
                value={x}
              />
            ))}
          </Picker>

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}






  {/*  mwanzo wa picker*/}
 <View style={{ marginTop: 20 }}>
        

        < View style={globalStyles.inputTax}>
            <Text style={globalStyles.TaxTypeAddNewProject}>
                 Aina Ya Kuku
            </Text>

     <View style={globalStyles.picker}>

            
          <Picker
           style={globalStyles.pickerInputAddNewProject}
            selectedValue={selectedAinaYaKuku}
            onValueChange={(itemValue) => setSelectedAinaYaKuku(itemValue)}
          >

            {AinaYaKuku.map((x) => (
              <Picker.Item
                key={x.id}
                label={x.AinaYaKuku}
                value={x}
              />
            ))}
          </Picker>

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}









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
      backgroundColor:'green',
      //marginHorizontal:20,
      width:'100%'
    }

    ]}>
    <FontAwesome style={globalStyles.InputIcon} name='image' />
    <TouchableOpacity
      style={globalStyles.textInputAddNewProjectAddProject}
      onPress={pickImage}
    >
      <Text style={{ 
        color: 'white',
        marginLeft:15, 
      }}>Picha Yako</Text>
    </TouchableOpacity>
  </View>


<View style={{
  width:'100%',
  justifyContent:'center',
  alignItems:'center',
}}>
    {profile_image && (
<Image source={{ uri: profile_image }} style={{ 
width: width/2 -30,
height: 150,
borderRadius:100,
marginTop:10,
marginBottom:20,

}} />
)}
</View>


</View>









                  {!isLoading && (
                    <TouchableOpacity onPress={handleUpdate} style={styles.ButtonContainerUpdate}>
                      <Text style={styles.ButtonTextUpdate}>Badilisha</Text>
                    </TouchableOpacity>
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

export default UpdateScreen;

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
