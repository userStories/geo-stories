import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { auth } from '../store/authReducer';
import Loader from './Loader'

class Signup extends Component {
  constructor () {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      location: '',
      loading: false,
      formError: false
    }
  }

  validateSignup = async () => {
    this.setState({ loading: true })
    const { firstName, lastName, email, password, location } = this.state
    const res = await this.props.submitNewUser(email, password, 'signup', location, firstName, lastName)
      res.status === 200 
      ? this.signup()
      : this.setState({ formError: true, loading: false })
  }

  signup = () => {
    this.setState({ loading: false })
    const { navigate } = this.props.navigation
    navigate('MyMap')
  }

  render () {
    const {
      firstName, lastName, email, password, location
    } = this.state
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainWrap}>
        <Text style={styles.signupText}>GeoStories</Text>
          <View style={styles.inputWraps}>
            <FormInput
              value={firstName}
              onChangeText={firstName => this.setState({ firstName })}
              placeholder="First Name"
              placeholderTextColor='#00a8ff'
              inputStyle={{color: '#00a8ff'}}
            />
            <FormInput
              value={lastName}
              onChangeText={lastName => this.setState({ lastName })}
              placeholder="Last Name"
              placeholderTextColor='#00a8ff'
              inputStyle={{color: '#00a8ff'}}
            />
            <FormInput
              value={email}
              onChangeText={email => this.setState({ email })}
              placeholder="Email"
              placeholderTextColor='#00a8ff'
              inputStyle={{color: '#00a8ff'}}
            />
            <FormInput
              value={password}
              onChangeText={password => this.setState({ password })}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor='#00a8ff'
              inputStyle={{color: '#00a8ff'}}
            />
            <FormInput
              value={location}
              onChangeText={location => this.setState({ location })}
              placeholder="Location"
              placeholderTextColor='#00a8ff'
              inputStyle={{color: '#00a8ff'}}
            />
          </View>
          {this.state.formError && 
            (
              <Text>
                Data Invalid! Make sure your email is valid and you entered a passoword!
              </Text>
            )
          }
          <TouchableOpacity onPress={this.validateSignup}>
            <View style={styles.submitView}>
              <Text style={styles.submitText}>Sign Up</Text>
            </View>
          </TouchableOpacity>
          <Loader 
            loading={this.state.loading} />
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  mainWrap: {
    backgroundColor: '#eee',
    flex: 1,
    paddingTop: '15%',
    alignItems: 'center',
  },
  inputWraps: {
    width: '90%'
  },
  signupText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#00a8ff',
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
    color: '#00a8ff'
  },
})

const mapDispatchToProps = dispatch => {
  return {
    submitNewUser: (email, password, method, location, firstName, lastName) => dispatch(auth(email, password, method, location, firstName, lastName))
  }
}

export default connect(null, mapDispatchToProps)(Signup)