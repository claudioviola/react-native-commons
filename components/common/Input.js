import React from 'react';
import { TextInput, View, Text } from 'react-native';


const Input = ({ 
    label, 
    value, 
    autoCorrect, 
    onChangeText, 
    placeholder, 
    secureTextEntry, 
    multiline, 
    underlineColorAndroid,
    containerStyle,
    labelStyle,
    inputStyle
}) => {

    return (
        <View style={[styles.containerStyle, containerStyle]}>
            <Text tyle={[styles.labelStyle, labelStyle]}>{label}</Text>
            <TextInput 
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={autoCorrect != null}
                style={[styles.inputStyle, inputStyle]}
                value={value}
                onChangeText={onChangeText}
                multiline
                underlineColorAndroid={underlineColorAndroid != null ? underlineColorAndroid : '#CCC' }
            />
        </View>
    );
};


const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 1,
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
    }
};

export { Input };
