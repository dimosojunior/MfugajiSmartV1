
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

import COLORS  from '../Constant/colors';
import Checkbox from 'expo-checkbox'; // Make sure to install this package

const { width, height } = Dimensions.get('window');

const VyakulaVyote = ({navigation, route}) => {

  const { 

    StaterFeed,
   FinisherFeed,
   LayerFeed,
   GrowerFeed,
    AinaYaKuku,
    UmriKwaWiki,
   UmriKwaSiku,


    IdadiYaKilos,
    
   KukuId,
    UmriwaKukuId //id ya umri wa kuku

   } = route.params

  // const UmriwaKukuId = id;
  const UnaKiasiGaniChaChakula = IdadiYaKilos;


    // To change color
// const theme = useContext(themeContext)
// const [darkMode, setdarkMode] = useState(false)
 
 const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
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



useEffect(() => {
  const loadSelectedProductIds = async () => {
    const storedProductIds = await AsyncStorage.getItem('selectedProductIds');
    if (storedProductIds) {
      setSelectedProductIds(JSON.parse(storedProductIds));
    }
  };

  loadSelectedProductIds();
}, []);


//FOR SEARCHING
const [input, setInput] = useState('');

const [modalVisible, setModalVisible] = useState(false);
const [isModalVisible, setIsModalVisible] = useState(false); // New state variable


const [cart, setCart] = useState([]);
const [userToken, setUserToken] = useState('');
const [shouldReload, setShouldReload] = useState(false);
const [userData, setUserData] = useState({});

const [selectedProduct, setSelectedProduct] = useState(null);

const InitialQuantityValue = "1";
const quantity = "1";
//const [quantity, setQuantity] = useState(InitialQuantityValue);
// const [isPending, setPending] = useState(false);

//Load more
const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);



const [selectedProductIds, setSelectedProductIds] = useState([]); // Array for selected product IDs


const getItems = () => {
  if (endReached) {
    setLoading(false);
    setIsLoading(false);
    setPending(false);
    return;
  } else {
    setIsLoading(true);
    //const url = EndPoint + `/GetAllUniversities/?page=${current_page}&page_size=2`;
   const url = EndPoint + `/GetAllVyakulaView/?page=${current_page}&page_size=150`
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








  // const loadMoreItem = () => {
  //   setcurrent_page(current_page + 1);
  // };

   useEffect(() => {
    setLoading(true);
    getItems();
    // loadSelectedProductIds();
  }, []);








//---------------QUERYSET 2 --- WANGA

//Load more
const [queryset2, setQueryset2] = useState([]);
const [current_page2, setcurrent_page2] = useState(1);
const [isLoading2, setIsLoading2] = useState(false);
const [loading2, setLoading2] = useState(false);
const [endReached2, setEndReached2] = useState(false)
const [isPending2, setPending2] = useState(true);





const getItems2 = () => {
  if (endReached2) {
    setLoading2(false);
    setIsLoading2(false);
    setPending2(false);
    return;
  } else {
    setIsLoading2(true);
    //const url = EndPoint + `/GetAllUniversities/?page=${current_page}&page_size=2`;
   const url = EndPoint + `/GetAllVyakulaWangaView/?page=${current_page}&page_size=150`
    // console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.queryset2.length > 0) {
          setQueryset2([...queryset2, ...data.queryset2]);
          setIsLoading2(false);
          setLoading2(false);
          setcurrent_page2(current_page2 + 1);
          setPending2(false);

          // console.log("NEW CRRRENT", current_page);
          // console.log(queryset);

        } else {
          setIsLoading2(false);
          setEndReached2(true);
          setLoading2(false);
          setPending2(false);
        }
      });
  }
};







  // const loadMoreItem = () => {
  //   setcurrent_page(current_page + 1);
  // };

   useEffect(() => {
    setLoading2(true);
    getItems2();
    // loadSelectedProductIds();
  }, []);










//---------------QUERYSET 3 --- VITAMIN & MADINI

//Load more
const [queryset3, setQueryset3] = useState([]);
const [current_page3, setcurrent_page3] = useState(1);
const [isLoading3, setIsLoading3] = useState(false);
const [loading3, setLoading3] = useState(false);
const [endReached3, setEndReached3] = useState(false)
const [isPending3, setPending3] = useState(true);





