import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, Text } from 'react-native';
import { logout } from '../store';

class LogoutButton extends Component {
  constructor() {
    super()
  }

  onPress = () => {
    this.props.logoutUser()
    this.props.navigation.navigate('Signup')
  }

  render () {
    return (
      <View>
        <Text>Are you sure you want to logout?</Text>
        <Button
          onPress={this.onPress}
          title="Logout"
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      console.log('mapdispatch logout')
      dispatch(logout())
    }
  }
}

export default connect(null, mapDispatchToProps)(LogoutButton)
