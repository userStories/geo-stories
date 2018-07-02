import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Animated, StyleSheet, Text, MapView, View, Image, FlatList, ScrollView, TextInput,  TouchableWithoutFeedback, Keyboard, TouchableHighlight  } from 'react-native';
import { Video } from 'expo'
import { getSinglePostThunk, postComment, getAllUsersThunk} from '../store'
import {Button} from 'react-native-elements'
import {ListItem} from 'native-base'
import CommentSection from './Comments'


class SinglePost extends Component {

  constructor(){
    super();
    this.state = {
      comment: "",
      descriptionToggle: -1,
      commentToggle: -1
    };
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id', 'no input')
    this.props.singlePostMaker(id)
    this.props.displayUsers()
  }

  handleChange = (event) => {
    this.setState({comment: event})
  }

  handleSubmit = () => {
    this.props.addComment(this.state.comment, this.props.singlePost.id, this.props.loggedInUser.id)
    this.setState({comment: ""})
  }

  changeDescription = () => {
    let change = this.state.descriptionToggle *= -1
    this.setState({
      descriptionToggle: change
    })
  }
  changeComment = () => {
    let change2 = this.state.commentToggle *= -1
    this.setState({
      commentoggle: change2
    })
  }

  commentNavigation = (profileId) => {
    this.props.navigation.navigate('UserProfile', {id: profileId})
  }

  render() {
    const imageExt = ['jpeg', 'jpg', 'png', 'gif']
    const videoExt = ['mp4', 'mp3', 'avi', 'flv', 'mov', 'wmv'];
    return (
      // <ScrollView
      // keyboardShouldPersistTaps={true}
      // keyboardDismissMode="on-drag"
      //   contentContainerStyle={{
      //     justifyContent: 'space-between',
      //   }}
      // >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.ScrollView>
        {this.props.singlePost.mediaLink && !!this.props.allUsers.length ?
          <View style={styles.OuterViewWrap}>
            <Text style={styles.title}>{this.props.singlePost.title}</Text>
            {videoExt.indexOf(this.props.singlePost.mediaLink.slice(-3)) !== -1 ?
              <Video
                source={{ uri: this.props.singlePost.mediaLink }}
                rate={1.0}
                volume={1.0}
                muted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={styles.imageWrap}
              />
              : <Image style={styles.imageWrap} source={{ uri: this.props.singlePost.mediaLink }} />
            }
            <View>
              {
                this.props.allUsers.find(user => user.id === this.props.singlePost.userId) &&
                <TouchableHighlight>
                  <Text onPress={() => this.props.navigation.navigate('UserProfile', {id: this.props.singlePost.userId})}>{this.props.allUsers.find(user => user.id === this.props.singlePost.userId).fullName}</Text>
                </TouchableHighlight>
              }
              <Text onPress={this.changeDescription} style={styles.descriptionTitle}>Description</Text>
              <View style={{ backgroundColor: 'white', marginRight: '5%', marginLeft: '5%', marginBottom: '2.5%' }}>
                {this.state.descriptionToggle === 1 ? <Text multiline={true} style={styles.contentWrap}>{this.props.singlePost.text}</Text>:null}
              </View>
            </View>
            <Text style={styles.commentTitle} onPress={this.changeComment}>Comments</Text>
            {
              this.state.commentToggle === 1 ? 
              <CommentSection comments={this.props.singlePost.comments} users={this.props.allUsers} commentNavigation={this.commentNavigation} stateComment={this.state.comment} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>: null
            }
            }
          </View> :
          <View style={styles.OuterViewWrap}>
            <Text>{this.props.singlePost.title}</Text>
            <Text>{this.props.singlePost.text}</Text>
          </View>}
          </Animated.ScrollView>
          </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  OuterViewWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  imageWrap: {
    width: 350,
    height: 300,
    marginBottom: "2.5%"
  },
  contentWrap: {
    fontSize: 15,
    marginRight: '5%',
    marginLeft: '5%',
    alignItems: 'center',
    marginTop: "2.5%",
    marginBottom: "5%",
    // paddingRight: '5%',
    // paddingLeft: '5%'

  },
  title: {
    fontWeight: "bold",
    marginTop: "5%",
    marginBottom: "5%"
  },
  descriptionTitle: {
    alignSelf: "center",
    fontWeight: "bold",
    marginBottom: "2.5%"
  },
  commentTitle: {
    fontWeight: "bold",
    marginBottom: "5%"
  },

})
const mapStateToProps = state => {
  return {
    singlePost: state.postReducer.singlePost,
    allUsers: state.userReducer.allUsers,
    loggedInUser: state.authReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    singlePostMaker: (postId) => dispatch(getSinglePostThunk(postId)),
    addComment: (comment, postId, userId) => dispatch(postComment(comment, postId, userId)),
    displayUsers: () => dispatch(getAllUsersThunk())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost);
