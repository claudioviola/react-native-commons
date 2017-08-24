//https://medium.com/technoetics/adding-image-placeholders-in-react-native-the-right-way-9140e78ac5c2


/* <ProgressiveImage 
	style={styles.imageStyle} 
	source={{uri: urlDecode(image)}} 
	thumbnail={imageCallback} 
	bkgColor='#FF0000'
	key="avatar"
/>*/


import React, { Component } from 'react';
import {
	Animated,
	View,
	Image
} from 'react-native';

class ProgressiveImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageOpacity: new Animated.Value(0)
		}
	}

	onLoad() {
		Animated.timing(this.state.imageOpacity, {
			toValue: 1,
			duration: 250
		}).start()
	}

	render() {
		let { imageStyle, key, source, thumbnail, bkgColor, containerStyle } = this.props;
		bkgColor = bkgColor ? bkgColor : 'rgba(1,1,1,0)';
		return (
			<View
				style={{...styles.containerStyle, ...containerStyle}}
				backgroundColor={bkgColor}
			>
				<Image
					resizeMode={'contain'}
					style={[ { position: 'absolute' }, imageStyle ]}
					source={thumbnail}
				/>
				<Image
					resizeMode={'contain'}
					key={key}
					style={[ { position: 'absolute', top:0, zIndex:1 }, imageStyle ]}
					source={source}
					onLoad={(event) => this.onLoad(event)}
				/>
				
			</View>
		)
	}
}

const styles = {
	containerStyle: {
		width: 20,
        height: 20
	},
    imageStyle: {
        width: 20,
        height: 20
    },
};

export { ProgressiveImage };