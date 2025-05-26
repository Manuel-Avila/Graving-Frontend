import api from './axiosInstance'
import { useCloudinaryUpload } from '@/composables/useCloudinaryUpload'

const { uploadImage, deleteImage } = useCloudinaryUpload()

export const getAllDeceased = async () => {
    const response = await api.get('/deceased')
    return response.data
}

export const getDeceasedById = async (id) => {
    const response = await api.get(`/deceased/${id}`)
    return response.data
}

export const registerDeceased = async (data, file) => {
  let imageResult = null

  try {
    if (file) {
      imageResult = await uploadImage(file)
    }

    const response = await api.post('/deceased', {
      ...data,
      imageUrl: imageResult?.url || null,
      imageDeleteToken: imageResult?.deleteToken || null
    })

    return response.data

  } catch (error) {
    if (imageResult?.deleteToken) {
      await deleteImage(imageResult.deleteToken)
    }
    throw error
  }
}

export const updateDeceased = async (id, data, file, previousDeleteToken) => {
  let imageResult = null

  try {
    if (file) {
      imageResult = await uploadImage(file)
    }

    const response = await api.put(`/deceased/${id}`, {
      ...data,
      imageUrl: imageResult?.url || data.imageUrl,
      imageDeleteToken: imageResult?.deleteToken || data.imageDeleteToken
    })

    if (imageResult?.deleteToken && previousDeleteToken) {
      await deleteImage(previousDeleteToken)
    }

    return response.data

  } catch (error) {
    if (imageResult?.deleteToken) {
      await deleteImage(imageResult.deleteToken)
    }
    throw error
  }
}

export const deleteDeceased = async (id) => {
  try {
    const deceased = await getDeceasedById(id)

    await api.delete(`/deceased/${id}`)

    if (deceased.imageDeleteToken) {
      await deleteImage(deceased.imageDeleteToken)
    }

    return {
      message: 'Difunto eliminado correctamente',
      name: deceased.name
    }

  } catch (error) {
    console.log('❌ Error al eliminar difunto:', error)
    throw error
  }
}