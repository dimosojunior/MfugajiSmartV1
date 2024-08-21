import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Linking,Alert,
  Dimensions,
  Modal,
  Pressable,

  Platform,Text,TouchableOpacity,TextInput,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

import COLORS  from '../Constant/colors';

import {useFonts} from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import {globalStyles} from '../Styles/GlobalStyles';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//import { useNavigation } from '@react-navigation/native';
import { EndPoint } from '../Constant/links';
import LotterViewScreen from '../Screens/LotterViewScreen';

import {CustomCard} from '../RenderedComponents/CustomCard';
import MinorHeader from '../Header/MinorHeader';
import React, {useState,useCallback,useRef, useEffect, useContext} from 'react';

import Html from 'react-native-render-html';
import { FontAwesome} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const {width, height} = Dimensions.get('window');



const Carousel = ({ images }) => {
  const flatlistRef = useRef();
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (flatlistRef.current && images.length > 0) {
      const interval = setInterval(() => {
        if (flatlistRef.current) {
          const newIndex = (activeIndex + 1) % images.length;
          flatlistRef.current.scrollToIndex({
            index: newIndex,
            animated: true,
          });
          setActiveIndex(newIndex);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [activeIndex, images.length]);

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });





 const Slide = ({ item }) => (
    <View>
      <TouchableOpacity activeOpacity={1}>
        <Image
          source={{ uri: `${EndPoint}/${item}` }}
          style={{
            height: height / 4 + 10,
            width: screenWidth,
            borderRadius: 10,
          }}
        />
      </TouchableOpacity>
    </View>
  );

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const renderDotIndicators = () => (
    images.map((_, index) => (
      <View
        key={index}
        style={{
          backgroundColor: activeIndex === index ? 'green' : 'red',
          height: 10,
          width: 10,
          borderRadius: 5,
          marginHorizontal: 6,
        }}
      />
    ))
  );

  return (
    <View>
      <FlatList
        data={images}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={Slide}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
      />
      <View style={{ 
        flexDirection: "row",
         justifyContent: "center",
          marginTop: 15,
          marginBottom:15,
        }}>
        {renderDotIndicators()}
      </View>
    </View>
  );
};



export default function ViewDukaLako ({navigation, route}) {

   const { 
    
    Title,
    id,
    Maelezo,
    LevelImage,
    phone,
    username,
    Location,
    Created,
    PichaYaPost,
    PichaYaPost2,
    PichaYaPost3,
    PichaYaPost4,
    PichaYaPost5,
    profile_image,
    Likes,
    UserRole,
    email
   } = route.params




 
  let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});


const ViewedUsernameProduct = username;

const [modalVisible, setModalVisible] = useState(false);
const [isModalVisible, setIsModalVisible] = useState(false); // New state variable
const [displayContentsState, setdisplayContentsState] = useState(false);



 const [Maoni, setMaoni] = useState('');
