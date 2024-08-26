import React, { useState,useContext,useRef,useCallback,memo, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  Platform,Text,TouchableOpacity,TextInput,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';

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
import { Audio } from 'expo-av'; // Ongeza hili
//import Carousel from 'react-native-snap-carousel';
const { width, height } = Dimensions.get('screen');





// Function to prefetch images
const prefetchImages = async (images) => {
  const prefetchPromises = images.map((image) => {
    if (image) {
      return Image.prefetch(`${EndPoint}/${image}`);
    }
  });
  await Promise.all(prefetchPromises);
};

// Carousel component with memoization
const Carousel = memo(({ images }) => {
  const flatlistRef = useRef();
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (flatlistRef.current && images.length > 0) {
      const interval = setInterval(() => {
        const newIndex = (activeIndex + 1) % images.length;
        flatlistRef.current.scrollToIndex({ index: newIndex, animated: true });
        setActiveIndex(newIndex);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [activeIndex, images.length]);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: screenWidth,
      offset: screenWidth * index,
      index,
    }),
    [screenWidth]
  );

  const Slide = ({ item }) => (
    <View>
      <TouchableOpacity activeOpacity={1}>
        <Image
          source={{ uri: `${EndPoint}/${item}` }}
          style={{ height: height / 4 + 10, width: screenWidth, borderRadius: 10 }}
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
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 15, marginBottom: 15 }}>
        {renderDotIndicators()}
      </View>
    </View>
  );
});






export default function GetAllDukaLakoItems ({navigation}) {


 //  NOTE: kwnye hii page kuna Warnings;
 //  1.INayosababisha can read queryset length of undefined ni zile conditions za
 //  kuchange color when like button is clicked, ukitoa zile error inaondoka.

 //  2. Inayosababisha hii error,
 //  VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc. {"contentLength": 1800, "dt": 1322, "prevDt": 3032}
 // Ni hizo sliding images zinazoslide ko ukitoa hiyo error inaondoka.
   //  const { 
    
   //  id,
   //  JinaLaHuduma 
   // } = route.params


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



const [userToken, setUserToken] = useState('');
const [shouldReload, setShouldReload] = useState(false);
const [userData, setUserData] = useState({});



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
    const url = EndPoint + `/GetAllDukaLakoView/?page=${current_page}&page_size=50`;
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.queryset.length > 0) {
          setQueryset([...queryset, ...data.queryset]);
          setIsLoading(false);
          setLoading(false);
          setcurrent_page(current_page + 1);
          setPending(false);
          //initializeLikes(data); // Initialize likes after fetching items
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




useEffect(() => {

   
    checkLoggedIn();
    // Fetch cart items only if the user is authenticated
    // if (userToken) {
    //   fetchCartItems();
    // }

  }, [userToken]);

const checkLoggedIn = async () => {
const token = await AsyncStorage.getItem('userToken');
setUserToken(token);
 
};



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

    const updatedLikes = response.data.Likes;
    const message = response.data.message;
    
    //kuongeza idadi ya like kwa post
    const updatedQueryset = queryset.map((item) =>
      item.id === itemId ? { ...item, Likes: updatedLikes } : item
    );
    setQueryset(updatedQueryset);

    // Cheza sauti baada ya kubonyeza kitufe
      await soundRef.current.replayAsync();

    // Update the liked status
    // const newLikeStatus = message === "Liked";
    // setUserLikes((prevLikes) => ({
    //   ...prevLikes,
    //   [itemId]: newLikeStatus,
    // }));

    // Save the like status in AsyncStorage
   // await AsyncStorage.setItem(`like_${itemId}`, JSON.stringify(newLikeStatus));
  
  } catch (error) {
    console.error('Error toggling like:', error);
  }
};



