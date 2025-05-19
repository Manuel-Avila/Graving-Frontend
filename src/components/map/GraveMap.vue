<template>
  <div class="home-view-map">
    <div class="home-view-map-container">
      <div class="cemetery-map-scroll">
        <div class="cemetery-blocks">
   
          <div class="block" v-for="block in 4" :key="'block-'+block">
            <div class="block-title">Manzana {{ block }}</div>
      
            <div class="row" v-for="row in 5" :key="'row-'+row">
       
              <div class="grave-container" v-for="grave in 5" :key="'grave-'+grave">
                <button 
                  class="grave"
                  :class="{
                    'occupied': isGraveOccupied(block, row, grave),
                    'selected': isGraveSelected(block, row, grave)
                  }"
                  @click="toggleGraveModal(block, row, grave)"
                >
                  {{ getGraveLetter(block, row) }}{{ grave }}
                </button>
             
                <div 
                  class="grave-modal"
                  :class="{
                    'top-modal': block <= 2,
                    'bottom-modal': block > 2
                  }"
                  v-if="showModal && currentGrave === getGraveId(block, row, grave)"
                  @click.stop
                >
                  <div class="modal-content">
                    <h3>Tumba {{ getGraveLetter(block, row) }}{{ grave }}</h3>
                    <p v-if="isGraveOccupied(block, row, grave)">
                      Esta tumba está ocupada
                    </p>
                    <p v-else>
                      Esta tumba está disponible
                    </p>
                    
                    <div class="modal-actions">
                      <template v-if="isGraveOccupied(block, row, grave)">
                        <button class="purple-button" @click="viewDeceased(block, row, grave)">
                          Ver Difunto
                        </button>
                        <button class="green-button" @click="generateVisit(block, row, grave)">
                          Generar Visita
                        </button>
                      </template>
                      <button v-else class="purple-button" @click="registerDeceased(block, row, grave)">
                        Registrar Difunto
                      </button>
                      <button class="outline-white-button" @click="closeModal">
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';


const occupiedGraves = ref({
  'A1': true,   
  'C4': true, 
  'F2': true,   
  'K3': true, 
});

const showModal = ref(false);
const currentGrave = ref(null);
const selectedGrave = ref(null);


const getGraveLetter = (block, row) => {
  const letterIndex = (block - 1) * 5 + (row - 1);
  return String.fromCharCode(65 + letterIndex);
};


const getGraveId = (block, row, grave) => {
  return `${getGraveLetter(block, row)}${grave}`;
};

const isGraveOccupied = (block, row, grave) => {
  return occupiedGraves.value[getGraveId(block, row, grave)];
};

const isGraveSelected = (block, row, grave) => {
  return selectedGrave.value === getGraveId(block, row, grave);
};

const toggleGraveModal = (block, row, grave) => {
  const graveId = getGraveId(block, row, grave);
  selectedGrave.value = graveId;
  
  if (currentGrave.value === graveId && showModal.value) {
    closeModal();
  } else {
    currentGrave.value = graveId;
    showModal.value = true;
  }
};

const closeModal = () => {
  showModal.value = false;
  currentGrave.value = null;
};

const viewDeceased = (block, row, grave) => {
  console.log('Ver difunto en:', getGraveId(block, row, grave));
  closeModal();
};

const generateVisit = (block, row, grave) => {
  console.log('Generar visita a:', getGraveId(block, row, grave));
  closeModal();
};

const registerDeceased = (block, row, grave) => {
  console.log('Registrar difunto en:', getGraveId(block, row, grave));
  closeModal();
};
</script>
<style scoped>

.home-view-map {
  position: relative;
  display: flex;
  justify-content: center; 
  align-items: center;     
  width: 100%;
  height: 70vh;
  padding: 20px;
  box-sizing: border-box;
}

.home-view-map-container {
  width: 100%;
  max-width: 1600px;
  height: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.cemetery-map-scroll {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 15px;
  box-sizing: border-box;
}

.cemetery-blocks {
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  grid-template-rows: repeat(2, minmax(200px, 1fr));
  gap: 20px;
  min-width: fit-content;
  min-height: fit-content;
}

.block {
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  background-color: #f9f9f9;
  min-width: 300px;
}

.block-title {
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
  color: var(--purple-color);
  font-size: 1.1rem;
}

.row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.grave-container {
  position: relative;
  display: inline-block;
}

.grave {
  width: 60px;
  height: 40px;
  border: 1px solid #b0bec5;
  border-radius: 6px;
  background-color: #432c48;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
  color: #ffffff;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

.grave.occupied {
  background-color: #ccc;
  color: #ffffff;
}

.grave.selected {
  border: 2px solid #7E57C2;
  box-shadow: 0 0 12px rgba(126, 87, 194, 0.6);
}


.grave-modal {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 150px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 15px;
  animation: fadeIn 0.2s ease-out;
}


.grave-modal.top-modal {
  top: 100%;
  margin-top: 10px;
}

.grave-modal.bottom-modal {
  bottom: 100%;
  margin-bottom: 10px;
}

.modal-content {
  text-align: center;
}

.modal-content h3 {
  margin-top: 0;
  color: #7E57C2;
  font-size: 1rem;
}

.modal-content p {
  margin: 10px 0;
  color: #555;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 15px;
}

.modal-btn {
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.purple-button,
.green-button,
.outline-white-button{
    font-size: 12px;
}
.outline-white-button{
    height:40px;

}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-50%) translateY(10px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}


@media (max-width: 768px) {
  .home-view-map {
    height: 80vh;
    padding: 10px;
  }
  
  .cemetery-blocks {
    gap: 15px;
  }
  
  .block {
    min-width: 250px;
    padding: 10px;
  }
  
  .grave {
    width: 50px;
    height: 35px;
  }
  
  .grave-modal {
    width: 100px;
  }
  .purple-button,
.green-button,
.outline-white-button{
    font-size: 10px;
   
}
}

@media (max-width: 600px) {
     .purple-button,
.green-button,
.outline-white-button{
    font-size: 10px;
  
}
  .block {
    min-width: 200px;
  }
  
  .grave {
    width: 40px;
    height: 30px;
    font-size: 9px;
  }
  
  .grave-modal {
    width: 100px;
    padding: 10px;
  }
  
  .modal-btn {
    padding: 6px 10px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .cemetery-map-scroll {
    padding: 10px;
  }
  
  .block {
    min-width: 180px;
  }
  
  .grave {
    width: 35px;
    height: 25px;
    font-size: 8px;
  }
}
</style>