const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
  const [MtoaMaoniEmail, setMtoaMaoniEmail] = useState('');
 const [MtoaMaoniUsername, setMtoaMaoniUsername] = useState('');
 const [MtoaMaoniPhone, setMtoaMaoniPhone] = useState('');
 const [isLoading2, setIsLoading2] = useState(false);


 useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
  }, [userData]);

  useEffect(() => {
    checkLoggedIn();
  }, [userToken]);

  const checkLoggedIn = async () => {
    setIsLoading2(true);
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
        setIsLoading2(false);
        setMtoaMaoniEmail(userData.email);
        setMtoaMaoniUsername(userData.username);
        setMtoaMaoniPhone(userData.phone);
        
        
       

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
      setIsLoading2(false);
    } if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
      setIsLoading2(false);
    } else {
      showAlertFunction('Kuna tatizo wakati wa utoaji wa maoni yako');
      setIsLoading2(false);
    }
  };


  const handleUpdate = async () => {
    setIsLoading2(true);
    const token = await AsyncStorage.getItem('userToken');

    if (userToken) {
      const formData = new FormData();
      
       

         if (Maoni) {
            formData.append('Maoni', Maoni);
        } else {
            showAlertFunction('Tafadhali andika maoni yako ?');
            setIsLoading2(false);
            return;
        }

     

      axios.post(EndPoint + '/AddMaoniView/', formData, {
        headers: {
          Authorization: `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        setIsLoading2(false);
        showAlertFunction("Hongera kwa kutoa maoni, Maoni yako yamepokelewa kwetu na tunaahidi kuyafanyia kazi.");
        setIsModalVisible(false);
        setModalVisible(false);

        setMaoni('');
        //console.log("Well");
      }).catch(error => {
        setIsLoading2(false);
        setIsModalVisible(false);
        setModalVisible(false);
         handleErrorMessage(error);
        // showAlertFunction("Imeshindikana kutoa maoini yako");
        

        
      });
    }
  };


  const openUrl = async (url) => {
        const isSupported = await Linking.canOpenURL(url);
        if (isSupported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Programu imeshindwa kufungua hii linki: ${url}`);
        }
    }

const sendTextMessage = useCallback(async (phNumber, message) => {
        const separator = Platform.OS === 'ios' ? '&' : '?'
        const url = `sms:${phNumber}${separator}body=${message}`
        await Linking.openURL(url)
    }, [])

const message = "Mfugaji Smart!!"


//KWA AJILI YA KURENDER HTML
const renderersProps ={
  img:{
    enableExperimentalPercentWidth:true
  }
}


const htmlContent = ' <h1>This is the html document</h1> <img src="../assets/me.jpg" /> ';
const htmlContent2 = '<p style=\"text-align:center\"><span style=\"color:#fff\"><strong>SMART INVIGILATION SYSTEM</strong></span></p>\r\n\r\n<p>Examination cheating activities like face movement, head movements, hand movements, or hand contact are extensively involved, and the rectitude and worthiness of fair and unbiased examination are prohibited by such cheating activities. The aim of this project is to develop a model to supervise or control unethical activities in real-time examinations. Exam supervision is fallible due to limited human abilities and capacity to handle students in examination rooms, and these errors can be reduced with the help of the Smart Invigilation System.</p>\r\n\r\n<p>This work presents an automated system for exams invigilation using machine learning and computer vision approaches i.e., Dlib and Opencv . Dlib is an object detection algorithm that is implemented to detect the suspicious activities of students during examinations based on their face movements, and for starting capturing the video of students Opencv is used.</p>\r\n\r\n<p>The model is fully efficient in detecting and monitoring students in one frame during examinations. Different real-time scenarios are considered to evaluate the performance of the Automatic Invigilation System. The proposed invigilation model can be implemented in colleges, universities, and schools to detect and alert student suspicious activities. Hopefully, through the implementation of the proposed invigilation system, we can prevent and solve the problem of cheating because it is unethical.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"/media/media/2023/04/10/3q.jpeg\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><em>Click the link below to view more information about this project</em></p>'






//const [likes, setLikes] = useState(0);
 const handleLikeToggle = async (itemId) => {
  try {
    const response = await axios.post(
      `${EndPoint}/ToggleLikeView/${itemId}/`,
      {},
      {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      }
    );
    
    // Pata item iliyosasishwa
    const updatedLikes = response.data.Likes;

    // Sasisha queryset
    const updatedQueryset = queryset.map((item) =>
      item.id === itemId ? { ...item, Likes: updatedLikes } : item
    );
    setQueryset(updatedQueryset);
    console.log("Umeweka like");
  } catch (error) {
    console.error('Error toggling like:', error);
  }
};









    const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };



  // const nav = useNavigation();
  // const DATA = [
  //   {
  //     id: 1,
  //     name: "Bajeti Ya Chakula",
  //     backgroundColor:"#6BC5E8",
  //     imagesrc:im1
      
  //   },
  //   {
  //     id: 2,
  //     name: "Kumbusho La Shamba",
  //     backgroundColor:"#3A9EC2",
  //     imagesrc:im2
  //   },

  //   {
  //     id: 3,
  //     name: "Kitabu Shamba",
  //     backgroundColor:"#3A9EC2",
  //     imagesrc:im3
  //   },

  //   {
  //     id: 4,
  //     name: "Jamii Ya Mfugaji",
  //     backgroundColor:"#3A9EC2",
  //     imagesrc:im4
  //   }


  // ];




//FOR SEARCHING
const [input, setInput] = useState('');

//Load more
const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);




