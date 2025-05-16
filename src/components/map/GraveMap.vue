<template>
    <div class="home-view-map">
    <div class="home-view-map-container">
        <span>c mapa c papu</span>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
    .home-view-map{
        position: relative;
        display: flex;
        justify-content: center; 
        align-items: center;     
        width: 100%;
        height: 70vh;
        padding: auto;
    
    }
    .home-view-map-container{
        width: 80%;
        height: 80%;
        background-color: #ffffff;
    
    }
    
    @media (max-width: 800px) {
        .home-view-map {
            height: 50vh; 
        }
    }
</style>