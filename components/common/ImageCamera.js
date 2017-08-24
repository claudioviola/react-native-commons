//import liraries
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// create a component
const ImageCamera = ( { source, style } ) => {
	return (
        <Image
            style={[styles.containerStyle, style]}
            source={{ uri: 'data:image/jpeg;base64,' + source.data }}
        />
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
	    width: 200,
        height: 200,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'green',
	},
});

//make this component available to the app
export { ImageCamera };
