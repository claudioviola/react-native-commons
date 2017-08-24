//Da qui: https://github.com/chagasaway/react-native-fading-slides


import React from 'react';
import {
	Animated,
	StyleSheet,
	View,
	Text
} from 'react-native';

import TimerMixin from 'react-timer-mixin';
import tweenState from 'react-tween-state';

let MINIMUM_DELAY = 0;

const FadingSlides = React.createClass({
	mixins: [TimerMixin, tweenState.Mixin],

	getInitialState: function () {
		return {
			opacity: 0,
			currentIndex: 0
		};
	},

	componentDidMount: function () {
		this._fadeOpacity();
	},

	_fadeOpacity: function () {
		this.tweenState('opacity', {
			easing: tweenState.easingTypes.easeInCirc,
			duration: this.props.fadeDuration,
			beginValue: this.state.opacity === 0 ? 0 : 1,
			onEnd: this._getNextSlide,
			endValue: this.state.opacity === 0 ? 1 : 0
		});
	},

	_getNextSlide: function () {
		if (this.state.opacity === 0) {
			var index = this.state.currentIndex + 1;
			index = index < this.props.slides.length ? index : 0;
			this.setState({ currentIndex: index });
			this.setTimeout(() => { this._fadeOpacity(); }, MINIMUM_DELAY);
		} else {
			this.setTimeout(() => { this._fadeOpacity(); },
				this.props.stillDuration || MINIMUM_DELAY);
		}
	},

	render: function () {
		var slide = this.props.slides[this.state.currentIndex];
		const { imageStyle, showInfo } = slide;
		return (
        <View style={this.props.style}>
            <View style={[styles.slide, {
                opacity: this.getTweeningValue('opacity')
            }]}>
                <View style={styles.info}>
                    <Animated.Image
                        style={[styles.image, imageStyle]}
                        source={slide.image}
                    />
                    {this.props.showInfo
                        ? <View style={styles.info}>
                            <Text style={[styles.title, { color: slide.titleColor }]}>
                                {slide.title}
                            </Text>
                            <Text style={[styles.subtitle, { color: slide.subtitleColor }]}>
                                {slide.subtitle}
                            </Text>
                        </View>
                        : <View></View>
                    }
                </View>
            </View>
        </View>
		);
	},
});


var styles = StyleSheet.create({
	slide: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column'
	},
	image: {

	},
	info: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		flexDirection: 'column'
	},
	title: {
		fontSize: 22,
		fontWeight: '700',
	},
	subtitle: {
		fontSize: 20,
		paddingBottom: 30
	}
});

export { FadingSlides };