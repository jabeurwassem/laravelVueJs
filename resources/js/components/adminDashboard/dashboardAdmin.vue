<template>
    <div class="card">
      <Toolbar class="bg-primary shadow-sm" style="border-radius: 3rem;">
        <template #start>
          <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Your SVG paths here -->
          </svg>
        </template>
  
        <template #center>
          <div class="d-flex gap-3" id="listmenu">
            
            <router-link class="nav-link text-light" to="/view">Voitures</router-link>
            <router-link class="nav-link text-light" to="/Home">Visite Site</router-link>
           
            <router-link class="nav-link text-light" to="/commandes">Commandes</router-link>
           
  
          </div>
        </template>
  
        <template #end>
          <div class="d-flex align-items-center gap-2" @mouseover="showLogoutButton" @mouseleave="hideLogoutButton">
            <span class="admin text-light">JABEUR LOCATION</span>
            <Avatar image="https://us.123rf.com/450wm/wahyufrida/wahyufrida1909/wahyufrida190900363/129861209-ic%C3%B4ne-et-logo-de-la-conception-d-illusration-vectorielle-de-location-de-voiture.jpg" shape="circle" />
            <button class="nav-link active" @click="logout">
        <i class="fas fa-sign-out-alt"></i> Logout
                </button>
          </div>
        </template>
      </Toolbar>
    </div>
  </template>
  
  <script setup>
  import Toolbar from 'primevue/toolbar';
  import Avatar from 'primevue/avatar';
  import AvatarGroup from 'primevue/avatargroup';   
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  let isLoggedIn = false; 
  const showLogoutButton = () => {
    const logoutButton = document.querySelector('.logout-button');
    if (logoutButton) {
      logoutButton.style.display = 'block';
    }
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
  #listmenu {
    flex: 2;
    display: flex;
    justify-content: space-evenly;
    color: #fff;
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