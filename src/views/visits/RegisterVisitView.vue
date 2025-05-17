<template>
  <div class="visit-registration-container">
    <div class="left-section">
      <div class="left-section-components">
         <div class="container-tittle-visit-data">
            <h1 class="tittle-visit-data">Datos de tu Visita</h1>
        </div>
        <div class="info-card">
          <div class="photo-upload">
            <img v-if="deceasedPhoto" :src="deceasedPhoto" alt="Foto del difunto" class="deceased-photo">
            <div v-else class="photo-placeholder">
              <p>Muertito ndeaaaaaaa</p>
            </div>
          </div>

          <div class="info-content">
            <div class="info-field">
              <label>Nombre</label>
              <p class="info-value">Balatrero Balatrez Díaz</p>
            </div>

            <div class="info-field">
              <label>Fecha de Defunción</label>
              <p class="info-value">25 de agosto del 2024</p>
            </div>

            <div class="info-field">
              <label>Número de Tumba</label>
              <p class="info-value">5</p>
            </div>
          </div>
        </div>

      </div>
       
    </div>

    <div class="right-section">
      <div class="right-section-components">
        <div class="container-tittle-your-data">
          <h1 class="tittle-your-data">Tus Datos</h1>
        </div>
          
        <div class="form-card">
          <div class="input-group">
            <input 
              type="text" 
              v-model="visitorName" 
              class="data-input" 
              placeholder=" "
              required
            />
            <label class="input-label">Nombre</label>
          </div>

          <div class="date-time-group">
            <div class="input-group">
              <input 
                type="date" 
                v-model="visitDate" 
                class="data-input" 
                required
              />
              <label class="input-label">Fecha</label>
            </div>

            <div class="input-group">
              <input 
                type="time" 
                v-model="visitTime" 
                class="data-input" 
                required
              />
              <label class="input-label">Hora</label>
            </div>
          </div>

          <div class="action-buttons">
            <button class="purple-button">Registrar Visita</button>
            <button class="outline-white-button">Cancelar</button>
          </div>
        </div>

      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const deceasedPhoto = ref(null);
const visitorName = ref('');
const visitDate = ref('');
const visitTime = ref('');
</script>

<style scoped>
.visit-registration-container {
  display: flex;
  min-height: 80vh;
  font-family: Arial, sans-serif;
 
}

.left-section, .right-section {
  width: 50%;
  padding-top: 40px;
  padding-right: 40px;
 
  box-sizing: border-box;
}

h1 {
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
}
.right-section{
 width: 55%;
}
.left-section{
  padding-left: 4%;
  width: 45%;
  display: flex;             
  flex-direction: column;      
  align-items: center;        
  text-align: center;      


}
.container-tittle-visit-data,
.container-tittle-your-data{
  
  text-align: left;
 
}

.info-card {
  width: 400px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 20px;
}


.form-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.photo-upload {
  width: 180px;
  height: 180px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 auto 30px;
  background-color: #fafafa;
}

.photo-placeholder span {
  font-size: 32px;
  color: #7E57C2;
}

.photo-placeholder p {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}

.info-content {
  margin-top: 20px;
}

.info-field {
  margin-bottom: 20px;
}

.info-field label {
  display: block;
  color: #666;
  font-size: 14px;
  margin-bottom: 5px;
}

.info-value {
  font-weight: bold;
  color: #333;
  font-size: 16px;
}
.form-card{
  width: 80%;
}

.action-buttons {
  display: flex;
  justify-content:center;
  margin-top: 40px;
}
.purple-button{
  margin-right:40px ;
}


.data-input[type="date"],
.data-input[type="time"] {
  width: 77%;
}



.date-time-group {
  display: flex;
  gap: 20px;
}

.date-time-group .input-group {
  flex: 1;
}

@media (max-width: 1235px) {
  .visit-registration-container {
    flex-direction: column;
  }
  
  .left-section, .right-section {
    width: 100%;
    padding: 25px;
  }
  .right-section-components {
  display: flex;
  flex-direction: column;
  align-items: center; 
  margin-bottom: 40px;
  }
  .container-tittle-your-data{
    width: 84%;
  }

  
  .info-card, .form-card {
    padding: 20px;
  }
  
  .date-time-group {
    flex-direction: column;
    gap: 0;
  }
  

  .action-buttons {
  display: flex;
  justify-content:center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.purple-button{
  margin-right:40px ;
}

  
  .data-input[type="date"],
  .data-input[type="time"],
  .data-input {
  width: 97%;
}


}
</style>