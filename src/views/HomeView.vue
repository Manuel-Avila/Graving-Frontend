<template>
  <div class="home-view-top">
    <div class="home-view-logo">
               
          <img src="../assets/images/logo.png" class="logo" alt="Graving-logo">
        
    </div>
    <div class="home-view-components">
         <h1>Busca tumbas,recuerda <br>historias</h1>
         <label>Busca,encuentra y recuerda. Este sitio fue creado rendir<br> homenaje a tus seres queridos</label>
         <button class="purple-button">Iniciar sesión</button>
         <button class="outline-white-button">Registrarse</button>
    </div>
  </div>
  <div class="home-view-map">
    <div class="home-view-map-container">
        <span>c mapa c papu</span>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-view-top {
  display: flex;
  height: 75vh;
  text-align: center;
  
}
.home-view-components{
  display: flex;
  flex-direction: column; 
  align-items: center;    
  justify-content: center;
  gap: 2rem;            
  width: 40%;
  text-align: center;    
  padding: 1rem;
}
.home-view-logo{
  display: flex;
  flex-direction: column; 
  align-items: center;   
  width: 50%;
  justify-content: center; 
  gap: 2rem;            
  text-align: center;   
  padding: 1rem;       
}


.logo{
  width: 650px;
  height: 500px;
}

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
.purple-button{
  margin-top: 30px;
}

h1{
  font-size: 40px;
}

label{
  font-size: 20px;
}

@media (max-width: 800px) {
  .home-view-top {
    flex-direction: column; 
    height: auto; 
    padding: 2rem 0; 
  }
  .home-view-logo,
  .home-view-components {
    width: 90%; 
    margin: auto;
  }
  .home-view-logo {
    order: 1; 
    padding-bottom: 0;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .logo{
    width: 90%;
    max-width: 450px;
    height: auto;
    max-height: 300px;
    margin: auto;
  }
  h1{
    font-size: 30px;
  }
  label{
    font-size: 15px;
  }
  .home-view-components {
    order: 2; 
    gap: 1rem; 
  }
  .home-view-map {
    height: 50vh; 
  }
}



</style>