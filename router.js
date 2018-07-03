import { createStackNavigator, createDrawerNavigator, createSwitchNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Button } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import UserProfile from './src/components/UserProfile'
import Signup from './src/components/Signup'
import Login from './src/components/Login'
import Home from './src/components/Home'
import MyMap, { MyLocation } from './src/components/MyMap'
import NewPost from './src/components/NewPost'
import TakePicture from './src/components/TakePicture'
import RecordVideo from './src/components/RecordVideo'
import SinglePost from './src/components/SinglePost'
import DrawerContent from './DrawerContent'
import Logout from './src/components/Logout'
import ActivityLog from './src/components/ActivityLog'
import UserProfileAuth from './src/components/UserProfileAuth'

export const StackNav = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: 'white',
      title: 'Welcome',
      headerStyle: { backgroundColor: 'gray', borderWidth: 1, height: 60 }
    })
  },
  Signup: {
    screen: Signup,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: 'white',
      title: 'Welcome',
      headerStyle: { backgroundColor: 'gray', borderWidth: 1, height: 60 }
    })
  }
})

export const DrawerNav = createDrawerNavigator({
  MyMap: {
    screen: MyMap
  },
  Logout: {
    screen: Logout
  },
  UserProfileAuth: {
    screen: UserProfileAuth
  },
  UserProfile: {
    screen: UserProfile
  }, 
  TakePicture: {
    screen: TakePicture
  },
  NewPost: {
    screen: NewPost
  },
  ActivityLog: {
    screen: ActivityLog
  },
  SinglePost: {
    screen: SinglePost
  }

}, {
  contentComponent: DrawerContent,
  drawerWidth: 250,
  drawerPosition: 'left',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
})

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#eee',
    borderWidth: 1,
    height: 40
  }
})


export const MenuNav = createStackNavigator({
  drawer: {
    screen: DrawerNav
  },
  MyMap: {
    screen: MyMap,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: 'blue',
      title: 'MyMap',
      headerStyle: styles.header
    })
  },
  UserProfileAuth: {
    screen: UserProfileAuth,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: 'white',
      title: 'Welcome',
      headerStyle: { backgroundColor: 'gray', borderWidth: 1, height: 60 }
    })
  },
  UserProfile: {
    screen: UserProfile,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: 'white',
      title: 'Welcome',
      headerStyle: { backgroundColor: 'gray', borderWidth: 1, height: 60 }
    })
  },
  SinglePost: {
    screen: SinglePost,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: 'blue',
      title: 'Post',
      headerStyle: styles.header
    })
  },
  NewPost: {
    screen: NewPost,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: 'blue',
      title: 'Post',
      headerStyle: styles.header
    })
  },
  Logout: {
    screen: Logout,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: 'white',
      title: 'Welcome',
      headerStyle: { backgroundColor: 'gray', borderWidth: 1, height: 60 }
    })
  },
  ActivityLog: {
    screen: ActivityLog,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: 'blue',
      title: 'Activity Log',
      headerStyle: styles.header
    })
  }
},
{
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerLeft: <Icon
      name="navicon"
      size={34}
      onPress={() => { 
        navigation.toggleDrawer() 
      }}
    />,
    gesturesEnabled: false

  })
})