const getItems3 = () => {
  if (endReached3) {
    setLoading3(false);
    setIsLoading3(false);
    setPending3(false);
    return;
  } else {
    setIsLoading3(true);
    //const url = EndPoint + `/GetAllUniversities/?page=${current_page}&page_size=2`;
   const url = EndPoint + `/GetAllVyakulaMadiniNaVitaminiView/?page=${current_page}&page_size=150`
    // console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.queryset3.length > 0) {
          setQueryset3([...queryset3, ...data.queryset3]);
          setIsLoading3(false);
          setLoading3(false);
          setcurrent_page3(current_page3 + 1);
          setPending3(false);

          // console.log("NEW CRRRENT", current_page);
          // console.log(queryset);

        } else {
          setIsLoading3(false);
          setEndReached3(true);
          setLoading3(false);
          setPending3(false);
        }
      });
  }
};







  // const loadMoreItem = () => {
  //   setcurrent_page(current_page + 1);
  // };

   useEffect(() => {
    setLoading3(true);
    getItems3();
    // loadSelectedProductIds();
  }, []);






//---------------QUERYSET 4 --- VIMENG'ENYO

//Load more
const [queryset4, setQueryset4] = useState([]);
const [current_page4, setcurrent_page4] = useState(1);
const [isLoading4, setIsLoading4] = useState(false);
const [loading4, setLoading4] = useState(false);
const [endReached4, setEndReached4] = useState(false)
const [isPending4, setPending4] = useState(true);





const getItems4 = () => {
  if (endReached4) {
    setLoading4(false);
    setIsLoading4(false);
    setPending4(false);
    return;
  } else {
    setIsLoading4(true);
    //const url = EndPoint + `/GetAllUniversities/?page=${current_page}&page_size=2`;
   const url = EndPoint + `/GetAllVyakulaVimengenyaView/?page=${current_page}&page_size=150`
    // console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.queryset4.length > 0) {
          setQueryset4([...queryset4, ...data.queryset4]);
          setIsLoading4(false);
          setLoading4(false);
          setcurrent_page4(current_page4 + 1);
          setPending4(false);

          // console.log("NEW CRRRENT", current_page);
          // console.log(queryset);

        } else {
          setIsLoading4(false);
          setEndReached4(true);
          setLoading4(false);
          setPending4(false);
        }
      });
  }
};







  // const loadMoreItem = () => {
  //   setcurrent_page(current_page + 1);
  // };

   useEffect(() => {
    setLoading4(true);
    getItems4();
    // loadSelectedProductIds();
  }, []);




 const renderLoader = () => {
    return (
      (isLoading || isLoading2 || isLoading3 || isLoading4) ?
        <View style={globalStyles.loaderStyle}>
          <ActivityIndicator size="large" color="red" />
        </View> : null


    );
  };









 const handleScroll = (event) =>{
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const scrollEndY = layoutMeasurement.height + contentOffset.y
    const contetHeight = contentSize.height

    if (scrollEndY >= contetHeight - 50) {
      getItems()
      getItems2()
      getItems3()
      getItems4()
      
    }
  }














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



const addCartItem = async () => {
  if (!selectedProduct) {
    setPending(false);
    
    //Alert.alert('Error', 'Please enter a quantity of product(s) you want to order');
    showAlertFunction("Tafadhali, chagua aina ya chakula ulichonacho");
    return;
  }

  // Check if the selected quantity is greater than available stock
  // if (parseInt(quantity) > ProductQuantity) {
  //   setPending(false);
  //   //Alert.alert('Error', 'Not enough quantity in stock');
  //   showAlertFunction("Not enough quantity in stock");
  //   return;
  // }

  //setPending(true);
//navigation.replace('View Products', { id }); 
  // Find the selected product's price
  const productPrice = selectedProduct.price;

  // Calculate the total price for the cart item
 // const itemPrice = productPrice * parseInt(quantity);
 const itemPrice = productPrice * parseInt(quantity);

  setModalVisible(false);
   setIsModalVisible(false);
   

  try {
    const response = await axios.post(

      EndPoint + '/VyakulaCart/',
      {
        product: selectedProduct.id,
        quantity: parseInt(quantity),


      },

      {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      }
    );
    

    setPending(false);
     
    // showAlertFunction("Umefanikiwa kuchagua chakula");

  
      // Ongeza ID ya bidhaa kwenye selectedProductIds
    //  const newSelectedProductIds = [...selectedProductIds, selectedProduct.id];
    // setSelectedProductIds(newSelectedProductIds);
    // await AsyncStorage.setItem('selectedProductIds', JSON.stringify(newSelectedProductIds));



      // Update the local cart items list with the new item
      const newItem = {
        id: response.data.id, // Use the 'id' from the response data
        product: selectedProduct,
        quantity: parseInt(quantity),
        price: itemPrice,
      };
      // const updatedCart = [...cart, newItem];
      // setCart(updatedCart);




      // Close the modal and reset the selected product and quantity
      // setModalVisible(false);
      setSelectedProduct(null);
      //setQuantity(InitialQuantityValue);

     // Increment the displayedItemsCount
    //setDisplayedItemsCount((prevCount) => prevCount + 1);

   


   
  } catch (error) {
     setPending(false);
    //Alert.alert('Error', 'Failed to add item to cart');
    showAlertFunction("Imeshindikana kuchagua chakula");
    
  }
};








