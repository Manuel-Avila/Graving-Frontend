<template>
  <div class="register-container">
    <img src="../../assets/images/logo.png" class="logo" alt="Graving-logo">
    <h1 class="register-title">Crear perfil</h1>

    <form @submit.prevent="handleRegister">

      <div class="input-group">
        <input type="text" v-model="name" class="register-input" required />
        <label class="input-label">Nombre</label>
      </div>

      <div class="input-group">
        <input type="email" v-model="email" class="register-input" required />
        <label class="input-label">Correo</label>
      </div>

      <div class="input-group">
        <input type="tel" v-model="phoneNumber" class="register-input" required />
        <label class="input-label">Teléfono</label>
      </div>

      <div class="input-group">
        <input type="password" v-model="password" class="register-input" required />
        <label class="input-label">Contraseña</label>
      </div>

      <div class="input-group">
        <input type="password" v-model="confirmPassword" class="register-input" required />
        <label class="input-label">Confirmar contraseña</label>
      </div>

      <button type="submit" class="purple-button">Registrarse</button>
    </form>

    <button class="google-signin-btn">
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
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { register } from '@/services/authService';

  const router = useRouter();

  const name = ref('');
  const email = ref('');
  const phoneNumber = ref('');
  const password = ref('');
  const confirmPassword = ref('');

  const handleRegister = async () => {

    if (!name.value || !email.value || !phoneNumber.value || !password.value || !confirmPassword.value) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (password.value !== confirmPassword.value) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      await register({
        name: name.value,
        email: email.value,
        password: password.value,
        phoneNumber: phoneNumber.value,
        role: 'admin'
      });

      alert('Usuario registrado correctamente');
      router.push({ name: 'login' });
    } catch (err) {
      alert(err.response?.data?.error || 'Error al registrar');
    }
  };
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