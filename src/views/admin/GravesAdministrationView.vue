<template>
  <div class="graves-container">
    <div class="graves-box">
      <!-- Barra de búsqueda -->
      <div class="search-group">
       <div class="input-group">
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  class="data-input" 
                  placeholder=" " 
                />
                <label class="input-label">Nombre</label>
        </div>
        <button class="purple-button">Buscar</button>
      </div>

      <!-- Título de la tabla -->
      <div class="table-title">
        <h2>Registro de Tumbas</h2>
      </div>

      <!-- Tabla de tumbas -->
      <div class="graves-table-wrapper">
        <table class="graves-table">
          <thead>
            <tr>
              <th>Nombre Difunto</th>
              <th>Propietario</th>
              <th>N° Tumba</th>
              <th>Reparación</th>
              <th>Funciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(grave, index) in filteredGraves" :key="index">
              <td>{{ grave.difunto }}</td>
              <td>{{ grave.propietario }}</td>
              <td>{{ grave.numeroTumba }}</td>
              <td :class="{'pending': grave.reparacion === 'Pendiente', 'completed': grave.reparacion !== 'Pendiente' && grave.reparacion !== 'N/A'}">
                {{ grave.reparacion }}
              </td>
              <td class="actions">
                <span class="action-link edit-link" @click="editGrave(grave)">Editar</span>
                <span class="action-link delete-link" @click="deleteGrave(grave)">Eliminar</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');

// Datos de ejemplo
const graves = Array(15).fill().map((_, i) => ({
  difunto: `Difunto ${i + 1}`,
  propietario: `Propietario ${i + 1}`,
  numeroTumba: `T-${Math.floor(100 + Math.random() * 900)}`,
  reparacion: i % 4 === 0 ? `2023-${(i%12)+1}-${(i%28)+1}` : i % 3 === 0 ? 'Pendiente' : 'N/A'
}));

const filteredGraves = computed(() => {
  return graves.filter(grave => 
    grave.difunto.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    grave.propietario.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    grave.numeroTumba.includes(searchQuery.value) ||
    grave.reparacion.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const editGrave = (grave) => {
  console.log('Editar:', grave);
  // Lógica para editar tumba
};

const deleteGrave = (grave) => {
  console.log('Eliminar:', grave);
  // Lógica para eliminar tumba
};
</script>

<style scoped>
/* Contenedor principal */
.graves-container {
  display: flex;
  justify-content: center;
  min-height: 80vh;
  padding: 20px;
  background-color: #f5f5f5;
}

.graves-box {
  margin-top: 20px;
  width: 80%;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

/* Barra de búsqueda */
.search-group {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  align-items: center;
}

.input-group {
  position: relative;
  flex-grow: 1;
}


.input-label {
  position: absolute;
  left: 15px;
  top: 12px;
  color: #999;
  transition: all 0.3s;
  pointer-events: none;
}


.purple-button {
  background-color: var(--purple-color);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.purple-button:hover {
  background-color: var(--purple-color-dark);
}

/* Título de la tabla */
.table-title {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.table-title h2 {
  color: #333;
  font-size: 1.5rem;
  margin: 0;
}

/* Tabla de tumbas */
.graves-table-wrapper {
  max-height: 600px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.graves-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

.graves-table th {
  background-color: var(--purple-color);
  color: white;
  padding: 12px;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 1;
  border: 1px solid #e0e0e0;
}

.graves-table td {
  border: 1px solid #e0e0e0;
  padding: 10px 12px;
}

/* Estilos para estado de reparación */
.pending {
  color: #ff9800;
  font-weight: 500;
}

.completed {
  color: #4caf50;
  font-weight: 500;
}

.graves-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.graves-table tr:hover {
  background-color: #f1f1f1;
}

/* Acciones */
.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.action-link {
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  padding: 2px 4px;
  border-radius: 3px;
  white-space: nowrap;
}

.edit-link {
  color: #4a7cff;
}

.delete-link {
  color: #ff4a4a;
}

.action-link:hover {
  text-decoration: underline;
  background-color: rgba(0, 0, 0, 0.05);
}

.action-link:active {
  transform: translateY(1px);
}

/* Responsive */
@media (max-width: 768px) {
  .search-group {
    flex-direction: column;
    gap: 10px;
  }
  
  .purple-button {
    width: 100%;
  }
  
  .graves-table-wrapper {
    max-height: none;
    overflow-x: auto;
  }
  
  .graves-table {
    min-width: 700px;
  }
  
  .actions {
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .graves-container {
    padding: 10px;
  }
  
  .graves-box {
    width: 100%;
    padding: 15px;
  }
  
  .table-title h2 {
    font-size: 1.3rem;
  }
  
  .action-link {
    padding: 4px 8px;
  }
}
</style>