const removeCartItem = async (cartId) => {
  setPending(true);
  const apiUrl = `${EndPoint}/VyakulaDeleteCartItem/?cartId=${cartId}`;
  
  try {
    const response = await axios.delete(apiUrl, {
      headers: {
        Authorization: `Token ${userToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 204) {
      // Item was successfully deleted
      const updatedCart = cart.filter((item) => item.id !== cartId);
      setCart(updatedCart);

      // Update selectedProductIds
      const updatedSelectedIds = selectedProductIds.filter((id) => id !== cartId);
      setSelectedProductIds(updatedSelectedIds);
      await AsyncStorage.setItem('selectedProductIds', JSON.stringify(updatedSelectedIds));

      setPending(false);
      showAlertFunction("Umefanikiwa kuondoa chakula kimoja");
    } else {
      setPending(false);
      showAlertFunction("Imeshindikana kuondoa chakula");
    }
  } catch (error) {
    console.log('ERROR', error.response || error.message);
    setPending(false);
    showAlertFunction("Imeshindikana kuondoa chakula");
  }
};





const formatToThreeDigits = (number) => {
  if (number !== null) {
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 0, // Ensure two decimal places
      maximumFractionDigits: 2, // Limit to two decimal places
      minimumIntegerDigits: 1, // Ensure at least one integer digit
    });
  }
  return null;
};


// const calculateTotalPrice = () => {
//   let total = 0;
//   cart.forEach((item) => {
//     total += item.price;
//   });
//   return total;
// };

// const totalCartPrice = calculateTotalPrice();







const CartCard = ({ item }) => {
  const isSelected = selectedProductIds.includes(item.id);


  const handleCheckBoxToggle = async () => {
    if (isSelected) {
      // If already selected, remove from selectedProductIds and the cart
      const updatedSelectedProductIds = selectedProductIds.filter(id => id !== item.id);
      setSelectedProductIds(updatedSelectedProductIds);
      await AsyncStorage.setItem('selectedProductIds', JSON.stringify(updatedSelectedProductIds));

      // Optionally: Implement logic to remove the item from the cart
      //await removeCartItem(item.id);
       
        navigation.navigate('All Cart Items', 
          { KukuId,UnaKiasiGaniChaChakula,
            selectedProductIds, 
            setSelectedProductIds,
             UmriwaKukuId,

             AinaYaKuku,  
             StaterFeed,
             GrowerFeed, 
             LayerFeed, 
             FinisherFeed,
             UmriKwaSiku,
             UmriKwaWiki
           })

    } else {

      setSelectedProduct(item); // Set the selected product
      setModalVisible(true);
      setIsModalVisible(true);
      const newSelectedProductIds = [...selectedProductIds, item.id];
      setSelectedProductIds(newSelectedProductIds);
      await AsyncStorage.setItem('selectedProductIds', JSON.stringify(newSelectedProductIds));
      //await addCartItem(); // Add the item to the cart
    }
  };

  if (input === "") {
    return (
      <Pressable style={[
        globalStyles.VyakulaCartItemsContainer,
        {
          //width:'90%',
        }

        ]}>
        <View style={[
          globalStyles.VyakulaLeftCartItemsContainer,
          {
            flexDirection:'row',
            //justifyContent:'space-between',
            alignItems:'center',
           // backgroundColor:'red',
            width:'60%'
          }


        ]}>
          <Checkbox
            // onPress={() => {
            // setSelectedProduct(item);
            // setModalVisible(true);
            // setIsModalVisible(true); // Update state when modal opens
            // }}

          value={isSelected}
          onValueChange={handleCheckBoxToggle}

            // containerStyle={{
            //  padding: 0, margin: 0,
            //   backgroundColor: 'transparent' ,
            //  // width:'10%',
            // // height:200,

            // }}
            style={{
               marginRight: 10,
               height:30,
               width:30,
              // backgroundColor:'green',
                }}
          />
          <Text style={[globalStyles.VyakulaItemNameCartItemsText,
           
         {
          //width:'70%',
          marginLeft:20,
         }

            ]}>
            {item.product_name}
          </Text>
        </View>
        <Pressable style={[
          globalStyles.VyakulaImageContainerCartItems,
          {
           // backgroundColor:'green',
           width:'20%'
          }

          ]}>
          {item.ProductImage ? (
            <Image
              style={globalStyles.VyakulaImageCartItems}
              source={{ uri: EndPoint + '/' + item.ProductImage }}
            />
          ) : (
            <Image
              style={globalStyles.VyakulaImageCartItems}
              source={require('../assets/500.png')}
            />
          )}
        </Pressable>
      </Pressable>
    );
  }






if(item.product_name.toLowerCase().includes(input.toLowerCase())){






  return (
      <Pressable style={[
        globalStyles.VyakulaCartItemsContainer,
        {
          //width:'90%',
        }

        ]}>
        <View style={[
          globalStyles.VyakulaLeftCartItemsContainer,
          {
            flexDirection:'row',
            //justifyContent:'space-between',
            alignItems:'center',
           // backgroundColor:'red',
            width:'60%'
          }


        ]}>
          <Checkbox
            // onPress={() => {
            // setSelectedProduct(item);
            // setModalVisible(true);
            // setIsModalVisible(true); // Update state when modal opens
            // }}

          value={isSelected}
          onValueChange={handleCheckBoxToggle}

            // containerStyle={{
            //  padding: 0, margin: 0,
            //   backgroundColor: 'transparent' ,
            //  // width:'10%',
            // // height:200,

            // }}
            style={{
               marginRight: 10,
               height:30,
               width:30,
              // backgroundColor:'green',
                }}
          />
          <Text style={[globalStyles.VyakulaItemNameCartItemsText,
           
         {
          //width:'70%',
          marginLeft:20,
         }

            ]}>
            {item.product_name}
          </Text>
        </View>
        <Pressable style={[
          globalStyles.VyakulaImageContainerCartItems,
          {
           // backgroundColor:'green',
           width:'20%'
          }

          ]}>
          {item.ProductImage ? (
            <Image
              style={globalStyles.VyakulaImageCartItems}
              source={{ uri: EndPoint + '/' + item.ProductImage }}
            />
          ) : (
            <Image
              style={globalStyles.VyakulaImageCartItems}
              source={require('../assets/500.png')}
            />
          )}
        </Pressable>
      </Pressable>
    );






  

// hili bano la chini ni la if ya pili mwisho
  }





}










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
          0.1 : 1
           }
     ]}>
         
     



  <MinorHeader title="Vyakula"/>

      

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
                    placeholder="Tafuta chakula" 
                     placeholderTextColor='black'
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>
                    
                  </View>





 <Text
  style={globalStyles.AppChaguaHudumaTextHomeScreen}  
  
  >Chagua mchanganyiko wa vyakula vya kuku unavyotaka kutengeneza</Text>





<Text
  style={[globalStyles.AppChaguaHudumaTextHomeScreen,
    {
      color:'green',
    }

    ]}  
  
  >Vyanzo Vya Protini na Mafuta</Text>



       {setLoading===true?(<ActivityIndicator/>):(

         <>

      {queryset.map((item, index) => {
      return <CartCard item={item} key={item.id || index} />;
      })}

      {isLoading&&(<ActivityIndicator/>)}
      </>
      )}


 






<Text
  style={[globalStyles.AppChaguaHudumaTextHomeScreen,
    {
      color:'green',
    }

    ]}  
  
  >Vyanzo Vya Wanga</Text>



       {setLoading2===true?(<ActivityIndicator/>):(

         <>

      {queryset2.map((item, index) => {
      return <CartCard item={item} key={item.id || index} />;
      })}

      {isLoading2&&(<ActivityIndicator/>)}
      </>
      )}













<Text
  style={[globalStyles.AppChaguaHudumaTextHomeScreen,
    {
      color:'green',
    }

    ]}  
  
  >Vyanzo Vya Vitamini na Madini</Text>



       {setLoading3===true?(<ActivityIndicator/>):(

         <>

      {queryset3.map((item, index) => {
      return <CartCard item={item} key={item.id || index} />;
      })}

      {isLoading3&&(<ActivityIndicator/>)}
      </>
      )}








<Text
  style={[globalStyles.AppChaguaHudumaTextHomeScreen,
    {
      color:'green',
    }

    ]}  
  
  >Vihifadhi Vyakula na Vimeng'enya</Text>



       {setLoading4===true?(<ActivityIndicator/>):(

         <>

      {queryset4.map((item, index) => {
      return <CartCard item={item} key={item.id || index} />;
      })}

      {isLoading4&&(<ActivityIndicator/>)}
      </>
      )}






<View style={{
  marginBottom:150,
}}>
  
</View>


</ScrollView>

{/*mwanzo kwaajili ya kupress order*/}





        <Pressable
          style={[{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            justifyContent: "space-between",
            backgroundColor: "white",
            position:'absolute',
            bottom:0,
            width:'100%',

          },
           
          ]}
        >
          <View style={{
            width:'50%',
          }}>
            <Text style={{ 
              fontFamily:'Medium'
            }}>
              Mchanganuo wa vyakula ulivyovichagua
            </Text>
           
          </View>

          <TouchableOpacity
        //   onPress={() =>
        // navigation.navigate('All Cart Items', { KukuId, UmriwaKukuId,setSelectedProductIds, selectedProductIds })}
         onPress={() =>
        navigation.navigate('All Cart Items', 
          { KukuId,UnaKiasiGaniChaChakula,
            selectedProductIds, 
            setSelectedProductIds,
             UmriwaKukuId,

             AinaYaKuku,  
             StaterFeed,
             GrowerFeed, 
             LayerFeed, 
             FinisherFeed,
             UmriKwaWiki,
             UmriKwaSiku
           })}
       

           
            style={{
              
              padding: 10,
              width:'50%',
              borderRadius: 6,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            
            <Text style={{
             //fontSize: 16, 
             //fontWeight: "500", 
             color: "white" ,
            // padding:13,
             backgroundColor: "green",
             borderColor:'white',
             borderWidth:1,
             textAlign:'center',
             borderRadius:8,
             width:'100%',
             fontFamily:'Light',
             paddingVertical:10,

           }}>
              Tazama
            </Text>
          </TouchableOpacity>
        </Pressable>
   









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
                    <Text style={[globalStyles.alertMessage,
                      {
                        color:'white',
                        fontFamily:'Bold',
                      }

                      ]}>
                    {alertMessage}</Text>
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
     
   
      
          <ImageBackground

                source={require('../assets/bc1.png')}
                style={{
                    flex: 1,
                    opacity:1,
                   // height:height/4,
                    alignItems: 'center',
                   // marginTop:height/4,
                    //marginHorizontal:7,
                    //width:'98%'
                    justifyContent:'center',
                }}
                resizeMode= "cover"
            >
    
    <View style={{
      borderWidth:1,
      borderColor:'white',
      padding:30,
      justifyContent:'center',
      alignItems:'center',
    }}>
           
          {selectedProduct &&
            <Text style={[globalStyles.ModalTitleViewProduct,
              {
                textAlign:'center',
                fontFamily:'Medium',
                color:'white',
                marginBottom:0,

              }
              ]}>
              
            
              Umechagua {selectedProduct.product_name}.
            
            
            </Text>}


                  


          
            

            <View style={[globalStyles.ButtonConatinerViewProduct,
              {
                marginTop:0,
                //backgroundColor:'red',
                flexDirection: 'row',
                marginTop: 20,
                alignItems:'space-around',
                flex:0,
              }

              ]}>
                   {/* <TouchableOpacity 
                    style={globalStyles.ButtonCloseViewProduct} 
                      onPress={() => {
    
                        setIsModalVisible(false); // Update state when modal opens
                        setModalVisible(false);
                      }}
                     >
                        <Text style={globalStyles.ConfirmCancelButtonTextViewProduct}>Sitisha</Text>
                    </TouchableOpacity>*/}
                    <TouchableOpacity 
                    style={[globalStyles.ButtonAddViewProduct,
                      {
                            backgroundColor:'green',
                            borderWidth:1,
                            borderColor:'white',
                          }
                      ]}  
                    onPress={addCartItem} >
                        <Text 
                        style={[
                          globalStyles.ConfirmCancelButtonTextViewProduct,
                          {
                            //backgroundColor:'black'
                          }
                          ]}>Sawa</Text>
                    </TouchableOpacity>
           


          </View>


          </View>
           </ImageBackground> 
        
        
      
      </Modal>














     </View> 


            ):(

<LotterViewScreen />

)}

    

    </>



    )}</>
  );
};

export default VyakulaVyote;

const styles = StyleSheet.create({});
