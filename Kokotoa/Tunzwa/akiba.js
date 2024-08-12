





























import { StyleSheet, Platform, TextInput, ActivityIndicator, Pressable, Text, Animated, ScrollView, View, Image, Button, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard, Dimensions, ImageBackground, KeyboardAvoidingView } from 'react-native';
import React, { useState, useRef, useEffect, useContext } from 'react';

import { globalStyles } from '../Styles/GlobalStyles';
import { EndPoint } from "../Constant/links";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { MaterialIcons, Entypo, MaterialCommunityIcons, FontAwesome5, Ionicons, Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import COLORS from '../Constant/colors';

const { width, height } = Dimensions.get('window');

const VyakulaVyote = ({ navigation, route }) => {
  const { StaterFeed, FinisherFeed, LayerFeed, GrowerFeed, AinaYaKuku, UmriKwaWiki, UmriKwaSiku, IdadiYaKilos, KukuId, UmriwaKukuId } = route.params;
  
  const [queryset, setQueryset] = useState([]);
  const [queryset2, setQueryset2] = useState([]);
  const [queryset3, setQueryset3] = useState([]);
  const [queryset4, setQueryset4] = useState([]);
  const [currentQueryset, setCurrentQueryset] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  
  useEffect(() => {
    loadQueryset(1);
  }, []);

  const loadQueryset = async (querysetNumber) => {
    if (endReached) return;

    setIsLoading(true);
    let url = '';

    switch (querysetNumber) {
      case 1:
        url = EndPoint + `/GetAllVyakulaView/?page=1&page_size=150`;
        break;
      case 2:
        url = EndPoint + `/GetAllVyakulaWangaView/?page=1&page_size=150`;
        break;
      case 3:
        url = EndPoint + `/GetAllVyakulaMadiniNaVitaminiView/?page=1&page_size=150`;
        break;
      case 4:
        url = EndPoint + `/GetAllVyakulaVimengenyaView/?page=1&page_size=150`;
        break;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      switch (querysetNumber) {
        case 1:
          setQueryset(data.queryset);
          break;
        case 2:
          setQueryset2(data.queryset2);
          break;
        case 3:
          setQueryset3(data.queryset3);
          break;
        case 4:
          setQueryset4(data.queryset4);
          break;
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const renderProducts = () => {
    let dataToRender = [];
    switch (currentQueryset) {
      case 1:
        dataToRender = queryset;
        break;
      case 2:
        dataToRender = queryset2;
        break;
      case 3:
        dataToRender = queryset3;
        break;
      case 4:
        dataToRender = queryset4;
        break;
    }
    return (
      <FlatList
        data={dataToRender}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text>{item.product_name}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
        ListFooterComponent={renderLoader}
        onEndReached={handleScroll}
        onEndReachedThreshold={0.5}
      />
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={globalStyles.loaderStyle}>
        <ActivityIndicator size="large" color="red" />
      </View>
    ) : null;
  };

  const handleScroll = () => {
    loadQueryset(currentQueryset);
  };

  const handleQuerysetChange = (querysetNumber) => {
    setCurrentQueryset(querysetNumber);
    loadQueryset(querysetNumber);
  };

  return (
    <View style={globalStyles.container}>
      {renderProducts()}

      <View style={styles.buttonsContainer}>
        {currentQueryset > 1 && (
          <Button
            title={`See queryset${currentQueryset - 1} products`}
            onPress={() => handleQuerysetChange(currentQueryset - 1)}
          />
        )}
        {currentQueryset < 4 && (
          <Button
            title={`See queryset${currentQueryset + 1} products`}
            onPress={() => handleQuerysetChange(currentQueryset + 1)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default VyakulaVyote;
