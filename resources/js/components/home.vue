vue
<template>
  <div class="home">
    <h1>Car Rental</h1>
    <p>Select a date and time to rent a car.</p>
    <v-date-picker v-model="selectedDate" label="Select Date"></v-date-picker>
    <button @click="findCars">Find Cars</button>
  </div>
</template>

<script>
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

export default {
  data() {
    return {
      selectedDate: null,
    };
  },
  methods: {
    findCars() {
      this.$router.push({ name: "location", params: { date: this.selectedDate } });
    },
  },
  mounted() {
    this.$vuetify = new Vuetify();
  },
};
</script>

<style>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 3em;
  margin-bottom: 1em;
}

p {
  font-size: 1.5em;
  margin-bottom: 1em;
}

button {
  margin-top: 1em;
  background-color: #000;
  color: #fff;
  padding: 0.5em 1em;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>