
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
//import Header from '../Header/header';
import MinorHeader from '../Header/MinorHeader';
import COLORS  from '../Constant/colors';


import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';



const IngizaIdadiYaKuku = ({navigation, route}) => {

   const { 
    
     id, //hii ni id ya umri wa kuku
    KukuId ,
    UmriKwaWiki,
    AinaYaKuku,
    UmriKwaSiku,
    
    Interval,
    
   } = route.params

  const UmriWaKukuId = id;

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












//Load more
const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);


//FOR SEARCHING
const [input, setInput] = useState('');


const getItems = () => {
  if (endReached) {
    setLoading(false);
    setIsLoading(false);
    setPending(false);
    return;
  } else {
    setIsLoading(true);
    //const url = EndPoint + `/GetAllUniversities/?page=${current_page}&page_size=2`;
   const url = EndPoint + `/GetAllSikuView/?page=${current_page}&page_size=2`
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









const InventoryCard = ({item, index}) => {
  


//mwanzo wa search
   if (input === ""){

 return (



      <TouchableOpacity
       onPress={() =>
        navigation.navigate('Ingiza Idadi Ya Kuku', { ...item,Interval, KukuId, AinaYaKuku, UmriKwaWiki,UmriWaKukuId, UmriKwaSiku })}
       
     
      
      style={globalStyles.OverdoseCartItemsContainer} >

         <View 
        style={globalStyles.OverdoseLeftCartItemsContainer}
        >

        {item.Siku && (  
          <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Siku  :

          </Text>
          )}

         {item.Wiki > 0 ? (  
          <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Wiki :
          </Text>
          ):(
           <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Wiki :
          </Text>

          )}


           {item.Mwezi > 0 ? (  
          <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Mwezi :
          </Text>
          ):(
           <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Mwezi :
          </Text>

          )}


          
          
        </View>






        <Pressable 

        style={globalStyles.OverdoseImageContainerCartItems}
        >
      

        {item.Siku && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            {item.Siku}
          </Text>
          )}


          {item.Wiki > 0 ? (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            {item.Wiki}
          </Text>
          ):(
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            0
          </Text>
          )}



           {item.Mwezi > 0 ? (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            {item.Mwezi}
          </Text>
          ):(
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            0
          </Text>
          )}


 </Pressable>

      </TouchableOpacity>






)



  // hili bano la chini ni la if ya juu kama mtu akitype   
}

if (item.Siku.toString().toLowerCase().includes(input.toLowerCase())) {


 return (



      <TouchableOpacity
       onPress={() =>
        navigation.navigate('Ingiza Idadi Ya Kuku', { ...item, KukuId, AinaYaKuku,UmriKwaWiki,UmriWaKukuId, Interval,UmriKwaSiku })}
       
     
      
      style={globalStyles.OverdoseCartItemsContainer} >

         <View 
        style={globalStyles.OverdoseLeftCartItemsContainer}
        >

        {item.Siku && (  
          <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Siku  :

          </Text>
          )}

         {item.Wiki > 0 ? (  
          <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Wiki :
          </Text>
          ):(
           <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Wiki :
          </Text>

          )}


           {item.Mwezi > 0 ? (  
          <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Mwezi :
          </Text>
          ):(
           <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Mwezi :
          </Text>

          )}


          
          
        </View>






        <Pressable 

        style={globalStyles.OverdoseImageContainerCartItems}
        >
      

        {item.Siku && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            {item.Siku}
          </Text>
          )}


          {item.Wiki > 0 ? (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            {item.Wiki}
          </Text>
          ):(
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            0
          </Text>
          )}



           {item.Mwezi > 0 ? (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            {item.Mwezi}
          </Text>
          ):(
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            0
          </Text>
          )}


 </Pressable>

      </TouchableOpacity>






)



// hili bano la chini ni la if ya pili mwisho
  }



}
  
  return (

    <>{!fontsLoaded ? (<View/>):(


    <>


 {!isPending ? (

     <View style={[globalStyles.container
     ,{backgroundColor:COLORS.white}]}>
         
     



  <MinorHeader title="Muda"/>

      






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
                    placeholder="Ingiza Siku / Wiki / Mwezi" 
                     placeholderTextColor='black'
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>
                    
                  </View>





            <Text
                style={globalStyles.AppChaguaHudumaTextHomeScreen}  
                
                >Unataka kutengeneza chakula cha muda gani (siku ngapi)</Text>




       









       







      
      { queryset && queryset.length > 0 ? (
        <>

         {setLoading===true?(<ActivityIndicator/>):(
      <>

   
      <FlatList
          data={queryset}
          showsVerticalScrollIndicator={false}
         // style={{marginTop: 12, width: '100%'}}
          renderItem={InventoryCard}
          numColumns={2}
          ListFooterComponent={renderLoader}
          onEndReached={getItems}
          onEndReachedThreshold={0.5}
        />
                
 </>
      )}

         </>



   ) :(
   <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>Hakuna siku yoyote iliyowekwa! !
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











{/*<View style={{
  marginBottom:100,
}}>
  <Text style={{
    color:'white',
  }}>Vuta juu</Text>
</View>
*/}

{/*mwanzo kwaajili ya kupress order*/}






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
                    <Image source={require('../assets/splashe.png')} style={globalStyles.alertImage} />
                    <Text style={globalStyles.alertTitle}>MFUGAJI SMART</Text>
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

export default IngizaIdadiYaKuku;

const styles = StyleSheet.create({});
