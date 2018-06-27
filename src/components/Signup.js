import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { auth } from '../store/userReducer';

class Signup extends Component {
  constructor () {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      location: ''
    }
  }

  // validateSignup = () => {

  // }

  signup = () => {
    const { navigate } = this.props.navigation
    const { firstName, lastName, email, password, location } = this.state
    this.props.submitNewUser(email, password, 'signup', location, firstName, lastName)
    navigate('Home')
  }

  render () {
    const {
      firstName, lastName, email, password, location
    } = this.state
    return (
      <View>
        <FormInput
          value={firstName}
          onChangeText={firstName => this.setState({ firstName })}
          placeholder="First Name"
        />
        <FormInput
          value={lastName}
          onChangeText={lastName => this.setState({ lastName })}
          placeholder="Last Name"
        />
        <FormInput
          value={email}
          onChangeText={email => this.setState({ email })}
          placeholder="Email"
        />
        <FormInput
          value={password}
          onChangeText={password => this.setState({ password })}
          placeholder="Password"
          secureTextEntry
        />
        <FormInput
          value={location}
          onChangeText={location => this.setState({ location })}
          placeholder="Location"
        />
        <Button
          title="Signup"
          onPress={this.signup}
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitNewUser: (email, password, method, location, firstName, lastName) => dispatch(auth(email, password, method, location, firstName, lastName))
  }
}

export default connect(null, mapDispatchToProps)(Signup)