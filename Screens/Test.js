import React, { useState } from 'react';
import { View, Button, ActivityIndicator, StyleSheet, Text } from 'react-native';

export default function Test() {
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    // Simulate a network request or some async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <Text style={styles.contentText}>This is your screen content.</Text>
      
      {/* Button to trigger loader */}
      <Button title="Click Me" onPress={handleButtonClick} />

      {/* Loader */}
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
    marginBottom: 20,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
});
