// import axios from 'axios'
// import useAuth from './store'
// import { useEffect } from 'react'

// const useAxiosInstance = () => {
//   const { token } = useAuth() // Call the hook to get the token

//   const axiosInstance = axios.create({
//     baseURL: process.env.CONNECTIONSTRING
//   })

//   if (token) axiosInstance.defaults.headers.Authorization = `Bearer ${token}`

//   return axiosInstance // Return the configured instance
// }

// export default useAxiosInstance

//export const baseURL = 'https://codesoftlevel3task2backend.onrender.com/api'
export const baseURL = "http://localhost:5000";
