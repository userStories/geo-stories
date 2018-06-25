import React from 'react';
import { Provider } from 'react-redux'
import { createStackNavigator } from 'react-navigation';
import store from './src/store/index'
import Home from './src/components/Home'
import NewPost from './src/components/NewPost'
import TakePicture from './src/components/TakePicture'
import RecordVideo from './src/components/RecordVideo'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StackNav />
      </Provider>
    );
  }
}

const StackNav = createStackNavigator({
  NewPost: {
    screen: NewPost,
    navigationOptions: ({ navigation, header }) => ({
      ...header,
      headerTintColor: 'black',
      title: 'Add New Post',
      headerStyle: { backgroundColor: 'white', borderWidth: 1, height: 60 },
    })
  },
  TakePicture: {
    screen: TakePicture,
  },
  RecordVideo: {
    screen: RecordVideo,
  },
})

export default App
