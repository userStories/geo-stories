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
        console.log('allPosts in ActivityLog: ', allPosts)
        console.log('loggedInUser in activityLog: ', loggedInUser)
        console.log('loggedInUserAuth in activityLog: ', loggedInUserAuth)
        return (
            <Container>
            <Content>
            {
                allPosts
                    .filter(post => loggedInUser.Friend.find(elem => post.userId === elem.id))
                    .map(post => {
                        return (
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text>{post.title}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                        ) 
                    })
            }    
            </Content>
          </Container>
        )
    }
}

const MapStateToProps = state =>{
    return {
        allPosts: state.postReducer.allPosts,
        loggedInUserAuth: state.authReducer,
        loggedInUser: state.userReducer.loggedInUser
    }
}

export default connect(MapStateToProps)(ActivityLog)

