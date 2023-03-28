import axios from 'axios'
import { getToken } from '../utils'

export const Api = {
  get: async (path: string, params: any) => await axios.get(`http://localhost:5000/api/${path}`, {
    params: {
      ...params
    },
    headers: { Authorization: `Bearer ${getToken()}` }
  }),
  post: async (path: string, data: any) =>
    await axios.post(`http://localhost:5000/api/${path}`, {
      ...data
    }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    }),
  delete: async (path: string, data: any) =>
    await axios.delete(`http://localhost:5000/api/kanban/${path}`, {
      data: {
        ...data
      },
      headers: { Authorization: `Bearer ${getToken()}` }
    }),
  logIn: async (data: any) => await axios.post('http://localhost:5000/api/user/log-in', {
    ...data
  }),
  signUp: async (data: any) => await axios.post('http://localhost:5000/api/user/sign-up', {
    ...data
  })
}
