<template>
  <div class="view-deceased-container">
    <div class="left-section">
      <div class="image-upload">
        <button class="upload-btn">
          <p>muelto ndea</p>
        </button>
      </div>
      <button class="purple-button">Editar</button>
      <button class="outline-white-button">Eliminar</button>
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
          <p class="tomb-number">A-245</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('Balatro balatrez');
const epitaph = ref('Lo balatro sale caro');
const birthDate = ref('1950-01-01');
const deathDate = ref('2023-12-31');
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