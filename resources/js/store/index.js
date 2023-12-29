import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import Voiturestore from './modules/voitureFeature'
export default createStore({
modules: {
    Voiturestore



},
plugins: [createPersistedState()],
})