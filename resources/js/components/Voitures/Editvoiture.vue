<template>
  <button
    type="button"
    class="btn btn-warning rounded-circle"
    @click="visible = true"
  >
    <span style="color: rgb(233, 240, 241)">
      <i class="fa-solid fa-pen-to-square"></i>
    </span>
  </button>
  <form>
    <div class="card flex justify-content-center">
      <Dialog v-model:visible="visible">
        <div class="row">
          <div class="col-md-6">
            .
            <label for="reference" class="form-label">Matricule</label>

            <input
              type="text"
              class="form-control"
              id="matricule"
              v-model="voiture.matricule"
            />
          </div>
          <div class="col-md-6 ms-auto">
            <label for="designation" class="form-label">Marque</label>

            <input
              type="texte"
              class="form-control"
              id="marque"
              v-model="voiture.marque"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            
            <label for="prix" class="form-label">Prix</label>
            <input
              type="text"
              class="form-control"
              id="prix_journalier"
              v-model="voiture.prix_journalier"
            />
          </div>
          <div class="col-md-6 ms-auto">
            <label for="annee" class="form-label">Année</label>

            <input
              type="texte"
              class="form-control"
              id="annee"
              v-model="voiture.annee"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            
            <label for="modele" class="form-label">Modele</label>
            <input
              type="text"
              class="form-control"
              id="modele"
              v-model="voiture.modele"
            />
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
            v-on:init="handleFilePondInit"
            :server="serverOptions()"/>
        </div>
        <br />
        <button
          type="submit"
          className="btn btn-outline-primary"
          @click="modifiervoiture"
        >
          <i class="fa-solid fa-floppy-disk"></i>Enregister
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          @click="cancel"
        >
          <i class="fa-solid fa-floppy-disk"></i>cancel
        </button>
      </Dialog>
    </div>
  </form>
</template>
    <script setup>
import api from "../config/api.js";
import { ref, onMounted } from "vue";
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import Dialog from "primevue/dialog";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
// Create FilePond component

const FilePond = vueFilePond(FilePondPluginImagePreview);
const myFiles = ref([]);
import axios from "axios";
const props = defineProps(["voit"]);
const visible = ref(false);
const voiture = ref({});

const handleFilePondInit = async () => {
  if (voiture.value.image) {
    myFiles.value = [
      {
        source: voiture.value.image,
        options: { type: "local" },
      },
    ];
  }
};
const loadvoiture = () => {
  console.log(props.voit);
  voiture.value = props.voit;
};
onMounted(() => {
  loadvoiture();
});
const modifiervoiture = () => {
  api
    .put(`/api/voitures/${voiture.value.id}`, voiture.value)
    .then(() => {
      visible.value = false;
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
};
const cancel = () => {
  visible.value = false;
};
const serverOptions = () => {
  console.log("server pond");
  return {
    load: (source, load, error, progress, abort, headers) => {
      var myRequest = new Request(source);
      fetch(myRequest).then(function (response) {
        response.blob().then(function (myBlob) {
          load(myBlob);
        });
      });
    },

    process: (fieldName, file, metadata, load, error, progress, abort) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Ecommerceiit");
      data.append("cloud_name", "dmbcogv9e");
      data.append("public_id", file.name);
      axios
        .post("https://api.cloudinary.com/v1_1/dmbcogv9e/upload", data)
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          voiture.value.image = data.url;
          load(data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          error("Upload failed");
          abort();
        });
    },
  };
};
</script>
    <style scoped>
</style>