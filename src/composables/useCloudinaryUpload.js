export function useCloudinaryUpload() {
  const cloudName = 'dsesbuouz'
  const uploadPreset = 'Graving'

  const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)
    formData.append('folder', 'deceased')

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

    const response = await fetch(url, {
      method: 'POST',
      body: formData
    })
    
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || 'Error al subir imagen a Cloudinary')
    }

    return {
      url: data.secure_url,
      deleteToken: data.delete_token
    }
  }

  const deleteImage = async (deleteToken) => {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/delete_by_token`

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ token: deleteToken }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || 'Error al eliminar imagen de Cloudinary')
    }

    return data
  }

  return { uploadImage, deleteImage }
}