import React from 'react';

import {
    Text,
    Pressable,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';

type ButtonPressProps = {
    style?: object,
    title?: string,  
    onPress?: (e: Event) => void,
    disabled: boolean,
}

const ButtonPress = ({
    style,
    title,
    onPress,
    disabled,
}: ButtonPressProps) => (
    <TouchableOpacity 
        style={{ 
            ...styles.main, 
            ...style,
            backgroundColor: disabled ? '#3E4B66': '#00BFFD', 
        }}
    >
        <Pressable 
            disabled={disabled}
            style={styles.pressable} onPress={onPress}
        >
            <Text style={{ 
                ...styles.text, 
                color: disabled ? '#8491AC': '#fff'
                }}
            >{title}</Text>
        </Pressable>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    main: {
        height: 54,
        borderRadius: 4,
    },
    pressable: {
        height: 54,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    }
});

export default ButtonPress;