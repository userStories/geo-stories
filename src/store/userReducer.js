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

getSingleUser = user =>{
  console.log('user in action creator: ', user)
  return {
    type: DISPLAY_SINGLE_USER,
    user
  }
}

addFriend = newUser =>{
  return {
    type: ADD_FRIEND,
    newUser
  }
}

loggedInUser = user => {
  return {
    type: LOGGED_IN_USER,
    user
  }
}

removeFriend = user => {
  return {
    type: REMOVE_FRIEND,
    user
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
      return {...state, singleUser: action.user}
    case ADD_FRIEND:
    console.log('action.newUser in ADD_FRIEND: ', action.newUser)
      return {...state, loggedInUser: {
        ...state.loggedInUser, Friend: action.newUser.Friend
      }}
    case LOGGED_IN_USER: 
      return {...state, loggedInUser: action.user}
    case REMOVE_FRIEND:
    return {...state, loggedInUser: {
      ...state.loggedInUser, Friend: action.user.Friend
    }}
    default:
      return state
  }
}
