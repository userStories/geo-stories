import React from 'react'
import { StyleSheet } from 'react-native'
import { Provider, connect } from 'react-redux'
import Router from './Routes'
import store, { persistor } from './src/store'
import { PersistGate } from 'redux-persist/lib/integration/react'
console.disableYellowBox = true
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

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#eee',
    borderWidth: 1,
    height: 40
  }
})

export default App

