
<script setup>
import login from './components/authentification/login.vue';
import Menu from './components/MenuAdmin.vue';
import accueil from './components/accueil.vue';
import Home from './components/home.vue';
</script>
<template>
    <RouterView><Home/></RouterView>
    <router-view></router-view>
</template>