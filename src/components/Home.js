import React from 'react';
import { StyleSheet, ImageBackground, View, Button, Text } from 'react-native';


export default class Home extends React.Component {

  handlePress = () => {
    this.props.navigation.navigate('SinglePost', {id: 5})
  }

  handlePressUserProfile = () => {
    this.props.navigation.navigate('UserProfile', {id: 5})
  }

  render() {
    return (
      <View>
        <Text style={styles.titleText}>Home Component</Text>
        <Button onPress={this.handlePress} title="SinglePost" />
        <Button onPress={this.handlePressUserProfile} title="UserProfile" />
        <Button onPress={()=> this.props.navigation.navigate('MyMap')} title="Map" />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
