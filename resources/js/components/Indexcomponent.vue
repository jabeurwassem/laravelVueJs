<template>
    <div class="container">

        <router-view></router-view>
    </div>
</template>

<script>
import accueil from './accueil.vue'
    export default {
        name:'accueil',
        components:accueil,
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>