import axios from 'axios'
import { API_URL } from '../../IP_ADDRESS'
// const IP = '172.17.20.35'


const DISPLAY_ALL_USERS = 'DISPLAY_ALL_USERS'

const getAllUsers = users => {
  return {
    type: DISPLAY_ALL_USERS,
    users
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

const initialState = {
  allUsers: []
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_ALL_USERS:
      return { ...state, allUsers: action.users }
    default:
      return state
  }
}
