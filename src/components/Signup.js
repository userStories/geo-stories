import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { auth } from '../store/authReducer';

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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainWrap}>
        <Text style={styles.signupText}>Sign Up</Text>
          <View style={styles.inputWraps}>
            <FormInput
              value={firstName}
              onChangeText={firstName => this.setState({ firstName })}
              placeholder="First Name"
              placeholderTextColor='white'
              inputStyle={{color: 'white'}}
            />
            <FormInput
              value={lastName}
              onChangeText={lastName => this.setState({ lastName })}
              placeholder="Last Name"
              placeholderTextColor='white'
              inputStyle={{color: 'white'}}
            />
            <FormInput
              value={email}
              onChangeText={email => this.setState({ email })}
              placeholder="Email"
              placeholderTextColor='white'
              inputStyle={{color: 'white'}}
            />
            <FormInput
              value={password}
              onChangeText={password => this.setState({ password })}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor='white'
              inputStyle={{color: 'white'}}
            />
            <FormInput
              value={location}
              onChangeText={location => this.setState({ location })}
              placeholder="Location"
              placeholderTextColor='white'
              inputStyle={{color: 'white'}}
            />
          </View>
          <TouchableOpacity onPress={this.signup}>
            <View style={styles.submitView}>
              <Text style={styles.submitText}>Sign Up</Text>
            </View>
          </TouchableOpacity>
          
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  mainWrap: {
    backgroundColor: '#4519aa',
    flex: 1,
    paddingTop: '15%',
    alignItems: 'center',
  },
  inputWraps: {
    width: '90%'
  },
  signupText: {
    fontSize: 30,
    color: 'white',
    marginBottom: '2%'
  },
  submitView: {
    marginTop: '6%',
    borderColor: 'white',
    borderWidth: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10
  },
  submitText: {
    fontWeight: "bold",
    color: 'white'
  },
})

const mapDispatchToProps = dispatch => {
  return {
    submitNewUser: (email, password, method, location, firstName, lastName) => dispatch(auth(email, password, method, location, firstName, lastName))
  }
}

export default connect(null, mapDispatchToProps)(Signup)