import api from './axiosInstance'

export const getAllOwners = async () => {
    const response = await api.get('/owners')
    return response.data
}