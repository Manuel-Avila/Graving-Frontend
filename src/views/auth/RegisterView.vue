<template>
  <div class="register-container">
    <img src="../../assets/images/logo.png" class="logo" alt="Graving-logo">
    <h1 class="register-title">Crear perfil</h1>

    <form @submit.prevent="handleRegister">

      <div class="input-group">
        <input type="text" v-model="name" class="register-input" required />
        <label class="input-label" :class="{ 'input-label-focused': name }">Nombre</label>
      </div>

      <div class="input-group">
        <input type="email" v-model="email" class="register-input" required />
        <label class="input-label" :class="{ 'input-label-focused': email }">Correo</label>
      </div>

      <div class="input-group">
        <input type="tel" v-model="phoneNumber" class="register-input" required />
        <label class="input-label" :class="{ 'input-label-focused': phoneNumber }" >Teléfono</label>
      </div>

      <div class="input-group">
        <input type="password" v-model="password" class="register-input" required />
        <label class="input-label" :class="{ 'input-label-focused': password }" >Contraseña</label>
      </div>

      <div class="input-group">
        <input type="password" v-model="confirmPassword" class="register-input" required />
        <label class="input-label" :class="{ 'input-label-focused': confirmPassword }" >Confirmar contraseña</label>
      </div>

      <button type="submit" class="purple-button">Registrarse</button>
    </form>

    <button @click="handleGoogleLogin" class="google-signin-btn">
      <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" class="google-logo">
      <span>Registrarse con Google</span>
    </button>

    <div class="separator"></div>
    <p class="register-label">¿Ya tienes una cuenta?</p>
    <router-link :to="{ name: 'login' }" class="purple-button medium-size">Iniciar Sesión</router-link>
    <router-link :to="{ name: 'home' }" class="outline-white-button">Regresar</router-link>
  </div>
</template>

<script setup>
  import { ref, nextTick } from 'vue'
  import { useRouter } from 'vue-router'
  import { register, loginGoogle } from '@/services/authService'
  import { useAuthStore } from '@/stores/authStore'
  import { useToast } from '@/composables/useToast'

  const { showToast } = useToast()
  const router = useRouter();
  const authStore = useAuthStore()

  const name = ref('');
  const email = ref('');
  const phoneNumber = ref('');
  const password = ref('');
  const confirmPassword = ref('');

  const handleRegister = async () => {
    try {
      await register({
        name: name.value,
        email: email.value,
        password: password.value,
        phoneNumber: phoneNumber.value
      });

      showToast('Registro exitoso!', 'success');
      await nextTick()
      router.push({ name: 'login' });
    } catch (err) {
      showToast('Error al registrarse. Por favor, inténtalo de nuevo.', 'error');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const data = await loginGoogle()
      authStore.setAuth(data.token, data.user)
      showToast('Registro exitoso!', 'success');
      await nextTick()
      router.push({ name: 'profile' })
    } catch (error) {
      console.error('Error al registrarse con Google:', error)
      showToast('Error al registrarse con Google!', 'error');
      await nextTick()
    }
  }
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

form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
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
  width: 200px;
}

.purple-button {
  margin-top: 30px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 280px;
  min-width: 200px;
}

</style>