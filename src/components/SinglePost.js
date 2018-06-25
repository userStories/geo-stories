import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, MapView, View, Button, Image } from 'react-native';
import { Video } from 'expo'
import { getSinglePostThunk } from '../store'


class SinglePost extends Component {

    componentDidMount(){
        const id = this.props.navigation.getParam('id', 'no input')
        console.log('id in componentDidMount: ', id)
        this.props.singlePostMaker(id)
    }
    render(){
        const imageExt = ['jpeg', 'jpg', 'png', 'gif']
        const videoExt = ['mp4', 'mp3', 'avi', 'flv', 'mov', 'wmv'];
        console.log('this.props.singlePost.mediaLink: ', this.props.singlePost.mediaLink)
        return (
            this.props.singlePost.mediaLink ?
            <View style={styles.OuterViewWrap}>
                <Text>{this.props.singlePost.title}</Text>
                {videoExt.indexOf(this.props.singlePost.mediaLink.slice(-3)) !== -1 ? 
                <Video 
                source={{uri: this.props.singlePost.mediaLink}} 
                rate={1.0}
                volume={1.0}
                muted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={styles.imageWrap} 
                />: 
                <Image style={styles.imageWrap}source={{uri: this.props.singlePost.mediaLink}} /> 
                }
                <Text>{this.props.singlePost.text}</Text>
            </View>:
            <View style={styles.OuterViewWrap}>
                <Text>{this.props.singlePost.title}</Text>
                <Text>{this.props.singlePost.text}</Text>
            </View>

        )
    }
}


const styles = StyleSheet.create({
  OuterViewWrap: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageWrap: {
    width: 350,
    height: 300,
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
    singlePostMaker: (postId) => dispatch(getSinglePostThunk(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost)

