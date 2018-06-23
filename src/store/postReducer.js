import fetch from 'fetch';
import axios from 'axios';

const GET_SINGLE_POST = "GET_SINGLE_POST"
const GET_ALL_POSTS = "GET_ALL_POSTS"

const getSinglePost = post => {
    return {
        type: GET_SINGLE_POST,
        post
    }
}

const getAllPosts = posts => {
    return {
        type:GET_ALL_POSTS,
        posts 
    }
}


const initialState = {
    singlePost: {},
    allPosts: []
}

export const getSinglePostThunk = postId =>{
    return async dispatch => {
        try{
            console.log('postId in thunk: ', postId)
            const {data} = await axios.get(`http://localhost:8080/api/posts/${postId}`)
            // const {data} = await axios.get(`http://172.17.20.159:8080/api/posts/${postId}`)
            console.log('data in thunk: ', data)
            dispatch(getSinglePost(data))
        } catch(err){
            console.error(err)
        }
    }
}

export const getAllPostsThunk = () => {
    return async (dispatch) =>{
        try{
            const {data} = await axios.get('http://localhost:8080/api/posts')
            // const {data} = await axios.get(`http://172.17.20.159:8080/api/posts`)
            console.log('data in all posts thunk: ', data)
            dispatch(getAllPosts(data))
        } catch(err){
            console.error(err);
        }
    }
    
}

export const postReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_SINGLE_POST:
            return {...state, singlePost: action.post}
        case GET_ALL_POSTS:
            return {...state, allPosts: action.posts}
        default:
            return state
    }
}