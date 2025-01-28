<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h4">Pretraži planove prehrane</div>
      </q-card-section>

      <q-card-section>
        <!-- Input polje za pretragu -->
        <q-input
          v-model="searchQuery"
          label="Unesite pojam za pretragu"
          outlined
          clearable
        />

        <!-- Checkbox za odabir pretrage po kategoriji ili nazivu -->
        <div class="q-mt-md">
          <q-checkbox
            v-model="searchByCategory"
<<<<<<< HEAD
            label="Pretraži po vrsti plana"
=======
            label="Pretraži po opisu plana"
>>>>>>> 627c934 (KRAJ)
          />
          <q-checkbox
            v-model="searchByName"
            label="Pretraži po nazivu plana"
          />
        </div>

        <!-- Gumb za pretragu -->
        <q-btn
          label="Traži"
          color="green"
          class="q-mt-md"
<<<<<<< HEAD
          @click="searchPlants"
=======
          @click="searchPlans"
>>>>>>> 627c934 (KRAJ)
        />
      </q-card-section>

      <!-- Tabela za prikaz rezultata pretrage -->
<<<<<<< HEAD
      <q-card-section v-if="filteredPlants.length > 0">
        <q-table
          :rows="filteredPlants"
          :columns="columns"
          row-key="sifraBiljke"
=======
      <q-card-section v-if="filteredPlans.length > 0">
        <q-table
          :rows="filteredPlans"
          :columns="columns"
          row-key="sifraPlana"
>>>>>>> 627c934 (KRAJ)
        />
      </q-card-section>

      <!-- Poruka kada nema rezultata pretrage -->
<<<<<<< HEAD
      <q-card-section v-else-if="searchQuery && filteredPlants.length === 0">
=======
      <q-card-section v-else-if="searchQuery && filteredPlans.length === 0">
>>>>>>> 627c934 (KRAJ)
        <div class="text-subtitle1 text-center q-mt-md">
          Nema rezultata pretrage.
        </div>
      </q-card-section>

      <!-- Poruka kada nije uneseno ništa u pretragu -->
      <q-card-section v-if="!searchQuery">
        <div class="text-subtitle1 text-center q-mt-md">
          Unesite pojam za pretragu ili prilagodite kriterije.
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const searchQuery = ref(""); // Unos za pretragu
<<<<<<< HEAD
    const searchByCategory = ref(false); // Checkbox za pretragu po vrsti biljke
    const searchByName = ref(false); // Checkbox za pretragu po nazivu biljke
    const allPlants = ref([]); // Sve biljke
    const filteredPlants = ref([]); // Rezultati pretrage
=======
    const searchByCategory = ref(false); // Checkbox za pretragu po opisu plana
    const searchByName = ref(false); // Checkbox za pretragu po nazivu plana
    const allPlans = ref([]); // Svi planovi
    const filteredPlans = ref([]); // Rezultati pretrage
>>>>>>> 627c934 (KRAJ)
    const loading = ref(false);

    // Kolone za tabelu
    const columns = [
<<<<<<< HEAD
      { name: "sifraBiljke", label: "Šifra biljke", align: "left", field: "sifraBiljke" },
      { name: "nazivBiljke", label: "Naziv biljke", align: "left", field: "nazivBiljke" },
      { name: "vrstaBiljke", label: "Vrsta biljke", align: "left", field: "vrstaBiljke" },
      { name: "opisBiljke", label: "Opis biljke", align: "left", field: "opisBiljke" },
      { name: "dostupnaKolicina", label: "Dostupna količina", align: "center", field: "dostupnaKolicina" },
      { name: "cijena", label: "Cijena", align: "center", field: "cijena" },
    ];

    // Dohvati sve biljke
    async function fetchBiljke() {
      loading.value = true;
      try {
        const response = await axios.get("http://localhost:3000/api/biljke");
        allPlants.value = response.data; // Pohranjujemo sve biljke
        filteredPlants.value = allPlants.value; // Na početku prikazujemo sve biljke
      } catch (error) {
        console.error("Greška prilikom dohvaćanja biljaka:", error);
=======
      { name: "sifraPlana", label: "Šifra plana", align: "left", field: "sifraPlana" },
      { name: "nazivPlana", label: "Naziv plana", align: "left", field: "nazivPlana" },
      { name: "opisPlana", label: "Opis plana", align: "left", field: "opisPlana" },
      { name: "cijena", label: "Cijena", align: "center", field: "cijena" },
    ];

    // Dohvati sve planove
    async function fetchPlans() {
      loading.value = true;
      try {
        const response = await axios.get("http://localhost:3000/api/planovi");
        allPlans.value = response.data; // Pohranjujemo sve planove
        filteredPlans.value = allPlans.value; // Na početku prikazujemo sve planove
      } catch (error) {
        console.error("Greška prilikom dohvaćanja planova:", error);
>>>>>>> 627c934 (KRAJ)
      } finally {
        loading.value = false;
      }
    }

<<<<<<< HEAD
    // Pretraga biljaka
    async function searchPlants() {
      // Pronađi biljke na temelju unosa pretrage
      filteredPlants.value = allPlants.value.filter(plant => {
        let matchesCategory = true;
        let matchesName = true;

        // Ako pretražujemo po kategoriji
        if (searchByCategory.value && searchQuery.value) {
          matchesCategory = plant.vrstaBiljke.toLowerCase().includes(searchQuery.value.toLowerCase());
        }

        // Ako pretražujemo po nazivu
        if (searchByName.value && searchQuery.value) {
          matchesName = plant.nazivBiljke.toLowerCase().includes(searchQuery.value.toLowerCase());
        }

        // Ako ni jedan kriterij nije zadovoljen, izuzmi biljku
        return matchesCategory && matchesName;
      });
    }

    onMounted(() => {
      fetchBiljke(); // Dohvati sve biljke kada je komponenta montirana
=======
    // Pretraga planova
    async function searchPlans() {
      try {
        const response = await axios.get("http://localhost:3000/api/planovi", {
          params: {
            searchQuery: searchQuery.value,
            searchByCategory: searchByCategory.value,
            searchByName: searchByName.value,
          },
        });
        filteredPlans.value = response.data; // Rezultati pretrage iz backend-a
      } catch (error) {
        console.error("Greška prilikom pretrage planova:", error);
      }
    }

    onMounted(() => {
      fetchPlans(); // Dohvati sve planove kada je komponenta montirana
>>>>>>> 627c934 (KRAJ)
    });

    return {
      searchQuery,
      searchByCategory,
      searchByName,
<<<<<<< HEAD
      allPlants,
      filteredPlants,
      columns,
      loading,
      searchPlants,
=======
      allPlans,
      filteredPlans,
      columns,
      loading,
      searchPlans,
>>>>>>> 627c934 (KRAJ)
    };
  },
};
</script>

<style scoped>
</style>
<<<<<<< HEAD






=======
>>>>>>> 627c934 (KRAJ)
