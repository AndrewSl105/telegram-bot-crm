import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { showNotification } from './notistack'
import { DEFAULT, SUCCESS } from '../../constants'
import { USER_CREATED, USER_LOGGED_IN, USER_LOGGED_OUT } from '../../constants/user'

export interface UserData {
  userName: string
  passCodes: string[]
  role: string
  _id: string
}

export interface UserState {
  loading: boolean
  logIn: boolean | null
}

const initialState: UserState = {
  loading: false,
  logIn: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUpSuccess (state, action) {
      localStorage.setItem('token', JSON.stringify(action.payload.token))
      localStorage.setItem('userData', JSON.stringify(action.payload.userData))
      state.logIn = true
    },
    logInSuccess (state, action) {
      state.logIn = true
      localStorage.setItem('token', JSON.stringify(action.payload.token))
      localStorage.setItem('userData', JSON.stringify(action.payload.userData))
    },
    logOut (state) {
      localStorage.clear()
      state.logIn = false
    },
    addPassCodeSuccess (state, action) {
      const passCode = action.payload
      console.log(passCode)
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
      console.log(error)
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
      console.log(error)
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
    } catch (error) {
      console.log(error)
    }
  }
}

export default userSlice.reducer
