import Home from "./components/home.vue";
import Menu from "primevue/menu";
import Accueil from "./components/accueil.vue";
import MenuAdmin from "./components/MenuAdmin.vue";
import ViewVoiture from "./components/Voitures/Viewvoit.vue";
import AddVoiture from "./components/Voitures/AddVoiture.vue";
import Locations from "./components/Voitures/Locations.vue";
import Login from "./components/authentification/login.vue";
import Register from "./components/authentification/register.vue";
import InfoVoiture from "./components/Voitures/infoVoiture.vue";
import formulaireReservation from "./components/Voitures/formulaireReservation.vue";
import Indexcomponent from "./components/Indexcomponent.vue";
import LOCATIONS from "./components/LOC/LOCATIONS.VUE";
import DashboardAdmin from "./components/adminDashboard/dashboardAdmin.vue"
import Contact from "./components/contact.vue";

export const routes = [
    {
        name: "accueil",
        path: "/accueil",
        component: Accueil,
    },
    {
      name: "dadmin",
      path: "/dadmin",
      component: DashboardAdmin,
  },
  {
    name: "contact",
    path: "/contact",
    component: Contact,
},
    {
        path: "/formulaireReservation/:startDate/:endDate",
        name: "formulaireReservation",
        component: formulaireReservation,
        props: true,
    },
    {
        name: "infoVoiture",
        path: "/infoVoiture",
        component: InfoVoiture,
    },
    {
        name: "locations",
        path: "/locations/:startDate/:endDate",
        component: Locations,
        props: true,
    },
    {
        name: "LOCATIONS",
        path: "/commandes",
        component: LOCATIONS,
    },

    {
        name: "MenuAdmin",
        path: "/MenuAdmin",
        component: MenuAdmin,
    },

    {
        name: "Home",
        path: "/Home",
        component: Home,
    },
    {
        name: "view",
        path: "/view",
        component: ViewVoiture,
    },
    {
        name: "AddVoiture",
        path: "/AddVoiture",
        component: AddVoiture,
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
    {
        path: "/",
        component: Home,
    },
];
