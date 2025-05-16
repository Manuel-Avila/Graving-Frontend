<template>
  <div class="login-container">
    <img src="../../assets/images/logo.png" class="logo" alt="Graving-logo">
    <h1 class="login-title">Iniciar sesión</h1>
    
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <input 
          type="email" 
          v-model="email" 
          class="login-input"
          required
        >
        <label class="input-label" :class="{ 'input-label-focused': email }">Correo</label>
      </div>

      <div class="input-group">
        <input 
          type="password" 
          v-model="password" 
          class="login-input"
          required
        >
        <label class="input-label" :class="{ 'input-label-focused': password }">Contraseña</label>
      </div>

      <button type="submit" class="purple-button">Iniciar sesión</button>
    </form>

    <button @click="handleGoogleLogin" class="google-signin-btn">
      <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" class="google-logo">
      <span>Iniciar Sesión con Google</span>
    </button>
    <div class="separator"></div>
    <p class="login-label">¿Aún no tienes una cuenta?</p>
    <router-link :to="{name: 'register'}" class="purple-button medium-size">Registrate</router-link>
    <router-link :to="{name: 'home'}" class="outline-white-button">Regresar</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { login, loginGoogle } from '@/services/authService'
import { useAuthStore } from '@/stores/authStore'

const email = ref('test1@gmail.com')
const password = ref('test1')
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    const data = await login({ email: email.value, password: password.value })
    authStore.setAuth(data.token, data.user)
    router.push({ name: 'profile' })
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    alert('Correo o contraseña incorrectos.')
  }
}

const handleGoogleLogin = async () => {
  try {
    const data = await loginGoogle()
    authStore.setAuth(data.token, data.user)
    router.push({ name: 'profile' })
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error)
    alert('Error al iniciar sesión con Google.')
  }
}

</script>

<style scoped>

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.logo {
  margin-top: 30px;
  width: 230px;
  height: 140px;
}

.login-title {
  font-size: 30px;
  margin-bottom: 25px;
  color: #333;
}

.input-group {
  position: relative;
  width: 89%;
  margin-bottom: 20px;
  margin-top: 40px;
}

.login-input {
  width: 100%;
  padding: 12px;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  background: transparent;
  outline: none;
}

.login-input:focus {
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

.input-label-focused, .login-input:focus + .input-label {
  top: -15px;
  font-size: 12px;
  color: #7E57C2; 
}


.separator {
  height: 1px;
  background-color: #ddd;
  margin: 20px 0;
  width: 100%;
}

.login-label {
  text-align: center;
  color: #666;
  font-size: 12px;
  
}

.outline-white-button {
  margin-top: 30px;
  width: 180px;
  
}
.purple-button {
  margin-top: 40px;
  margin-bottom: 20px;
  width: 280px;
}
</style>