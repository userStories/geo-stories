import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, Text } from 'react-native';
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
      <View>
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
        {this.state.formError &&
          (
          <Text>
          Username or password incorrect
          </Text>
          ) 
        }
        <Button 
          title="Submit"
          onPress={this.validateLogin}
        />
        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="transparent"
          textStyle={{ color: "#bcbec1" }}
          title="Sign Up"
          onPress={() => this.props.navigation.navigate("Signup")}
        />
        <Loader 
          loading={this.state.loading} />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitLoginData: (email, password, method) => dispatch(auth(email, password, method))
  }
}

  export default connect(null, mapDispatchToProps)(Login)

