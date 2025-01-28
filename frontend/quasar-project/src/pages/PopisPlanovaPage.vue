<template>
  <q-page>
    <h1>Popis svih planova prehrane</h1>
    <!-- Tabela za prikaz biljaka -->
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
      planovi: [], // Podaci o biljkama koji će biti dohvaćeni iz API-ja
      columns: [
        { name: 'sifraPlana', label: 'Šifra plana', align: 'left', field: row => row.sifraPlana },
        { name: 'nazivPlana', label: 'Naziv plana', align: 'left', field: row => row.nazivPlana },
        { name: 'opisPlana', label: 'Opis plana', align: 'left', field: row => row.opisBiljke },
        { name: 'cijena', label: 'Cijena', align: 'center', field: row => `${row.cijena} €` },
      ],
    };
  },
  methods: {
    // Funkcija za dohvaćanje biljaka iz API-ja
    async fetchPlanovi() {
      this.loading = true; // Prikaz spinnera
      try {
        const response = await axios.get("http://localhost:3000/api/biljke");
        this.planovi = response.data; // Postavljanje podataka
      } catch (error) {
        console.error("Greška prilikom dohvaćanja planova:", error);
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

