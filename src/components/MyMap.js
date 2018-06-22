import React, {Component} from "react";
import { Button, Image, Dimensions, StyleSheet, Text, View } from "react-native";
import { MapView } from "expo";

const tempMarkers = [
  {
    coordinate: {
      latitude: 41.89671271,
      longitude: -87.63702022,
    },
    title: 'Beer Fest',
    description: 'German beer festival'
  },
  {
    coordinate: {
      latitude: 41.89536942,
      longitude: -87.63687061,
    },
    title: 'Tomato fest',
    description: 'Little Italia tomato festival'
  },
  {
    coordinate: {
      latitude: 41.89470126,
      longitude: -87.63738955,
    },
    title: 'Cuban Cigar',
    description: 'Little Havana Cuban fest'
  },
  {
    coordinate: {
      latitude: 41.89470126,
      longitude: -87.63738955,
    },
    title: 'Bike Race',
    description: 'Bicycle racing'
  },
  {
    coordinate: {
      latitude: 41.89580093,
      longitude: -87.63959151,
    },
    title: 'Chicago Marathon',
    description: '45th Chicago marthon'
  },
]


export default class MyMap extends Component{
  state = {
    markers: tempMarkers,
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

  genAllMarkers = () => {
    let outMarkers = tempMarkers.map((marker, id) => {
      return (
        <MapView.Marker
        key={id}
        coordinate={marker.location}
        title={marker.title}
        description={marker.description}
        />
      )
    });
    return outMarkers;
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion = {this.state.focusedLocation}
          region = {this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
        >

          {this.state.markers.map((marker, index) => {
            return (
              <MapView.Marker
                key={index}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
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


