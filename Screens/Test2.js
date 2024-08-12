import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, SafeAreaView } from 'react-native';

import { useState, useEffect } from 'react';
import {globalStyles} from '../Styles/GlobalStyles';
import MinorHeader from '../Header/MinorHeader';
//import 'expo-dev-client';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';

/*
expo init expo-google-ads-test
cd expo-google-ads-test
expo install expo-dev-client
expo install react-native-google-mobile-ads

Add to app.json the following, the app ids are the samples.
For your real app you would go create these in Admob to get real app ids and ad unit ids.
"react-native-google-mobile-ads": {
  "android_app_id": "ca-app-pub-3940256099942544~3347511713",
  "ios_app_id": "ca-app-pub-3940256099942544~1458002511"
}

If you don't have eas installed then install using the following command:
npm install -g eas-cli

eas login
eas build:configure

Build for local development on iOS or Android:
eas build -p ios --profile development --local
OR
eas build -p android --profile development --local

May need to install the following to build locally (which allows debugging)
npm install -g yarn
brew install fastlane

After building install on your device:
For iOS (simulator): https://docs.expo.dev/build-reference/simulators/
For Android: https://docs.expo.dev/build-reference/apk/

Run on installed app:
expo start --dev-client

*/

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-9624381293919157~1439949764';


const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true
});

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(TestIds.REWARDED_INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true
});

export default function Test2() {
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  const [rewardedInterstitialLoaded, setRewardedInterstitialLoaded] = useState(false);
  
  const loadInterstitial = () => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialLoaded(true);
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setInterstitialLoaded(false);
        interstitial.load();
      }
    );

    interstitial.load();

    return () => {
      unsubscribeClosed();
      unsubscribeLoaded();
    }
  }

  const loadRewardedInterstitial = () => {
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setRewardedInterstitialLoaded(true);
      }
    );

    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log(`User earned reward of ${reward.amount} ${reward.type}`);
      }
    );

    const unsubscribeClosed = rewardedInterstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setRewardedInterstitialLoaded(false);
        rewardedInterstitial.load();
      }
    );

    rewardedInterstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeEarned();
    }
  };

  useEffect(() => {
    const unsubscribeInterstitialEvents = loadInterstitial();
    const unsubscribeRewardedInterstitialEvents = loadRewardedInterstitial();

    return () => {
      unsubscribeInterstitialEvents();
      unsubscribeRewardedInterstitialEvents();
    };
  }, [])

  return (
    <SafeAreaView style={styles.container}>

    <MinorHeader title="Test Ads"/>

    <Text style={{
          textAlign:'center',
          fontSize:30,
          color:'red',
          marginTop:50,
        }}>GOOGLE ADS</Text>

      <View style={styles.container}>
  
  <Button title="Show Rewarded Ads" 
  onPress={() =>rewardedInterstitial.show()}
  />
      </View>

      <Text style={{
          textAlign:'center',
          fontSize:30,
          color:'red',
          marginTop:50,
        }}>GOOGLE BANNER ADS</Text>
      <BannerAd 
        unitId={TestIds.BANNER}
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