const getItems = () => {
  if (endReached) {
    setLoading(false);
    setIsLoading(false);
    setPending(false);
    return;
  } else {
    setIsLoading(true);
    //const url = EndPoint + `/GetAllUniversities/?page=${current_page}&page_size=2`;
   const url = EndPoint + `/GetAllDukaLakeByClickingPostedProductView/?ViewedUsernameProduct=${ViewedUsernameProduct}&page=${current_page}&page_size=2`
    // console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.queryset.length > 0) {
          setQueryset([...queryset, ...data.queryset]);
          setIsLoading(false);
          setLoading(false);
          setcurrent_page(current_page + 1);
          setPending(false);

          // console.log("NEW CRRRENT", current_page);
          // console.log(queryset);

        } else {
          setIsLoading(false);
          setEndReached(true);
          setLoading(false);
          setPending(false);
        }
      });
  }
};





 const renderLoader = () => {
    return (
      isLoading ?
        <View style={globalStyles.loaderStyle}>
          <ActivityIndicator size="large" color="red" />
        </View> : null
    );
  };

  // const loadMoreItem = () => {
  //   setcurrent_page(current_page + 1);
  // };

  useEffect(() => {
    setLoading(true)
    getItems();
  }, []);

 const handleScroll = (event) =>{
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const scrollEndY = layoutMeasurement.height + contentOffset.y
    const contetHeight = contentSize.height

    if (scrollEndY >= contetHeight - 50) {
      getItems()
    }
  }



