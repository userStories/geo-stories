import fetch from 'fetch';
import axios from 'axios';

const GET_SINGLE_POST = "GET_SINGLE_POST"

const getSinglePost = post => {
    return {
        type: GET_SINGLE_POST,
        post
    }
}


const initialState = {
    singlePost: {}
}

export const getSinglePostThunk = postId =>{
    return async dispatch => {
        try{
            console.log('postId in thunk: ', postId)
            // const res = await fetch(`/localhost:8080/api/posts/${postId}`, {
            //     method: 'GET',
            //     headers: {
            //         'content-type': 'application/json'
            //     }
            // })
            // const data = await res.json()
            const {data} = await axios.get(`http://localhost:8080/api/posts/${postId}`)
            console.log('data in thunk: ', data)
            dispatch(getSinglePost(data))
        } catch(err){
            console.error(err)
        }
    }
}

export const postReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_SINGLE_POST:
            return {...state, singlePost: action.post}
        default:
            return state
    }
}