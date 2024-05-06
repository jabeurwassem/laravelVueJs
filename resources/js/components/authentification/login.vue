<template>
  <div class="login-page-background">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-primary text-white">Login</div>
            <div class="card-body">
              <form @submit.prevent="handleLogin">
                <div class="form-group row">
                  <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail Address</label>
                  <div class="col-md-8">
                    <input id="email" type="email" class="form-control" v-model="user.email" required autofocus autocomplete="off" />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                  <div class="col-md-8">
                    <input id="password" type="password" class="form-control" v-model="user.password" required autocomplete="off" />
                  </div>
                </div>
                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button type="submit" class="btn btn-primary">Login</button>
                    <!-- Ajout du bouton pour le register -->
                    <router-link to="/register" class="btn btn-link">Register</router-link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
let user = {};

const handleLogin = async () => {
  try {
    const response = await axios.post("http://localhost:8000/api/login/", user);

    // Ajout de la condition de redirection en fonction de l'e-mail
    if (user.email === "admin@gmail.com") {
      router.push("/dadmin");
    } else {
      router.push("/MenuAdmin");
    }

    localStorage.setItem("user", response.data.user.name);
    localStorage.setItem("token", response.data.token);
  } catch (err) {
    console.log(err);
    alert(err);
  }
};
</script>

<style scoped>
.login-page-background {
  background-image: url('https://plus.unsplash.com/premium_photo-1661288445210-380b59081236?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  border-bottom: none;
}

/* Ajoutez d'autres styles personnalisés au besoin */
</style>
