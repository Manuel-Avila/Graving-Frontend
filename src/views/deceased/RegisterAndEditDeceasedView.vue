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

          <div class="input-group tomb-input-group" @click="showGraveModal = true">
            <input 
              type="text" 
              class="data-input"
              readonly
              :value="graveId ? `#${graveId}` : ''"
              placeholder=" " 
            />
            <label class="input-label">Número de tumba</label>
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
            <input type="tel" v-model="ownerPhone" class="data-input" required placeholder=" " />
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
  <GraveSelectorModal
    v-if="showGraveModal"
    @close="showGraveModal = false"
    @selected="handleGraveSelected"
  />
</template>

<script setup>
  import { ref, computed, onMounted, nextTick } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { registerDeceased, updateDeceased, getDeceasedById } from '@/services/deceasedService'
  import { getOwnerByDeceasedId, createOwner, updateOwner } from '@/services/ownerService'
  import { useToast } from '@/composables/useToast'
  import { deceasedSchema } from '@/composables/validations/useDeceasedValidation'
  import { ownerSchema } from '@/composables/validations/useOwnerValidation'
  import GraveSelectorModal from '@/components/map/GraveSelectorModal.vue'

  const showGraveModal = ref(false)

  const route = useRoute()
  const router = useRouter()
  const { showToast } = useToast()

  const isEditing = computed(() => route.name === 'editDeceased')
  const deceasedId = route.params.id

  const name = ref('')
  const birthDate = ref('')
  const deathDate = ref('')
  const epitaph = ref('')
  const graveId = ref(route.params.graveId ? Number(route.params.graveId) : null)
  const imageUrl = ref(null)
  const imageDeleteToken = ref(null)

  const ownerName = ref('')
  const ownerPhone = ref('')
  const ownerEmail = ref('')
  const ownerCurp = ref('')
  const ownerId = ref(null)

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

        const owner = await getOwnerByDeceasedId(deceasedId)
        if (owner) {
          ownerId.value = owner.id 
          ownerName.value = owner.name
          ownerPhone.value = owner.phone
          ownerEmail.value = owner.email
          ownerCurp.value = owner.curp
        }

      } catch {
        showToast('Difunto no encontrado', 'error')
        await nextTick()
        router.push({ name: 'searchDeceased' })
      }
    }
  })

  const handleSubmit = async () => {
    try {
      const deceasedData = {
        name: name.value,
        epitaph: epitaph.value,
        birthDate: birthDate.value,
        deathDate: deathDate.value,
        graveId: graveId.value
      }

      const ownerData = {
        name: ownerName.value,
        phone: ownerPhone.value,
        email: ownerEmail.value,
        curp: ownerCurp.value
      }

      if (!selectedImage.value) {
        deceasedData.imageUrl = imageUrl.value
        deceasedData.imageDeleteToken = imageDeleteToken.value
      }

      await deceasedSchema.validate(deceasedData)
      await ownerSchema.validate(ownerData)

      if (isEditing.value) {
        await updateDeceased(deceasedId, deceasedData, selectedImage.value, imageDeleteToken.value)
        await updateOwner(ownerId.value, {
          ...ownerData,
          deceasedId: deceasedId
        })
        showToast('Difunto actualizado correctamente', 'success')
      } else {
        const created = await registerDeceased(deceasedData, selectedImage.value)

        await createOwner({
          ...ownerData,
          deceasedId: created.id
        })

        showToast('Difunto registrado correctamente', 'success')
      }

      await nextTick()
      router.push({ name: 'searchDeceased' })
    } catch (err) {
      if (err.name === 'ValidationError') {
        showToast(err.message, 'error')
      } else {
        console.error(err)
        showToast('Error al guardar difunto.', 'error')
      }
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

  const handleGraveSelected = (grave) => {
    graveId.value = grave.id
    showToast(`Tumba #${grave.graveNumber} seleccionada`, 'success')
    showGraveModal.value = false
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
  display: flex;

  justify-content: center;
  flex-direction: column; 
  gap: 30px;
}



.form-container-deceased,
.form-container-owner {
  margin-top: 30px;
  flex: 1;
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