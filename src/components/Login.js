import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity, Image } from 'react-native';
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
      res.status === 200 
      ? this.login()
      : this.setState({formError: true, loading: false})
  }

  login = () => {
    this.setState({loading: false})
    const { navigate } = this.props.navigation
    navigate('MyMap')
  }

  render() {
    const { 
      email, password
    } = this.state
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainWrap}>
      <Image style={styles.logo} source={{ uri: 'http://res.cloudinary.com/dhktg6yis/image/upload/v1530895276/geostories/Draft_2_logo.png' }} />
      <View style={styles.inputWraps}>
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
          placeholderTextColor='#00a8ff'
          inputStyle={{color: '#00a8ff', marginTop: 10}}
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
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Signup")}>
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
    paddingTop: '10%',
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 200,
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
    color: '#00a8ff'
  },
  
  
})


const mapDispatchToProps = dispatch => {
  return {
    submitLoginData: (email, password, method) => dispatch(auth(email, password, method))
  }
}

  export default connect(null, mapDispatchToProps)(Login)

