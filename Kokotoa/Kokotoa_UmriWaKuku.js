
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



const Kokotoa_UmriWaKuku = ({navigation, route}) => {

   const { 
    
   AinaYaKuku,
   StaterFeed,
   FinisherFeed,
   LayerFeed,
   GrowerFeed,
    id 
   } = route.params

  const KukuId = id;

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
   const url = EndPoint + `/GetUmriWaKukuView/?page=${current_page}&page_size=2`
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
        navigation.navigate('Ingiza Kiasi', { ...item, KukuId, AinaYaKuku, StaterFeed,GrowerFeed, LayerFeed, FinisherFeed })}
       
     
      
      style={globalStyles.OverdoseCartItemsContainer} >


        <View 
        style={globalStyles.OverdoseLeftCartItemsContainer}
        >

        {item.UmriKwaWiki && (  
          <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Wiki  :

          </Text>
          )}

         {item.Interval && (  
          <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Siku :
          </Text>
          )}


         {item.Interval && ( 
          <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Aina Ya Chakula :
          </Text>
          )}


         
        {/*  <Text
           style={globalStyles.OverdoseIconCartItemsText}
          >
            
        <FontAwesome
        style={globalStyles.OverdoseIcon1CartItems}
          
          name="cart-arrow-down"
          size={15}
          color="black"
        />
           
          </Text>*/}
       

           




      
            
          
        </View>



        <Pressable 

        style={globalStyles.OverdoseImageContainerCartItems}
        >
      




        {item.UmriKwaWiki && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            {item.UmriKwaWiki}
          </Text>
          )}

         {item.Interval && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            {item.Interval}
          </Text>
          )}


{/*mwanzo wa Vipindi Kuku aina ya Kroila*/}

      {/*mwanzo wa check ya 01*/}
          {AinaYaKuku == 'Kuku aina ya Kroila' && StaterFeed == "1 - 4" && item.UmriKwaSiku >= 0 && item.UmriKwaSiku <= 28 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
           Starter Feed
          </Text>
          )}

      {/*mwisho wa check ya 01*/}


       


 {/*mwanzo wa check ya 02*/}
          {AinaYaKuku == 'Kuku aina ya Kroila' && GrowerFeed == "5 - 17"  && item.UmriKwaSiku >= 29 && item.UmriKwaSiku <= 119 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Grower Feed
          </Text>
          )}

      {/*mwisho wa check ya 02*/}




       {/*mwanzo wa check ya 03*/}
         {/* {AinaYaKuku == 'Kuku aina ya Kroila' && FinisherFeed == "10 - 12"  && item.UmriKwaSiku >= 70 && item.UmriKwaSiku <= 84 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Finisher Feed
          </Text>
          )}*/}

      {/*mwisho wa check ya 03*/}





       {/*mwanzo wa check ya 04*/}
          {AinaYaKuku == 'Kuku aina ya Kroila' && LayerFeed == "18" && item.UmriKwaSiku >= 120  && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Layer Feed
          </Text>
          )}

      {/*mwisho wa check ya 04*/}





{/*mwisho wa vipindi Kuku aina ya Kroila*/}








{/*mwanzo wa Vipindi Kuku wa Mayai (Layers)*/}

      {/*mwanzo wa check ya 01*/}
          {AinaYaKuku == 'Kuku wa Mayai (Layers)' && StaterFeed == "1 - 4" && item.UmriKwaSiku >= 0 && item.UmriKwaSiku <= 28 &&(  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Starter Feed
          </Text>
          )}

      {/*mwisho wa check ya 01*/}


       


 {/*mwanzo wa check ya 02*/}
          {AinaYaKuku == 'Kuku wa Mayai (Layers)' && GrowerFeed == "5 - 17" && item.UmriKwaSiku >= 29 && item.UmriKwaSiku <= 119 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Grower Feed
          </Text>
          )}

      {/*mwisho wa check ya 02*/}







       {/*mwanzo wa check ya 04*/}
          {AinaYaKuku == 'Kuku wa Mayai (Layers)' && LayerFeed == "18" && item.UmriKwaSiku >= 120 &&(  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Layer Feed
          </Text>
          )}

      {/*mwisho wa check ya 04*/}





