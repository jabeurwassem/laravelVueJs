<template>
    <br><br>
    <AddVoiture/>
    <br>
    <div class="card">
        <DataTable
            :value="locations"
            stripedRows
            paginator
            showGridlines
            :rows="6"
            dataKey="id"
            :loading="isLoading"
        >
            
            <Column field="voiture_id" header="voiture_id"></Column>
         

            <Column field="client_id" header="client_id" sortable></Column>
            <Column field="date_debut" header="date_debut" sortable></Column>

            <Column field="date_fin" header="date_fin" sortable></Column>
        
            
            <Column field="id" header="Actions" style="min-width: 12rem">
                <template #body="val">
                    <div class="d-flex">
                     <Editvoiture :voit="val.data" />

                        <button type="button" class="btn btn-danger rounded-circle"
                        @click="deletearticle(val.data.id)"
                        >
                            <span style="color: rgb(25, 21, 21)">
                                <i class="fa-solid fa-trash"></i>
                            </span>
                        </button>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import api from "../config/api.js";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { ref, onMounted } from "vue";


import axios from 'axios';
const locations = ref([]);
const isLoading = ref(true);
let token=""
token=localStorage.getItem('token')
const config = {
headers: { Authorization: `Bearer ${token}` }
};
const getVoitures = async () => {
    await axios
        .get("http://localhost:8000/api/locations",config)
        .then((res) => {
            locations.value = res.data;
            isLoading.value = false;
        })
        .catch((error) => {
            console.log(error);
        });
};
 



onMounted(() => {
    getVoitures();
});

const deletearticle = async (id) => {
    if (window.confirm("Etes-vous sûr de vouloir supprimer ?")) {
        try {
            await api.delete(`/api/voitures/${id}`);
            getVoitures();
        } catch (error) {
            console.log(error);
        }
    }
};
</script>

<style lang="scss" scoped></style>




