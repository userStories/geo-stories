import React from 'react';
import { StyleSheet, ImageBackground, View, Button, Text } from 'react-native';
import Signup from './Signup'


export default class Home extends React.Component {

  handlePress = () => {
    this.props.navigation.navigate('SinglePost', {id: 5})
  }

  handlePressUserProfile = () => {
    this.props.navigation.navigate('UserProfile', {id: 5})
  }

  handlePressLoginScreen = () => {
    this.props.navigation.navigate('Login')
  }

  handlePressSignupScreen = () => {
    this.props.navigation.navigate('Signup')
  }

  render() {
    return (
      <View>
        <Text style={styles.titleText}>Home Component</Text>
        <Button onPress={this.handlePress} title="SinglePost" />
        <Button onPress={this.handlePressUserProfile} title="UserProfile" />
        <Button onPress={()=> this.props.navigation.navigate('MyMap')} title="Map" />
        <Button onPress={this.handlePressLoginScreen} title="Login" />
        <Button onPress={this.handlePressSignupScreen} title="Signup" /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
