<template>
  <div class="repairs-container">
    <div class="repairs-center-box">
   

      <div class="repairs-content-wrapper">
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
        </div>

        <div class="table-title">
          <h2>Listado de Reparaciones</h2> 
        </div>

        <div class="repairs-table-wrapper">
          <table class="repairs-table">
            <thead>
              <tr>
                <th>Número de tumba</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Estatus</th>
                <th>Acciones</th>
               
              </tr>
            </thead>
            <tbody>
              <tr v-for="(owner, index) in filteredOwners" :key="index">
                <td>{{ owner.name }}</td>
                <td>{{ owner.phone }}</td>
                <td>{{ owner.email }}</td>
                <td>{{ owner.curp }}</td>
                <td>{{ owner.deceasedName }}</td>
                <td class="actions">
                  <router-link 
                    :to="{ name: 'editDeceased', params: { id: owner.deceasedId } }" 
                    class="purple-button"
                  >
                    Editar
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getAllOwners } from '@/services/ownerService'

const searchQuery = ref('')
const owners = ref([])

const filteredOwners = computed(() => {
  return owners.value.filter(owner =>
    owner.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    owner.phone.includes(searchQuery.value) ||
    owner.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    owner.curp.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

onMounted(async () => {
  try {
    const response = await getAllOwners();
    owners.value = response;
  } catch (err) {
    console.error('Error al obtener propietarios:', err);
  }
})
</script>

<style scoped>
/* Estilos base del contenedor */
.repairs-container {
  display: flex;
  justify-content: center;
  min-height: 80vh;
  padding: 20px;
  background-color: #f5f5f5;
}

.repairs-center-box {
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

/* Tabs*/
.repairs-tabs-container {
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.repairs-tabs {
  display: flex;
  max-width: 100%;
  margin: 0 auto;
}

.tab-button {
  flex: 1;
  padding: 15px 20px;
  text-align: center;
  text-decoration: none;
  color: #666;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  min-width: 120px;
}

.tab-button:hover {
  background-color: #f9f9f9;
  color: var(--purple-color);
}

.tab-button.active {
  color: var(--purple-color);
  font-weight: 600;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: var(--purple-color);
}

/**/
.repairs-content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.search-group {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  align-items: center;
}

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

.repairs-table-wrapper {
  max-height: 600px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.repairs-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

.repairs-table th {
  background-color: var(--purple-color);
  color: white;
  padding: 12px;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 1;
  border: 1px solid #e0e0e0;
}

.repairs-table td {
  border: 1px solid #e0e0e0;
  padding: 10px 12px;
}

.repairs-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.repairs-table tr:hover {
  background-color: #f1f1f1;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.purple-button {
  padding: 6px 12px;
  background-color: var(--purple-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.purple-button:hover {
  background-color: #5a4fcf;
}

@media (max-width: 768px) {
  .repairs-tabs {
    flex-direction: column; 
    align-items: stretch; 
  }

  .tab-button {
    text-align: left;
    padding: 12px 20px;
   
  }

  .tab-button.active::after {
    content: '';
    position: absolute;
    left: 0;
    right: auto;
    top: 0;
    bottom: 0;
    width: 3px; 
    height: 100%;
    background-color: var(--purple-color);
  }

  
  .repairs-table-wrapper {
    overflow-x: auto;
  }

  .repairs-table {
    min-width: 700px;
  }
}

@media (max-width: 480px) {
  .tab-button {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
}
</style>