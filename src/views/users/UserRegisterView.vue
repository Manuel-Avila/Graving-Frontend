<template>
  <div class="register-container">
    <img src="../../assets/images/logo.png" class="logo" alt="Graving-logo">
    <h1 class="register-title">Crear perfil</h1>

    
    <div class="input-group">
      <input 
        type="text" 
        v-model="username" 
        class="register-input"
        required
      >
      <label class="input-label" :class="{ 'input-label-focused': username }">Nombre</label>
    </div>

    <div class="input-group">
      <input 
        type="password" 
        v-model="password" 
        class="register-input"
        required
      >
      <label class="input-label" :class="{ 'input-label-focused': password }">Correo</label>
    </div>

        <div class="input-group">
      <input 
        type="text" 
        v-model="username" 
        class="register-input"
        required
      >
      <label class="input-label" :class="{ 'input-label-focused': username }">Teléfono</label>
    </div>

        <div class="input-group">
      <input 
        type="text" 
        v-model="username" 
        class="register-input"
        required
      >
      <label class="input-label" :class="{ 'input-label-focused': username }">Contraseña</label>
    </div>

        <div class="input-group">
      <input 
        type="text" 
        v-model="username" 
        class="register-input"
        required
      >
      <label class="input-label" :class="{ 'input-label-focused': username }">Confirmar contraseña</label>
    </div>

    <button type="submit" class="purple-button">Iniciar sesión</button>
    <div class="separator"></div>
    <p class="register-label">¿Ye tienes una cuenta?</p>
    <button type="button" class="outline-white-button">Regresar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');
</script>

<style scoped>

.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.logo {
  width: 230px;
  height: 140px;
}

.register-title {
  font-size: 30px;
  margin-bottom: 25px;
  color: #333;
}

.input-group {
  position: relative;
  width: 89%;
  margin-bottom: 20px;
  margin-top: 28px;
}

.register-input {
  width: 100%;
  padding: 12px;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  background: transparent;
  outline: none;
}

.register-input:focus {
  border-bottom-color: #7E57C2; 
}

.input-label {
  position: absolute;
  left: 0;
  top: 12px;
  color: #999;
  pointer-events: none;
  transition: all 0.3s ease;
  font-size: 16px;
}

.input-label-focused, .register-input:focus + .input-label {
  top: -15px;
  font-size: 12px;
  color: #7E57C2; 
}


.separator {
  height: 1px;
  background-color: #ddd;
  margin: 10px 0;
  width: 100%;
}

.register-label {
  text-align: center;
  color: #666;
  font-size: 12px;
  
}

.outline-white-button {
  margin-top: 23px;
  width: 180px;
  
}
.purple-button {
  margin-top: 30px;
  margin-bottom: 20px;
  width: 280px;
  
}
</style>