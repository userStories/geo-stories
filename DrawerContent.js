import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './DrawerContent.style';
import PropTypes from 'prop-types';

class DrawerContent extends Component {

  navigateToScreen = (route) => () => {
    const navigate = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigate);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Button
            raised
            icon={{ name: 'umbrella', type: 'font-awesome', size: 20 }}
            title='MyMap'
            buttonStyle={styles.button}
            onPress={this.navigateToScreen('MyMap')} />
          <Button
            raised
            icon={{ name: 'user-circle', type: 'font-awesome', size: 20 }}
            title='My Profile'
            buttonStyle={styles.button}
            onPress={this.navigateToScreen('UserProfileAuth')} />
          <Button
            raised
            icon={{ name: 'user-circle', type: 'font-awesome', size: 20 }}
            title='New Post'
            buttonStyle={styles.button}
            onPress={this.navigateToScreen('NewPost')} />
          <Button
            raised
            icon={{ name: 'umbrella', type: 'font-awesome', size: 20 }}
            title='Logout'
            buttonStyle={styles.button}
            onPress={this.navigateToScreen('Logout')} />
        
        </ScrollView>
      </View>
    );
  }
}

DrawerContent.propTypes = {
  navigation: PropTypes.object
};

export default DrawerContent;