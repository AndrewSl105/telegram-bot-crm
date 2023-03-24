import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { showNotification } from './notistack'
import { DEFAULT, ERROR, SUCCESS } from '../../constants'
import { USER_CREATED, USER_LOGGED_IN, USER_LOGGED_OUT } from '../../constants/user'
import { getKanbanBoardsListAction, kanbanBoardSlice } from './kanban'
import { getToken, getUserId } from '../../utils'

export interface UserData {
  userName: string
  passCodes: string[]
  role: string
  _id: string
}

export interface UserState {
  loading: boolean
  logIn: boolean | null
  error: string
  profile: {
    _Id: string
    passCodes: string[]
    userName: string
  }
}

const initialState: UserState = {
  loading: false,
  logIn: null,
  error: '',
  profile: {
    _Id: '',
    passCodes: [],
    userName: ''
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUpSuccess (state, action) {
      localStorage.setItem('userData', JSON.stringify(action.payload))
      state.logIn = true
    },
    logInSuccess (state, action) {
      state.logIn = true
      localStorage.setItem('userData', JSON.stringify(action.payload))
    },
    logOut (state) {
      localStorage.clear()
      state.logIn = false
    },
    addPassCodeSuccess (state, action) {
      const passCode = action.payload
      console.log(passCode)
    },
    getProfile (state, action) {
      state.profile = action.payload.userProfile
    },
    getError (state, action) {
      state.error = action.payload
    }
  }
})

export function userSignUpAction (userData: {
  userName: string
  email: string
  password: string
}) {
  return async (dispatch: any) => {
    let response
    try {
      response = await axios.post('http://localhost:5000/api/user/sign-up', {
        userData
      })
      dispatch(userSlice.actions.signUpSuccess(response.data))
      dispatch(showNotification({ text: USER_CREATED, variant: SUCCESS }))
    } catch (error) {
      dispatch(userSlice.actions.getError(error))
      dispatch(showNotification({ text: error, variant: ERROR }))
    }
  }
}

export function userLogInAction (userData: { email: string, password: string }) {
  return async (dispatch: any) => {
    let response
    try {
      response = await axios.post('http://localhost:5000/api/user/log-in', {
        userData
      })
      dispatch(userSlice.actions.logInSuccess(response.data))
      dispatch(showNotification({ text: USER_LOGGED_IN, variant: SUCCESS }))
    } catch (error) {
      dispatch(userSlice.actions.getError(error))
      dispatch(showNotification({ text: error, variant: ERROR }))
    }
  }
}

export function userLogOutAction () {
  return async (dispatch: any) => {
    dispatch(userSlice.actions.logOut())
    dispatch(showNotification({ text: USER_LOGGED_OUT, variant: DEFAULT }))
  }
}

export function addPassCodeAction (passCode: string, _id: string | null) {
  return async (dispatch: any) => {
    let response
    try {
      response = await axios.post('http://localhost:5000/api/user/add-passcode', {
        passCode,
        _id
      })
      dispatch(userSlice.actions.addPassCodeSuccess(response.data))
      dispatch(getKanbanBoardsListAction())
    } catch (error) {
      dispatch(userSlice.actions.getError(error))
      dispatch(showNotification({ text: error, variant: ERROR }))
    }
  }
}

export function getProfileAction (_id: string) {
  return async (dispatch: any) => {
    let response
    try {
      response = await axios.get('http://localhost:5000/api/user/profile', {
        params: {
          _id
        }
      })
      dispatch(userSlice.actions.getProfile(response.data))
    } catch (error) {
      dispatch(userSlice.actions.getError(error))
      dispatch(showNotification({ text: error, variant: ERROR }))
    }
  }
}

export function getMyTeamAction (_id: string) {
  return async (dispatch: any) => {
    let response
    try {
      response = await axios.get('http://localhost:5000/api/user/profile', {
        params: {
          _id
        }
      })
      dispatch(userSlice.actions.getProfile(response.data))
    } catch (error) {
      dispatch(userSlice.actions.getError(error))
      dispatch(showNotification({ text: error, variant: ERROR }))
    }
  }
}

export default userSlice.reducer
