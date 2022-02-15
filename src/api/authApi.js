import axiosClient from './axiosClient'

const authApi = {
    logIn: (email, password) => {
        const url = '/auth/login/'
        return axiosClient.post(url, { email, password })
    },
    
}

export default authApi