<template>
    <div>
      <h1>Welcome to Home Page</h1>
      <p>Select a date range:</p>
      <div>
        <Calendar v-model="startDate" :showIcon="true" placeholder="Start date" />
        <Calendar v-model="endDate" :showIcon="true" placeholder="End date" />
      </div>
      <button @click="proceed" :disabled="!startDate || !endDate">Proceed</button>
    </div>
  </template>
  
  <script>
  import Calendar from 'primevue/calendar';
  import { useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        startDate: null,
        endDate: null
      }
    },
    components: {
      Calendar
    },
    methods: {
      proceed() {
        if (this.startDate && this.endDate) {
          this.$router.push('/locations');
        }
      }
    }
  }
  </script>
  