<template>
  <div>
    <div class="top-navbar bg-dark text-light text-center py-2">
      <p class="fas fa-clock">Lundi - Vendredi : de 8h à 17h</p>
      <p class="fas fa-phone">(+216) 94 260 000 - (+216) 94 120 000</p>
      <a href="https://www.facebook.com/profile.php?id=61555607077738" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-facebook-f"></i> Visitez notre page Facebook
      </a>
    </div>
    <br />
    <h3 style="text-align: center;">
       
       Explorer nos offres, des prix unbattables et une qualité superbe. 
    </h3>
    <br> <br>
    <infoVoiture
      v-for="voiture in voitures"
      :key="voiture.id"
      :voiture="voiture"
      :date="date"
    />
  </div>
</template>

<script setup>
import infoVoiture from "./infoVoiture.vue";
import api from "../config/api.js";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { provide } from 'vue';


const router = useRouter();
const route = useRoute();
const voitures = ref([]);
const startDate = ref(route.params.startDate);
const endDate = ref(route.params.endDate);
const date = ref({
  startDate: route.query.startDate,
  endDate: route.query.endDate,
});
console.log(date.value.startDate);



onMounted(async () => {
  await getvoitures();
  console.log(startDate.value);
  console.log(endDate.value);
});

provide('parentRouteParams', { startDate: startDate.value , endDate:  endDate.value });

const getvoitures = async () => {
  try {
    const res = await api.get("http://localhost:8000/api/voitures");
    voitures.value = res.data;
  } catch (error) {
    console.error(error);
  }
};
</script>
