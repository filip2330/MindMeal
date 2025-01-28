<template>
  <q-page padding>
    <!-- Tabela za prikaz planova prehrane -->
    <q-table
      :rows="planovi"
      :columns="columns"
      row-key="sifraPlana"
    />

    <!-- FAB gumb za administrativne opcije -->
    <div class="q-pa-md flex flex-center">
      <q-fab
        v-model="fab"
        label="Opcije admina"
        color="teal"
        icon="menu"
        direction="down"
        size="sm"
      >
        <!-- Akcija za dodavanje plana prehrane -->
        <q-fab-action color="primary" @click="otvoriDodavanjePlana" icon="add" label="Dodaj plan" />

        <!-- Akcija za uklanjanje plana -->
        <q-fab-action color="negative" @click="otvoriUklanjanjePlana" icon="delete" label="Ukloni plan" />
      </q-fab>
    </div>

    <!-- Popup za dodavanje plana -->
    <q-dialog v-model="prikaziDodajPlan">
      <q-card>
        <q-card-section>
          <div class="text-h6">Dodavanje plana prehrane</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="novaPlan.nazivPlana" label="Naziv plana" />
          <q-input v-model="novaPlan.opisPlana" label="Opis plana" />
          <q-input v-model="novaPlan.cijena" label="Cijena (€)" type="number" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Odustani" color="primary" @click="prikaziDodajPlan = false" />
          <q-btn flat label="Dodaj" color="primary" @click="dodajPlan" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Popup za uklanjanje plana -->
    <q-dialog v-model="prikaziUkloniPlan">
      <q-card>
        <q-card-section>
          <div class="text-h6">Uklanjanje plana prehrane</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="idPlanaZaUklanjanje" label="Unesite ID plana" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Odustani" color="primary" @click="prikaziUkloniPlan = false" />
          <q-btn flat label="Ukloni" color="negative" @click="ukloniPlan(idPlanaZaUklanjanje)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: "UpravljanjePlanovima",
  setup() {
    const planovi = ref([]);
    const columns = [
      { name: 'sifraPlana', align: 'left', label: 'Šifra plana', field: 'sifraPlana' },
      { name: 'nazivPlana', align: 'left', label: 'Naziv plana', field: 'nazivPlana' },
      { name: 'opisPlana', align: 'left', label: 'Opis plana', field: 'opisPlana' },
      { name: 'cijena', align: 'center', label: 'Cijena (€)', field: 'cijena' },
    ];

    const fab = ref(false);
    const prikaziDodajPlan = ref(false);
    const prikaziUkloniPlan = ref(false);
    const novaPlan = ref({ nazivPlana: "", opisPlana: "", cijena: 0 });
    const idPlanaZaUklanjanje = ref("");

    // Fetch meal plans from the backend
    const fetchPlanovi = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/planovi");
        planovi.value = response.data;
      } catch (error) {
        console.error("Greška prilikom dohvaćanja planova:", error);
      }
    };

    // Function to add a new meal plan
    const dodajPlan = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/planovi", {
          nazivPlana: novaPlan.value.nazivPlana,
          opisPlana: novaPlan.value.opisPlana,
          cijena: novaPlan.value.cijena,
        });

        planovi.value.push({
          sifraPlana: response.data.id,  // Assuming the backend returns the new ID
          nazivPlana: novaPlan.value.nazivPlana,
          opisPlana: novaPlan.value.opisPlana,
          cijena: novaPlan.value.cijena,
        });

        novaPlan.value = { nazivPlana: "", opisPlana: "", cijena: 0 };
        prikaziDodajPlan.value = false;
        alert("Uspješno ste dodali plan prehrane!");
      } catch (error) {
        console.error("Greška prilikom dodavanja plana:", error);
        alert("Došlo je do greške prilikom dodavanja plana.");
      }
    };

    // Function to delete a meal plan by ID
    const ukloniPlan = async (sifraPlana) => {
      try {
        await axios.delete(`http://localhost:3000/api/planovi/${sifraPlana}`);
        planovi.value = planovi.value.filter(plan => plan.sifraPlana !== sifraPlana);
        prikaziUkloniPlan.value = false;
        alert('Plan prehrane uspješno uklonjen.');
      } catch (error) {
        console.error("Greška prilikom brisanja plana:", error);
      }
    };

    const otvoriDodavanjePlana = () => {
      prikaziDodajPlan.value = true;
    };

    const otvoriUklanjanjePlana = () => {
      prikaziUkloniPlan.value = true;
    };

    onMounted(() => {
      fetchPlanovi(); // Fetch the meal plans when the page loads
    });

    return {
      planovi,
      columns,
      fab,
      prikaziDodajPlan,
      prikaziUkloniPlan,
      novaPlan,
      idPlanaZaUklanjanje,
      dodajPlan,
      ukloniPlan,
      otvoriDodavanjePlana,
      otvoriUklanjanjePlana,
    };
  }
};
</script>
