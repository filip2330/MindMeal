<template>
  <q-page>
    <h1>Popis svih planova prehrane</h1>
<<<<<<< HEAD
    <!-- Tabela za prikaz biljaka -->
=======
    <!-- Tabela za prikaz planova prehrane -->
>>>>>>> 627c934 (KRAJ)
    <q-table
      :rows="planovi"
      :columns="columns"
      row-key="sifraPlana"
      flat
    />
    <!-- Spinner dok se učitavaju podaci -->
    <q-spinner v-if="loading" color="blue" />
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false, // Za spinner dok se podaci učitavaju
<<<<<<< HEAD
      planovi: [], // Podaci o biljkama koji će biti dohvaćeni iz API-ja
      columns: [
        { name: 'sifraPlana', label: 'Šifra plana', align: 'left', field: row => row.sifraPlana },
        { name: 'nazivPlana', label: 'Naziv plana', align: 'left', field: row => row.nazivPlana },
        { name: 'opisPlana', label: 'Opis plana', align: 'left', field: row => row.opisBiljke },
        { name: 'cijena', label: 'Cijena', align: 'center', field: row => `${row.cijena} €` },
=======
      planovi: [], // Podaci o planovima koji će biti dohvaćeni iz API-ja
      columns: [
        { name: 'sifraPlana', label: 'Šifra plana', align: 'left', field: row => row.sifraPlana },
        { name: 'nazivPlana', label: 'Naziv plana', align: 'left', field: row => row.nazivPlana },
        { name: 'opisPlana', label: 'Opis plana', align: 'left', field: row => row.opisPlana },
        { name: 'cijena', label: 'Cijena (€)', align: 'center', field: row => `${row.cijena} €` },
>>>>>>> 627c934 (KRAJ)
      ],
    };
  },
  methods: {
<<<<<<< HEAD
    // Funkcija za dohvaćanje biljaka iz API-ja
    async fetchPlanovi() {
      this.loading = true; // Prikaz spinnera
      try {
        const response = await axios.get("http://localhost:3000/api/biljke");
        this.planovi = response.data; // Postavljanje podataka
      } catch (error) {
        console.error("Greška prilikom dohvaćanja planova:", error);
=======
    // Funkcija za dohvaćanje planova prehrane iz API-ja
    async fetchPlanovi() {
      this.loading = true; // Prikaz spinnera dok se podaci učitavaju
      try {
        const response = await axios.get("http://localhost:3000/api/planovi"); // API endpoint za dohvaćanje planova
        this.planovi = response.data; // Postavljanje podataka iz odgovora API-ja
      } catch (error) {
        console.error("Greška prilikom dohvaćanja planova prehrane:", error);
>>>>>>> 627c934 (KRAJ)
      } finally {
        this.loading = false; // Skrivanje spinnera
      }
    },
  },
  mounted() {
    this.fetchPlanovi(); // Automatski dohvaća planove kad se komponenta učita
  },
};
</script>
<<<<<<< HEAD

=======
>>>>>>> 627c934 (KRAJ)
