<template>
    <br><br>
    <AddVoiture/>
    <br>
    <div class="card">
        <DataTable
            :value="articles"
            stripedRows
            paginator
            showGridlines
            :rows="6"
            dataKey="id"
            :loading="isLoading"
        >
            <Column header="Image">
                <template #body="{ data }">
                    <img
                        :src="data.image"
                        :alt="data.reference"
                        class="shadow-4"
                        width="75"
                    />
                </template>
            </Column>
            <Column field="matricule" header="Matricule"></Column>
         

            <Column field="marque" header="Marque" sortable></Column>
            <Column field="modele" header="Modele" sortable></Column>

            <Column field="annee" header="Annee" sortable></Column>
            <Column field="prix_journalier" header="prix_journalier" sortable></Column>
            
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
import AddVoiture from "./AddVoiture.vue";
import Editvoiture from "./Editvoiture.vue";
import axios from 'axios';
const articles = ref([]);
const isLoading = ref(true);
let token=""
token=localStorage.getItem('token')
const config = {
headers: { Authorization: `Bearer ${token}` }
};
const getVoitures = async () => {
    await axios
        .get("http://localhost:8000/api/voitures",config)
        .then((res) => {
            articles.value = res.data;
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

















