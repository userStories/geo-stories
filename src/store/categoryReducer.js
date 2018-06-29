import axios from 'axios'
import { API_URL } from '../../IP_ADDRESS'


const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
const CHANGE_FILTER_ID = 'CHANGE_FILTER_ID'
const HOST_IP_ADDRESS = 'localhost'

const getAllCategories = categories => {
  return {
    type: GET_ALL_CATEGORIES,
    categories
  }
}

const changeFilterId = filterId => {
  return {
    type: CHANGE_FILTER_ID,
    filterId
  }
}

export const getAllCategoriesThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`http://${API_URL}:8080/api/categories`)
      dispatch(getAllCategories(data))
    } catch (err) {
      console.error(err)
    }
  }
}


export const filterIdThunk = (filterId) => {
  return dispatch => {
    dispatch(changeFilterId(filterId))
  }
}

const initialState = {
  allCategories: [],
  filterId: 0
}

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return { ...state, allCategories: action.categories }
    case CHANGE_FILTER_ID:
      return { ...state, filterId: action.filterId }
    default:
      return state
  }
}



