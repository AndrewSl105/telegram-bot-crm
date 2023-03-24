import axios from 'axios'
import { getToken } from '../utils'
const token = getToken()

export const Api = {
  get: async (patch: string, params: any) => await axios.get(`http://localhost:5000/api/${patch}`, {
    params: {
      ...params
    },
    headers: { Authorization: `Bearer ${token}` }
  }),
  post: async (patch: string, data: any) => await axios.post(`http://localhost:5000/api/${patch}`, {
    ...data
  }, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  delete: async (patch: string, data: any) =>
    await axios.delete(`http://localhost:5000/api/kanban/${patch}`, {
      data: {
        ...data
      },
      headers: { Authorization: `Bearer ${token}` }
    }),
  logIn: async (data: any) => await axios.post('http://localhost:5000/api/user/log-in', {
    ...data
  }),
  signUp: async (data: any) => await axios.post('http://localhost:5000/api/user/sign-up', {
    ...data
  })
}
