
import React, {useState, useEffect} from 'react';
import { StyleSheet,ImageBackground, Text,ScrollView,SafeAreaView, View,Image, Button, FlatList,TouchableOpacity,Modal,TouchableWithoutFeedback, Keyboard  } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import useFetch from '../useFetch';

import MinorHeader from '../Header/MinorHeader';
// import HomeScreenCard from '../Shared/HomeScreenCard';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useFonts} from 'expo-font';

import LottieView from 'lottie-react-native';
const SeraScreen =({navigation}) => {

   let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});


  //const navigation = useNavigation();

 
  const [routes, setRoutes] = useState([
  {
    RouteName:'Mfugaji Smart inakusaidia Kukokotoa uwiano sahihi wa viungo kwa kuchanganya vyakula mbalimbali vya kuku. Pia Mfugaji Smart inakusaidia kukokotoa hesabu za matumizi ya chakula kwa muda Fulani',
   RouteImage:require('../assets/Loading/l1.json'),
   id:'1',

 },

  {
    RouteName:'Mfugaji Smart inakusaidia kukupa kumbusho la mabadiliko ya lishe, kumbusho la chanjo, kumbusho la usafishaji wa banda na kumbusho la muda wa kuatamiwa mayai kwenye incubator au kuku mwenyewe',
   RouteImage:require('../assets/Loading/l2.json'),
   id:'2'
 },




  {
    RouteName:'Programu hii itawaunganisha watumiaji wake na ukurasa wake wa youtube uitwao Mfugaji Smart App Youtube Channel moja kwa moja kwa elimu zaidi',
   RouteImage:require('../assets/Loading/l2.json'),
   id:'3'
 },

 //  {
 //    RouteName:'Mfugaji Smart inakusaidia kukupa Elimu ya ufugaji wa kuku kwa kuweka vitabu vitakavyokuwa  na masomo yahusuyo lishe, matumizi ya incubator Pamoja na kuzijua aina za uzao wa kuku na malengo yake kibiashara',
 //   RouteImage:require('../assets/Loading/l1.json'),
 //   id:'4'
 // },



 
    ]);



 //FOR Routes APIS
//const { myfetch:routes, isPending, error } = useFetch('https://a2ca-196-249-104-119.ngrok-free.app/apis/ComputerVisionExperts');



 const {width, height} = Dimensions.get('window');
 const Slide = ({item}) => {
  return (

          <View style={{
            //alignItems: 'center',
            width:width,
          }}>

       


      <View style={{
        width:width-10,
        marginHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        //flex:1,
      }}>

      <TouchableOpacity>
<Text style={{
  textAlign:'center',
  fontSize:18,
  marginTop:height/15,
  //fontWeight:'bold',
  marginBottom:10,
  //lineHeight:24,
  color:'green',
  fontFamily:'Bold'

}}>VIGEZO NA MASHARTI</Text>

</TouchableOpacity>

<View style={{
  width:'100%',
  justifyContent:'center',
  alignItems:'center',
  //marginHorizontal:20,
}}>
    <Text style={[styles.title,
          {
            marginTop:10,
            //width:'95%',
            //textAlign:'center',
            color:'wheat',
            lineHeight:25,
          }

          ]}>
        Karibu kwenye programu ya Mfugaji Smart. 
        Kwa kutumia programu hii, unakubaliana na masharti na sera zifuatazo.
         Sera hizi zimeundwa ili kulinda haki za watumiaji na
          wamiliki wa programu, pamoja na kuhakikisha usalama na 
          uaminifu katika soko hili.

        </Text>
</View>


{/*Mwanzo kwa ajili ya ID namba 1*/}
       <Text style={[styles.title,
        {
          fontFamily:'Medium',
        }
        ]}>
      <Text>{item.id}. </Text>Masharti ya Malipo
        </Text>

        <View style={[styles.title,
          {
            marginTop:10,
          }

          ]}>
        {/*{item?.RouteName}*/}


 {/* mwanzo wa Text 1*/}
<Text style={{
  marginBottom:15,
  color:'white',
  fontFamily:'Light',
}}>
- Watumiaji wanatakiwa kufanya malipo ya ada ya kuunganishwa na wanunuzi kabla ya kupatiwa huduma. Malipo haya yatafanyika kupitia namba maalum ya LIPA kwa Mfugaji Smart Co LTD na sio vinginevyo.
</Text>
{/* mwisho wa Text 1*/}
 


{/* mwanzo wa Text 2*/}
<Text style={{
  marginBottom:15,
  color:'white',
  fontFamily:'Light',
}}>
Ada ya kuunganishwa na wanunuzi ni kama ifuatavyo:
</Text>
    {/*mwanzo wa text ya ndani 1*/}
    <View>
        <Text style={{
      marginBottom:10,
      color:'wheat',
      fontFamily:'Light',
      marginLeft:10,
      }}>
      - Kwa kila *kuku au treyi la mayai* litakalouzwa chini ya TZS 10,000: *TZS 100*.
      </Text>

      <Text style={{
      marginBottom:10,
      color:'wheat',
      fontFamily:'Light',
      marginLeft:10,
      }}>
      - Kwa kila *kuku au treyi la mayai* litakalouzwa kati ya TZS 10,000 hadi TZS 15,000: *TZS 200*.
      </Text>
      
    </View>
    {/*mwisho wa text ya ndani 1*/}
{/* mwisho wa Text 2*/}
        </View>
        



{/*wmisho kwa ajili ya ID namba 1*/}






      </View>
    </View>


      );
};




