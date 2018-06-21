import React, {Component} from "react";
import { Button, Image, Dimensions, StyleSheet, Text, View } from "react-native";
import { MapView } from "expo";

export default class MyMap extends Component{
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
    return (
      <View style={styles.container}>
        <MapView
          initialRegion = {this.state.focusedLocation}
          region = {this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
        />
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


