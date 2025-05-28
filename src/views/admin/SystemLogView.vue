<template>
  <div class="grave-owners-container">
    <div class="grave-owners-box">
      <!-- Barra de búsqueda -->
      <div class="search-group">
        <div class="input-group">
          <input 
            type="text" 
            v-model="searchQuery" 
            class="data-input" 
            placeholder=" " 
          />
          <label class="input-label">Acción</label>
        </div>
      </div>

      <div class="table-title">
        <h2>Bitácora del sistema</h2>
      </div>

      <!-- Tabla -->
      <div class="owners-table-wrapper">
        <table class="owners-table">
          <thead>
            <tr>
              <th>Nombre usuario</th>
              <th>Acción</th>
              <th>Descripción</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(log, index) in filteredLogs" :key="index">
              <td>{{ log.userName }}</td>
              <td>{{ log.action }}</td>
              <td>{{ log.description }}</td>
              <td>{{ formatDate(log.timestamp) }}</td>
            </tr>
          </tbody>
        </table>

      </div>
      <div class="report-section">
        <h3>Reportes (PDF)</h3>
        <button @click="generateDeceasedReport" class="purple-button">Difuntos registrados</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getAllLogs } from '@/services/systemLogService'
import { useToast } from '@/composables/useToast'

const { showToast } = useToast()
const logs = ref([])
const searchQuery = ref('')

onMounted(async () => {
  try {
    logs.value = await getAllLogs()
  } catch (err) {
    showToast('Error al obtener logs', 'error')
  }
})

const filteredLogs = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return q
    ? logs.value.filter(log => log.action.toLowerCase().includes(q))
    : logs.value
})

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

import { jsPDF } from 'jspdf'
import { getAllDeceased } from '@/services/deceasedService'

const PURPLE_RGB = [110, 52, 106]

const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

const generateDeceasedReport = async () => {
  try {
    const deceasedList = await getAllDeceased()
    const doc = new jsPDF()
    let y = 20

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.setTextColor(...PURPLE_RGB)
    doc.text('Reporte de Difuntos Registrados', 105, y, { align: 'center' })
    y += 8
    doc.setDrawColor(...PURPLE_RGB)
    doc.setLineWidth(0.8)
    doc.line(15, y, 195, y)
    y += 10

    doc.setFont('helvetica', '')
    doc.setFontSize(12)
    doc.setTextColor(70, 70, 70)
    doc.text(`Total de difuntos registrados: ${deceasedList.length}`, 15, y)
    y += 8

    for (const d of deceasedList) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(13)
      doc.setTextColor(...PURPLE_RGB)
      doc.text(d.name, 15, y)
      y += 8

      doc.setFont('helvetica', '')
      doc.setFontSize(11)
      doc.setTextColor(70, 70, 70)
      doc.text(`Nacimiento: ${d.birthDate?.slice(0, 10) || '-'}`, 15, y); y += 6
      doc.text(`Fallecimiento: ${d.deathDate?.slice(0, 10) || '-'}`, 15, y); y += 6
      doc.text(`Epitafio: ${d.epitaph || '-'}`, 15, y); y += 6
      doc.text(`Ubicación: ${d.blockName}, Sección ${d.section}, Fila ${d.graveRow}, Tumba #${d.graveNumber}`, 15, y); y += 6

      
      const imageUrl = d.imageUrl || '/images/deceasedPlaceholder.png'

      try {
        const blob = await fetch(imageUrl).then(r => r.blob())
        const base64Img = await blobToBase64(blob)
        doc.addImage(base64Img, 'PNG', 150, y - 35, 40, 40)
      } catch (err) {
        showToast('Error al generar el reporte', 'error')
      }

      y += 10
      doc.setDrawColor(220, 220, 220)
      doc.line(15, y, 195, y)
      y += 10

      if (y > 270) {
        doc.addPage()
        y = 20
      }
    }

    doc.save('Reporte_Difuntos.pdf')
  } catch (error) {
    showToast('Error al generar el reporte', 'error')
  }
}
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

.report-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  text-align: left;
}

.report-section h3 {
  font-size: 1.2rem;
  margin-bottom: 12px;
}

.report-section button {
  width: auto;
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