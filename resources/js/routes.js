
import home from './components/home.vue'
import Menu from 'primevue/menu';
import Accueil from './components/accueil.vue';
import MenuAdmin from './components/MenuAdmin.vue';
import ViewVoiture from './components/Voitures/Viewvoit.vue';
import AddVoiture from './components/Voitures/AddVoiture.vue';
import Locations from './components/Voitures/Locations.vue';
import Login from './components/authentification/login.vue';
import Register from './components/authentification/register.vue';
import InfoVoiture from './components/Voitures/infoVoiture.vue';
import formulaireReservation from './components/Voitures/formulaireReservation.vue';
import Indexcomponent from './components/Indexcomponent.vue';
export const routes = [
     {
         name: 'accueil',
         path: '/accueil',
         component: Accueil,
       },
    {
        name: 'formulaireReservation',
        path: '/formulaireReservation',
        component: formulaireReservation
        },
{
name: 'infoVoiture',
path: '/infoVoiture',
component: InfoVoiture
},
{
    name: 'locations',
    path: '/locations',
    component: Locations,
  },

  
{
    name: 'MenuAdmin',
    path: '/MenuAdmin',
    component: MenuAdmin
    },
    
    {
        name: 'home',
        path: '/home',
        component: home
        },
{
name: 'view',
path: '/view',
component: ViewVoiture
},
{
    name: 'AddVoiture',
    path: '/AddVoiture',
    component: AddVoiture
    },
    {
        name: "login",
        path: "/login",
        component: Login,
        },
        {
        name: "register",
        path: "/register",
        component: Register,
        },
        {
            name: "Indexcomponent",
            path: "/Indexcomponent",
            component: Indexcomponent,
            },
]