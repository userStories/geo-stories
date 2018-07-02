import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Animated, StyleSheet, Text, MapView, View, Image, FlatList, ScrollView, TextInput,  TouchableWithoutFeedback, Keyboard, TouchableHighlight  } from 'react-native';
import { Video } from 'expo'
import { getSinglePostThunk, postComment, getAllUsersThunk} from '../store'
import {Button} from 'react-native-elements'
import {ListItem} from 'native-base'

export default class CommentSection extends Component {
    render(){
        const {comments, users, stateComment, handleChange, handleSubmit, loggedInUser, commentNavigation} = this.props
        return (
        <View style={styles.OuterView}>
            <View
            style={{marginBottom: 10}}>
              <TextInput
                multiline={true}
                onChangeText={handleChange}
                value={stateComment}
                placeholderTextColor='black'
                placeholder='Write a comment!'
              />
            </View>
            <View>
              {!!stateComment.length? <Button 
              title="Submit Comment" 
              style={styles.commentButton}
              onPress={handleSubmit}/>: null}
            </View>
            <View>
            {comments
              .sort((a,b) => {
                return ( (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0) );
              })
              .map((comment, index) => {
                  return (
                    <View style={{backgroundColor: 'white'}}>
                    <ListItem style={{width: '100%'}}>
                    {users.find(user => user.id === comment.userId) &&
                    <TouchableHighlight>
                        <Text>{users.find(user => user.id === comment.userId).fullName}</Text>
                    </TouchableHighlight>
                    }
                    <View style={styles.commentWrap}>
                        <Text style={styles.comments}>{comment.content}</Text> 
                    </View>
                    </ListItem>
                    </View>
                  )
            })}</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    OuterView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    userName: {
        paddingRight: 100
    },
    comments: {
        // marginBottom: "2%",
        // paddingTop: "2%",
        // paddingLeft: '5%',
        // paddingRight: "5%",
        // textAlign: 'left',
        // alignSelf: 'stretch',
        // marginRight: '5%',
        // marginLeft: '5%'
      },
      commentButton: {
        backgroundColor: 'red',
        marginBottom: '5%'
      },
})