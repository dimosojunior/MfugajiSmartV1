import { StatusBar } from 'expo-status-bar';
import { StyleSheet,ImageBackground, Pressable,ScrollView, TouchableOpacity, Text, TextInput, Button, View } from 'react-native';
import { useEffect,useRef, useState } from 'react';
import * as SMS from 'expo-sms';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import {globalStyles} from '../Styles/GlobalStyles';
import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';
import MinorHeader from '../Header/MinorHeader';
import COLORS  from '../Constant/colors';


//import Pdf from 'react-native-pdf';
//import MyPdf from './MyPdf';
import { printToFileAsync } from 'expo-print';

// expo install expo-sms

export default function Test() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [recipients, setRecipients] = useState([]);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    async function checkAvailability() {
      const isSmsAvailable = await SMS.isAvailableAsync();
      setIsAvailable(isSmsAvailable);
    }
    checkAvailability();
  }, []);

  const sendSms = async () => {
    console.log("Generating pdf");
    const { uri } = await Print.printToFileAsync({
      html: "<h1>Hi friends</h1>"
    });

    console.log(uri);

    const contentUri = await FileSystem.getContentUriAsync(uri);
    console.log(contentUri);

    const {result} = await SMS.sendSMSAsync(
      recipients,
      message,
      {
        attachments: {
          uri: contentUri,
          mimeType: "application/pdf",
          filename: "Hi.pdf"
        }
      }
    );

    console.log(result);
  };

  const addNumber = () => {
    let newRecipients = [...recipients];
    newRecipients.push(phoneNumber);
    setRecipients(newRecipients);
    setPhoneNumber(undefined);
  };

  const showRecipients = () => {
    if (recipients.length === 0) {
      return <Text>Hakuna namba Ulizozichagua kwasasa!</Text>
    }

    return recipients.map((recipient, index) => {
      return (

        <Text key={index}>{recipient}, </Text>
        );
    });
  };

  return (
    <View style={globalStyles.container}>
    <MinorHeader title="Kumbusho La Shamba" />

      <ImageBackground

                source={require('../assets/bc1.png')}
                style={{
                    flex: 1,
                    opacity:1,
                }}
                resizeMode= "cover"
            >

    <ScrollView
keyboardShouldPersistTaps="handled" 
// refreshControl={
//         <RefreshControl
//         refreshing={refresh}
//         onRefresh={() => pullMe()}
//         />
//        }
      showsVerticalScrollIndicator={false}
       
 
      >


<View style={styles.contentcontainer}>


<View style={{
  marginTop:30,
}}>
  {/*<Text style={{
    color:'white',
  }}>Vuta juu</Text>*/}
</View>

            <Text
                style={[
                  globalStyles.AppChaguaHudumaTextHomeScreen,
                  {
                    color:'white',
                  }
                  ]}  
                
                >Ingiza namba ya simu ya mpokeaji</Text>


 {/*mwanzo wa search*/}
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
                    value={phoneNumber} 
                    onChangeText={(value) => setPhoneNumber(value)} 
                    placeholder="0xxxxxxxxx" 
                    keyboardType="numeric"
                     placeholderTextColor='black'
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>
                    
                  </View>

              {/*mwisho wa search*/}



 <Text
                style={[
                  globalStyles.AppChaguaHudumaTextHomeScreen,
                  {
                    color:'white',
                  }
                  ]}  
                
                >Andika ujumbe kwa mpokeaji</Text>


{/*mwanzo wa search*/}
    <View style={[globalStyles.haipo,
       {
backgroundColor:'white',
        //paddingVertical:100,
        width:'90%',
        marginTop:30,

       // flexDirection:"row",
    
    alignItems:"center",
    //width:"90%",
    height:200,
    borderRadius:10,
    marginBottom:10,
    borderColor:COLORS.black,
    borderWidth:1,
    //paddingHorizontal:20,
    //flex:1,
    //marginLeft:15,
      }
    ]}>

                 

                   {/* <View style={[
                      globalStyles.searchbarInputContainerOtherPages,
                      {
                        backgroundColor:'red',
                        padding:100,
                      }
                    ]}>*/}
                    <TextInput 
                    value={message} 
                   onChangeText={(value) => setMessage(value)}
                    placeholder="Unakumbushwa -------" 
                    //keyboardType="numeric"
                     placeholderTextColor='black'
                     multiline={true}  // Enable multiline
                     numberOfLines={10}  // Set a maximum number of lines
                    style={[
                      globalStyles.haipo,
                      {
                        //backgroundColor:'white',
                        //paddingVertical:100,
                        width:'100%',
                        borderRadius:10,
                        height:200,
                        color:'black',
                        marginLeft:15,
                      }
                      ]}
                    
                    ></TextInput>
                    {/*</View>*/}
                    
                  </View>

              {/*mwisho wa search*/}




{/*mwanzo wa Button 2*/}
<View style={{
  justifyContent:'space-between',
  alignItems:'center',
  flexDirection:'row',
  marginTop:15,
  width:'100%',
  paddingHorizontal:20,
  //flex:1,
}}>

<TouchableOpacity
onPress={addNumber}
style={{
  width:'50%',
  justifyContent:'center',
}}
>


  <Text style={{
    color:'white',
    backgroundColor:'green',
    paddingVertical:10,
    paddingHorizontal:10,
    borderRadius:8,
    textAlign:'center',
    width:'90%',
  }}>
    Ongeza Namba
  </Text>
</TouchableOpacity>


<TouchableOpacity
onPress={() => setRecipients([])}
style={{
  width:'50%',
  justifyContent:'center',
}}
>
  <Text style={{
    color:'white',
    backgroundColor:'brown',
    paddingVertical:10,
    paddingHorizontal:10,
    borderRadius:8,
    textAlign:'center',
    width:'90%'
  }}>
    Futa Namba
  </Text>
</TouchableOpacity>
  
</View>
{/*mwisho wa Button 2*/}


     


     {/*mwanzo wa numbers*/}
<View style={{
  justifyContent:'space-between',
  alignItems:'center',
  //flexDirection:'row',
  marginTop:15,
  width:'100%',
  paddingHorizontal:20,
  //flex:1,
}}>


 <Text
  style={[
    globalStyles.AppChaguaHudumaTextHomeScreen,
    {
      color:'green',
    }
    ]}  
  
  >Namba Ulizozichagua kuzitumia ujumbe</Text>

  <Text style={{
    color:'white',
    // flexDirection:'row',
    // justifyContent:'space-between'
    
  }}>
    {showRecipients()}
  </Text>



  
</View>
{/*mwisho wa  numbers*/}


     
      
      <Text>Recipients:</Text>
      


</View>




<View style={{
  marginBottom:100,
}}>
  {/*<Text style={{
    color:'white',
  }}>Vuta juu</Text>*/}
</View>

</ScrollView>
     </ImageBackground>





 {isAvailable ? (

        <Pressable
          style={[{
           // flexDirection: "row",
            //alignItems: "center",
            //padding: 20,
            //justifyContent: "space-between",
            //backgroundColor: "white",
            position:'absolute',
            //bottom:0,
            top:68,
            right:10,
           // width:'100%',

          },
           
          ]}
        >
        {/*  <View style={{
            width:'50%',
          }}>
            <Text style={{ 
              fontFamily:'Medium'
            }}>
              Bei ya jumla
            </Text>

             <Text style={{ 
              fontFamily:'Medium'
            }}>
              Tsh. {formatToThreeDigits(totalCartPrice)}/=
            </Text>
           
          </View>*/}

         

          <TouchableOpacity
          onPress={sendSms}
       
            style={{
              
              padding: 10,
              //width:'100%',
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
            // width:'100%',
             fontFamily:'Light',
             paddingVertical:10,
             paddingHorizontal:10,

           }}>
              Tuma Ujumbe
            </Text>
          </TouchableOpacity>
          

        </Pressable>
   
):(

<Text style={{
  textAlign:'center',
  color:'black',
  paddingHorizontal:30,
  paddingVertical:10,
}}>SMS not available</Text>
)}




    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentcontainer:{
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    marginTop:20,
  },
});
