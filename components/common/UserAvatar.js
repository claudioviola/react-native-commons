/*
 <Avatar 
    image={img_utente} 
    imageCallback={IMAGES.avatarPlaceHolder} 
    name={owner_nome} 
    imageStyle={{ width: 40, height: 40 }}
/>

*/


//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { urlDecode } from '../../services/Utility';
import { ProgressiveImage } from './ProgressiveImage';
import { Avatar } from 'react-native-elements';


// create a component
const UserAvatar = ({image, imageCallback, name, containerAvatarStyle, imageAvatarStyle, containerStyle, textStyle }) => {
    image = urlDecode(image);
    //console.log(name,image);
	return (
        <View style={{...styles.containerStyle, ...containerStyle}}>
            <Avatar
                    rounded
                    source={{uri: image}}
                    icon={{name: 'user'}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={1}
                    containerStyle={{ width: 20, height: 20 }}
                    avatarStyle={{width: 20, height: 20, opacity: 1}}
                    overlayContainerStyle={{width: 20, height: 20, opacity: 1}}
                />
            { name ? 
                <Text style={[styles.textStyle, textStyle]}>{name}</Text>
            :
                null
            }    
        </View>
	);
};


// define your styles
const styles = {
	containerStyle: {
		flex: 1,
        flexDirection: 'row',
		justifyContent: 'flex-end',
        //width: 200,
		//backgroundColor: 'maroon',
	},
    imageAvatarStyle: {
        width: 20,
        height: 20
    },
    textStyle: {
        marginLeft: 6,
        fontSize: 12,
        color: '#FFF',
        backgroundColor:'transparent'
    },
};

//make this component available to the app
export { UserAvatar };