const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != routes.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };




  const skip = () => {
    const lastSlideIndex = routes.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          //backgroundColor:'red'
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {routes.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor:'green',
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{marginBottom: 20}}>
          {currentSlideIndex == routes.length - 1 ? (
            <View style={{
              height: 50,
              right:5,
              position:'absolute',
              bottom:10
            }}>
              <TouchableOpacity
                style={styles.getstarted}
                onPress={() => navigation.navigate('PreLoader Stack')}>
                <Text style={{
                  //fontWeight: 'bold', 
                  //fontSize: 20,
                  backgroundColor:'green',
                  color:'white',
                  padding:10,
                  borderRadius:10,
                  fontFamily:'Medium',
                  //paddingHorizontal:20,
                }}>
                  Anza
                </Text>

          <Ionicons name='arrow-forward-circle' 
      size={28}
      color='white'  
      
       />

              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
             {/* <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor:'green',
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color:'green',
                  }}>
                  Ruka
                </Text>
              </TouchableOpacity>*/}
              <View style={{width: 15}} />
             {/* <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Mbele
                </Text>
              </TouchableOpacity>*/}

              <TouchableOpacity
                style={styles.getstarted}
               activeOpacity={0.8}
                onPress={goToNextSlide}
                >
                
                
                <Text style={{
                  //fontWeight: 'bold', 
                  //fontSize: 20,
                  backgroundColor:'green',
                  color:'white',
                  padding:10,
                  borderRadius:10,
                  fontFamily:'Medium',
                  //paddingHorizontal:20,
                }}>
                  Endelea
                </Text>

          <Ionicons name='arrow-forward-circle' 
      size={28}
      color='white'  
      
       />

              </TouchableOpacity>


            </View>
          )}
        </View>
      </View>
    );
  };


 
  return (


     <>{!fontsLoaded ? (<View/>):(
    

  // {<Header />}


// {mwanzo wa list za modules}
<SafeAreaView style={{flex: 1, 
  //backgroundColor:'white',
//width: '100%',
flex:1,
marginTop:0,
}}>




{/*mwanzo wa flat list*/}
  <ImageBackground

                source={require('../assets/bc1.png')}
                style={{
                    flex: 1,
                    opacity:1,
                    //justifyContent:'center'

                }}
                resizeMode= "cover"
            >

 


<FlatList 
keyExtractor={item => item.id}
ref={ref}
onMomentumScrollEnd={updateCurrentSlideIndex}
//contentContainerStyle={{height: height * 0.75}}
showsHorizontalScrollIndicator={false}
horizontal
data={routes}
pagingEnabled
// contentContainerStyle={{
//   marginTop:10,
//   paddingBottom:30,
//   flex:1,
//   flexDirection:'row',
// }}
// numColumns ={2} 

renderItem = {({item}) => <Slide item={item}/>}

/>
  
<Footer />


{/*mwisho wa flat list*/}














</ImageBackground>


</SafeAreaView>

)}</>


     
  );
}
export default SeraScreen;

const styles = StyleSheet.create({
 // header:{
 //  width:'100',
 // height:'15%',
 // backgroundColor:'#c8c8c8',
 // alignItems:'center',
 // justifyContent:'center',
 // },


subtitle: {
    color:'white',
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color:'white',
    //fontSize: 22,
   // fontWeight: 'bold',
    marginTop: 20,
    //textAlign: 'center',
    fontFamily:'Regular',
    width:'95%'
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'red',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderColor:'black'
  },
  getstarted:{
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: 'green',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection:'row',
    paddingHorizontal:20,
    position:'absolute',
    bottom:10,
    right:10,

  },


    });