{/*mwisho wa vipindi kuku wa Kuku wa Mayai (Layers)*/}
















{/*mwanzo wa Vipindi Kuku aina ya Broila (kuku wa nyama)*/}

      {/*mwanzo wa check ya 01*/}
          {AinaYaKuku == 'Kuku aina ya Broila (kuku wa nyama)' && StaterFeed == "1 - 2" && item.UmriKwaSiku >= 0 && item.UmriKwaSiku <= 14 &&(  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Starter Feed
          </Text>
          )}

      {/*mwisho wa check ya 01*/}


       


 {/*mwanzo wa check ya 02*/}
          {AinaYaKuku == 'Kuku aina ya Broila (kuku wa nyama)' && GrowerFeed == "3 - 4" && item.UmriKwaSiku >= 15 && item.UmriKwaSiku <= 28 &&(  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Grower Feed
          </Text>
          )}

      {/*mwisho wa check ya 02*/}







       {/*mwanzo wa check ya 04*/}
          {AinaYaKuku == 'Kuku aina ya Broila (kuku wa nyama)' && FinisherFeed == "5" && item.UmriKwaSiku >= 29  &&(  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Finisher Feed
          </Text>
          )}

      {/*mwisho wa check ya 04*/}





{/*mwisho wa vipindi kuku wa Kuku aina ya Broila (kuku wa nyama)*/}







        </Pressable>









      </TouchableOpacity>






)



  // hili bano la chini ni la if ya juu kama mtu akitype   
}

if (item.UmriKwaSiku.toString().toLowerCase().includes(input.toLowerCase())) {
 
 return (



      <TouchableOpacity
       onPress={() =>
        navigation.navigate('Ingiza Kiasi', { ...item, KukuId, AinaYaKuku, StaterFeed,GrowerFeed, LayerFeed, FinisherFeed  })}
       
     
      
      style={globalStyles.OverdoseCartItemsContainer} >


        <View 
        style={globalStyles.OverdoseLeftCartItemsContainer}
        >

        {item.UmriKwaWiki && (  
          <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Wiki  :

          </Text>
          )}

         {item.Interval && (  
          <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Siku :
          </Text>
          )}


         {item.Interval && ( 
          <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
            Aina Ya Chakula :
          </Text>
          )}


         
        {/*  <Text
           style={globalStyles.OverdoseIconCartItemsText}
          >
            
        <FontAwesome
        style={globalStyles.OverdoseIcon1CartItems}
          
          name="cart-arrow-down"
          size={15}
          color="black"
        />
           
          </Text>*/}
       

           




      
            
          
        </View>



        <Pressable 

        style={globalStyles.OverdoseImageContainerCartItems}
        >
      




        {item.UmriKwaWiki && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            {item.UmriKwaWiki}
          </Text>
          )}

         {item.Interval && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            {item.Interval}
          </Text>
          )}


{/*mwanzo wa Vipindi Kuku aina ya Kroila*/}

      {/*mwanzo wa check ya 01*/}
          {AinaYaKuku == 'Kuku aina ya Kroila' && StaterFeed == "1 - 4" && item.UmriKwaSiku >= 0 && item.UmriKwaSiku <= 28 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
           Starter Feed
          </Text>
          )}

      {/*mwisho wa check ya 01*/}


       


 {/*mwanzo wa check ya 02*/}
          {AinaYaKuku == 'Kuku aina ya Kroila' && GrowerFeed == "5 - 17"  && item.UmriKwaSiku >= 29 && item.UmriKwaSiku <= 119 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Grower Feed
          </Text>
          )}

      {/*mwisho wa check ya 02*/}




       {/*mwanzo wa check ya 03*/}
         {/* {AinaYaKuku == 'Kuku aina ya Kroila' && FinisherFeed == "10 - 12"  && item.UmriKwaSiku >= 70 && item.UmriKwaSiku <= 84 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Finisher Feed
          </Text>
          )}*/}

      {/*mwisho wa check ya 03*/}





       {/*mwanzo wa check ya 04*/}
          {AinaYaKuku == 'Kuku aina ya Kroila' && LayerFeed == "18" && item.UmriKwaSiku >= 120  && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Layer Feed
          </Text>
          )}

      {/*mwisho wa check ya 04*/}





