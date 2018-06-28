import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, Text } from 'react-native';
import { FormInput } from 'react-native-elements';
import { auth } from '../store/authReducer';

class Login extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      formError: false
    }
  }

  validateLogin = async () => {
    const { email, password } = this.state
    const res = await this.props.submitLoginData(email, password, 'login')
    console.log('RES', res)
      res.status === 200 
      ? this.login()
      : this.setState({formError: true})
  }

  login = () => {
    const { navigate } = this.props.navigation
    navigate( 'Home')
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

