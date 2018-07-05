import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, MapView, View, Button, Image, Dimensions, ScrollView, TouchableHighlight } from 'react-native';
import { getAllUserPostsThunk, getSingleUserThunk, addFriendThunk, loggedInUserThunk, removeFriendThunk } from '../store';
import {Video} from 'expo'
import {Container, Content, Card, CardItem, Header, Body} from 'native-base' 

class ActivityLog extends Component {
    constructor(){
        super();
        this.state ={}
    }

    render(){
        const {allPosts, loggedInUser, loggedInUserAuth} = this.props
        return (
            <View style={{flex: 1, backgroundColor: '#eee', alignItems: 'center'}}>
            {
                allPosts
                    .filter(post => loggedInUser.user.Friend.find(elem => post.userId === elem.id))
                    .map(post => {
                        return (
                        <View style={styles.elemWrapper} key={post.id}>
                                    <Text >{post.user.fullName}</Text>
                                    <Text style={styles.elemText}>{post.title}</Text>
                        </View>
                        ) 
                    })
            }    

          </View>
        )
    }
}

const styles = StyleSheet.create({
    elemWrapper: {
        width: '90%',
        borderColor: 'white',
        borderWidth: 5,
        borderRadius: 6,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    elemText: {
        color: '#00a8ff',
        fontSize: 18,
        marginBottom: 14
    }
})

const MapStateToProps = state =>{
    return {
        allPosts: state.postReducer.allPosts,
        loggedInUserAuth: state.authReducer,
        loggedInUser: state.userReducer.loggedInUser
    }
}

export default connect(MapStateToProps)(ActivityLog)

