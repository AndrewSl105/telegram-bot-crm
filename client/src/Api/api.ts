import axios from 'axios'
import { getToken } from '../utils'

const api = 'https://teleboard.herokuapp.com/api/'

export const Api = {
  get: async (path: string, params: any) => await axios.get(`${api}${path}`, {
    params: {
      ...params
    },
    headers: { Authorization: `Bearer ${getToken()}` }
  }),
  post: async (path: string, data: any) =>
    await axios.post(`${api}${path}`, {
      ...data
    }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    }),
  delete: async (path: string, data: any) =>
    await axios.delete(`${api}${path}`, {
      data: {
        ...data
      },
      headers: { Authorization: `Bearer ${getToken()}` }
    }),
  logIn: async (data: any) => await axios.post(`${api}user/log-in`, {
    ...data
  }),
  signUp: async (data: any) => await axios.post(`${api}user/sign-up`, {
    ...data
  })
}
