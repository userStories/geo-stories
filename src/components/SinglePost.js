import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Animated, StyleSheet, Text, MapView, View, Image, FlatList, ScrollView, TextInput,  TouchableWithoutFeedback, Keyboard, TouchableOpacity  } from 'react-native';
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
    this.props.addComment(this.state.comment, this.props.singlePost.id)
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
      <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
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

                <Text style={styles.descriptionTitle}>Description</Text>
                <Text multiline={true} style={styles.descriptionText}>{this.props.singlePost.text}</Text>

            </View>
            {
              (this.state.commentToggle === -1) ? <TouchableOpacity onPress={this.changeComment}><View style={styles.commentButtons}><Text style={styles.commentText}>View Comments</Text></View></TouchableOpacity> :
              <TouchableOpacity onPress={this.changeComment}><View style={styles.commentButtons}><Text style={styles.commentText}>Hide Comments</Text></View></TouchableOpacity>
            }


            {
              // this.state.commentToggle === 1
              this.state.commentToggle === 1 ? 
              <CommentSection comments={this.props.singlePost.comments} users={this.props.allUsers} stateComment={this.state.comment} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>: null
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
    backgroundColor: '#4519aa',
    paddingBottom: 200
  },
  imageWrap: {
    width: 350,
    height: 300,
    marginBottom: "2.5%",
    borderRadius: 6
  },
  descriptionText: {
    fontSize: 15,
    marginRight: '5%',
    marginLeft: '5%',
    alignItems: 'center',
    marginTop: "2.5%",
    marginBottom: "5%",
    color: 'white'
    // paddingRight: '5%',
    // paddingLeft: '5%'

  },
  commentButtons: {
    borderColor: 'white',
    borderWidth: 3,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10
  },
  commentText: {
    fontWeight: "bold",
    color: 'white'
  },
  title: {
    fontWeight: "bold",
    marginTop: "5%",
    color: 'white',
    marginBottom: "5%"
  },
  descriptionTitle: {
    alignSelf: "center",
    fontWeight: "bold",
    marginBottom: "2.5%",
    color: 'white'
  },
  commentTitle: {
    marginTop: 40,
    fontWeight: "bold",
    marginBottom: "5%",
    color: 'white'
  },

})
const mapStateToProps = state => {
  return {
    singlePost: state.postReducer.singlePost,
    allUsers: state.userReducer.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    singlePostMaker: (postId) => dispatch(getSinglePostThunk(postId)),
    addComment: (comment, postId) => dispatch(postComment(comment, postId)),
    displayUsers: () => dispatch(getAllUsersThunk())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePost);
