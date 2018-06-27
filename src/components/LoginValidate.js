import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, Text } from 'react-native';

class LoginValidate extends Component {
  render () {
    console.log(this.props)
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
    fetchLoggedInUser: state.userReducer
  }
}

export default connect(mapStateToProps, null)(LoginValidate)
