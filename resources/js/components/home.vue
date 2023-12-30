<template>
  <div>
    <h1>Welcome to Home Page</h1>
    <p>Select a date range:</p>
    <div>
      <Calendar v-model="startDate" :showIcon="true" placeholder="Start date" :dateFormat="dateFormat" :monthNavigator="true" />
      <Calendar v-model="endDate" :showIcon="true" placeholder="End date" :dateFormat="dateFormat" :monthNavigator="true" />
    </div>
    <button @click="proceed" :disabled="!startDate || !endDate">Proceed</button>

    <!-- Optionnel: Afficher un message d'erreur si les dates ne sont pas valides -->
    <p v-if="invalidDateRange" style="color: red;">Invalid date range. Please select valid dates.</p>

    <div v-if="availableCars.length > 0">
    <h2>Available Cars:</h2>
    <ul>
        <li v-for="voiture in availableCars" :key="voiture.id">{{ voiture.matricule }}</li>
    </ul>
</div>
  </div>
</template>

<script>
import axios from 'axios';
import Calendar from 'primevue/calendar';
import { ref } from 'vue';

export default {
  data() {
    return {
      startDate: null,
      endDate: null,
      invalidDateRange: false,
      dateFormat: 'dd/mm/yy', // Format de la date
      availableCars: [], // Liste des voitures disponibles
    };
  },
  components: {
    Calendar,
  },
  methods: {
    async proceed() {
    if (this.startDate && this.endDate && this.isValidDateRange()) {
      try {
        // Effectuez une requête pour récupérer les voitures disponibles
        const response = await axios.get('/api/voitures/', {
          params: {
            startDate: this.startDate,
            endDate: this.endDate,
          },
        });

        const availableCars = response.data;

        // Naviguez vers la vue de location avec les voitures disponibles
        this.$router.push({
          name: 'locations',
          query: { availableCars: JSON.stringify(availableCars) },
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des voitures disponibles :', error);
      }
    } else {
      this.invalidDateRange = true;
    }
  },
    isValidDateRange() {
      // Vérifiez si startDate et endDate sont définis
      if (!this.startDate || !this.endDate) {
        return false;
      }

      // Vérifiez si endDate est postérieur à startDate
      if (this.startDate >= this.endDate) {
        return false;
      }

      // Optionnel : Vérifiez si les dates sont dans le futur
      const today = new Date();
      if (this.startDate < today || this.endDate < today) {
        return false;
      }

      // Toutes les conditions sont remplies, les dates sont valides
      return true;
    },
    async getAvailableCars() {
      try {
        const response = await axios.get('/api/voitures/', {
          params: {
            startDate: this.startDate,
            endDate: this.endDate,
          },
        });

        this.availableCars = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des voitures disponibles :', error);
      }
    },
  },
};
</script>
