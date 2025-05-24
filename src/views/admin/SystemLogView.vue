<template>
  <div class="grave-owners-container">
    <div class="grave-owners-box">
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
        <h2>Listado de Representantes</h2>
      </div>

      <div class="owners-table-wrapper">
        <table class="owners-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Curp</th>
              <th>Difunto</th>
              <th>Funciones</th>
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
                <router-link :to="{ name: 'editDeceased', params: { id: owner.deceasedId } }" class="purple-button">Editar</router-link>
              </td>
            </tr>
          </tbody>
        </table>
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
.grave-owners-container {
  display: flex;
  justify-content: center;
  min-height: 80vh;
  padding: 20px;
  background-color: #f5f5f5;
}

.grave-owners-box {
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

.purple-button {
  width: 4rem;
}

.owners-table-wrapper {
  max-height: 600px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.owners-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

.owners-table th {
  background-color: var(--purple-color);
  color: white;
  padding: 12px;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 1;
  border: 1px solid #e0e0e0;
}

.owners-table td {
  border: 1px solid #e0e0e0;
  padding: 10px 12px;
}

.owners-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.owners-table tr:hover {
  background-color: #f1f1f1;
}

/* Estilos para los textos clickeables */
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
  
  .owners-table-wrapper {
    max-height: none;
    overflow-x: auto;
  }
  
  .owners-table {
    min-width: 700px;
  }
  
  .actions {
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .grave-owners-container {
    padding: 10px;
  }
  
  .grave-owners-box {
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