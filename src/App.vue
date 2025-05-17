<template>
  <div class="layout">
    <AppHeader v-if="showLayout"/>
    <main>
      <router-view/>
    </main>
    <AppFooter v-if="showLayout"/>
  </div>
  <ToastContainer ref="toastRef" />
</template>

<script setup>
  import { useRoute } from 'vue-router'
  import { computed, ref, onMounted } from 'vue'
  import { setToastRef } from '@/composables/useToast'

  import AppHeader from './components/layout/AppHeader.vue'
  import AppFooter from './components/layout/AppFooter.vue'
  import ToastContainer from '@/components/ui/ToastContainer.vue'

  const route = useRoute()
  const noLayoutRoutes = ['login', 'register']

  const showLayout = computed(() => !noLayoutRoutes.includes(route.name))

  const toastRef = ref(null)

  onMounted(() => {
    setToastRef(toastRef.value)
  })
</script>

<style>
  :root {
    --background-color: #f5f5f7;
    --font-color: #1f1f20;
    --shadow-color: rgba(0, 0, 0, 0.2);
    --purple-color: #6e346a;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: var(--background-color);
    color: var(--font-color);
  }

  body, p, span, li, a, input, textarea {
    font-family: 'Lato', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
  }

  main {
    flex: 1;
  }

  button {
    transition: transform 0.3s ease;
  }

  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .container-background {
    background-color: white;
  }

  .purple-button{
    background-color: var(--purple-color);
    color: white;
    text-decoration: none;
    text-align: center;
    border: none;
    padding: 0.75rem 1.5rem; 
    border-radius: 0.4rem;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;
    max-width: 300px;
    display: inline-block;
    box-shadow: 5px 5px 8px var(--shadow-color);
  }

  .purple-button:hover {
    background-color: #974392;
  }

  .outline-white-button{
    color: var(--purple-color);
    border: 1px solid white;
    border-color: var(--purple-color);
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    text-align: center;
    border-radius: 0.4rem;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;
    max-width: 300px;
    display: inline-block;
    box-shadow: 5px 5px 8px var(--shadow-color);
  }

  .outline-white-button:hover {
    background-color: #974392;
    color: white;
  }

  button:hover, .purple-button:hover, .outline-white-button:hover {
    transform: translateY(-3px);
  }

  a.purple-button {
    padding: 0.75rem 0;
    
  }

  a.outline-white-button {
    padding: 0.75rem 0;
  }

  .google-signin-btn {
    display: inline-flex;
    align-items: center;
    background-color: white;
    color: #444;
    border: 1px solid #ccc;
    border-radius: 24px;
    padding: 10px 16px;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.2s ease;
  }

  .google-signin-btn:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }

  .google-logo {
    width: 18px;
    height: 18px;
    margin-right: 12px;
  }
</style>




