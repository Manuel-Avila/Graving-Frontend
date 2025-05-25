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
      
        <div class="form-container-deceased">
          <div class="section-title">
            <h3>Datos del difunto</h3>
          </div>
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
            <p class="tomb-number">{{ graveId }}</p>
          </div>
        </div>

        <div class="form-container-owner">
          <div class="section-title">
            <h3>Datos del responsable</h3>
          </div>
          <div class="input-group">
            <input type="text" v-model="ownerName" class="data-input" required placeholder=" " />
            <label class="input-label">Nombre</label>
          </div>
          <div class="input-group">
            <input type="text" v-model="ownerPhone" class="data-input" required placeholder=" " />
            <label class="input-label">Teléfono</label>
          </div>
          <div class="input-group">
            <input type="email" v-model="ownerEmail" class="data-input" required placeholder=" " />
            <label class="input-label">Correo</label>
          </div>
          <div class="input-group">
            <input type="text" v-model="ownerCurp" class="data-input" required placeholder=" " />
            <label class="input-label">CURP</label>
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

  const isEditing = computed(() => route.name === 'editDeceased')
  const deceasedId = route.params.id

  // Datos del difunto
  const name = ref('')
  const birthDate = ref('')
  const deathDate = ref('')
  const epitaph = ref('')
  const graveId = ref(isEditing.value ? null : route.params.graveId)
  const imageUrl = ref(null)
  const imageDeleteToken = ref(null)

  // Datos del responsable
  const ownerName = ref('')
  const ownerPhone = ref('')
  const ownerEmail = ref('')
  const ownerCurp = ref('')

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
        
        // Si estás editando, carga también los datos del responsable si existen
        if (deceased.owner) {
          ownerName.value = deceased.owner.name || ''
          ownerPhone.value = deceased.owner.phone || ''
          ownerEmail.value = deceased.owner.email || ''
          ownerCurp.value = deceased.owner.curp || ''
        }
      } catch {
        showToast('Difunto no encontrado', 'error')
        await nextTick()
        router.push({ name: 'searchDeceased' })
      }
    }
  })

  const handleSubmit = async () => {
    if (!name.value || !birthDate.value || !deathDate.value || !epitaph.value ||
        !ownerName.value || !ownerPhone.value || !ownerEmail.value || !ownerCurp.value) {
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
        imageDeleteToken: imageResult?.deleteToken || imageDeleteToken.value,
        owner: {
          name: ownerName.value,
          phone: ownerPhone.value,
          email: ownerEmail.value,
          curp: ownerCurp.value
        }
      }

      if (isEditing.value) {
        await updateDeceased(deceasedId, data, selectedImage.value, imageDeleteToken.value)
        showToast('Difunto actualizado correctamente', 'success')
      } else {
        await registerDeceased(data, selectedImage.value)
        showToast('Difunto registrado correctamente', 'success')
      }

      await nextTick()
      router.push({ name: 'searchDeceased' })
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
  width: 100%;
  display: flex;
  min-height: 100vh;
}

.left-section {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
}

.right-section {
  width: 60%;
  padding: 30px;
  height: 120vh;
  display: flex;

  justify-content: center;
  flex-direction: column; 
  gap: 30px;
}



.form-container-deceased,
.form-container-owner {
  margin-top: 30px;
  flex: 1;
  height: 50%;
  margin-left: 50px;
  width: 70%;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.section-title {
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.section-title h3 {
  color: #333;
  font-size: 1.2rem;
  margin: 0;
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

.tomb-info {
  margin-top: 30px;
}

.confirm-btn {
  margin-top: 30px;
  width: 80%;
  max-width: 380px;
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .forms-column-container {
    flex-direction: column;
    gap: 20px;
  }
  
  .form-container-deceased,
  .form-container-owner {
    width: 70%;
  }
}

@media (max-width: 1024px) {
  .register-container {
    
    flex-direction: column;
  }
  
  .left-section, 
  .right-section {
    width: 100%;
    padding: 20px;
    
  }
  .right-section{
     align-items: center; 
     
  }
  
  
  .upload-btn {
    width: 300px;
    height: 300px;
    margin-top: 20px;
  }
  .form-container-deceased,
  .form-container-owner{
    margin-top: 30px;
    margin-left: 0px;
  }
}

@media (max-width: 768px) {
  .upload-btn {
    width: 250px;
    height: 250px;
  }
  
  .right-section {
    padding: 20px;
  }
  
  .form-container-deceased,
  .form-container-owner {
    padding: 20px;
    height: vh;
  }
}

@media (max-width: 480px) {
  .upload-btn {
    width: 200px;
    height: 200px;
  }
  
  .right-section {
    padding: 15px;
  }
  
  .section-title h3 {
    font-size: 1.1rem;
  }
}
</style>