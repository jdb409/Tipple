import axios from 'axios'
import { clearCart } from './barcart';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const POST_USER = 'POST_USER';
/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data)))
      .catch(err => console.log(err))


export const signUp = (email, password, history) => {
  return (dispatch) => {
    axios.post(`/auth/signup`, { email, password, history })
      .then(res => res.data)
      .then(user => {
        dispatch(getUser(user))
        dispatch(clearCart());
        history.push('/');
      }).catch(console.log)
  }
}

export const auth = (email, password, history) =>
  dispatch =>
    axios.post(`/auth/login`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))

      })
      .catch(error =>
        dispatch(getUser({ error })))

export const logout = (history) =>
  dispatch =>
    axios.post('/auth/logout')
      .then(res => {
        dispatch(removeUser())
        dispatch(clearCart());
        history.push('/')
      })
      .catch(console.log);

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}