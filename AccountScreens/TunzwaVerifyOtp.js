import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { EndPoint } from '../Constant/links';

const VerifyOTPScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const verifyOTP = () => {
    axios.post(EndPoint + '/Account/verify-otp/', { email, otp, new_password: newPassword })
      .then(response => {
        Alert.alert('Success', 'Password reset successful.');
        navigation.navigate('Signin Stack');
      })
      .catch(error => {
        Alert.alert('Error', error.response.data.error || 'An error occurred.');
      });
  };

  return (
    <View>
      <Text>Enter the OTP sent to your email:</Text>
      <TextInput
        value={otp}
        onChangeText={setOTP}
        placeholder="OTP"
        keyboardType="numeric"
      />
      <Text>Enter your new password:</Text>
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password"
        secureTextEntry
      />
      <Button title="Reset Password" onPress={verifyOTP} />
    </View>
  );
};

export default VerifyOTPScreen;
