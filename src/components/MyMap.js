import React, {Component} from "react";
import { Button, Image, Dimensions, StyleSheet, Text, View, Linking } from "react-native";
import { MapView } from "expo";
import {connect} from "react-redux"
import {getAllPostsThunk} from '../store'
import PopupDialog from 'react-native-popup-dialog'


class MyMap extends Component{
  
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

  componentDidMount(){
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
    return (
      <View style={styles.container}>
        <MapView
          initialRegion = {this.state.focusedLocation}
          region = {this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
          >

          {this.props.allPosts.map((marker, index) => {
              let newCoord = {
                latitude: marker.latitude,
                longitude: marker.longitude
              }
              console.log('(marker id, coord): ', `(${marker.id}, (latitude: ${newCoord.latitude}, longitude: ${newCoord.longitude}`)

            return (
              <MapView.Marker
                key={index}
                coordinate={newCoord}
                // title={marker.title}
                // description={marker.text}
                onPress={() => this.props.navigation.navigate('SinglePost', {id: marker.id})}
              >
              </MapView.Marker>
          
            );
          })}
        </MapView>

        <View style={styles.button}>
          <Button title="Locate Me" onPress={() => alert('Pick Location lat:'+this.state.focusedLocation.latitude + ' long:' + this.state.focusedLocation.longitude)} />
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
  }
});


const mapStateToProps = state => {
  return {
    allPosts: state.postReducer.allPosts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    viewAllPosts: () => dispatch(getAllPostsThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMap)

