import React from 'react'
import { StyleSheet } from 'react-native'
import { Provider, connect } from 'react-redux'
import StackNav from './StackNav'
import store, { persistor } from './src/store'
import { PersistGate } from 'redux-persist/lib/integration/react'

// import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      loggedInUser: {}
    }
  }

  render () {
    const isLoggedIn = !!this.state.loggedInUser.id
    console.log(isLoggedIn)
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StackNav />
        </PersistGate>
      </Provider>
    )
  }
}


console.log('store: ', store)

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

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#eee',
    borderWidth: 1,
    height: 40
  }
})

// const switchView = createSwitchNavigator({
  
// })

export default App

