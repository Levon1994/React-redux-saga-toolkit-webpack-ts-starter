import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { 
  TextField,
  ButtonPress,
} from './src/components';

import { 
  HomeScreen, 
  LoginScreen 
} from './src/screens';

const Stack = createStackNavigator();

const App = () => {

  const [isLogged] = useState<boolean>(false);
  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.linearGradient}
        colors={['#243559', '#0B1730', '#17274A' ]}
      >
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              cardStyle: { backgroundColor: 'transparent' }
            }}
          >
            {isLogged
              ? <Stack.Screen 
                  name="Home" 
                  component={HomeScreen} 
                  options={{headerStyle: { height: 0 }}}
                />
              : <Stack.Screen 
                  name="Login" 
                  options={{headerStyle: { height: 0 }}}
                  component={LoginScreen} 
                />
            }
          </Stack.Navigator>
        </NavigationContainer>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 70,
    padding: 20,
  },
});

export default App;
