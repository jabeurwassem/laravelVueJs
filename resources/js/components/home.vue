<template>
  
  <div>
    <!-- Barre de navigation supérieure -->
    <div class="top-navbar bg-primary text-light text-center py-2">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <p>
            <i class="fas fa-clock"></i> Horaire : Lundi - Vendredi : de 8h à 17h |
            <i class="fas fa-phone"></i> (+216) 94 260 000 - (+216) 94 120 000
          </p>
          </div>
          <div class="col-lg-6 text-lg-end">
            <a href="https://www.facebook.com/profile.php?id=61555607077738" target="_blank" rel="noopener noreferrer" class="text-light">
              <i class="fab fa-facebook-f"></i> Visitez notre page Facebook
            </a>

            <!-- Ajoutez une icône de connexion -->
            <router-link class="nav-link active" :to="isLoggedIn ? '#' : '/login'" @click="handleLoginClick">
              <i class="fas fa-sign-in-alt"></i> {{ isLoggedIn ? 'Logout' : 'Login' }}
            </router-link>

            <button v-if="isLoggedIn" class="logout-button" @click="logout" ref="logoutButton">
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Barre de navigation principale -->
    <router-view><MenuAdmin/></router-view>
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
  </div>
</template>

<script setup>
import axios from 'axios';
import Calendar from 'primevue/calendar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const startDate = ref(null);
const endDate = ref(null);
const invalidDateRange = ref(false);
const dateFormat = 'dd/mm/yy'; // Format de la date
const availableCars = ref([]); // Liste des voitures disponibles
let isLoggedIn = false; // Variable d'état pour suivre la connexion
const router = useRouter();

const handleLoginClick = () => {
  if (isLoggedIn) {
    // Déconnectez l'utilisateur ici
    logout();
  } else {
    // Connectez l'utilisateur ici (assurez-vous que cela réussit avant de passer à isLoggedIn)
    // Exemple de connexion réussie :
    simulateSuccessfulLogin();
  }
};

const simulateSuccessfulLogin = () => {
  // Simule une connexion réussie
  // Remplacez cette logique par votre propre logique d'authentification
  isLoggedIn = true;
};

const logout = async () => {
  let token = localStorage.getItem('token');
  console.log(token);

  axios.post('http://localhost:8000/api/logout', null, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then((response) => {
    console.log(response);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    isLoggedIn = false; // Mettez à jour l'état de connexion après la déconnexion
    router.push("/login");
  })
  .catch(err => {
    console.log(err);
    alert(err);
  });
};

const proceed = async () => {
  if (startDate.value && endDate.value && isValidDateRange()) {
    try {
      // Effectuez une requête pour récupérer les voitures disponibles
      const response = await axios.get('/api/getAvailableCars', {
        params: {
          startDate: startDate.value,
          endDate: endDate.value,
        },
      });
      router.push({
        name: 'locations',
        params: {
          startDate: startDate.value,
          endDate: endDate.value,
        },
      });
      availableCars.value = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des voitures disponibles :', error);
    }
  } else {
    invalidDateRange.value = true;
  }
};

const isValidDateRange = () => {
  // Vérifiez si startDate et endDate sont définis
  if (!startDate.value || !endDate.value) {
    return false;
  }

  // Vérifiez si endDate est postérieur à startDate
  if (startDate.value >= endDate.value) {
    return false;
  }

  // Optionnel : Vérifiez si les dates sont dans le futur
  const today = new Date();
  if (startDate.value < today || endDate.value < today) {
    return false;
  }

  // Toutes les conditions sont remplies, les dates sont valides
  return true;
};
</script>

<style lang="scss" scoped>
/* Add your custom styles here */
.top-navbar {
  background-color: #007bff; /* Couleur bleue */
}
</style>
