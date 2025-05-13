<template>
    <header class="container-background header">
        <div class="logo-div">
            <router-link :to="{name: 'home'}" >
                <img src="../../assets/images/logo.png" class="logo" alt="Graving-logo">
            </router-link>
            <h1>Graving</h1>
        </div>

        <nav class="navegation-bar">
            <router-link v-if="admin" :to="{name: 'dashboard'}" :class="{'current-page': currentPage==='dashboard'}">Panel</router-link>
            <router-link :to="{name: 'home'}" :class="{'current-page': currentPage==='home'}">Inicio</router-link>
            <router-link :to="{name: 'map'}" :class="{'current-page': currentPage==='map'}">Mapa</router-link>

            <div class="dropdown">
                <span class="dropdown-toggle">Cuenta</span>
                <div class="dropdown-menu">
                    <router-link :to="{name: 'profile'}" >Iniciar Sesion</router-link>
                    <router-link :to="{name: 'profile'}" >Registrarse</router-link>
                    <router-link :to="{name: 'profile'}" >Ver Perfil</router-link>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    import { computed } from 'vue'

    const route = useRoute()
    const currentPage = computed(() => route.name)

    const admin = true
</script>

<style scoped>
    .header {
        display: flex;
        justify-content: space-around;
        box-shadow: 2px 2px 8px var(--shadow-color);
    }

    .logo-div {
        display: flex;
        align-items: center;
    }

    .logo {
        width: 7rem;
    }

    .navegation-bar {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 3.5rem;
    }

    .navegation-bar a {
        display: flex;
        align-items: center;
        height: 100%;
        text-decoration: none;
        color: var(--font-color);
        font-size: 1.1rem;
    }

    .navegation-bar a:hover {
        border-bottom: 4px solid var(--purple-color);
        color: var(--purple-color);
    }

    .current-page {
        border-bottom: 4px solid var(--purple-color);
        color: var(--purple-color) !important;
    }

    .dropdown {
        position: relative;
    }

    .dropdown:hover .dropdown-toggle {
        color: var(--purple-color);
    }

    .dropdown-toggle::after {
        content: "▼";
        font-size: 0.7em;
        margin-left: 4px;
    }

    .dropdown-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        background-color: white;
        border-radius: 5px;
        min-width: 150px;
        z-index: 10;
        flex-direction: column;
        row-gap: 1rem;
        padding: 20px;
        box-shadow: 5px 5px 8px var(--shadow-color);
    }

    .dropdown-menu a {
        padding: 10px 5px;
    }
    
    .dropdown:hover .dropdown-menu {
        display: flex;
    }

    @media (max-width: 650px) {

    }
</style>