{/*mwisho wa vipindi Kuku aina ya Kroila*/}








{/*mwanzo wa Vipindi Kuku wa Mayai (Layers)*/}

      {/*mwanzo wa check ya 01*/}
          {AinaYaKuku == 'Kuku wa Mayai (Layers)' && StaterFeed == "1 - 4" && item.UmriKwaSiku >= 0 && item.UmriKwaSiku <= 28 &&(  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Starter Feed
          </Text>
          )}

      {/*mwisho wa check ya 01*/}


       


 {/*mwanzo wa check ya 02*/}
          {AinaYaKuku == 'Kuku wa Mayai (Layers)' && GrowerFeed == "5 - 17" && item.UmriKwaSiku >= 29 && item.UmriKwaSiku <= 119 && (  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Grower Feed
          </Text>
          )}

      {/*mwisho wa check ya 02*/}







       {/*mwanzo wa check ya 04*/}
          {AinaYaKuku == 'Kuku wa Mayai (Layers)' && LayerFeed == "18" && item.UmriKwaSiku >= 120 &&(  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Layer Feed
          </Text>
          )}

      {/*mwisho wa check ya 04*/}





{/*mwisho wa vipindi kuku wa Kuku wa Mayai (Layers)*/}
















{/*mwanzo wa Vipindi Kuku aina ya Broila (kuku wa nyama)*/}

      {/*mwanzo wa check ya 01*/}
          {AinaYaKuku == 'Kuku aina ya Broila (kuku wa nyama)' && StaterFeed == "1 - 2" && item.UmriKwaSiku >= 0 && item.UmriKwaSiku <= 14 &&(  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Starter Feed
          </Text>
          )}

      {/*mwisho wa check ya 01*/}


       


 {/*mwanzo wa check ya 02*/}
          {AinaYaKuku == 'Kuku aina ya Broila (kuku wa nyama)' && GrowerFeed == "3 - 4" && item.UmriKwaSiku >= 15 && item.UmriKwaSiku <= 28 &&(  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Grower Feed
          </Text>
          )}

      {/*mwisho wa check ya 02*/}







       {/*mwanzo wa check ya 04*/}
          {AinaYaKuku == 'Kuku aina ya Broila (kuku wa nyama)' && FinisherFeed == "5" && item.UmriKwaSiku >= 29  &&(  
          <Text 
           style={[globalStyles.OverdoseItemNameCartItemsText,
            {
              color:'green'

           }
           ]}
         >
            Finisher Feed
          </Text>
          )}

      {/*mwisho wa check ya 04*/}





{/*mwisho wa vipindi kuku wa Kuku aina ya Broila (kuku wa nyama)*/}







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
         
     



  <MinorHeader title="Umri Wa Kuku"/>

      






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
                    placeholder="Ingiza wiki / siku" 
                     placeholderTextColor='black'
                     keyboardType="numeric"
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>
                    
                  </View>





            <Text
                style={globalStyles.AppChaguaHudumaTextHomeScreen}  
                
                >Chagua Umri wa Kuku wako</Text>




       









       







      
       {AinaYaKuku === "Kuku aina ya Kroila" || AinaYaKuku === "Kuku wa Mayai (Layers)" || AinaYaKuku === "Kuku aina ya Broila (kuku wa nyama)" ? ( 

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
  <Text style={globalStyles.noitemText}>Hakuna taarifa za kuku aina ya {AinaYaKuku}! !
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

export default Kokotoa_UmriWaKuku;

const styles = StyleSheet.create({});
