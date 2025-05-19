<template>
  <div class="register-container">
    <div class="left-section">
      <div class="image-upload">
        <input
          type="file"
          accept="image/*"
          ref="fileInput"
          @change="handleImageChange"
          style="display: none"
        />
        <button class="upload-btn" @click.prevent="triggerImageInput">
          <template v-if="imageUrl">
            <img :src="imageUrl" class="preview-img" />
          </template>
          <template v-else>
            <span>+</span>
            <p>Subir imagen del difunto</p>
          </template>
        </button>
      </div>
      <button @click="handleSubmit" class="purple-button confirm-btn">
        {{ isEditing ? 'Actualizar Difunto' : 'Registrar Difunto' }}
      </button>
    </div>  

    <div class="right-section">
      <div class="form-container">
        <div class="input-group">
          <input type="text" v-model="name" class="data-input" required placeholder=" " />
          <label class="input-label">Nombre completo</label>
        </div>
        <div class="input-group">
          <input type="text" v-model="epitaph" class="data-input" required placeholder=" " />
          <label class="input-label">Epitafio</label>
        </div>
        <div class="input-group">  
          <input type="date" v-model="birthDate" class="data-input" required />
          <label class="input-label">Fecha de nacimiento</label>
        </div>
        <div class="input-group">  
          <input type="date" v-model="deathDate" class="data-input" required />
          <label class="input-label">Fecha de defunción</label>
        </div>

        <div class="tomb-info">
          <h3>Número de tumba</h3>
          <p class="tomb-number">A-245</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, nextTick } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { registerDeceased, updateDeceased, getDeceasedById } from '@/services/deceasedService'
  import { useToast } from '@/composables/useToast'

  const route = useRoute()
  const router = useRouter()
  const { showToast } = useToast()

  const isEditing = computed(() => !!route.params.id)
  const deceasedId = route.params.id

  const name = ref('')
  const birthDate = ref('')
  const deathDate = ref('')
  const epitaph = ref('')
  const graveId = ref(1)
  const imageUrl = ref(null)
  const imageDeleteToken = ref(null)

  const fileInput = ref(null)
  const selectedImage = ref(null)

  onMounted(async () => {
    if (isEditing.value) {
      try {
        const deceased = await getDeceasedById(deceasedId)
        name.value = deceased.name
        birthDate.value = deceased.birthDate?.slice(0, 10)
        deathDate.value = deceased.deathDate?.slice(0, 10)
        epitaph.value = deceased.epitaph
        graveId.value = deceased.graveId
        imageUrl.value = deceased.imageUrl
        imageDeleteToken.value = deceased.imageDeleteToken
      } catch {
        showToast('Difunto no encontrado', 'error')
        await nextTick()
        router.push({ name: 'deceasedAdministration' })
      }
    }
  })

  const handleSubmit = async () => {
    if (!name.value || !birthDate.value || !deathDate.value || !epitaph.value) {
      showToast('Todos los campos son obligatorios', 'error')
      return
    }

    let imageResult = null

    try {
      const data = {
        name: name.value,
        birthDate: birthDate.value,
        deathDate: deathDate.value,
        epitaph: epitaph.value,
        graveId: graveId.value,
        imageUrl: imageResult?.url || imageUrl.value,
        imageDeleteToken: imageResult?.deleteToken || imageDeleteToken.value
      }

      if (isEditing.value) {
        await updateDeceased(deceasedId, data, selectedImage.value, imageDeleteToken.value)
        showToast('Difunto actualizado correctamente', 'success')
      } else {
        await registerDeceased(data, selectedImage.value)
        showToast('Difunto registrado correctamente', 'success')
      }

      await nextTick()
      router.push({ name: 'deceasedAdministration' })
    } catch (err) {
      showToast('Error al guardar difunto.', 'error')
    }
  }

  const triggerImageInput = () => {
    fileInput.value?.click()
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      selectedImage.value = file
      imageUrl.value = URL.createObjectURL(file)
    } else {
      selectedImage.value = null
      imageUrl.value = null
    }
  }
</script>

<style scoped>
.register-container {
  width: 100vw;
  display: flex;
  flex-direction: row;
}

.left-section {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.right-section {
  width: 60%;
  padding: 50px;
  display: flex;
  justify-content: center;
}

.image-upload {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.upload-btn {
  width: 380px;
  height: 380px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: white;
  transition: all 0.3s ease;
  margin-top: 70px;
}

.form-container {
  padding: 40px;
  background-color: #ffffff;
  border-radius: 5px;
  width: 70%;
  height: 90%;
  margin-left: 45px;
}

.tomb-info{
    margin-top: 30px;

}

@media (max-width: 1024px) {
  .register-container {
    flex-direction: column;
    align-items: center;
  }
  
  .left-section, .right-section {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .upload-btn {
    width: 300px;
    height: 300px;
    margin-top: 20px;
  }
  
  .form-container {
   
    margin-left: 12px;
    padding: 30px;
    margin-bottom: 10px;
  }
  
  .confirm-btn {
    margin-bottom: 30px;
  }
  
}

@media (max-width: 768px) {
  .upload-btn {
    width: 250px;
    height: 250px;
  }
  
  section {
  width: 100%;
  padding: 50px;
}
  .right-section {
  width: 100%;
  
  
}
.form-container {
  background-color: #ffffff;
  border-radius: 5px;
  width: 83%;
  height: 90%;
  
}

}

@media (max-width: 480px) {
  .upload-btn {
    width: 200px;
    height: 200px;
  }
  
  .right-section {
    padding: 20px;
  }
  
  .form-container {
    padding: 20px;
  }
}
</style>