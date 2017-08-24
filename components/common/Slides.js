//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

// create a component
class Slides extends Component {
	renderLastSlide(index){
		if(index === this.props.data.length - 1){
			return(
				<Button 
					raised
					buttonStyle={styles.button}
					title="Start Now!"
					onPress={this.props.onComplete}
				/>
			);
		}
	}

	renderSlides(){
		return this.props.data.map((slide, index) => {
			return(
				<View 
					key={slide.text} 
					style={[styles.slide, { backgroundColor: slide.color }]}
				>
					<Text style={styles.slideText}>{slide.text}</Text>
					{this.renderLastSlide(index)}
				</View>
			);
		});
	}

	render() {
		return (
			<ScrollView
				horizontal
				pagingEnabled
				style={styles.scrollView}
			>
				{this.renderSlides()}
			</ScrollView>
		);
	}
}

// define your styles
const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: 'purple',
	},
	slide: {
		flex: 1,
		width: SCREEN_WIDTH,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2c3e50',
	},
	slideText: {
		color:'#FFF',
		fontSize: 28
	},
	button:{
		backgroundColor: '#0288D1',
		marginTop: 15
	}
});

//make this component available to the app
export default Slides;
