import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, Text } from 'react-native';

class LoginValidate extends Component {
  render () {
    const user = this.props.fetchLoggedInUser
    return (
      <View>
        { user &&
          (<Text> Welcome {user.firstName}</Text>)
        }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetchLoggedInUser: state.authReducer
  }
}

export default connect(mapStateToProps, null)(LoginValidate)
