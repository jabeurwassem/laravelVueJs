import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";
import "@fortawesome/fontawesome-free/css/all.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-green/theme.css'
import store from "./store" 
import 'primeicons/primeicons.css';
import "primevue/resources/themes/saga-blue/theme.css";
   import "primevue/resources/primevue.min.css";
   import DataView from 'primevue/dataview';
   import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'     
  
import App from './App.vue'
let app = createApp(App)
const router = createRouter({
history: createWebHashHistory(),
routes: routes,
})
app.use(router).use(PrimeVue);
app.use(store)
app.mount("#app")
