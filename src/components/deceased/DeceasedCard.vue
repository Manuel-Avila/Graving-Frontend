<template>
  <div class="deceased-card">
    <!-- Foto del difunto con padding -->
    <div class="deceased-photo">
      <div class="photo-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6b2c7d" width="48" height="48">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>
      </div>
    </div>

    <!-- Información del difunto -->
    <div class="deceased-info">
      <h3 class="deceased-name">Balatrero Balatrez Diaz</h3>
      
      <div class="info-row">
        <span class="info-label">Fecha de Defunción</span>
        <span class="info-value">25 de agosto del 2024</span>
      </div>
      
      <div class="info-row">
        <span class="info-label">Número de Tumba</span>
        <span class="info-value">5</span>
      </div>
    </div>

    <!-- Acciones en columna -->
    <div class="card-actions">
      <button class="outline-white-button">Ver</button>
      <button class="purple-button">Editar</button>
    </div>
  </div>
</template>

<style scoped>
.deceased-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 260px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  text-align: center; /* Centrado general */
  padding-bottom: 16px;
}

.deceased-photo {
  width: 100%;
  padding: 20px 0 10px 0;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #eee;
}

.photo-container {
  width: 120px;
  height: 120px;
  background-color: #eee;
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

.view-button {
  background-color: #f0f0f0;
  color: #333;
}

.view-button:hover {
  background-color: #e0e0e0;
}

.edit-button {
  background-color: #6b2c7d;
  color: white;
}

.edit-button:hover {
  background-color: #5a2469;
}

/* Responsive */
@media (max-width: 480px) {
  .deceased-card {
    width: 100%;
    max-width: 300px;
  }
}
</style>