i'm using expo react native but here i have a problem,
i want to filter all data inwhich the product_name is equal to 'Vyakula Vya Protini',
but i'm getting an error 'item.filter is not a function (it is undefined)
my codes are;

import { StyleSheet,Platform,TextInput,ActivityIndicator,
  Pressable, Text,Animated,ScrollView, View,Image, 
  Button, FlatList,TouchableOpacity,Modal,
  TouchableWithoutFeedback, Keyboard,Dimensions,
  
   
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

const { width, height } = Dimensions.get('window');

const VyakulaVyote = ({navigation, route}) => {

  const { 
    
   KukuId,
    id //id ya umri wa kuku
   } = route.params

  const UmriwaKukuId = id;


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





//FOR SEARCHING
const [input, setInput] = useState('');

const [modalVisible, setModalVisible] = useState(false);
const [isModalVisible, setIsModalVisible] = useState(false); // New state variable


const [cart, setCart] = useState([]);
const [userToken, setUserToken] = useState('');
const [shouldReload, setShouldReload] = useState(false);
const [userData, setUserData] = useState({});

const [selectedProduct, setSelectedProduct] = useState(null);

const InitialQuantityValue = "1"
const [quantity, setQuantity] = useState(InitialQuantityValue);
// const [isPending, setPending] = useState(false);

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
   const url = EndPoint + `/GetAllVyakulaView/?page=${current_page}&page_size=2`
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

  setPending(true);
//navigation.replace('View Products', { id }); 
  // Find the selected product's price
  const productPrice = selectedProduct.price;

  // Calculate the total price for the cart item
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
     
     showAlertFunction("Umefanikiwa kuchagua chakula");

    
     //setShouldReload(true); 
      //navigation.replace('Restaurant NewSale Other '); 
        
    // Ensure that the response contains the 'id' of the newly added item
    
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
      setQuantity(InitialQuantityValue);

     // Increment the displayedItemsCount
    //setDisplayedItemsCount((prevCount) => prevCount + 1);

   


   
  } catch (error) {
     setPending(false);
    //Alert.alert('Error', 'Failed to add item to cart');
    showAlertFunction("Imeshindikana kuchagua chakula");
    
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











const CartCard = ({item}) => {
  
//mwanzo wa search
   if (input === ""){


 return (



      <Pressable
      style={[
        globalStyles.VyakulaCartItemsContainer,
        
      ]} >

{/*OverdoseCartItemsContainer*/}
        <View 
        style={globalStyles.VyakulaLeftCartItemsContainer}
        >

         
          <Text 
           style={globalStyles.VyakulaItemNameCartItemsText}
         >
            {item.product_name}
          </Text>
          


         
          
          
        

       {/*mwanzo wa button*/}
          <TouchableOpacity
             onPress={() => {
            setSelectedProduct(item);
            setModalVisible(true);
            setIsModalVisible(true); // Update state when modal opens
            }}

           // onPress={addCartItem}
           style={globalStyles.VyakulaAddButtonContainerCartItems}
                 >
              <Text
               style={globalStyles.VyakulaAddButtonTextCartItems}
            
              >
                Chagua
              </Text>
            </TouchableOpacity>
             {/*mwisho wa button*/}
          
        </View>



        <Pressable 

        style={globalStyles.VyakulaImageContainerCartItems}
        >
         <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            Bei (Kilo 1): Tsh. {formatToThreeDigits(item.price)}/=
          </Text>
        {item.ProductImage ?  
          <Image
           style={globalStyles.VyakulaImageCartItems}
        source={{
          uri: EndPoint + '/' + item.ProductImage
        }}
          />:

           <Image
           style={globalStyles.VyakulaImageCartItems}
        
            source={require('../assets/500.png')} 
          />}







        </Pressable>
      </Pressable>






)



  // hili bano la chini ni la if ya juu kama mtu akitype   
}

 if(item.product_name.toLowerCase().includes(input.toLowerCase())){





 return (



      <Pressable
      style={[
        globalStyles.VyakulaCartItemsContainer,
        
      ]} >

{/*OverdoseCartItemsContainer*/}
        <View 
        style={globalStyles.VyakulaLeftCartItemsContainer}
        >

         
          <Text 
           style={globalStyles.VyakulaItemNameCartItemsText}
         >
            {item.product_name}
          </Text>
          


         
          
          
        

       {/*mwanzo wa button*/}
          <TouchableOpacity
             onPress={() => {
            setSelectedProduct(item);
            setModalVisible(true);
            setIsModalVisible(true); // Update state when modal opens
            }}

           // onPress={addCartItem}
           style={globalStyles.VyakulaAddButtonContainerCartItems}
                 >
              <Text
               style={globalStyles.VyakulaAddButtonTextCartItems}
            
              >
                Chagua
              </Text>
            </TouchableOpacity>
             {/*mwisho wa button*/}
          
        </View>



        <Pressable 

        style={globalStyles.VyakulaImageContainerCartItems}
        >
         <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            Bei (Kilo 1): Tsh. {formatToThreeDigits(item.price)}/=
          </Text>
        {item.ProductImage ?  
          <Image
           style={globalStyles.VyakulaImageCartItems}
        source={{
          uri: EndPoint + '/' + item.ProductImage
        }}
          />:

           <Image
           style={globalStyles.VyakulaImageCartItems}
        
            source={require('../assets/500.png')} 
          />}







        </Pressable>
      </Pressable>






)









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
                    placeholder="Tafuta" 
                     placeholderTextColor='black'
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>
                    
                  </View>





 <Text
  style={globalStyles.AppChaguaHudumaTextHomeScreen}  
  
  >Chagua chakula na kiasi ulichonacho</Text>








   {queryset && queryset.length > 0 ? (


      <>

        {setLoading===true?(<ActivityIndicator/>):(

             <>

          {queryset.map((item, index) => {
          return <CartCard item={item.filter((x) => x.product_name == "Vyakula Vya Protini")} key={item.id || index} />;
          })}

          {isLoading&&(<ActivityIndicator/>)}
          </>
          )}

         </>




   ) :(
   <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>hakuna chakula chochote kilichopo! !
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




<View style={{
  marginBottom:100,
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
          onPress={() =>
        navigation.navigate('All Cart Items', { KukuId, UmriwaKukuId })}
       

           
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
    
   
        <View style={{ 
         flex: 1,
         marginTop:height/4,
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
             height:height/4


            }



            ]}>
          {selectedProduct &&
            <Text style={[globalStyles.ModalTitleViewProduct,
              {
                textAlign:'center',
                fontFamily:'Medium',

              }
              ]}>
              
            
              Umechagua {selectedProduct.product_name}.
            
            
            </Text>}


                    {/*<Text 
                    style={globalStyles.EnterQuntityTextViewProduct}
                    > Kiasi (Kwa Kilo)</Text>*/}
                    < View style={[globalStyles.inputViewProduct,
                      {
                        display:'none',
                      }




                      ]}>
                        <FontAwesome style={globalStyles.InputIconViewProduct} name='pencil'/>
                        <TextInput 
                        style={globalStyles.textInputViewProduct}  
                        placeholder=' Kiasi' 
                        value={quantity}
                  onChangeText={text => setQuantity(text)}
                  keyboardType="numeric"
                  placeholderTextColor="black"
                        />
                    </View>
                



          
            

            <View style={globalStyles.ButtonConatinerViewProduct}>
                    <TouchableOpacity 
                    style={globalStyles.ButtonCloseViewProduct} 
                      onPress={() => {
    
                        setIsModalVisible(false); // Update state when modal opens
                        setModalVisible(false);
                      }}
                     >
                        <Text style={globalStyles.ConfirmCancelButtonTextViewProduct}>Sitisha</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={[globalStyles.ButtonAddViewProduct,
                      {
                            backgroundColor:'black'
                          }
                      ]}  
                    onPress={addCartItem} >
                        <Text 
                        style={[
                          globalStyles.ConfirmCancelButtonTextViewProduct,
                          {
                            //backgroundColor:'black'
                          }
                          ]}>Kubali</Text>
                    </TouchableOpacity>
            </View>
          </View>
        </View>
        
        
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
