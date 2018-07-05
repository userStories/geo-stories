import axios from 'axios'
import { API_URL } from '../../IP_ADDRESS'
// const IP = '172.17.20.35'


const DISPLAY_ALL_USERS = 'DISPLAY_ALL_USERS'
const DISPLAY_SINGLE_USER = 'DISPLAY_SINGLE_USER'
const ADD_FRIEND = 'ADD_FRIEND'
const LOGGED_IN_USER = "LOGGED_IN_USER"
const REMOVE_FRIEND = "REMOVE_FRIEND"

const getAllUsers = users => {
  return {
    type: DISPLAY_ALL_USERS,
    users
  }
}

getSingleUser = newUser =>{
  console.log('user in action creator: ', newUser)
  return {
    type: DISPLAY_SINGLE_USER,
    newUser
  }
}

addFriend = newUser =>{
  return {
    type: ADD_FRIEND,
    newUser
  }
}

loggedInUser = newUser => {
  return {
    type: LOGGED_IN_USER,
    newUser
  }
}

removeFriend = newUser => {
  return {
    type: REMOVE_FRIEND,
    newUser
  }
}

export const getAllUsersThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`http://${API_URL}:8080/api/users`)
      dispatch(getAllUsers(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getSingleUserThunk = (id) => {
  return async dispatch =>{
    try {
      const {data} = await axios.get(`http://${API_URL}:8080/api/users/${id}`)
      console.log('data in getsingleUserThunk: ', data)
      dispatch(getSingleUser(data))
    } catch (err){
      console.error(err)
    }
  }
}

export const addFriendThunk = (userId, profileId) => {
  return async dispatch =>{
    try{
      await axios.put(`http://${API_URL}:8080/api/users/${userId}`, {friendId: profileId, friend: 'add'})
      const {data} = await axios.get(`http://${API_URL}:8080/api/users/${userId}`)
      dispatch(addFriend(data))
    } catch(err){
      console.error(err)
    }
  }
}

export const loggedInUserThunk = id => {
  return async dispatch =>{
    try {
      const {data} = await axios.get(`http://${API_URL}:8080/api/users/${id}`)
      dispatch(loggedInUser(data))
    } catch (err){
      console.error(err)
    }
  }
}

export const removeFriendThunk = (userId, profileId) => {
  return async dispatch =>{
    console.log('userId in removeFriendThunk: ', userId)
    console.log('profileId in removeFriendThunk: ', profileId)
    await axios.put(`http://${API_URL}:8080/api/users/${userId}`, {friendId: profileId, friend: 'remove'})
    const {data} = await axios.get(`http://${API_URL}:8080/api/users/${userId}`)
    console.log('data in removeFriendThunk: ', data)
    dispatch(removeFriend(data))
  }
}

const initialState = {
  allUsers: [],
  singleUser: {},
  loggedInUser: {}
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_ALL_USERS:
      return { ...state, allUsers: action.users }
    case DISPLAY_SINGLE_USER:
      return {...state, singleUser: action.newUser}
    case ADD_FRIEND:
    // console.log('action.newUser.user.Friend in ADD_FRIEND: ', action.newUser.user.Friend)
      return {...state, loggedInUser: {
          ...state.loggedInUser, user: {
            ...state.loggedInUser.user, Friend: action.newUser.user.Friend
          }
        }
      }
    case LOGGED_IN_USER:
      return {...state, loggedInUser: action.newUser}
    case REMOVE_FRIEND:
    return {...state, loggedInUser: {
      ...state.loggedInUser, user: {
        ...state.loggedInUser.user, Friend: action.newUser.user.Friend
      }
    }
  }
    default:
      return state
  }
}
