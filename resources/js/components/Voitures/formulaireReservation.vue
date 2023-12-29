<template>
    <form @submit.prevent="handleSubmit">
    <div class="card" style="width: 50rem;">
    <div class="card-body">
        <span class="amount">{{$store.state.Voiturestore.cartTotal}}
    
    TND</span>
    <h5 class="card-title">Montant à payer : {{amount}} TND</h5>
    <br/>
    <div class="card-text">
    <div class="form-group">
    
    <input type="email" class="form-control" placeholder="email" v-model="email" />
    
    </div>
    <br/>
    </div>
    <div id="card-element"></div>
    <br/>
    <button type="submit" class="btn btn-success">Procéder au
    payement</button>
    </div>
    </div>
    </form>
    <div class="continue-shopping">
    <router-link :to="{name: 'locations'}" >
        <button class="btn btn-success" @click="clearState">
      <span>Continue Shopping</span>
    </button>
    </router-link>
    
    </div>
    </template>
    <script setup>
    import { onMounted, ref } from 'vue';
    import { loadStripe } from '@stripe/stripe-js';
    import store from '../../store'
    import api from "../config/api.js";
    import { useRouter } from 'vue-router';
    const router = useRouter();
    
    
    
    const stripePromise =
    loadStripe('pk_test_51OM8V8JxZFMHIckAjqpc8QTEjLbfXvccyitHo76LTIt5wlbhe5jFPJh6HCGBSL33JXvb8MkLTxgGUmCx5NegUeQF00AgEelI1N');
    const stripe = ref(null);
    let cardElement; // Déclarer cardElement comme variable globale
    let amount=ref(0);
    let email=ref("");
    onMounted(async () => {
    amount.value=store.state.Voiturestore.cartTotal;
    stripe.value = await stripePromise;
    const elements = stripe.value.elements();
    cardElement = elements.create('card'); // Affecter cardElement
    cardElement.mount('#card-element');
    });
    const handleSubmit = async () => {
    const { token, error } = await stripe.value.createToken(cardElement);
    if (error) {
    console.error(error);
    } else {
    // Envoie le token au serveur pour traiter le paiement
    const response = await api.post('/api/createpayment', {
    token: token.id,
    amount: amount.value * 100, // Convertir le montant en cents
    email:email.value
    });
    if (response.data.message) {
    console.log(response.data.message);
    // Le paiement est réussi
    alert(response.data.message);
    //Vider le cart
    store.commit('Voiturestore/clearCart')
    //Redirection
    router.push('/locations')
    } else {
    console.error(response.data.error);
    }
    }
    };
    const clearState = () => {
  // Add logic here to clear any additional state if needed
  store.commit('Voiturestore/clearCart');
};
    </script>