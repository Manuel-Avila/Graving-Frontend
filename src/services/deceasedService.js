import api from './axiosInstance'

export const getAllDeceased = async () => {
    const response = await api.get('/deceased')
    return response.data
}

export const getDeceasedById = async (id) => {
    const response = await api.get(`/deceased/${id}`)
    return response.data
}

export const registerDeceased = async (data) => {
    const response = await api.post('/deceased', data)
    return response.data
}

export const updateDeceased = async (id, data) => {
    const response = await api.put(`/deceased/${id}`, data)
    return response.data
}