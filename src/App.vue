<template>
  <div class="layout">
    <AppHeader v-if="showLayout"/>
    <main>
      <router-view/>
    </main>
    <AppFooter v-if="showLayout"/>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'

  import AppHeader from './components/layout/AppHeader.vue'
  import AppFooter from './components/layout/AppFooter.vue'

   const route = useRoute()
   const noLayoutRoutes = ['login', 'register']

   const showLayout = computed(() => !noLayoutRoutes.includes(route.name))
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
    border: none;
    padding: 0.75rem 1.5rem; 
    border-radius: 0.4rem;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: auto; /* Ancho según contenido */
    width: 240px; /* Ancho máximo (320px) */
    height: 45px;
    display: inline-block; /* Para que no ocupe el 100% */
    box-shadow: 5px 5px 8px var(--shadow-color);

   
    &:hover {
      background-color: #974392;
    }


  }
  .outline-white-button{
    color: var(--purple-color);
    border: 1px solid white;
    border-color: var(--purple-color);
    padding: 0.75rem 1.5rem; 
    border-radius: 0.4rem;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: auto; /* Ancho según contenido */
    width: 240px; /* Ancho máximo (320px) */
    height: 45px;
    display: inline-block; /* Para que no ocupe el 100% */
    box-shadow: 5px 5px 8px var(--shadow-color);


    &:hover {
      background-color: #974392;
    }


  }
</style>