const InventoryCard = ({item, index}) => {
   const carouselItems = [
      item.PichaYaPost,
      item.PichaYaPost2,
      item.PichaYaPost3,
      item.PichaYaPost4,
      item.PichaYaPost5,
      // { src: item.PichaYaPost},
      // { src: item.PichaYaPost2},
      // { src: item.PichaYaPost2},
      // { src: item.PichaYaPost4},
      // { src: item.PichaYaPost5},
    ].filter(Boolean); // Filter out any null or undefined values

    //console.log("Carousel Items:", carouselItems);




    return (

      <CustomCard >
              <View 
              style={globalStyles.AppItemContainerHomeScreen}
              >



                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={globalStyles.AppItemNameHomeScreen}

                 >{item.Title}</Text>


     <Carousel images={carouselItems} />



         {/*      <View 
                style={globalStyles.AppItemImageContainerHomeScreen}
              >
              {item.PichaYaPost ? ( 
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={{
                      uri: EndPoint + '/' + item.PichaYaPost
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={require('../assets/500.png')} 
                  >
                  </Image>
                )}
               </View>*/}




           {item.Maelezo && (
               <Pressable style={{
                 width:'90%',
                 marginHorizontal:20,
               }}>
             
             
               <Text style={{
                color:'black',
                fontFamily:'Light',
               }}>
                 {item.Maelezo}
               </Text>
                 
               </Pressable>
               )}



                  <TouchableOpacity 

                  style={[globalStyles.AppItemButtonHomeScreen,
                    {
                      width:'90%',
                    //padding:5,
                   // borderRadius:6,
                    marginTop:20,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    }


                    ]}

                 
                >
            {/*mwanzo wa view ya left*/}
              <TouchableOpacity 

             onPress={() => {
           navigation.navigate('View Duka Lako', item);    
        }} >
           <View style={globalStyles.LeftBtnContainer}>
            {/*<Text 
          style={globalStyles.AppItemButtonTextHomeScreen}
        >Wasiliana naye</Text>*/}
         </View>
         </TouchableOpacity>
          {/*mwisho wa view ya left*/}


       {/*mwanzo wa view ya right*/}
         <TouchableOpacity 
          onPress={() => handleLikeToggle(item.id)}
          >
         <View style={globalStyles.RightBtnContainer}>
         <View>
           <Text style={{
          marginRight:5,
          fontFamily:'Bold',
          color:'red',
          marginTop:5,
         }}> {item.Likes}
         </Text>
         </View>
        
        <View>
           <FontAwesome name='heart' 
      size={20}
      color='red'  
      
       />
        </View>
        

         </View>
         </TouchableOpacity>
          {/*mwisho wa view ya right*/}


                  </TouchableOpacity>





                </View>
                <View>
                 
                </View>
              </View>
           </CustomCard>


           )


}
  


  return (

       <>{!fontsLoaded ? (<View/>):(

        <>
        {!isLoading2 ? (

          <View style={[globalStyles.container,
             { 
              

              //  opacity: isModalVisible ? 
              // 0.1 : 1
               }

            ]}>

           <MinorHeader title="Mawasiliano"/>

           <ScrollView
keyboardShouldPersistTaps="handled" 
// refreshControl={
//         <RefreshControl
//         refreshing={refresh}
//         onRefresh={() => pullMe()}
//         />
//        }
      showsVerticalScrollIndicator={false}
       
 onScroll={handleScroll} scrollEventThrottle={16}
      >





    

           <ImageBackground

                source={require('../assets/bc1.png')}
                style={{
                    flex: 1,
                    opacity:1,
                    height:height/4,
                }}
                resizeMode= "cover"
            >

           {/*mwanzo wa nyota */}
              <View style={[{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                width:'90%',
                marginHorizontal:20,
                paddingVertical:10,

                    
                  },
                  { 
              

               opacity: isModalVisible ? 
              0.1 : 1
               }

                  ]}>

                   <View style={{
                 width:'70%',
                  }}>
                  {UserRole === "Mfugaji"  ? (
                   <Text style={{
                    color:'brown',
                    fontFamily:'Bold',
                   }}>
                        
               Hadhi Ya Mfugaji   <FontAwesome 
                  name='arrow-circle-right' 
                    size={20}
                    color='white'  
                    style={{
                      //marginLeft:15,

                    }}
                     />
                    
                   </Text>
                   ):(

                    <Text style={{
                    color:'brown',
                    fontFamily:'Bold',
                   }}>
                        
               Hadhi Ya Mfanya biashara   <FontAwesome 
                  name='arrow-circle-right' 
                    size={20}
                    color='white'  
                    style={{
                      //marginLeft:15,

                    }}
                     />
                    
                   </Text>

                   )}
                  </View>

                  <View style={{
                     width:'30%',
                    
                  }}>
                  {LevelImage ? (
                     <Image

                  style={{
                    width:'100%',
                    height:30,
                  }}
                   source={{
                      uri: EndPoint + '/' + LevelImage
                    }} 
                  >
                  </Image>
                  ):(
                    <Image

                  style={{
                    width:'100%',
                    height:30,
                  }}
                   source={require('../assets/s1.jpg')} 
                  >
                  </Image>
                  )}
                  </View>

                 

                  </View>
                  {/*mwisho wa nyota */}

              <View style={[globalStyles.topviewYoutubeChannel,
                { 
              

               opacity: isModalVisible ? 
              0.1 : 1
               }

                ]}>


                  <View style={globalStyles.welcomecontainer}>




                     
                     <View
                      style={globalStyles.AppWelcomeMsgContainerYoutubeChannel} 
                     
                     >
                        <Text 
                         
                     
                        style={[
                          styles.welcomemessage,
                          
                          globalStyles.AppWelcomeHeaderTextHomeScreen ,
                          {
                            fontSize:16,
                            color:'white',
                            fontFamily:'Light',
                          } 

                          
                        ]}
                        >
                      <Text style={{
                        fontSize:16,
                        color:"green",
                        fontFamily:'Light',
                      }}>Jina Kamili:</Text> {username}</Text>

                       <Text 
                         style={[
                          styles.welcomemessage,
                          
                          globalStyles.AppWelcomeHeaderText2HomeScreen,
                          {
                            fontSize:16,
                            fontFamily:'Light',
                            color:'white',

                          }  

                          
                        ]} 
                     
                       >
                     <Text style={{
                        fontSize:16,
                        color:"green",
                        fontFamily:'Light',
                      }}>Simu:</Text>  {phone}
                      </Text>

                        {Location && (
                           <Text 
                         style={[
                          styles.welcomemessage,
                          
                          globalStyles.AppWelcomeHeaderText2HomeScreen,
                          {
                            fontSize:16,
                            fontFamily:'Light',
                            color:'white',

                          }  

                          
                        ]} 
                     
                       >
                     <Text style={{
                        fontSize:16,
                        color:"green",
                        fontFamily:'Light',
                      }}>Anaishi:</Text>  {Location}
                      </Text>
                      )}
                        
                     </View>
                     
                  


                  </View>

                 {/* <Text style={{color:"black"}}> 
                  Where will you go</Text>*/}
                  

                


                  {/*mwisho wa topview*/}
              </View>
</ImageBackground>


              <View style={[globalStyles.bottomview,
                { 
              

               opacity: isModalVisible ? 
              0.1 : 1
               }


                ]}>
            



                <View style={{
                  flexDirection:'row',
                  width:'100%',
                  alignItems:'center',
                  justifyContent:'space-between',
                }}>
               <Text
                style={[
                  globalStyles.AppChaguaHudumaTextYoutubeChannel,
                  {
                    fontFamily:'Medium',
                    color:'green',
                    marginHorizontal:0,
                    width:'70%',


                  }
                ]}  
                
                >
                Taarifa nyingine za {username}
                </Text>
               
               <TouchableOpacity 
                onPress={() => {
                  setModalVisible(true);
                  setIsModalVisible(true); // Reset state when modal closes
                 
                }}
               style={{
                width:'30%',
               }}>
                <Text style={{
                  
                  backgroundColor:'green',
                  paddingHorizontal:5,
                  textAlign:'center',
                  borderRadius:6,
                  paddingVertical:7,
                  color:'white',
                  fontFamily:'Bold',
                }}>Toa Maoni</Text>
                </TouchableOpacity>

                </View>













            {/*mwanzo wa Item View*/}
                <View 
                style={globalStyles.AppFlatListContainerYoutubeChannel} 
               
                >



          
      <CustomCard >
              <View 
              style={globalStyles.AppItemContainerYoutubeChannel}
              >
                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={globalStyles.AppItemNameYoutubeChannel}

                 >{Title}</Text>




  

           <View 
                style={[globalStyles.AppItemImageContainerHomeScreen,
                  {
                    marginBottom:15,
                  }

                  ]}
              >
              {PichaYaPost ? ( 
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={{
                      uri: EndPoint + '/' + PichaYaPost
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={require('../assets/500.png')} 
                  >
                  </Image>
                )}
               </View>


           {Maelezo && (
               <TouchableOpacity style={{
                 width:'90%',
                 marginHorizontal:20,
               }}>
             
             
               <Text style={{
                color:'black',
                fontFamily:'Light',
               }}>
                 {Maelezo}
               </Text>
                 
               </TouchableOpacity>
               )}


                </View>
                <View>
                 
                </View>




<View>
  
      <View style={[globalStyles.menuWrapper, 
        {backgroundColor:COLORS.white}]}>
       
       
<Text style={{
  marginTop:50,
  fontFamily:'Medium',

}}>
  Unaweza kuwasiliana naye kupitia njia hizo hapo chini
</Text>

 {phone && (
         <TouchableOpacity onPress={() => {   Linking.openURL(`tel:${phone}`)}}>
          <View style={[globalStyles.menuItem, {}]}>
            <Icon name="phone" color="green" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:'black'}]}>Piga Simu</Text>
          </View>
        </TouchableOpacity>)}

{phone && (
        <TouchableOpacity  onPress={() => sendTextMessage(phone, message)}>
          <View style={[globalStyles.menuItem, {}]}>
            <Icon name="message" color="red" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:'black'}]}>Mtumie ujumbe kawaida</Text>
          </View>
        </TouchableOpacity>)}



 {phone && (
        <TouchableOpacity onPress={() => { Linking.openURL(`whatsapp://send?phone=${phone}&text=${message}`)}}>
          <View style={[globalStyles.menuItem, {

          }]}>
            <FontAwesome name="whatsapp" color="green" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:'black'}]}>Chati naye whatsapp</Text>
          </View>
        </TouchableOpacity>)}



          {email && (
         <TouchableOpacity onPress={() => {  Linking.openURL(`mailto:${email}?subject=Hello ${username}&body=${message}`)}}>
          <View style={[globalStyles.menuItem, {}]}>
            <Icon name="email" color="black" size={25}/>
            <Text style={[globalStyles.menuItemText, {color:'black'}]}>Mtumie email</Text>
          </View>
        </TouchableOpacity>)}

        





      </View>

