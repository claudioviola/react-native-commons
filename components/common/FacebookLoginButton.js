import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { LoginButton, LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

class FacebookLoginButton extends Component {
	constructor(props){
        super(props);
		this.state = { isLoggedIn: false };
    }

	componentWillMount(){
		//console.log('componentWillmOunt');
        this.checkIsLoggedIn();
	}

    componentWillReceiveProps({ checkIsLoggedIn }){
        if(checkIsLoggedIn){
            this.checkIsLoggedIn();
        }
    }

	async checkIsLoggedIn(){
		let accessToken = await AccessToken.getCurrentAccessToken();
		this.setState({isLoggedIn: accessToken != null});
		//console.log('isLoggedIn:', this.state.isLoggedIn);
	}
	

	async handlePress() {
		const { onLoginStarted, onLoginSuccess, onLoginError, onLogoutSuccess, onLoginCancelled, readPermissions } = this.props;
		onLoginStarted();
		//const isLogged = await isLoggedIn();
		if (!this.state.isLoggedIn) {
			let result = await LoginManager.logInWithReadPermissions([readPermissions]);
			console.log('result:', result);
			if (result.isCancelled) {
				onLoginCancelled();
			} else {
				let data = await AccessToken.getCurrentAccessToken();
				//alert(data.accessToken.toString());
				const responseInfoCallback = (error, result) => {
					if (error) {
						console.log(error)
						onLoginError(error);
					} else {
						this.setState( { isLoggedIn: true } );
						result.accessToken = data.accessToken;
						onLoginSuccess(result);
					}
				}
				const infoRequest = new GraphRequest(
					'/me', {
						accessToken: data.accessToken,
						parameters: {
							fields: {
								string: 'email,name,first_name,middle_name,last_name'
							}
						}
					},
					responseInfoCallback
				);
				// Start the graph request.
				new GraphRequestManager().addRequest(infoRequest).start();
			}
			/*(error) => {
				alert('Login fail with error: ' + error);*/
		} else {
			let logOutResult = await LoginManager.logOut();
			onLogoutSuccess(logOutResult);
			this.setState( { isLoggedIn: false } );
		}
	}

	render(){
		return (
			<SocialIcon
				raised
				onPress={this.handlePress.bind(this)}
				title={this.state.isLoggedIn === true ? 'Logout' : 'Sign In With Facebook'}
				button
				type='facebook'
				style={styles.buttonStyle}
			/>
		)}
};

const styles = {
	buttonStyle: {
		height: 50,
		paddingLeft: 25,
		paddingRight: 25,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5
	}
};

export { FacebookLoginButton };

