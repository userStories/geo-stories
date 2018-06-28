import React from 'react';
import { StyleSheet, View, Button, TextInput, Image, Picker, Text } from 'react-native';
import { Camera, Permissions, ImagePicker, ImageManipulator, Video } from 'expo';
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

  submitImagePost = async () => {
    let cameraPic = this.props.navigation.getParam('cameraPic', 'none')
    if (this.state.image) {
      this.props.addNewPostMethod(this.state.image)
    } else if (cameraPic !== 'none') {
      this.props.addNewPostMethod(cameraPic)
    }
  }

  submitVideoPost = async () => {
    let newVideo = this.props.navigation.getParam('newVideo', 'none')
    if (this.state.video) {
      this.props.addNewPostMethod(this.state.video)
    } else if (newVideo !== 'none') {
      this.props.addNewPostMethod(newVideo)
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
        <View style={styles.ViewWrap}>
          <View style={styles.titleInput}>
            <TextInput
            style={styles.titleText}
            value={this.state.newDate}
            placeholder='Add a title!'
            onChangeText={this.handleTitlePress}
            />
          </View>
          <View style={styles.textWrap}>
            <TextInput
            multiline={true}
            style={styles.input}
            onChangeText={this.handleTextPress}
            value={this.state.text}
            placeholder='Write a message!'
            />
          </View>
          <View style={styles.pickerWrapper}>
            <Text>Please Select A Media Type To Post</Text>
            <View style={styles.smallerPickWrapper}>
              <Picker
              onValueChange={(item) => this.setState({ media: item })}
              selectedValue={this.state.media}>
              <Picker.Item label='Picture' value='Picture' />
              <Picker.Item label='Video' value='Video' />
              <Picker.Item label='Audio' value='Audio' />
              </Picker>
            </View>
          </View>
          <View style={styles.selectedImageWrap}>
          {
            (this.state.media === 'Picture') ?
            <View style={styles.imageWrapper}>
              {!image && <View style={styles.imageButtonWrapper}><Button
              title="Add from Photos"
              color='black'
              onPress={this.pickImage}
              /><Button
              title="Take a Picture"
              color='black'
              onPress={this.snap}
              /></View>}
              {image &&
              <Image source={{ uri: image }} style={styles.image} />}
              {this.state.image && <Button
                title="Remove Image"
                color='black'
                onPress={() => this.setState({ image: null })}
                />}
              {cameraPic !== 'none' && <Button
                title="Remove Image"
                color='black'
                onPress={this.handleRemoveImageTwo}
                />}
            </View> : ''
          }
          {
            (this.state.media === 'Video') ?
            <View style={styles.videoWrapper}>
              {!video && <View style={styles.imageButtonWrapper}><Button
              title="Add from Photos"
              color='black'
              onPress={this.pickVideo}
              /><Button
              title="Take a Video"
              color='black'
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
              />}
              {this.state.video && <Button
                title="Remove Video"
                color='black'
                onPress={() => this.setState({ video: null })}
                />}
              {newVideo !== 'none' && <Button
                title="Remove Video"
                color='black'
                onPress={this.handleRemoveVideo}
                />}
            </View> : ''
          }
          </View>
          {
            (this.state.media === 'Picture' && image) ? <Button title="Submit Post!" color='black' onPress={this.submitImagePost}/> : ''
          }
          {
            (this.state.media === 'Video' && video) ? <Button title="Submit Post!" color='black' onPress={this.submitVideoPost}/> : ''
          }
        </View>
      );
    }
}

mapDispatch = (dispatch) => {
  return {
    addNewPostMethod: (info) => dispatch(addNewPostThunk(info))
  }
}

export default connect (null, mapDispatch)(NewPost)

const styles = StyleSheet.create({
  ViewWrap: {
    flex: 1,
    backgroundColor: '#0F7BAA',
  },
  image: {
    width: 200,
    height: 200,
  },
  titleText: {

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
    borderColor: 'black',
    backgroundColor: 'white',
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
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1
  },
});
