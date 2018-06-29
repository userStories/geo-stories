import axios from 'axios'
// import { API_URL } from '../../IP_ADDRESS'
const IP = '172.17.20.35'

const GET_SINGLE_POST = 'GET_SINGLE_POST'
const GET_ALL_POSTS = 'GET_ALL_POSTS'
const GET_POST_ID = 'GET_POST_ID'
const GET_ALL_USER_POSTS = 'GET_ALL_USER_POSTS'
const ADD_COMMENT = 'ADD_COMMENT'

const HOST_IP_ADDRESS = 'localhost'

const getSinglePost = post => {
  return {
    type: GET_SINGLE_POST,
    post
  }
}

const getAllUserPosts = userPosts => {
  return {
    type: GET_ALL_USER_POSTS,
    userPosts
  }
}

const getAllPosts = posts => {
  return {
    type: GET_ALL_POSTS,
    posts
  }
}

const getPostId = postId => {
  return {
    type: GET_POST_ID,
    postId
  }
}

const addComment = comment => {
  return {
    type: ADD_COMMENT,
    comment
  }
}


const initialState = {
  singlePost: {},
  allPosts: [],
  postId: null
}

export const getSinglePostThunk = postId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`http://${IP}:8080/api/posts/${postId}`)
      console.log('data in thunk: ', data)
      dispatch(getSinglePost(data))
    } catch (err) {
      console.error(err)
    }
  }
}


export const popupThunk = postId => {
  return async dispatch => {
    try {
      dispatch(getPostId(postId))
    } catch (err) {
      console.error(err)
    }
  }
}


export const getAllPostsThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://${IP}:8080/api/posts`)
      console.log('data in all posts thunk: ', data)
      dispatch(getAllPosts(data))
    } catch (err) {
      console.error(err);
    }
  }
}


export const getAllUserPostsThunk = userId => {
  return async (dispatch) => {
    try {
      console.log('here22', userId)
      const { data } = await axios.get(`http://${IP}:8080/api/posts/user/${userId}`)
      console.log('data from getalluserpost thunk', data)
      dispatch(getAllUserPosts(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const postComment = (comment, postId) => {
  return async dispatch => {
    const { data } = await axios.post(`http://${IP}:8080/api/comments`, { comment, postId })
    console.log('data in postCommentthunk: ', data)
    dispatch(addComment(data))
  }
}

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_POST:
      return { ...state, singlePost: action.post }
    case GET_ALL_POSTS:
      return { ...state, allPosts: action.posts }
    case GET_POST_ID:
      return { ...state, postId: action.postId }
    case GET_ALL_USER_POSTS:
      return { ...state, allPosts: action.userPosts }
    case ADD_COMMENT:
      let newCommentArr = state.singlePost.comments.concat(action.comment.newComment)
      console.log('newCommentArr: ', newCommentArr)
      return {
        ...state,
        singlePost: {
          ...state.singlePost, comments: newCommentArr
        }
      }
    default:
      return state
  }
}
