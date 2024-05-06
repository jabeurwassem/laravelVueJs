<template>
  
  <div>
    <!-- Barre de navigation supérieure -->
    <div class="top-navbar bg-dark text-light text-center py-2">
      <p class="fas fa-clock">Lundi - Vendredi : de 8h à 17h</p>
      <p class="fas fa-phone">(+216) 94 260 000 - (+216) 94 120 000</p>
      <a href="https://www.facebook.com/profile.php?id=61555607077738" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-facebook-f"></i> Visitez notre page Facebook
      </a>
    </div>

    <!-- Barre de navigation principale -->
    <div class="card">
      <Toolbar class="bg-primary shadow-sm" style="border-radius: 3rem;">
        <template #start>
          <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Your SVG paths here -->
          </svg>
        </template>

        <template #center>
          <div class="d-flex gap-3" id="listmenu">
            <router-link class="nav-link text-light" to="/Home">Home</router-link>
         
            
           
            <router-link class="nav-link text-light" to="/contact">Contact</router-link>
          </div>
        </template>

        <template #end>
          <div class="d-flex align-items-center gap-2" @mouseover="showLogoutButton" @mouseleave="hideLogoutButton">
            <span class="admin text-light">JABEUR LOCATION</span>
            <Avatar image="https://us.123rf.com/450wm/wahyufrida/wahyufrida1909/wahyufrida190900363/129861209-ic%C3%B4ne-et-logo-de-la-conception-d-illusration-vectorielle-de-location-de-voiture.jpg" shape="circle" />
          </div>

          <!-- Utilisez une condition pour afficher le texte Login ou Logout -->
          <button class="nav-link active" @click="logout">
  <i class="fas fa-sign-out-alt"></i> Logout
</button>
        </template>
      </Toolbar>
    </div>
  </div>
</template>

<script setup>
import Toolbar from 'primevue/toolbar';
import Avatar from 'primevue/avatar';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
let isLoggedIn = false; // Variable d'état pour suivre la connexion

const showLogoutButton = () => {
  const logoutButton = document.querySelector('.logout-button');
  if (logoutButton) {
    logoutButton.style.display = 'block';
  }
};

const hideLogoutButton = () => {
  const logoutButton = document.querySelector('.logout-button');
  if (logoutButton) {
    logoutButton.style.display = 'none';
  }
};

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
</script>

<style lang="scss" scoped>
/* ... (vos styles existants) ... */

.top-navbar {
  display: flex;
  justify-content: space-around;
  background-color: #333;
}

.top-navbar a {
  color: #fff;
  text-decoration: none;
}

.top-navbar i {
  margin-right: 5px;
}

.logout-button {
  display: none;
  background-color: #fff;
  color: #000;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #ddd;
}
</style>
