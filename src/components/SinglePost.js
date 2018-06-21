import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, MapView, View, Button, Image } from 'react-native';
import {Video} from 'expo'
import {getSinglePostThunk} from '../store'


class SinglePost extends Component {

    componentDidMount(){
        const id = this.props.navigation.getParam('id', 'no input')
        console.log('id in componentDidMount: ', id)
        this.props.singlePostMaker(id)
    }
    render(){
        console.log('this.props.singlePost.mediaLink.length: ', this.props.singlePost.mediaLink)
        return (
            <View style={styles.OuterViewWrap}>
                <Text>Title</Text>
            {this.props.singlePost.mediaLink ?
                <Video 
                source={{uri: this.props.singlePost.mediaLink}} 
                rate={1.0}
                volume={1.0}
                muted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={styles.imageWrap} 
                />: null}
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
        width: 150,
        height: 100,
    }
})
const mapStateToProps = state =>{
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

