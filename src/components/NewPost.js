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
      this.props.addNewPostMethod(newObj)
      this.props.navigation.navigate('MyMap', { newPostNow: true })
    } else if (cameraPic !== 'none') {
      newObj = cameraPic
      newObj.title = this.state.title
      newObj.text = this.state.text
      newObj.latitude = this.state.location.coords.latitude
      newObj.longitude = this.state.location.coords.longitude
      newObj.location = this.state.location
      newObj.userId = this.props.userId
      console.log('newObj', newObj)
      this.props.addNewPostMethod(cameraPic)
      this.props.navigation.navigate('MyMap', { newPostNow: true })
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
      this.props.navigation.navigate('MyMap', { newPostNow: true })
    } else if (newVideo !== 'none') {
      newObj = newVideo
      newObj.title = this.state.title
      newObj.text = this.state.text
      newObj.latitude = this.state.location.coords.latitude
      newObj.longitude = this.state.location.coords.longitude
      newObj.userId = this.props.userId
      this.props.addNewPostMethod(newVideo)
      this.props.navigation.navigate('MyMap', { newPostNow: true })
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
            placeholderTextColor='white'
            />
          </View>
          <View style={styles.textWrap}>
            <TextInput
            multiline={true}
            style={styles.input}
            onChangeText={this.handleTextPress}
            value={this.state.text}
            placeholder='Write a message!'
            placeholderTextColor='white'
            />
          </View>
          <View style={styles.pickerWrapper}>
            <Text style={{color: 'white'}}>Please Select A Media Type To Post</Text>
            <View style={styles.smallerPickWrapper}>
              <Picker
              onValueChange={(item) => this.setState({ media: item })}
              selectedValue={this.state.media}>
              <Picker.Item label='Picture' color='white' value='Picture' />
              <Picker.Item label='Video' color='white' value='Video' />
              </Picker>
            </View>
          </View>
          <View style={styles.selectedImageWrap}>
          {
            (this.state.media === 'Picture') ?
            <View style={styles.imageWrapper}>
              {!image && <View style={styles.imageButtonWrapper}><Button
              title="Add from Photos"
              color='white'
              onPress={this.pickImage}
              /><Button
              title="Take a Picture"
              color='white'
              onPress={this.snap}
              /></View>}
              {image &&
              <Image source={{ uri: image }} style={styles.image} />}
              {this.state.image && <Button
                title="Remove Image"
                color='white'
                onPress={() => this.setState({ image: null })}
                />}
              {cameraPic !== 'none' && <Button
                title="Remove Image"
                color='white'
                onPress={this.handleRemoveImageTwo}
                />}
            </View> : ''
          }
          {
            (this.state.media === 'Video') ?
            <View style={styles.videoWrapper}>
              {!video && <View style={styles.imageButtonWrapper}><Button
              title="Add from Videos"
              color='white'
              onPress={this.pickVideo}
              /><Button
              title="Record a Video"
              color='white'
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
                color='white'
                onPress={() => this.setState({ video: null })}
                />}
              {newVideo !== 'none' && <Button
                title="Remove Video"
                color='white'
                onPress={this.handleRemoveVideo}
                />}
            </View> : ''
          }
          </View>
          {
            (this.state.media === 'Picture' && image) ? <Button title="Submit Post!" color='white' onPress={this.submitImagePost}/> : ''
          }
          {
            (this.state.media === 'Video' && video) ? <Button title="Submit Post!" color='white' onPress={this.submitVideoPost}/> : ''
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
    backgroundColor: '#4519aa',
  },
  image: {
    width: 200,
    height: 200,
  },
  titleText: {
    color: 'white',
    backgroundColor: '#4519aa',
  },
  input: {
    color: 'white',
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
    height: 35,
    borderColor: 'white',
    // color: 'white',
    backgroundColor: '#4519aa',
    borderRadius: 5,
    borderWidth: 1,
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
    height: 100,
    borderColor: 'white',
    borderRadius: 5,
    backgroundColor: '#4519aa',
    borderWidth: 1
  },
});
