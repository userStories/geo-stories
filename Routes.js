import React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import Router, { StackNav, MenuNav } from './router'
import { Root } from 'native-base'


const Routes = (props) => {
  console.log(props)
  const isLoggedIn = !!props.loggedInUser.id
  console.log(isLoggedIn)
  return (
    <Root>
      {
        isLoggedIn ? (
          <MenuNav />
        ) : (
          <StackNav />
        )
      }
    </Root>
  )
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.authReducer
  }
}

export default connect(mapStateToProps, null)(Routes)
