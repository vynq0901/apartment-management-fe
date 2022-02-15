import axiosClient from './axiosClient'

const aptAreaApi = {
    getAll: () => {
        const url = '/apartment-areas/'
        return axiosClient.get(url)
    },
    addArea: (info) => {
        const url = '/apartment-areas/create/'
        return axiosClient.post(url, info)
    },
    editArea: (info) => {
        const url = `/apartment-areas/${info.id}/update`
        return axiosClient.put(url, info)
    },
    deleteArea: (id) => {
        const url = `/apartment-areas/${id}/delete`
        return axiosClient.delete(url)
    } 
    
}

export default aptAreaApi