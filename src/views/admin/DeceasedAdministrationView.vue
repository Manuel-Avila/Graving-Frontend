<template>
  <div class="deceased-container">
    <h2>Administración de Difuntos</h2>
    

    <div class="search-section">
      <div class="search-group">
       
        <div class="input-group">
          <input 
            type="text" 
            v-model="searchQuery" 
            class="data-input" 
            placeholder=" " 
            @keyup.enter="searchDeceased"
          />
          <label class="input-label">Nombre del difunto</label>
        </div>
        <button class="purple-button" @click="searchDeceased">Buscar</button>
      </div>
    </div>

    <div class="results-container" v-if="showResults">
      <button 
        class="nav-arrow left-arrow" 
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
            v-for="(deceased, index) in deceasedResults" 
            :key="index"
            :deceased="formatDeceasedData(deceased, index)"
            class="fixed-size-card"
            :class="{ 
              'single-card': deceasedResults.length === 1,
              'double-card': deceasedResults.length === 2
            }"
          />
        </div>
      </div>
      
      <button 
        class="nav-arrow right-arrow" 
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
import { ref, computed } from 'vue';
import DeceasedCard from '@/components/deceased/DeceasedCard.vue';


const INITIAL_RESULTS_COUNT = 5; 

const searchQuery = ref('');
const currentIndex = ref(0);
const deceasedResults = ref([]);
const cardsToShow = 3; 


const mockResults = [
  { id: 1, name: 'Juan Pérez', date: '15/03/1990 - 10/05/2023' },
  { id: 2, name: 'María García', date: '22/07/1985 - 05/01/2023' },
  { id: 3, name: 'María García', date: '22/07/1985 - 05/01/2023' },
  { id: 4, name: 'María García', date: '22/07/1985 - 05/01/2023' },
  
];


const formatDeceasedData = (deceased, index) => ({
  name: deceased.name,
  deathDate: deceased.date.split(' - ')[1],
  graveNumber: index + 1
});


const searchDeceased = () => {
  deceasedResults.value = searchQuery.value 
    ? mockResults.filter(d => 
        d.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    : mockResults.slice(0, INITIAL_RESULTS_COUNT); 
  
  currentIndex.value = 0;
};


const showResults = computed(() => deceasedResults.value.length > 0);
const canScrollLeft = computed(() => currentIndex.value > 0);
const canScrollRight = computed(() => {

  return currentIndex.value < Math.ceil(deceasedResults.value.length / cardsToShow) - 1;
});


const nextCard = () => {
  if (canScrollRight.value) {
    currentIndex.value++;
  }
};

const prevCard = () => {
  if (canScrollLeft.value) {
    currentIndex.value--;
  }
};


searchDeceased();
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


.nav-arrow {
  background: var(--purple-color);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  flex-shrink: 0;
}

.nav-arrow:hover {
  background: var(--purple-color-dark);
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
  
  .nav-arrow {
    display: none;
  }
}
</style>