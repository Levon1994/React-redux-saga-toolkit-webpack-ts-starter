import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { 
  TextField,
  ButtonPress,
} from '../../components';

import { isEmail } from '../../helpers';

import { defaultFilter } from './defaultFilter';

type filterStateType = {
  email: string,
  password: string,
};

const LoginScreen = () => {

  const [isValid, setIsValid] = useState<boolean>(false);
  const [filter, setFilter] = useState<filterStateType>(defaultFilter);
  const { email, password } = filter;

  useEffect(() => {
    const valid = email.length > 0 && password.length > 7 && isEmail(email);
    setIsValid(valid);
  }, [email, password]);

  const handleChange = (value: object) => {
    setFilter(prev => ({ ...prev, ...value }));
  };
  
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/SafeFace.png')}
        />
      </View>
      <Text style={styles.title}>Manager Login</Text>
      <TextField
        label="Email"
        value={email}
        style={{ marginBottom: 24 }}
        onChangeText={(email: string) => handleChange({ email })}
      />
      <TextField
        value={password}
        label="Password"
        secureTextEntry
        onChangeText={(password: string) => handleChange({ password })}
      />
      <ButtonPress
        title="Login"
        disabled={!isValid}
        style={{ marginTop: 30 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 60,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 128, 
    height: 30, 
    marginBottom: 50,
    resizeMode: 'contain'
  },
});

export default LoginScreen;
