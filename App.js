import React from 'react';
import { Provider } from 'react-redux'
import { createStackNavigator } from 'react-navigation';
import Home from './src/components/Home'
import { View } from "react-native";
import { MapView } from "expo";
import store from './src/store/index'
import MyMap from './components/MyMap'

class App extends React.Component {
  render() {
    return (
      // <Provider store={store}>
      <View>
        <StackNav />
        <MyMap />
        </View>
      // </Provider>
    );
  }
}

const StackNav = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: 'white',
      title: 'Welcome',
      headerStyle: { backgroundColor: 'gray', borderWidth: 1, height: 60 },
    })
  },
})

export default App
