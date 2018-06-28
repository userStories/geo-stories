import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Animated, StyleSheet, Text, MapView, View, Image, FlatList, ScrollView, TextInput,  TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { Video } from 'expo'
import { getSinglePostThunk, postComment, getAllUsersThunk} from '../store'
import {Button} from 'react-native-elements'
import {ListItem} from 'native-base'


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
    console.log('this.props.singpostId', this.props.singlePost.id)
    this.props.addComment(this.state.comment, this.props.singlePost.id)
    this.setState({comment: ""})
  }

  changeDescription = () => {
    let change = this.state.descriptionToggle *= -1
    this.setState({
      descriptionToggle: change
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <Text onPress={this.changeDescription} style={styles.descriptionTitle}>Description</Text>
              <View style={{ backgroundColor: 'white', marginRight: '5%', marginLeft: '5%', marginBottom: '2.5%' }}>
                {this.state.descriptionToggle === 1 ? <Text multiline={true} style={styles.contentWrap}>{this.props.singlePost.text}</Text>:null}
              </View>
            </View>
            <Text style={styles.commentTitle}>Comments</Text>
            <View
            style={{marginBottom: 10}}>
              <TextInput
                multiline={true}
                onChangeText={this.handleChange}
                value={this.state.comment}
                placeholderTextColor='black'
                placeholder='Write a comment!'
              />
            </View>
            <View>
              {!!this.state.comment.length? <Button 
              title="Submit Comment" 
              style={styles.commentButton}
              onPress={this.handleSubmit}/>: null}
            </View>
            <Animated.ScrollView>
            {this.props.singlePost.comments
              .sort((a,b) => {
                return ( (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0) );
              })
              .map((comment, index) => {
                  return (
                    <View style={{backgroundColor: 'white'}}>
                    <ListItem style={{width: '100%'}}>
                    {this.props.allUsers.find(user => user.id === comment.userId) &&
                    <Text>{this.props.allUsers.find(user => user.id === comment.userId).fullName}</Text>
                    }
                    <Text style={styles.comments}>{comment.content}</Text> 
                    </ListItem>
                    </View>
                  )
            })}</Animated.ScrollView>
            }
          </View> :
          <View style={styles.OuterViewWrap}>
            <Text>{this.props.singlePost.title}</Text>
            <Text>{this.props.singlePost.text}</Text>
          </View>}
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
    width: '90%',
    height: "40%",
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
  comments: {
    marginBottom: "2%",
    paddingTop: "2%",
    paddingLeft: '5%',
    paddingRight: "5%"
    // textAlign: 'left',
    // alignSelf: 'stretch',
    // marginRight: '5%',
    // marginLeft: '5%'
  },
  commentButton: {
    backgroundColor: 'red',
    marginBottom: '5%'
  }
})
const mapStateToProps = state => {
  console.log('state in mapState: ', state)
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

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost)

