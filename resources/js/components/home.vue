<template>
  <router-view><Menu/></router-view>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-8">
        <h1 class="mb-4">Bienvenue sur la page d'accueil de JABEUR LOCATION</h1>
        <p>
          Explorez la meilleure expérience de location de voitures avec JABEUR LOCATION. Notre flotte variée de véhicules
          est prête à vous accompagner pour tous vos déplacements, que ce soit pour des voyages d'affaires, des vacances
          en famille ou toute autre occasion spéciale.
        </p>
        <p>
          Sélectionnez facilement une plage de dates pour découvrir les voitures disponibles. Chez JABEUR LOCATION, nous
          vous offrons non seulement la liberté de mouvement, mais aussi le choix parmi des voitures modernes et bien
          entretenues. Profitez d'une expérience de location sans tracas, où la qualité, la sécurité et la satisfaction
          du client sont notre priorité.
        </p>

        <p>Sélectionnez une plage de dates :</p>
        <div class="row mb-3">
          <div class="col-md-6">
            <Calendar v-model="startDate" :showIcon="true" placeholder="Date de début" :dateFormat="dateFormat" :monthNavigator="true" />
          </div>
          <div class="col-md-6">
            <Calendar v-model="endDate" :showIcon="true" placeholder="Date de fin" :dateFormat="dateFormat" :monthNavigator="true" />
          </div>
        </div>
        <button @click="proceed" :disabled="!startDate || !endDate" class="btn btn-primary">Procéder</button>

        <p v-if="invalidDateRange" class="text-danger mt-2">
          Plage de dates non valide. Veuillez sélectionner des dates valides.
        </p>
      </div>
      
      <div class="col-lg-4">
        <!-- Optional: Add a promotional image or any additional information about your car rental business -->
        <img src="https://i.ibb.co/qk89nGS/Car-Sale-Promo-Facebook-Post.png" alt="JABEUR LOCATION" class="img-fluid rounded" />
      </div>
    </div>

    <div v-if="availableCars.length > 0" class="mt-4">
      <h2>Voitures disponibles :</h2>
      <ul class="list-group">
        <li v-for="voiture in availableCars" :key="voiture.id" class="list-group-item">{{ voiture.matricule }}</li>
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
          const response = await axios.get('/api/getAvailableCars', {
            params: {
              startDate: this.startDate,
              endDate: this.endDate,
            },
          });
          this.$router.push({
          name: 'locations',
          params: {
            startDate: this.startDate,
            endDate: this.endDate,
          },
        });

          this.availableCars = response.data;
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
  },
};
</script>

<style>
/* Add your custom styles here */
</style>
