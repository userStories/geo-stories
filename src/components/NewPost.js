import React from 'react';
import { StyleSheet, View, Button, TextInput, Image, Picker, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Camera, Permissions, ImagePicker, ImageManipulator, Video, Location } from 'expo';
import { connect } from 'react-redux'
import { addNewPostThunk } from '../store'

class NewPost extends React.Component {
  constructor() {
    super();
    this.state ={
      text: '',
      title: '',
      image: null,
      video: null,
      media: 'Picture',
      location: null
    }
  }

  async componentDidMount() {
    const permissions = Permissions.CAMERA_ROLL;
    const permissionsTwo = Permissions.CAMERA;
    await Permissions.askAsync(permissions);
    await Permissions.askAsync(permissionsTwo);
  }

  handleTextPress = (event) => {
    this.setState({
      text: event
    })
  }

  snap = () => {
    this.props.navigation.navigate('TakePicture')
  };

  record = () => {
    this.props.navigation.navigate('RecordVideo')
  };

  handleTitlePress = (event) => {
    this.setState({
      title: event
    })
  }

  handleRemoveImageTwo = () => {
    this.props.navigation.setParams({ cameraPic: 'none' });
  }
  
  handleRemoveVideo = () => {
    this.props.navigation.setParams({ newVideo: 'none' });
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      // aspect: [4, 3],
      // base64: true
    });
    if (!result.cancelled) {
      this.setState({ image: result });
    }
  };

  pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Videos'
    });
    if (!result.cancelled) {
      this.setState({ video: result });
    }
  };


  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  submitImagePost = async () => {
    await this._getLocationAsync()
    let newObj = null
    let cameraPic = this.props.navigation.getParam('cameraPic', 'none')
    if (this.state.image) {
      newObj = this.state.image
      newObj.title = this.state.title
      newObj.text = this.state.text
      newObj.latitude = this.state.location.coords.latitude
      newObj.longitude = this.state.location.coords.longitude
      newObj.userId = this.props.userId
      console.log('this.state', this.state)
      console.log('newObj', newObj)
      this.props.addNewPostMethod(newObj)
      this.props.navigation.navigate('MyMap')
    } else if (cameraPic !== 'none') {
      newObj = cameraPic

      newObj.title = this.state.title
      newObj.text = this.state.text
      newObj.latitude = this.state.location.coords.latitude
      newObj.longitude = this.state.location.coords.longitude
      newObj.location = this.state.location
      newObj.userId = this.props.userId
      console.log('this.state', this.state)
      console.log('newObj', newObj)
      this.props.addNewPostMethod(cameraPic)

      this.props.navigation.navigate('MyMap')
    }
  }

  submitVideoPost = async () => {
    await this._getLocationAsync()
    let newVideo = this.props.navigation.getParam('newVideo', 'none')
    if (this.state.video) {
      newObj = this.state.video
      newObj.title = this.state.title
      newObj.text = this.state.text
      newObj.latitude = this.state.location.coords.latitude
      newObj.longitude = this.state.location.coords.longitude
      newObj.userId = this.props.userId
      this.props.addNewPostMethod(this.state.video)
      this.props.navigation.navigate('MyMap')
    } else if (newVideo !== 'none') {
      newObj = newVideo
      newObj.title = this.state.title
      newObj.text = this.state.text
      newObj.latitude = this.state.location.coords.latitude
      newObj.longitude = this.state.location.coords.longitude
      newObj.userId = this.props.userId
      this.props.addNewPostMethod(newVideo)
      this.props.navigation.navigate('MyMap')
    }
  }

    render() {
      let { image, video } = this.state;
      let cameraPic = this.props.navigation.getParam('cameraPic', 'none')
      if (this.state.image) {
        image = image.uri
      }
      if (cameraPic !== 'none') {
        image = cameraPic.uri
      }
      if (this.state.video) {
        video = video.uri
      }
      let newVideo = this.props.navigation.getParam('newVideo', 'none')
      if (newVideo !== 'none') {
        video = newVideo.uri
      }
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.ViewWrap}>
          <View style={styles.titleInput}>
            <TextInput
            style={styles.titleText}
            value={this.state.newDate}
            placeholder='Add a title!'
            onChangeText={this.handleTitlePress}
            placeholderTextColor='#00a8ff'
            />
          </View>
          <View style={styles.textWrap}>
            <TextInput
            multiline={true}
            style={styles.input}
            onChangeText={this.handleTextPress}
            value={this.state.text}
            placeholder='Write a message!'
            placeholderTextColor='#00a8ff'
            />
          </View>
          <View style={styles.pickerWrapper}>
            <Text style={{color: '#00a8ff'}}>Please Select A Media Type To Post</Text>
            <View style={styles.smallerPickWrapper}>
              <Picker
              onValueChange={(item) => this.setState({ media: item })}
              selectedValue={this.state.media}>
              <Picker.Item label='Picture' color='#00a8ff' value='Picture' />
              <Picker.Item label='Video' color='#00a8ff' value='Video' />
              </Picker>
            </View>
          </View>
          <View style={styles.selectedImageWrap}>
          {
            (this.state.media === 'Picture') ?
            <View style={styles.imageWrapper}>
              {!image && <View style={styles.imageButtonWrapper}><Button
              title="Add from Photos"
              color='#00a8ff'
              onPress={this.pickImage}
              /><Button
              title="Take a Picture"
              color='#00a8ff'
              onPress={this.snap}
              /></View>}
              {image &&
              <Image source={{ uri: image }} style={styles.image} />}
              {this.state.image && <Button
                title="Remove Image"
                color='#00a8ff'
                onPress={() => this.setState({ image: null })}
                />}
              {cameraPic !== 'none' && <Button
                title="Remove Image"
                color='#00a8ff'
                onPress={this.handleRemoveImageTwo}
                />}
            </View> : ''
          }
          {
            (this.state.media === 'Video') ?
            <View style={styles.videoWrapper}>
              {!video && <View style={styles.imageButtonWrapper}><Button
              title="Add from Videos"
              color='#00a8ff'
              onPress={this.pickVideo}
              /><Button
              title="Record a Video"
              color='#00a8ff'
              onPress={this.record}
              /></View>}
              {video &&
              <Video 
              source={{uri: video}}
              style={styles.image}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              />
            }
              {this.state.video && <Button
                title="Remove Video"
                color='#00a8ff'
                onPress={() => this.setState({ video: null })}
                />}
              {newVideo !== 'none' && <Button
                title="Remove Video"
                color='#00a8ff'
                onPress={this.handleRemoveVideo}
                />}
            </View> : ''
          }
          </View>
          {
            (this.state.media === 'Picture' && image) ? <Button title="Submit Post!" color='#00a8ff' onPress={this.submitImagePost}/> : ''
          }
          {
            (this.state.media === 'Video' && video) ? <Button title="Submit Post!" color='#00a8ff' onPress={this.submitVideoPost}/> : ''
          }
        </View>
        </TouchableWithoutFeedback>
      );
    }
}

