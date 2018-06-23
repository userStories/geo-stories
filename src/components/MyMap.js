import React, { Component } from "react";
import { Button, Image, Dimensions, StyleSheet, Text, View, Linking, Overlay } from "react-native";
import { MapView } from "expo";
import { connect } from "react-redux"
import { getAllPostsThunk, getSinglePostThunk } from '../store'
import PopupDialog, {DialogTitle} from 'react-native-popup-dialog'


class MyMap extends Component {

  state = {
    focusedLocation: {
      latitude: 41.89557129,
      longitude: -87.6386050932,
      latitudeDelta: 0.00522,
      longitudeDelta:
        Dimensions.get('window').width /
        Dimensions.get('window').height * 0.00522

    }
  }

  componentDidMount() {
    this.props.viewAllPosts()
  }
  pickLocationHandler = (event) => {
    const coords = event.nativeEvent.coordinate;
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude,
        }
      }
    })
  }

  render() {
    console.log('this.props.allPosts in MyMap component: ', this.props.allPosts)
    let popupTitle;
    let popupText;
    let popupNavId;
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          region={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
        >

          {this.props.allPosts.map((marker, index) => {
            let newCoord = {
              latitude: marker.latitude,
              longitude: marker.longitude
            }
            return (
              <MapView.Marker
              key={index}
              coordinate={newCoord}
              // title={marker.title}
              // description={marker.text}
              // onPress={() => this.props.navigation.navigate('SinglePost', { id: marker.id })}
              onPress={() => {
                console.log('marker.id: ', marker.id)
                this.props.viewSinglePost(marker.id)
                this.popupDialog.show();
              }}
              >
              </MapView.Marker>

            );
          })}
        </MapView>
              <PopupDialog 
              width={0.7}
              height={0.07}
              overlayOpacity={0.6}
              haveTitleBar={true}
              ref={(popupDialog) => { this.popupDialog = popupDialog }}>
                <View style={styles.container}>
                  <Text style={styles.title}>{this.props.singlePost.title}</Text>
                  {/* <Text>{this.props.singlePost.text}</Text> */}
                  <Text style={styles.link} onPress={() => this.props.navigation.navigate('SinglePost', { id: this.props.singlePost.id })}>Post Link</Text>
                </View>
              </PopupDialog>
        <View style={styles.button}>
          <Button title="Locate Me" onPress={() => alert('Pick Location lat:' + this.state.focusedLocation.latitude + ' long:' + this.state.focusedLocation.longitude)} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "100%",
    height: 500
  },
  button: {
    margin: 8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  link: {
    color: 'black',
    fontSize: 16
  }
});


const mapStateToProps = state => {
  return {
    allPosts: state.postReducer.allPosts,
    singlePost: state.postReducer.singlePost
  }
}

const mapDispatchToProps = dispatch => {
  return {
    viewAllPosts: () => dispatch(getAllPostsThunk()),
    viewSinglePost: (postId) => dispatch(getSinglePostThunk(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMap)

