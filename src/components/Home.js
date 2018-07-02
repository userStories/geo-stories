import React from 'react';
import { StyleSheet, ImageBackground, View, Button, Text } from 'react-native';
import { connect } from 'react-redux'
import LoginValidate from './LoginValidate'
import LogoutButton from './LogoutButton'
import Signup from './Signup'


class Home extends React.Component {
  constructor () {
    super()
    this.state = {
      loggedInUser: {},
      loaded: false
    }
  }

  componentDidMount () {
    const user = this.props.loggedInUser
    this.setState({loggedInUser: user})
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
            </View>
          )
        }
        <Button onPress={this.handlePressUserProfile} title="UserProfile" />
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
