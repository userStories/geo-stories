import React from 'react'
import { StyleSheet } from 'react-native'
import { Provider, connect } from 'react-redux'
import Router from './Routes'
import store, { persistor } from './src/store'
import { PersistGate } from 'redux-persist/lib/integration/react'

// import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      signedIn: false
    }
  }

  render () {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
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

// const switchView = createSwitchNavigator({

// })

export default App

