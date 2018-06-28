import axios from 'axios'
import { ImageManipulator } from 'expo'
// import 'whatwg-fetch'
// import RNFetchBlob from 'rn-fetch-blob'

const ADD_NEW_POST = 'ADD_NEW_POST'
const HOST_IP_ADDRESS='172.17.20.201'

const addNewPost = (newPost) => {
  return {
    type: ADD_NEW_POST,
    newPost
  }
}


export const addNewPostThunk = (info) => {
  return async (dispatch) => {
    try {
<<<<<<< HEAD
      const formData = new FormData()
      const uriParts = info.uri.split('.')
      let fileType = uriParts[uriParts.length - 1]
      const fetcher = null
=======
      
      let newObj = await Expo.ImageManipulator.manipulate(info.uri, null, { base64: true })
      // let formData = new FormData()
      console.log('newobj', newObj)
      console.log('info object', info)
      // console.log('specific uri', info.uri)
      // formData.append('file', newObj)



      // const rawResponse = await fetch('http://172.17.20.159:8080/api/posts/', {
      const rawResponse = await fetch(`http://${HOST_IP_ADDRESS}:8080/api/posts/`, {
        method: 'POST',
        headers: {
          'X-AYLIEN-TextAPI-Application-ID': '6aca562c',
          'X-AYLIEN-TextAPI-Application-Key': '4cc1a266da1f4cc14396b900072e9a1d',
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify(newObj)
      })


>>>>>>> 0d80007d1f5bca2573c5791edc410e5c8674904d

      if (fileType === 'jpg') {
        fileType = 'image/jpg'

      } else if (fileType === 'mov') {
        fileType = 'video/quicktime'
      }
      if (fileType === 'image/jpg') {
        formData.append('mediaPost', {
          uri: info.uri,
          // doesnt work as file
          name: `${info.uri}`,
          type: fileType,
        })
        let options = {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        }
        const url = 'http://172.17.20.5:8080/api/posts/media'
        fetcher = await fetch(url, options)
      } else {
        formData.append('mediaPost', {
          uri: info.uri,
          name: `${info.uri}`,
          type: fileType,
        })
        let options = {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        }
        const url = 'http://172.17.20.5:8080/api/posts/media'
        fetcher = await fetch(url, options)
      }
      const response = await fetcher.json()
      let mediaUrl = response.mediaUrl

    } catch (err) {
      console.error('error in thunk', err.message)
    }
  }
}

const initialState = {
  newPost: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_POST:
      return {...state, newPost: action.newPost}
    default:
      return state
  }
}
