<template>
  <div>
    <div class="row">
      <div class="col-4">
        <img :src="props.voiture.image" class="img-fluid" alt="Car Image" />
      </div>
      <div class="col-8">
        <table class="table table-striped">
          <tbody>
            <tr>
              <th scope="row">Marque</th>
              <td>{{ props.voiture.marque }}</td>
            </tr>
            <tr>
              <th scope="row">Modèle</th>
              <td>{{ props.voiture.modele }}</td>
            </tr>
            <tr>
              <th scope="row">Année de création</th>
              <td>{{ props.voiture.annee }}</td>
            </tr>
            <tr>
              <th scope="row">Prix par jour</th>
              <td>{{ props.voiture.prix_journalier }}£</td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-outline-primary" @click="addToCartAndRedirect(props.voiture)">
          reserver
        </button>
      
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import store from "../../store";
import { inject } from 'vue';
const parentRouteParams = inject('parentRouteParams');
console.log('Parent Route Params:', parentRouteParams);

const router = useRouter();
const props = defineProps(["voiture", "date"]);

const addToCartAndRedirect = (voiture) => {
  store.commit("Voiturestore/addVoiture", { voiture });

  router.push({
    name: "formulaireReservation",
    params: {
      startDate: parentRouteParams.startDate,
      endDate: parentRouteParams.endDate,
    },
  });
};
</script>

<style scoped>
  .img-fluid {
    max-width: 100%;
    height: auto;
  }
</style>
