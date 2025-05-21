<template>
  <div class="deceased-card">
    <div class="deceased-photo">
      <div class="photo-container">
        <img v-if="deceased.imageUrl" :src="deceased.imageUrl" alt="Foto del difunto" class="deceased-photo">
        <img v-else src="../../assets/images/deceasedPlaceholder.png" alt="Foto del difunto" class="deceased-photo">
      </div>
    </div>

    <div class="deceased-info">
      <h3 class="deceased-name">{{ deceased.name }}</h3>
      
      <div class="info-row">
        <span class="info-label">Fecha de Defunción</span>
        <span class="info-value">{{ deceased.deathDate }}</span>
      </div>
      
      <div class="info-row">
        <span class="info-label">Número de Tumba</span>
        <span class="info-value">{{ deceased.graveNumber }}</span>
      </div>
    </div>

    <div class="card-actions">
      <router-link :to="{ name: 'editDeceased', params: { id: deceased.id } }" class="purple-button">Editar</router-link>
      <router-link :to="{ name: 'visit', params: { id: deceased.id } }" class="purple-button">Visitar</router-link>
      <router-link :to="{ name: 'deceased', params: { id: deceased.id } }"  class="outline-white-button">Ver</router-link>
    </div>
  </div>
</template>

<script setup> 
  import { defineProps } from 'vue'

  defineProps({
    deceased: {
      type: Object,
      required: true
    }
  })
</script>

<style scoped>
.deceased-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 260px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  text-align: center;
  padding-bottom: 16px;
}

.deceased-photo {
  width: 100%;
  padding: 20px 0 10px 0;
  display: flex;
  justify-content: center;
}

.photo-container {
  width: 120px;
  height: 120px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.deceased-info {
  padding: 16px;
}

.deceased-name {
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 16px 0;
  font-weight: bold;
}

.info-row {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
}

.info-label {
  font-style: oblique;
  font-size:15px;
  color: #000;
  margin-top: 2px;

  margin-bottom: 4px;
}

.info-value {
  color: #333;
  font-size: 0.95rem;
}

.card-actions {
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  gap: 8px;
  max-width: 200px;
  margin: 0 auto;
}

.action-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

/* Responsive */
@media (max-width: 480px) {
  .deceased-card {
    width: 100%;
    max-width: 300px;
  }
}
</style>