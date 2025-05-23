<template>
  <div class="deceased-container">
    <h2>Buscador de Difuntos</h2>
    

    <div class="search-section">
      <div class="search-group">
       
        <div class="input-group">
          <input 
            type="text" 
            v-model="searchQuery" 
            class="data-input" 
            placeholder=" " 
          />
          <label class="input-label">Nombre del difunto</label>
        </div>
      </div>
    </div>

    <div class="results-container" v-if="showResults">
      <button 
        class="purple-button arrow-button" 
        @click="prevCard" 
        v-show="canScrollLeft"
        aria-label="Resultados anteriores"
      >
        &lt;
      </button>
      
      <div class="cards-wrapper">
        <div 
          class="cards-track" 
          :style="{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }"
        >
          <DeceasedCard 
            v-for="(deceased, index) in filteredDeceased" 
            :key="index"
            :deceased="formatDeceasedData(deceased)"
            class="fixed-size-card"
            :class="{ 
              'single-card': filteredDeceased.length === 1,
              'double-card': filteredDeceased.length === 2
            }"
          />
        </div>
      </div>
      
      <button 
        class="purple-button arrow-button" 
        @click="nextCard" 
        v-show="canScrollRight"
        aria-label="Siguientes resultados"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import { getAllDeceased } from '@/services/deceasedService'
  import DeceasedCard from '@/components/deceased/DeceasedCard.vue'
  import { useToast } from '@/composables/useToast'

  const { showToast } = useToast()
  const searchQuery = ref('')
  const currentIndex = ref(0)
  const allDeceased = ref([])
  const cardsToShow = 3

  const filteredDeceased = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()
    return query
      ? allDeceased.value.filter(d =>
          d.name.toLowerCase().includes(query)
        )
      : allDeceased.value
  })

  const formatDeceasedData = (deceased) => ({
    id: deceased.id,
    name: deceased.name,
    imageUrl: deceased.imageUrl,
    graveNumber: deceased.graveNumber,
    deathDate: new Date(deceased.deathDate).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  })

  const showResults = computed(() => filteredDeceased.value.length > 0)
  const canScrollLeft = computed(() => currentIndex.value > 0)
  const canScrollRight = computed(() => {
    return currentIndex.value < Math.ceil(filteredDeceased.value.length / cardsToShow) - 1
  })

  const nextCard = () => {
    if (canScrollRight.value) currentIndex.value++
  }

  const prevCard = () => {
    if (canScrollLeft.value) currentIndex.value--
  }

  onMounted(async () => {
    try {
      const response = await getAllDeceased()
      allDeceased.value = response
    } catch (err) {
      console.error('Error al obtener difuntos:', err)
      showToast('Error al obtener difuntos', 'error')
    }
  })

  watch(searchQuery, () => {
    currentIndex.value = 0
  })
</script>


<style scoped>
.deceased-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f5f5f5;
}

h2 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}


.search-section {
  margin-bottom: 60px;
}

.search-group {
  display: flex;
  gap: 15px;
  align-items: center;
}

.input-group {
  flex-grow: 1;
  position: relative;
}

.results-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  justify-content: center;
}

.cards-wrapper {
  width: calc(300px * 3 + 20px * 2); 
  overflow: hidden;
}

.cards-track {
  display: flex;
  transition: transform 0.3s ease;
  gap: 20px;
}

/* Tarjetas de tamaño fijo */
.fixed-size-card {
  width: 300px;
  min-width: 300px;
  flex-shrink: 0;
}


.fixed-size-card.single-card {
  margin: 0 auto;
}

.fixed-size-card.double-card {
  margin: 0 auto;
}

.arrow-button {
  font-size: 1.4rem; 
  padding: 0.5rem 1rem;
  border-radius: 50px;
}

@media (max-width: 1024px) {
  .cards-wrapper {
    width: calc(280px * 3 + 15px * 2);
  }
  
  .fixed-size-card {
    width: 280px;
    min-width: 280px;
  }
}

@media (max-width: 900px) {
  .cards-wrapper {
    width: calc(250px * 3 + 10px * 2);
  }
  
  .fixed-size-card {
    width: 250px;
    min-width: 250px;
  }
}

@media (max-width: 768px) {
  .search-group {
    flex-direction: column;
  }
  
  .cards-wrapper {
    width: 100%;
  }
  
  .cards-track {
    flex-direction: column;
    gap: 15px;
  }
  
  .fixed-size-card {
    width: 100%;
    min-width: 100%;
  }
}
</style>