//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Icon } from 'react-native-elements';

// create a component
const PicturePicker = ({ onPress }) => {


    handleImagePicker = () => {
        onPress();
        const options = {
            title: 'Select Avatar',
            customButtons: [
                {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                console.log(source);
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

               /* this.setState({
                    avatarSource: source
                });*/
            }
        });
    };

	return (
		<View style={styles.container}>
            <Icon
                reverse
                name='camera-roll'
                color='#517fa4'
                onPress={handleImagePicker}
            />
		</View>
	);
};

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2c3e50',
	},
});

//make this component available to the app
export { PicturePicker };


