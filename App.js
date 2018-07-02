
import React from 'react';
import { StyleSheet, Text } from "react-native";
import { Provider } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import NewPost from './src/components/NewPost'
import TakePicture from './src/components/TakePicture'
import RecordVideo from './src/components/RecordVideo'
import SinglePost from './src/components/SinglePost'
import store, { persistor } from './src/store'
import MyMap, { MyLocation } from './src/components/MyMap'
import UserProfile from './src/components/UserProfile'
import Signup from './src/components/Signup'
import Login from './src/components/Login'
import Home from './src/components/Home'
import { PersistGate } from 'redux-persist/lib/integration/react'

// import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StackNav />
        </PersistGate>
      </Provider>
    )
  }
}



// const Tabs = createMaterialBottomTabNavigator({
//   Home: {screen: MyMap},
//   Post: {screen: NewPost},
//   Profile: {screen: UserProfile},
//   // Location: {screen: MyLocation},
// }, {
//   initialRouteName: 'Home',
//   activeTintColor: '#F44336',
//   barStyle: { paddingBottom: 20 }
// })
// const MainStack = createSwitchNavigator({
//   map: {
//     screen: MyMap
//   },
//   main: {
//     screen: Tabs
//   },
// }, {
//   animationEnabled: true
// })



const StackNav = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: '#4519aa',
      title: 'Map',
      headerStyle: { backgroundColor: 'white', borderWidth: 1, height: 40 },
    })
  },
  MyMap: {
    screen: MyMap,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: '#4519aa',
      title: 'Map',
      headerStyle: styles.header
    })
  },
  SinglePost: {
    screen: SinglePost,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: '#4519aa',
      title: 'Post',
      headerStyle: styles.header
    })
  },
  UserProfile: {
    screen: UserProfile,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: '#4519aa',
      title: 'Welcome',
      headerStyle: styles.header
    })
  },
  Signup: {
    screen: Signup,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: '#4519aa',
      title: 'Sign Up',
      headerStyle: styles.header,
    })
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: '#4519aa',
      title: 'Welcome',
      headerStyle: styles.header,
    })
  },
  TakePicture: {
    screen: TakePicture
  },
  RecordVideo: {
    screen: RecordVideo
  },
  NewPost: {
    screen: NewPost,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: '#4519aa',
      title: 'Add New Post',
      headerStyle: styles.header
    })
  }
})

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#eee',
    borderWidth: 1,
    height: 40
  }
})

export default App