mapState = (state) => {
  console.log('state.authReducer', state.authReducer)
  return {
    userId: state.authReducer.id
  }
}

mapDispatch = (dispatch) => {
  return {
    addNewPostMethod: (info) => dispatch(addNewPostThunk(info))
  }
}

export default connect (mapState, mapDispatch)(NewPost)

const styles = StyleSheet.create({
  ViewWrap: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  image: {
    width: 200,
    height: 200,
  },
  titleText: {
    color: '#00a8ff',
    backgroundColor: '#EEE',
  },
  input: {
    color: '#00a8ff',
    // backgroundColor: '#4519aa',
  },
  titleInput: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 80,
    marginRight: 80,
    height: 40,
    borderColor: 'white',
    // color: 'white',
    backgroundColor: '#EEE',
    borderRadius: 5,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pickerWrapper: {
    justifyContent: 'center',
    height: 200,
    width: 400,
    flexDirection: 'row',
    alignItems: 'center',

  },
  smallerPickWrapper: {
    borderColor: 'black',
    height: 100,
    paddingBottom: 217,
    width: 100,
  },
  imageWrapper: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedImageWrap: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageButtonWrapper: {
    paddingTop: 50
  },
  textWrap: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    height: 90,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: '#EEE',
    borderWidth: 3
  },
});
