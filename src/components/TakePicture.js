import React from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight, StyleSheet, CameraRoll, Image } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class TakePicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      photo: false
    };
  }

  // "bring this code back if we want to remove the header for camera"
  // static navigationOptions = { header: null };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }


  takePicture = async () => {

    if (this.camera) {
      const pic = await this.camera.takePictureAsync();
      this.props.navigation.navigate('NewPost', { cameraPic: pic })
    }
  };

  

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
          <Camera style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} ref={(cam) => { this.camera = cam }} type={this.state.type}>
                <TouchableOpacity style={styles.topTouch} onPress={this.takePicture}>
                <Image source={{ uri: 'https://cdn.pixabay.com/photo/2016/04/27/16/16/generic-button-1357003_960_720.png' }} style={styles.btnImage} />
                </TouchableOpacity>
              <TouchableOpacity
                style={styles.flipTouchable} 
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Button_Icon_Blue.svg/2000px-Button_Icon_Blue.svg.png' }} style={styles.flipButtonImage} />
                </TouchableOpacity>
          </Camera>
      );
    }
  }
}

const styles = StyleSheet.create({
  topTouch: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 475,
    marginBottom: 20
  },
  flipButtonImage: {
    alignSelf: 'center',
    width: 30,
    height: 30,
  },
  flipTouchable: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  btnImage: {
    alignSelf: 'center',
    width: 80,
    height: 80,
  },
})