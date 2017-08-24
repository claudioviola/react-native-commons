//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Camera from 'react-native-camera';
import { Icon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

// create a component
const CameraPicture = ({onPress, onClose, onTakePicture}) => {

	this.takePicture = () => {
	    onPress();
		const options = {};
		//options.location = ...
		this.camera.capture({ metadata: options })
			.then((data) => onTakePicture(data))
			.catch(err => console.error(err));
	};

	return (
		<Camera
			ref={(cam) => {
				this.camera = cam;
			}}
			style={styles.preview}
			aspect={Camera.constants.Aspect.fill}>
			<Icon
				reverse
				name='camera-alt'
				color='#FFCC00'
				onPress={this.takePicture.bind(this)}
			/>
			<Icon
				reverse
				name='close'
				color='#FFF'
				style={styles.buttonCloseStyle}
				onPress={onClose}
			/>
		</Camera>
	);
};

// define your styles
const styles = StyleSheet.create({
	preview: {
		width: SCREEN_WIDTH,
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		position: 'relative'
	},
	buttonCapture: {
		flex: 0,
		backgroundColor: '#fff',
		borderRadius: 5,
		color: '#000',
		padding: 10,
		margin: 40
	},
	buttonCloseStyle: {
		position: 'absolute',
		right:0,
		top:0,
		padding: 10,
		marginTop: 10,
		marginRight: 10,
		backgroundColor: '#000',
		borderRadius: 100,
	}
});

//make this component available to the app
export { CameraPicture };
