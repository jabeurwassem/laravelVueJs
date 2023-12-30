<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-success">
    
    
    <div class="container-fluid">
    
    <button type="button" class="btn btn-warning rounded-
    circle" @click="visible = true">
    
    <span style="color: rgb(43, 27, 27)">
    <i class="fa-solid fa-square-plus"> </i>
    </span>
    New
    </button>
    </div>
    </nav>
    <form >
    <div class="card flex justify-content-center">
    <Dialog
    v-model:visible="visible"
    >
    
    <div class="row">
    <div class="col-md-6">.
    <label for="matricule" class="form-label">Matricule</label>
    
    <input type="text" class="form-control" id="matricule" v-model="voiture.matricule">
    
    </div>
    <div class="col-md-6 ms-auto">
    <label for="marque" class="form-label">Marque</label>
    
    <input type="texte" class="form-control" id="marque" v-model="voiture.marque">
    
    </div>
    </div>
    
    <div class="row">
    <div class="col-md-6">.
        <label for="modele" class="form-label">Modele</label>   
    
    
    <input type="text" class="form-control" id="modele" v-model="voiture.modele">
    
    
    
    </div>
    <div class="col-md-6 ms-auto">
        <label for="Année" class="form-label">Année</label>
   
    
    <input type="texte" class="form-control" id="annee" v-model="voiture.annee">
    
    </div>
    </div>
    <div class="row">
    <div class="col-md-6">.
    <label for="prix_journalier" class="form-label">prix_journalier</label>
    <input type="text" class="form-control" id="prix_journalier" v-model="voiture.prix_journalier">
    
    </div>
   
    </div>
    <div class="row">
    <file-pond
    name="test"
    ref="pond"
    class-name="my-pond"
    label-idle="Drop files here..."
    allow-multiple="false"
    accepted-file-types="image/jpeg, image/png"
    v-bind:files="myFiles"
    :server="serverOptions()"
    />
    </div>
    <br/>
    
    
    
    <button type="submit" className="btn btn-outline-primary" @click="addVoiture">
    <i class="fa-solid fa-floppy-disk"></i>Enregister
    </button>
    <button type="button" className="btn btn-outline-primary"
    
    @click="cancel">
    <i class="fa-solid fa-floppy-disk"></i>cancel
    </button>
    </Dialog>
    </div>
    </form>
    </template>
    
    <script setup>
    import { ref,onMounted } from "vue"
    import api from '../config/api.js';
    import vueFilePond from 'vue-filepond';
    import 'filepond/dist/filepond.min.css';
    import Dialog from 'primevue/dialog';
    import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
    
    import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
    
    // Create FilePond component
    const FilePond = vueFilePond(FilePondPluginImagePreview);
    const myFiles = ref([]);
    import axios from "axios";
    const visible = ref(false);
    const voiture=ref({
    matricule:"",
    marque:"",
    modéle:"",
    
    prix_journalier:0,
    image:"/img/img1"
   
    
    
    
    })
   
    
    
    const addVoiture=async()=>{
    try {
    await api.post("/api/voitures/",voiture.value)
    { visible.value=false
    //window.location.reload()
    }
    } catch (error) {
    
    }
    }
    onMounted(() =>   {
        
    
    }
    
    );
    const handleFilePondInit = () => {
    console.log('FilePond has initialized');
    }
    const cancel=()=>{
    visible.value=false
    }
    const serverOptions = () => { console.log('server pond');
    return {
    process: (fieldName, file, metadata, load, error, progress, abort) => {
    const data = new FormData();
    data.append('file', file);
    
    
    data.append('upload_preset', 'GLID5IIT');
    data.append('cloud_name', 'esps');
    data.append('public_id', file.name);
    axios.post('https://api.cloudinary.com/v1_1/esps/upload',data)
    .then((response) => response.data)
    .then((data) => {
    console.log(data);
    voiture.value.image = data.url;
    load(data);
    })
    .catch((error) => {
    console.error('Error uploading file:', error);
    error('Upload failed');
    abort();
    });
    },
    };
    };
    </script>
    <style scoped>
    
    </style>