import axiosClient from './axiosClient'

const residentApi = {
    getAll: (params) => {
        const url = '/resident/'
        return axiosClient.get(url, { params })
    },
    addResident: (info) => {
        const url = '/resident/create/'
        return axiosClient.post(url, info)
    },
    editResident: (info) => {
        const url = `/resident/${info.id}/update`
        return axiosClient.put(url, info)
    },
    deleteResident: (id) => {
        const url = `/resident/${id}/delete`
        return axiosClient.delete(url)
    },
    getResident: (id) => {
        const url = `/resident/${id}`
        return axiosClient.get(url)
    }
    
}

export default residentApi