import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, MapView, View, Button, Image, Dimensions, ScrollView } from 'react-native';
import axios from 'axios'
import { getAllUserPostsThunk } from '../store';

const { height } = Dimensions.get('window')

// console.log(Dimensions.get('window'))

class UserProfile extends Component {

  componentDidMount = async () => {
    const id = this.props.navigation.state.params.id
    const posts = await this.props.viewAllUserPosts(id)
  } 

  render () { 
    const posts = this.props.allPosts
    console.log(posts)
    const user = this.props.thisUser
    console.log(user)
    return (
      <View>
        <View
          style={{flexDirection: 'column', width: 125, justifyContent: 'center'}}>
          <Image
            source={{ uri: user.profileImg }}
            style={{ width: 125, height: 125, borderRadius: 62.5, margin: 4, borderWidth: 1.5, borderColor: 'rgb(117, 138, 175)' }} />
            <View>
              <Text
                style={{fontFamily: 'Cochin-Bold', textAlign: 'center'}}
              >{user.firstName + ' ' + user.lastName}</Text>
              <Text
                style={{fontFamily: 'Cochin', textAlign: 'center'}}>
              {user.tagline}
              </Text>
            </View>
        </View>
        <ScrollView
          vertical
          pagingEnabled >
          <View
            style={{
              height: height + 338,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly'
            }}>
            {
              posts.map(post =>
                <View
                  style={{marginBottom: 4, marginTop: 4}}>
                  <Image key={post.id}
                    source={{ uri: post.mediaLink }}
                    style={{ width: 113, height: 113 }}
                  />
                </View>
              )
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    allPosts: state.postReducer.allPosts,
    thisUser: state.authReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    viewAllUserPosts: (id) => dispatch(getAllUserPostsThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
