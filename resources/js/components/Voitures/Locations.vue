<template>
  <div>
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
const date = ref({
  startDate: route.query.startDate,
  endDate: route.query.endDate,
});

const startDate = ref(route.params.startDate);
const endDate = ref(route.params.endDate);


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
