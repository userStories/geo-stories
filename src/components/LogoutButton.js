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
  }

  render () {
    return (
      <View>
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
    logoutUser: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(LogoutButton)
