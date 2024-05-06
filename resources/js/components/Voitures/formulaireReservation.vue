<template>
  <div class="top-navbar bg-dark text-light text-center py-2">
      <p class="fas fa-clock">Lundi - Vendredi : de 8h à 17h</p>
      <p class="fas fa-phone">(+216) 94 260 000 - (+216) 94 120 000</p>
      <a href="https://www.facebook.com/profile.php?id=61555607077738" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-facebook-f"></i> Visitez notre page Facebook
      </a>
    </div>
  <div class="container mt-5 background-green">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="handleSubmit">
          
          <div class="card">
            <div class="card-body">
              <h5 class="card-title mb-4">Montant à payer: {{ totalPrice }} TND</h5>

              <div class="form-group mb-4">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  v-model="email"
                />
              </div>

              <div id="card-element" class="mb-4"></div>

              <button type="submit" class="btn btn-primary   btn-block">
                Procéder au paiement
              </button>
            </div>
          </div>
        </form>

        <div class="mt-3 text-center">
          <router-link :to="{ name: 'locations' }">
            <button class="btn btn-outline-info" @click="clearState">
              Continue Shopping
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import store from "../../store";
import api from "../config/api.js";
import { useRouter } from "vue-router";
import emailjs from 'emailjs-com';

const router = useRouter();
const stripe = ref(null);
let cardElement;
let email = ref("");
let totalPrice = ref(0);
let startDate; // Define startDate variable
let endDate; // Define endDate variable

onMounted(async () => {
  stripe.value = await loadStripe("pk_test_51OM8V8JxZFMHIckAjqpc8QTEjLbfXvccyitHo76LTIt5wlbhe5jFPJh6HCGBSL33JXvb8MkLTxgGUmCx5NegUeQF00AgEelI1N");
  const elements = stripe.value.elements();
  cardElement = elements.create("card");
  cardElement.mount("#card-element");

  const voiture = store.state.Voiturestore.voiture[0]?.voiture;
  const prixJournalier = voiture.prix_journalier;
  console.log('Voiture:', voiture);
  console.log('Prix Journalier:', prixJournalier);

  const parseDate = (dateString) => {
    return dateString ? new Date(Date.parse(dateString)) : null;
  };

  startDate = parseDate(router.currentRoute.value.params.startDate);
  endDate = parseDate(router.currentRoute.value.params.endDate);
  console.log('StartDate:', startDate);
  console.log('EndDate:', endDate);

  if (startDate && endDate) {
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    console.log("Difference en jours:", daysDifference);

    totalPrice.value = prixJournalier * daysDifference;
  } else {
    console.error("Les dates ne sont pas valides.");
  }
});

const handleSubmit = async () => {
  const { token, error } = await stripe.value.createToken(cardElement);

  if (error) {
    console.error(error);
  } else {
    const response = await api.post("/api/createpayment", {
      token: token.id,
      amount: totalPrice.value * 100,
      email: email.value,
    });

    const formatDateString = (date) => date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : null;

    if (response.data.message) {
      console.log(response.data.message);
      router.push("/locations");

      const locationResponse = await api.post("/api/locations", {
        client_id: 1,
        voiture_id: store.state.Voiturestore.voiture[0]?.voiture.id,
        date_debut: formatDateString(startDate),
        date_fin: formatDateString(endDate),
      });
      emailjs.send("service_ihfprws","template_dwsd2ze",{
                       name: "Jabeur Location",
                       email: "JabeurLocation@gmail.com",
                       message: "Nouveau Location VOITURE de matricule : "  + store.state.Voiturestore.voiture[0]?.voiture.matricule + "entre" + formatDateString(startDate) + " et " + formatDateString(endDate) + "/t TTC = " + totalPrice.value
                       },'4hD7pQ8L9oZPrzuCd');
                   
      alert("Paiement avec succés ");
      store.commit('Voiturestore/clearState');
    } else {
      console.error(response.data.error);
    }
  }
};

const clearState = () => {
  store.commit('Voiturestore/clearState');
};
</script>

<style scoped>
  #card-element {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
  }

  .card {
    margin-top: 20px;
  }

  .card-title {
    color: #007bff;
  }

  .form-control {
    border: 1px solid #ced4da;
    border-radius: 4px;
    padding: 10px;
  }

  .btn-success {
    background-color: #28a745;
    color: #fff;
  }

  .btn-outline-success {
    color: #28a745;
    border: 1px solid #28a745;
  }

  /* Nouvelle classe pour l'arrière-plan vert */
  .background-green {
    background-color: #28a745;
    padding: 20px;
    border-radius: 8px;
  }
</style>
