import axios from 'axios'
import { ImageManipulator } from 'expo'
// import 'whatwg-fetch'
// import RNFetchBlob from 'rn-fetch-blob'




const ADD_NEW_POST = 'ADD_NEW_POST'

const addNewPost = (newPost) => {
  return {
    type: ADD_NEW_POST,
    newPost
  }
}


export const addNewPostThunk = (info) => {
  return async (dispatch) => {

    // "change method to post"
    // "change header to form data???"
    // "deploy api to heroku and asssssdjust url"
    try {

      // MEDIA POST PART
      const formData = new FormData()
      const uriParts = info.uri.split('.')
      let fileType = uriParts[uriParts.length - 1]

      console.log('info.uri', info.uri)
      console.log('filetype', fileType)
      if (fileType === 'jpg') {
        fileType = 'image/jpg'
        console.log('entered here')
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
        console.log('url', url)
        console.log('options', options)
        await fetch(url, options)
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
        console.log('url', url)
        console.log('options', options)
        await fetch(url, options)
        
      }

      // if (fileType = 'video/quicktime') {

      //   const myBlob = new Blob([info.uri], { type: fileType })

      //   formData.append('mediaPost', {
      //     file: Blob,
      //     name: `${info.uri}`,
      //     type: fileType,
      //   })
      //   let options = {
      //     method: 'POST',
      //     body: formData,
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'multipart/form-data',
      //     }
      //   }
      //   const url = 'http://172.17.20.5:8080/api/posts/media'
      //   const mediaPost = await fetch(url, options)
      // }



        
      


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