</View>




              </View>
           </CustomCard>







                </View>

          {/*Mwisho wa item View*/}









  <Text
  style={globalStyles.AppChaguaHudumaTextHomeScreen}  
  
  >Huduma zingine za {username}</Text>




{ !isPending ? (
  <>
      
      { queryset && queryset.length > 0 ? (
        <>
   {setLoading===true?(<ActivityIndicator/>):(

             <>

          {queryset.map((item, index) => {
          return <InventoryCard item={item} key={item.id || index} />;
          })}

          {isLoading&&(<ActivityIndicator/>)}
          </>
          )}

         </>



      ) : (
       

 <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>Hakuna huduma yoyote iliyopo kwasasa!! !
  </Text>


  <View style={globalStyles.ErrorImageContainerHomePage}>
      <Image 
          source={require('../assets/500.png')}  
           style={globalStyles.ErrorImageHomePage}
          
          //source={item.ArticleImage} 
          //resizeMode='contain'
          contentContainerStyle={{ padding: 20 }}
          
          />
  </View>


</View>
      )}
 </>

):(
<LotterViewScreen />


)} 











               
                </View>























</ScrollView>



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


{/*MODAL FOR MAKING ORDER*/}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setIsModalVisible(false); // Reset state when modal closes
        }}
      >
    <ScrollView 
    keyboardShouldPersistTaps="handled"
    >
   
        <View style={{ 
         flex: 1,
         marginTop:height/6,
         //justifyContent: 'center', 
         alignItems: 'center',
          //backgroundColor: 'red' 
        }}>
          <View style={[
            globalStyles.ModalViewViewProduct,
            {
              backgroundColor:'green',
              justifyContent: 'center', 
             alignItems: 'center',
             //height:height/4,
             width:'90%',


            }



            ]}>
          
            <Text style={[globalStyles.ModalTitleViewProduct,
              {
                textAlign:'center',
                fontFamily:'Medium',
                color:'white',

              }
              ]}>
              
            Unakaribishwa kutoa maoini yako kuhusiana na {username}, pamoja
            na huduma zake
            
            
            </Text>
   




