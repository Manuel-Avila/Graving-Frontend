<template>
  <div class="repairs-container">
    <div class="repairs-center-box">
      <div class="repairs-content-wrapper">
        <h2>Filtros</h2>
        <div class="search-group">
          <div class="input-group">
            <input 
              type="text" 
              v-model="searchQuery" 
              class="data-input" 
              placeholder=" " 
            />
            <label class="input-label">Buscar reparación</label>
          </div>
          <div class="input-group">
            <select v-model="filterType" class="data-input">
              <option value="">Todos los tipos</option>
              <option value="cleaning">Limpieza</option>
              <option value="painting">Pintura</option>
              <option value="graffitiRemoval">Remoción de grafiti</option>
              <option value="landscaping">Jardinería</option>
              <option value="structureRepair">Reparación estructural</option>
              <option value="drainage">Drenaje</option>
              <option value="other">Otro</option>
            </select>
            <label class="input-label">Filtrar por tipo</label>
          </div>
        </div>
        <div class="table-title">
          <h2>Listado de Reparaciones</h2> 
        </div>

        <div class="repairs-table-wrapper">
          <table class="repairs-table">
            <thead>
              <tr>
                <th>N° Tumba</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="repair in filteredRepairs" :key="repair.id">
                <td>{{ repair.graveNumber }}</td>
                <td>{{ formatType(repair.type) }}</td>
                <td>{{ repair.description }}</td>
                <td>{{ formatDate(repair.date) }}</td>
                <td>
                  <span 
                    :class="{
                      'status-pending': repair.status === 'pending',
                      'status-completed': repair.status === 'completed'
                    }"
                  >
                    {{ formatStatus(repair.status) }}
                  </span>
                </td>
                <td class="actions">
                  <button 
                    v-if="repair.status === 'pending'" 
                    @click="handleMarkCompleted(repair.id)"
                    class="purple-button"
                  >
                    Marcar como completada
                  </button>
                  <span v-else class="text-muted">—</span>
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
import { getAllRepairs, markRepairAsCompleted } from '@/services/repairService'
import { useToast } from '@/composables/useToast'

const repairs = ref([])
const searchQuery = ref('')
const { showToast } = useToast()
const filterType = ref('')

const filteredRepairs = computed(() => {
  const q = searchQuery.value.toLowerCase()

  return repairs.value.filter(repair =>
    (repair.description.toLowerCase().includes(q) ||
     repair.status.toLowerCase().includes(q) ||
     repair.graveNumber.toString().includes(q)) &&
    (filterType.value === '' || repair.type === filterType.value)
  )
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatType = (type) => {
  const map = {
    cleaning: 'Limpieza',
    painting: 'Pintura',
    graffitiRemoval: 'Remoción de grafiti',
    landscaping: 'Jardinería',
    structureRepair: 'Reparación estructural',
    drainage: 'Drenaje',
    other: 'Otro'
  }
  return map[type] || type
}

const formatStatus = (status) => {
  return status === 'pending'
    ? 'Pendiente'
    : status === 'completed'
    ? 'Completada'
    : status
}

const handleMarkCompleted = async (id) => {
  try {
    await markRepairAsCompleted(id)
    showToast('Reparación marcada como completada', 'success')
    const response = await getAllRepairs()
    repairs.value = response
  } catch (err) {
    showToast('Error al actualizar reparación', 'error')
  }
}

onMounted(async () => {
  try {
    repairs.value = await getAllRepairs()
  } catch (err) {
    showToast('Error al actualizar reparación', 'error')
  }
})
</script>

<style scoped>
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
  flex-direction: column;
  margin-bottom: 10px;
  gap: 10px; 
  align-items: center;
}

.input-group {
  margin: 20px;
}

.table-title {
  margin-top: 10px;
  margin-bottom: 10px;
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
  padding: 10px 15px;
  
}

.status-pending {
  color: #ff9800;
  font-weight: bold;
}

.status-completed {
  color: #4caf50;
  font-weight: bold;
}

.text-muted {
  color: #999;
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