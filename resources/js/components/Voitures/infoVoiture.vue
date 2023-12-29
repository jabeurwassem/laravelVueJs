<template>
  <div>
    <div class="row">
      <div class="col-4"><img :src="props.voiture.image" /></div>
      <div class="col-5 namevoiture">
       
        <h4>{{ props.voiture.marque }}</h4>
        <h6>Modéle de ce vélo : {{ props.voiture.modele }}</h6>
        <h6>Année de création : {{ props.voiture.annee }}</h6>
        <h6>Prix par jour : {{ props.voiture.prix_journalier }}£</h6>
        <button class="btn btn-outline-primary" @click="addToCartAndRedirect(voiture)">Add to Cart</button>
    <span>{{ store.state.Voiturestore.cart.length }}</span>
      </div>
      <div class="col-3">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item me-3">
            <router-link
              class="nav-link position-relative"
              :class="$route.name == 'formulaireReservation' ? 'active' : ''"
              aria-current="page"
              :to="{ name: 'formulaireReservation' }"
            >
              <i
                class="fa-solid fa-cart-shopping fa-lg"
                style="color: #ffffff"          ></i>

              <span
                v-if="store.state.Voiturestore.cart.length > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg- danger"
              >
                {{ store.state.Voiturestore.cart.length }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- {{$store.state.Velochoixstore.velo}} -->
  </div>
</template>
 <!-- {{ props.velo.image }} -->
<script setup>

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import store from "../../store";

const router = useRouter();
const props = defineProps(["voiture"]); //props

const envoie = (voiture) => {
  router.push({
    name: "formulaireReservation",
    params: "props.voiture",
  });
  store.commit("Voiturestore/addCart", { voiture });
};
const addToCartAndRedirect = (voiture) => {
  // Ajouter le produit au panier
  store.commit('Voiturestore/addCart', { product: voiture});

  // Rediriger vers la page formulaireReservation
  router.push('/formulaireReservation');
};

onMounted(() => {
  

    console.log("Le composant est monté !");
});
const clearstate = () => {
  store.commit("Voiturestore/clearState");
};
</script>
<style>
img {
  width: 20%;
  height: 30%;
}
</style>