//TO cHeck if user is already like or not



  // Ongeza soundRef kwa ajili ya sauti
  const soundRef = useRef(new Audio.Sound());

  // Pakia sauti unapofungua skrini
  useEffect(() => {
    const loadSound = async () => {
      try {
        await soundRef.current.loadAsync(require('../assets/like.mp3')); // Badilisha na njia ya faili ya sauti
      } catch (error) {
        console.error('Error loading sound:', error);
      }
    };

    loadSound();

    // Safisha sauti baada ya skrini kufungwa
    return () => {
      soundRef.current.unloadAsync();
    };
  }, []);





  const transportItem = ({item}) => {

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
    



    if (input === ""){

    return (

      <CustomCard >
              <View 
              style={globalStyles.AppItemContainerHomeScreen}
              >



         {/*mwanzo mwa informations za mtu aliyepost*/}

            <View style={globalStyles.UserInfoContainer}>
              
            {/*mwanzo wa left info*/}
             <View style={globalStyles.UserInfoLeftContainer}>
             {item.profile_image ? ( 
                  <Image

                  style={globalStyles.UserInfoLeftImage}
                   source={{
                      uri: EndPoint + '/' + item.profile_image
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.UserInfoLeftImage}
                   source={require('../assets/profile.jpg')} 
                  >
                  </Image>
                )}
               
             </View>
           {/*mwisho wa left info*/}
             
             {/*mwanzo wa right info*/}
           <View style={globalStyles.UserInfoRightContainer}>
           {item.company_name ? (
             <Text style={globalStyles.UserInfoUsername}>
             {item.company_name}</Text>
             ):(
              <Text style={globalStyles.UserInfoUsername}>
             {item.username}</Text>
             )}
           </View>
            {/*mwisho wa right info*/}



            </View>
           
           {/*mwanzo mwa informations za mtu aliyepost*/}

                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={[globalStyles.AppItemNameHomeScreen,
                    {
                      marginBottom:15,
                    }

                    ]}

                 >{item.Title}</Text>


 

<Carousel images={carouselItems} />


    
      
           {/*    <View 
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
               <TouchableOpacity style={{
                 width:'90%',
                 marginHorizontal:20,
               }}>
             
             
               <Text style={{
                color:'black',
                fontFamily:'Light',
               }}>
                 {item.Maelezo}
               </Text>
                 
               </TouchableOpacity>
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
            <Text 
          style={globalStyles.AppItemButtonTextHomeScreen}
        >Wasiliana naye</Text>
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
      color="black"  
      
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




     // hili bano la chini ni la if ya juu kama mtu akitype   
}

 if(item.Title.toLowerCase().includes(input.toLowerCase()) || item.username.toLowerCase().includes(input.toLowerCase()) || item.phone.toLowerCase().includes(input.toLowerCase()) || item.Location.toLowerCase().includes(input.toLowerCase())){
  
    return (

      <CustomCard >
              <View 
              style={globalStyles.AppItemContainerHomeScreen}
              >



         {/*mwanzo mwa informations za mtu aliyepost*/}

            <View style={globalStyles.UserInfoContainer}>
              
            {/*mwanzo wa left info*/}
             <View style={globalStyles.UserInfoLeftContainer}>
             {item.profile_image ? ( 
                  <Image

                  style={globalStyles.UserInfoLeftImage}
                   source={{
                      uri: EndPoint + '/' + item.profile_image
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.UserInfoLeftImage}
                   source={require('../assets/profile.jpg')} 
                  >
                  </Image>
                )}
               
             </View>
           {/*mwisho wa left info*/}
             
             {/*mwanzo wa right info*/}
           <View style={globalStyles.UserInfoRightContainer}>
           {item.company_name ? (
             <Text style={globalStyles.UserInfoUsername}>
             {item.company_name}</Text>
             ):(
              <Text style={globalStyles.UserInfoUsername}>
             {item.username}</Text>
             )}
           </View>
            {/*mwisho wa right info*/}



            </View>
           
           {/*mwanzo mwa informations za mtu aliyepost*/}

                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={[globalStyles.AppItemNameHomeScreen,
                    {
                      marginBottom:15,
                    }

                    ]}

                 >{item.Title}</Text>


 

<Carousel images={carouselItems} />


    
      
           {/*    <View 
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
               <TouchableOpacity style={{
                 width:'90%',
                 marginHorizontal:20,
               }}>
             
             
               <Text style={{
                color:'black',
                fontFamily:'Light',
               }}>
                 {item.Maelezo}
               </Text>
                 
               </TouchableOpacity>
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
            <Text 
          style={globalStyles.AppItemButtonTextHomeScreen}
        >Wasiliana naye</Text>
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
      color="black"  
      
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




// hili bano la chini ni la if ya pili mwisho
  }



// mwisho wa render
  };




  return (

       <>{!fontsLoaded ? (<View/>):(

          <View style={globalStyles.container}>





<MinorHeader title="Duka Lako" />



    <View style={globalStyles.searchbarOtherPages}>

                 <View style={globalStyles.searchbarIconContainerOtherPages}>
                    <Ionicons name="search-outline" 
                    size={25} 
                    color={COLORS.black} 

                    style={globalStyles.AppIConHomeScreenOtherPages}

                      />
                    </View>

                    <View style={globalStyles.searchbarInputContainerOtherPages}>
                    <TextInput 
                    value={input} onChangeText ={(text) => setInput(text)}
                    placeholder="Ingiza jina / mahali " 
                     placeholderTextColor='black'
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>

                  </View>



              <View style={globalStyles.bottomview}>



          {/*  mwanzo wa Itself container*/}
              <View style={[globalStyles.ItselfMajorContainer,

                  {
                  backgroundColor:'green',
                }

                ]}>
             
             <View style={globalStyles.ItselfLeftMinorContainer}>
             <TouchableOpacity 
               onPress={() => {
            navigation.navigate('Your Posts');    
        }}
             >
              <Text style={[globalStyles.ItselfLeftMinorText,
                 {
                  backgroundColor:'yellow',
                  color:'black'
                }

                ]}>Duka Langu</Text>
              </TouchableOpacity>
              </View>
             
              <TouchableOpacity 
            onPress={() => {
            navigation.navigate('Duka Lako Form');    
        }}
              style={globalStyles.ItselfRightMinorContainer}>
              <View >
                  <FontAwesome name='plus-square-o' 
                  size={30}
                  color='brown'  
                  
                   />
              </View>
              </TouchableOpacity>
                
              </View>
             {/*  mwisho wa Itself container*/}
            



                <Text
                style={globalStyles.AppChaguaHudumaTextHomeScreen}  
                
                >Posti mbalimbali za watu</Text>


            {/*mwanzo wa Item View*/}
                <View 
                style={globalStyles.AppFlatListContainerHomeScreen} 
               
                >

{ !isPending ? (
  <>
      
      { queryset && queryset.length > 0 ? (
        <>

         {setLoading===true?(<ActivityIndicator/>):(
      <>

                    <FlatList
                    data={queryset}
                    renderItem={transportItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}

                    ListFooterComponent={renderLoader}
                    onEndReached={getItems}
                    onEndReachedThreshold={0.5}
                  />


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

          {/*Mwisho wa item View*/}





               
                </View>







          </View>


          )}</>

          );
}

const styles = StyleSheet.create({

   slideContainer: {
    width:width-20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  slideImage: {
    width,
    height: height/4, // Adjust the height to fit your design
    resizeMode: 'cover',
  },
  carouselContainer: {
    marginVertical: 10,
    overflow: 'hidden',

  },
  carouselContent: {
    alignItems: 'center',
  },
  descriptionContainer: {
    marginTop: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  likeCount: {
    fontSize: 14,
    marginRight: 5,
    color: 'red',
  },
 
});