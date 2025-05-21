<template>
  <div class="view-deceased-container">
    <div class="left-section">
      <div class="photo-upload">
        <img v-if="imageUrl" :src="imageUrl" alt="Foto del difunto" class="deceased-photo">
        <img v-else src="../../assets/images/deceasedPlaceholder.png" alt="Foto del difunto" class="deceased-photo">
      </div>
      <router-link :to="{name: 'editDeceased', params: {id: deceasedId}}" class="purple-button edit-button">Editar</router-link>
    </div>  
    <div class="right-section">
      <div class="form-container">
        <div class="input-group">
          <input 
            type="text" 
            v-model="name" 
            class="data-input" 
            readonly 
            placeholder=" " 
          />
          <label class="input-label">Nombre completo</label>
        </div>
        <div class="input-group">
          <input 
            type="text" 
            v-model="epitaph" 
            class="data-input" 
            readonly 
            placeholder=" " 
          />
          <label class="input-label">Epitafio</label>
        </div>
        <div class="input-group">  
          <input 
            type="date" 
            v-model="birthDate" 
            class="data-input" 
            readonly
          />
          <label class="input-label">Fecha de nacimiento</label>
        </div>
        <div class="input-group">  
          <input 
            type="date" 
            v-model="deathDate" 
            class="data-input" 
            readonly
          />
          <label class="input-label">Fecha de defunción</label>
        </div>
        <div class="tomb-info">
          <h3>Número de tumba</h3>
          <p class="tomb-number">{{ graveNumber }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, nextTick } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { getDeceasedById } from '@/services/deceasedService'
  import { useToast } from '@/composables/useToast'

  const { showToast } = useToast()
  const router = useRouter()
  const route = useRoute()
  const deceasedId = route.params.id

  const name = ref('')
  const epitaph = ref('')
  const birthDate = ref('')
  const deathDate = ref('')
  const graveNumber = ref('')
  const imageUrl = ref('')

  onMounted(async () => {
    try {
      const deceased = await getDeceasedById(deceasedId)
      name.value = deceased.name
      epitaph.value = deceased.epitaph
      birthDate.value = deceased.birthDate?.slice(0, 10)
      deathDate.value = deceased.deathDate?.slice(0, 10)
      graveNumber.value = deceased.graveNumber
      imageUrl.value = deceased.imageUrl
    } catch (err) {
      showToast('Difunto no encontrado', 'error')
      await nextTick();
      router.push({ name: 'deceasedAdministration' })
    }
  })
</script>

<style scoped>
.view-deceased-container {
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
}

.image-upload {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.photo-upload {
  width: 380px;
  height: 380px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: white;
  transition: all 0.3s ease;
  margin: 60px ;
}

.deceased-photo {
  width: 100%;
  height: 100%;
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

.outline-white-button{
    margin-top: 30px;
}

.input-group {
  position: relative;
  width: 89%;
  margin-bottom: 20px;
  margin-top: 40px;
}

.data-input {
  border-bottom: 1px solid #7E57C2;
}

.data-input:not(:placeholder-shown) + .input-label {
  color: #000;
}

/* Estilo ESPECÍFICO para inputs de fecha */
.data-input[type="date"]:not(:placeholder-shown) + .input-label {
  color: #000;
}

.data-input[type="date"] + .input-label {
  top: -15px; 
  font-size: 12px;
}

.data-input[type="date"]::-webkit-datetime-edit {
  color: #000;
}

.edit-button {
  width: 165px;
}


@media (max-width: 1024px) {
  .view-deceased-container {
    flex-direction: column;
    align-items: center;
  }
  
  .left-section, .right-section {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
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
  
  .right-section {
    padding: 20px;
  }
  
  .form-container {
    padding: 20px;
  }

  .photo-upload {
    width: 250px;
  }
}
</style>