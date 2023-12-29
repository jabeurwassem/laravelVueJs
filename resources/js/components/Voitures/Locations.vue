<template>
  <div>
      <br />
      <h3>
          Pas d’avance de frais, paiement final au magasin
          <strong>Chèques / Espèces</strong>
   
      </h3> 
      
      <infoVoiture v-for="voiture in voitures" :key="voiture.id" :voiture="voiture"/>
  </div>
</template>

<script setup>
import infoVoiture from "./infoVoiture.vue";
import api from "../config/api.js";
import { ref, onMounted } from "vue";
const voitures = ref([]);
onMounted(() => {
  getvoitures();
});

const getvoitures = async () => {
  
  await api
        .get("http://localhost:8000/api/voitures")
      .then((res) => {
        voitures.value = res.data;
        //  isLoading.value = false;
      })
      .catch((error) => {
          console.log(error);
      });
};
</script>