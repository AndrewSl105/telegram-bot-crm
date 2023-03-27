import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notistack'
import { DEFAULT, ERROR, SUCCESS } from '../../constants'
import { USER_CREATED, USER_LOGGED_IN, USER_LOGGED_OUT } from '../../constants/user'
import { getKanbanBoardsListAction } from './kanban'
import { Api } from '../../Api/api'
import { getUserId } from '../../utils'
import { type AppDispatch, type RootState } from '../store'

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
  teamList: []
}

const initialState: UserState = {
  loading: false,
  logIn: null,
  error: '',
  profile: {
    _Id: '',
    passCodes: [],
    userName: ''
  },
  teamList: []
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
    },
    getTeamList (state, action) {
      state.teamList = action.payload.teamList
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
  return async (dispatch: AppDispatch) => {
    let response
    try {
      response = Api.signUp(userData)
      dispatch(userSlice.actions.signUpSuccess((await response).data))
      dispatch(showNotification({ text: USER_CREATED, variant: SUCCESS }))
    } catch (error: any) {
      dispatch(userSlice.actions.getError(error.message))
      dispatch(showNotification({ text: error.message, variant: ERROR }))
    }
  }
}

export function userLogInAction (userData: { email: string, password: string }) {
  return async (dispatch: AppDispatch) => {
    let response
    try {
      response = Api.logIn(userData)
      dispatch(userSlice.actions.logInSuccess((await response).data))
      dispatch(showNotification({ text: USER_LOGGED_IN, variant: SUCCESS }))
    } catch (error: any) {
      dispatch(userSlice.actions.getError(error.message))
      dispatch(showNotification({ text: error.message, variant: ERROR }))
    }
  }
}

export function userLogOutAction () {
  return async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.logOut())
    dispatch(showNotification({ text: USER_LOGGED_OUT, variant: DEFAULT }))
  }
}

export function addPassCodeAction (passCode: string) {
  return async (dispatch: AppDispatch) => {
    const _id = getUserId()

    let response
    try {
      response = Api.post('user/add-passcode', { passCode, _id })
      dispatch(userSlice.actions.addPassCodeSuccess((await response).data))
      void dispatch(getKanbanBoardsListAction())
    } catch (error: any) {
      dispatch(userSlice.actions.getError(error.message))
      dispatch(showNotification({ text: error.message, variant: ERROR }))
    }
  }
}

export function getProfileAction (_id: string) {
  return async (dispatch: AppDispatch) => {
    let response
    try {
      response = Api.get('user/profile', { _id })
      dispatch(userSlice.actions.getProfile((await response).data))
    } catch (error: any) {
      dispatch(userSlice.actions.getError(error.message))
      dispatch(showNotification({ text: error.message, variant: ERROR }))
    }
  }
}

export function getMyTeamAction (passCode: string) {
  return async (dispatch: AppDispatch, state: () => RootState) => {
    let response
    try {
      response = response = Api.get('user/my-team', { passCode })
      dispatch(userSlice.actions.getTeamList((await response).data))
    } catch (error: any) {
      dispatch(userSlice.actions.getError(error.message))
      dispatch(showNotification({ text: error.message, variant: ERROR }))
    }
  }
}

export default userSlice.reducer
