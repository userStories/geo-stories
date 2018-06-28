import React from 'react';
import { StyleSheet, ImageBackground, View, Button, Text } from 'react-native';
import { connect } from 'react-redux'
import LoginValidate from './LoginValidate'
import LogoutButton from './LogoutButton'
import Signup from './Signup'
import store from '../store/index'


class Home extends React.Component {
  constructor () {
    super()
    this.state = {
      loggedInUser: {},
    }
  }

  componentDidMount () {
    console.log('home mounted')
    const user = this.props.loggedInUser
    console.log('home componentdidmount', user)
    this.setState({loggedInUser: user})
  }

  handlePress = () => {
    this.props.navigation.navigate('SinglePost', {id: 5})
  }

  handlePressUserProfile = () => {
    this.props.navigation.navigate('UserProfile', {id: this.state.loggedInUser.id})
  }

  handlePressLoginScreen = () => {
    this.props.navigation.navigate('Login')
  }

  handlePressSignupScreen = () => {
    this.props.navigation.navigate('Signup')
  }

  render() {
    const isLoggedIn = !!this.state.loggedInUser.id
    console.log(this.state.loggedInUser)
    console.log(isLoggedIn)
    return (
      <View>
        <Text style={styles.titleText}>Home Component</Text>
        {
          isLoggedIn && (
            <View>
              <LoginValidate />
              <LogoutButton />
              <Button onPress={this.handlePressUserProfile} title="UserProfile" />
            </View>
          )
        }
        <Button onPress={this.handlePress} title="SinglePost" />
        <Button onPress={()=> this.props.navigation.navigate('MyMap')} title="Map" />
        {
          !isLoggedIn && (
            <View>
              <Button onPress={this.handlePressLoginScreen} title="Login" />
              <Button onPress={this.handlePressSignupScreen} title="Signup" /> 
            </View>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

const mapStateToProps = state => {
  return {
    loggedInUser: state.authReducer
  }
}

export default connect(mapStateToProps, null)(Home)
