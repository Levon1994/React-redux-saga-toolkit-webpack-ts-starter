import React, { useState } from 'react';

import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    TouchableHighlight,
  } from 'react-native';

type TextFieldProps = {
    label?: string, 
    style?: object,
    value?: string,
    secureTextEntry?: boolean,
    onChangeText?: (e: Event) => void,
};

const TextField = ({
    label,
    style,
    value,
    onChangeText,
    secureTextEntry,
    ...restProps
}: TextFieldProps) => {

  const [isSecure, setIsSecure] = useState<boolean>(secureTextEntry);

    return (
        <View style={{ ...styles.container, ...style }}>
          {label && <Text style={styles.label}>{label}</Text>}
          <TextInput 
            secureTextEntry={isSecure}
            value={value}
            onChangeText={onChangeText}
            style={{
              ...styles.textInput,
              paddingRight: isSecure ? 46 : 16 
            }}
            {...restProps}
          />
          {secureTextEntry &&
            <TouchableHighlight onPress={() => setIsSecure(!isSecure)}>
              <Image 
                style={styles.image} 
                source={require('../../assets/showPass.png')}
              />
            </TouchableHighlight>
          }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    label: {
      fontSize: 16,
      color: '#fff',
      marginBottom: 12,
      fontFamily: 'Roboto',
    },
    textInput: {
      backgroundColor: '#0E1C37',
      height: 54,
      maxWidth: 568,
      alignSelf: 'stretch',
      fontSize: 16,
      color: '#fff',
      paddingLeft: 16,
      paddingRight: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#354E69',
      fontFamily: 'Roboto',
    },
    image: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
      position: 'absolute',
      right: 16,
      bottom: 14,
    },
  });

export default TextField;