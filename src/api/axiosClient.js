import axios from 'axios'
import queryString from 'query-string'
//default config for http requests

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data
    }
    return response
}, (error) => {
    throw error
})

export default axiosClient