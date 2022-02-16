import axiosClient from './axiosClient'

const contractApi = {
    getAll: (params) => {
        const url = '/contract/'
        return axiosClient.get(url, { params })
    },
    addContract: (info) => {
        const url = '/contract/create/'
        return axiosClient.post(url, info)
    },
    editContract: (info) => {
        const url = `/contract/${info.id}/update`
        return axiosClient.put(url, info)
    },
    deleteContract: (id) => {
        const url = `/contract/${id}/delete`
        return axiosClient.delete(url)
    } 
    
}

export default contractApi