{/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    
                    < View style={globalStyles.ProjectBodyinput}>
                        {/*<FontAwesome style={globalStyles.InputIcon} name='pencil'/>*/}
                        <TextInput 
                        style={globalStyles.ProjectBodyInputIcon}  
                        placeholder='Andika maoni yako'
                        placeholderTextColor={COLORS.white}
                        value={Maoni}
                    onChangeText={setMaoni}
                       
         multiline={true}  // Enable multiline
          numberOfLines={50}  // Set a maximum number of lines
                           />
                    </View>
                </View>
              {/*mwisho wa field*/}



                


          
            

            <View style={[globalStyles.ButtonConatinerViewProduct,

              {
                'marginTop':50,
              }

              ]}>

              <TouchableOpacity 
                    style={[globalStyles.ButtonAddViewProduct,
                      {
                            backgroundColor:'red',
                            marginRight:10,
                          }
                      ]}  
                    //onPress={addCartItem}
                    onPress={() => {
                      setModalVisible(false);
                      setIsModalVisible(false); // Reset state when modal closes
                     
                    }}
                                 >
                        <Text 
                        style={[
                          globalStyles.ConfirmCancelButtonTextViewProduct,
                          {
                            //backgroundColor:'black'
                          }
                          ]}>Funga</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                    style={[globalStyles.ButtonAddViewProduct,
                      {
                            backgroundColor:'black'
                          }
                      ]}  
                    //onPress={addCartItem}
                    onPress={handleUpdate}
                                 >
                        <Text 
                        style={[
                          globalStyles.ConfirmCancelButtonTextViewProduct,
                          {
                            //backgroundColor:'black'
                          }
                          ]}>Tuma Maoni</Text>
                    </TouchableOpacity>
            </View>
          </View>
        </View>
        
        </ScrollView>
      </Modal>



          </View>

 ) : (
  <LotterViewScreen />
)}
</>



          )}</>

          );
}

const styles = StyleSheet.create({
 
});