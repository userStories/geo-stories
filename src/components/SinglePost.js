import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet, Text, MapView, View, Button, Image, FlatList, ScrollView, TextInput } from 'react-native';
import { Video } from 'expo'
import { getSinglePostThunk, postComment } from '../store'


class SinglePost extends Component {

  constructor(){
    super();
    this.state = {
      comment: "",
    };
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id', 'no input')
    console.log('id in componentDidMount: ', id)
    this.props.singlePostMaker(id)
  }

  handleChange = (event) => {
    console.log('event in handleChange: ', event)
    this.setState({comment: event})
  }

  handleSubmit = () => {
    this.props.addComment(this.state.comment, this.props.singlePost.id)
    // this.props.navigation.navigate('SinglePost', {id: this.props.singlePost.id})
  }

  render() {
    console.log('this.state.comment: ', this.state.comment)
    const imageExt = ['jpeg', 'jpg', 'png', 'gif']
    const videoExt = ['mp4', 'mp3', 'avi', 'flv', 'mov', 'wmv'];
    return (
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'space-between',
        }}
      >
        {this.props.singlePost.mediaLink ?
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
              <View style={{ backgroundColor: 'white', marginRight: '5%', marginLeft: '5%', marginBottom: '2.5%' }}>
                <Text multiline={true} style={styles.contentWrap}>{this.props.singlePost.text}</Text>
              </View>
            </View>
            <Text style={styles.commentTitle}>Comments</Text>
            <View style={{flexDirection: 'column',marginBottom: 10}}>
              <Text>Add Comment:</Text>
              <TextInput
                multiline={true}
                onChangeText={this.handleChange}
                value={this.state.comment}
                placeholder='Write a comment!'
              />
              <Button title="Submit Comment" onPress={this.handleSubmit}/>
            </View>
            {this.props.singlePost.comments
              .sort((a,b) => {
                return ( (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0) );
              })
              .map(comment => {
              return (
                <View style={{ width: "90%", backgroundColor: 'white' }}>
                  <Text style={styles.comments}>{comment.content}</Text>
                </View>
              )
            }
            )}
          </View> :
          <View style={styles.OuterViewWrap}>
            <Text>{this.props.singlePost.title}</Text>
            <Text>{this.props.singlePost.text}</Text>
          </View>}</ScrollView>

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
  comments: {
    marginBottom: "2%",
    paddingTop: "2%",
    paddingLeft: '5%',
    paddingRight: "5%"
    // textAlign: 'left',
    // alignSelf: 'stretch',
    // marginRight: '5%',
    // marginLeft: '5%'
  }
})
const mapStateToProps = state => {
  console.log('state in mapState: ', state)
  return {
    singlePost: state.postReducer.singlePost
  }
}

const mapDispatchToProps = dispatch => {
  return {
    singlePostMaker: (postId) => dispatch(getSinglePostThunk(postId)),
    addComment: (comment, postId) => dispatch(postComment(comment, postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost)

