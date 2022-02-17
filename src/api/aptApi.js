import axiosClient from './axiosClient'

const aptApi = {
    getAll: (params) => {
        const url = '/apartment/'
        return axiosClient.get(url, { params })
    },
    addApt: (info) => {
        const url = '/apartment/create/'
        return axiosClient.post(url, info)
    },
    editApt: (info) => {
        const url = `/apartment/${info.id}/update`
        return axiosClient.put(url, info)
    },
    deleteApt: (id) => {
        const url = `/apartment/${id}/delete`
        return axiosClient.delete(url)
    },
    getApt: (id) => {
        const url = `/apartment/${id}`
        return axiosClient.get(url)
    }
    
}

export default aptApi