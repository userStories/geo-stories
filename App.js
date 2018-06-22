import React from 'react';
import { Provider } from 'react-redux'
import { createStackNavigator } from 'react-navigation';
import Home from './src/components/Home'
import SinglePost from './src/components/SinglePost'
import store from './src/store/index'
import MyMap from './src/components/MyMap'


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StackNav />
      </Provider>
    );
  }
}


console.log('store: ', store)
const StackNav = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: 'white',
      title: 'Home',
      headerStyle: { backgroundColor: 'gray', borderWidth: 1, height: 60 },
    })
  },
  MyMap: {
    screen: MyMap,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: 'white',
      title: 'Map',
      headerStyle: { backgroundColor: 'gray', borderWidth: 1, height: 60 },
    })
  },
  SinglePost: {
    screen: SinglePost,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: 'white',
      title: 'Post',
      headerStyle: { backgroundColor: 'gray', borderWidth: 1, height: 60 },
    })
  },
})

export default App
