const state = {
  
        voiture: [],
    };
    const mutations = ({
        clearState(state) {
            state.voiture = [];
    
            return true;
        },
        addVoiture(state, payload) {
            const productInCartIndex = state.voiture.findIndex(
                (item) => item.id === payload.id
            );
            if (productInCartIndex < 0) {
                state.voiture.push(payload);
              
   
            }
        },
        
        removeFromvoiture(state,payload){
    
            state.voiture = state.voiture.filter(function( cartItem ) {
            return cartItem.id !== payload.id;
            });
   
            },
    });
    export default {
        namespaced: true,
        state,
        mutations
        }
    