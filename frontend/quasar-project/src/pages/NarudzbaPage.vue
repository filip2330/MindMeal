<template>
  <q-page padding>
    <!-- Naslov narudžbe s ikonom -->
    <div class="q-mb-md flex items-center">
      <div class="text-h5">Vaš odabrani plan prehrane</div>
    </div>

    <!-- Tablica narudžbi -->
    <q-table :rows="narudzbe" :columns="columns" row-key="ID_Kosarice" />

    <!-- FAB gumb za opcije korisnika -->
    <div class="q-pa-md flex flex-center">
      <q-fab
        v-model="fab"
        label="Opcije"
        color="green"
        icon="menu"
        direction="down"
        size="sm"
      >
        <!-- Akcija za dodavanje narudžbe -->
        <q-fab-action
          color="primary"
          @click="otvoriDodavanjeNarudzbe"
          icon="add"
          label="Dodaj novi plan"
        />
      </q-fab>
    </div>

    <!-- Sekcija za dodavanje narudžbe -->
    <q-card v-if="prikaziDodajNarudzbu">
      <q-card-section>
        <div class="text-h6">Dodavanje plana prehrane</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="novaNarudzba.nazivPlana" label="Naziv plana" />
        <q-input v-model="novaNarudzba.ID_korisnika" label="ID korisnika" />
        <q-input v-model="novaNarudzba.sifraPlana" label="ID plana" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          label="Odustani"
          color="primary"
          @click="prikaziDodajNarudzbu = false"
        />
        <q-btn flat label="Dodaj" color="primary" @click="dodajNarudzbu" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "UpravljanjeNarudžbama",
  setup() {
    const narudzbe = ref([]);
    const columns = [
      { name: "ID_Kosarice", align: "left", label: "ID", field: "ID_Kosarice" },
      {
        name: "nazivPlana",
        align: "left",
        label: "Naziv plana",
        field: "nazivPlana",
      },
      {
        name: "ID_korisnika",
        align: "left",
        label: "ID korisnika",
        field: "ID_korisnika",
      },
      {
        name: "sifraPlana",
        align: "left",
        label: "ID plana",
        field: "sifraPlana",
      },
      {
        name: "datumPrimanja",
        align: "left",
        label: "Datum dodavanja",
        field: "datumPrimanja",
      },
      { name: "total", align: "left", label: "Iznos", field: "total" },
    ];

    const fab = ref(false);
    const prikaziDodajNarudzbu = ref(false);
    const novaNarudzba = ref({
      nazivPlana: "",
      ID_korisnika: "",
      sifraPlana: "",
      total: 0,
    });

    // Funkcija za formatiranje datuma u željeni format
    const formatirajDatum = (datum) => {
      const d = new Date(datum);
      const godina = d.getFullYear();
      const mjesec = String(d.getMonth() + 1).padStart(2, "0");
      const dan = String(d.getDate()).padStart(2, "0");
      const sati = String(d.getHours()).padStart(2, "0");
      const minuti = String(d.getMinutes()).padStart(2, "0");
      const sekunde = String(d.getSeconds()).padStart(2, "0");
      return `${godina}-${mjesec}-${dan} ${sati}:${minuti}:${sekunde}`;
    };

    // Axios poziv za dohvat svih narudžbi
    const fetchNarudzbe = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/narudzbe");
        narudzbe.value = response.data;
      } catch (error) {
        console.error("Greška prilikom dohvaćanja planova:", error);
      }
    };

    // Axios poziv za dodavanje narudžbe
    const dodajNarudzbu = async () => {
      try {
        // Send a POST request to add a new order
        const response = await axios.post(
          "http://localhost:3000/api/dodavanjenarudzbe",
          {
            nazivPlana: novaNarudzba.value.nazivPlana,
            ID_korisnika: novaNarudzba.value.ID_korisnika,
            sifraPlana: novaNarudzba.value.sifraPlana,
          }
        );

        // Add the new order to the local list of orders
        narudzbe.value.push({
          ID_Kosarice: response.data.narudzbaId, // Assuming your backend returns the new ID
          nazivPlana: novaNarudzba.value.nazivPlana,
          ID_korisnika: novaNarudzba.value.ID_korisnika,
          sifraPlana: novaNarudzba.value.sifraPlana,
        });

        // Clear the form
        novaNarudzba.value = {
          nazivPlana: "",
          ID_korisnika: "",
          sifraPlana: "",
        };
        prikaziDodajNarudzbu.value = false;

        // Optionally provide feedback
        alert("Plan prehrane uspješno dodan!");
      } catch (error) {
        console.error("Greška prilikom dodavanja plana:", error);
        alert("Došlo je do greške prilikom dodavanja plana.");
      }
    };

    const otvoriDodavanjeNarudzbe = () => {
      prikaziDodajNarudzbu.value = true;
    };

    onMounted(() => {
      fetchNarudzbe(); // Dohvati narudžbe kada se stranica učita
    });

    return {
      narudzbe,
      columns,
      fab,
      prikaziDodajNarudzbu,
      novaNarudzba,
      dodajNarudzbu,
      otvoriDodavanjeNarudzbe,
    };
  },
};
</script>
