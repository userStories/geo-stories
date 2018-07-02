import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity } from 'react-native';
import { FormInput } from 'react-native-elements';
import { auth } from '../store/authReducer';
import Loader from './Loader'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      formError: false,
      loading: false
    }
  }

  validateLogin = async () => {
    this.setState({loading: true})
    const { email, password } = this.state
    const res = await this.props.submitLoginData(email, password, 'login')
    console.log('RES', res)
      res.status === 200 
      ? this.login()
      : this.setState({formError: true, loading: false})
  }

  login = () => {
    this.setState({loading: false})
    const { push } = this.props.navigation
    console.log('HEREO', this.props.navigation)
    push('Home')
  }

  render() {
    const { 
      email, password
    } = this.state
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainWrap}>

      <Text style={styles.loginText}>Login</Text>
      <View style={styles.inputWraps}>
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
          placeholderTextColor='white'
          inputStyle={{color: 'white', marginTop: 10}}
          secureTextEntry
        />
      </View>
        {this.state.formError &&
          (
          <Text>
          Username or password incorrect
          </Text>
          ) 
        }

        <TouchableOpacity onPress={this.validateLogin}>
          <View style={styles.submitView}>
            <Text style={styles.submitText}>Submit</Text>
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
    backgroundColor: '#4519aa',
    flex: 1,
    paddingTop: '15%',
    alignItems: 'center',
  },
  inputWraps: {
    width: '90%'
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
  loginText: {
    fontSize: 30,
    color: 'white',
    marginBottom: '2%'
  },
  
})


const mapDispatchToProps = dispatch => {
  return {
    submitLoginData: (email, password, method) => dispatch(auth(email, password, method))
  }
}

  export default connect(null, mapDispatchToProps)(Login)

