<template>
  <q-page class="flex flex-center bg-dark-green">
    <div class="q-pa-md text-left" style="width: 100%;">
      <h1 class="text-white text-normal">Login</h1>
      <div class="row q-mt-lg justify-around q-gap-md">
        <!-- Korisnik -->
        <q-card class="bg-light-green text-dark" style="width: 300px">
          <q-card-section>
            <h3 class="text-dark">Prijavite se kao korisnik:</h3>
            <q-input
              outlined
              filled
              v-model="ID_korisnika"
              label="id"
              class="q-mt-md bg-input-green"
            />
            <q-input
              outlined
              filled
              v-model="Lozinka_korisnika"
              label="Lozinka"
              type="password"
              class="q-mt-md bg-input-green"
            />
            <q-btn
              color="primary"
              label="Prijava"
              class="q-mt-md"
              @click="loginUser"
            />
          </q-card-section>
        </q-card>
        <!-- Stručnjak -->
        <q-card class="bg-light-green text-dark" style="width: 300px">
          <q-card-section>
            <h3 class="text-dark">Prijavite se kao stručnjak:</h3>
            <q-input
              outlined
              filled
              v-model="Lozinka_strucnjaka"
              label="id"
              class="q-mt-md bg-input-green"
            />
            <q-input
              outlined
              filled
              v-model="Lozinka_strucnjaka"
              label="Lozinka"
              type="password"
              class="q-mt-md bg-input-green"
            />
            <q-btn
              color="primary"
              label="Prijava"
              class="q-mt-md"
              @click="loginUser"
            />
          </q-card-section>
        </q-card>

        <!-- Admin -->
        <q-card class="bg-light-green text-dark" style="width: 300px">
          <q-card-section>
            <h3 class="text-dark">Prijavite se kao admin:</h3>
            <q-input
              outlined
              filled
              v-model="adminId"
              label="ID Admina"
              class="q-mt-md bg-input-green"
            />
            <q-btn
              color="primary"
              label="Prijava"
              class="q-mt-md"
              @click="loginAdmin"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      ID_korisnika: '',
      Lozinka_korisnika: '',
      adminId: ''
    };
  },
  methods: {
    // Metoda za prijavu korisnika
    async loginUser() {
  if (this.ID_korisnika && this.Lozinka_korisnika) {
    console.log('id:', this.ID_korisnika, 'lozinka:', this.Lozinka_korisnika); // For debugging the input values
    try {
      // Use GET request and send data as query parameters
      const response = await axios.get('http://localhost:3000/api/login', {
        params: {
          ID_korisnika: this.ID_korisnika,
          Lozinka_korisnika: this.Lozinka_korisnika
        }
      });

      // If login is successful, show the message returned from server
      alert(response.data.message);
    } catch (error) {
      // Handle errors (like the 404 or 500 errors)
      console.error('Error during login:', error); // Logs the entire error object
      alert(error.response ? error.response.data.error : 'Došlo je do greške pri prijavi.');
    }
  } else {
    alert('Molimo unesite ispravan ID i lozinku! U slučaju zaborava ID-ja ili lozinke kontaktirajte nas na plantie@veleri.hr');
  }
},

    // Metoda za prijavu admina
    async loginAdmin() {
      if (this.adminId) {
        try {
          // API poziv za provjeru ID-a admina
          const response = await axios.get('http://localhost:3000/Admin', {
            params: { adminId: this.adminId }
          });

          // Ako je admin ID ispravan, redirektira na AdminPage
          if (response.data && response.data[0].id_exists === 1) {
            this.$router.push({ name: 'AdminPage' });
          } else {
            alert('Ne, ne! Neispravan ID admina.');
          }
        } catch (error) {
          console.error('Error during admin login:', error);  // Ispisuje cijeli error objekt
          alert('Došlo je do greške pri prijavi.');
        }
      } else {
        alert('Molimo unesite ID admina.');
      }
    }
  }
};
</script>

<style>
.bg-dark-green {
  background-color: #2e8b57; /* Tamnija zelena za pozadinu */
}
.bg-light-green {
  background-color: #a9d18e; /* Svjetlija zelena za kartice */
}
.bg-input-green {
  background-color: #eaf4dc; /* Vrlo svijetla zelena za unosna polja */
}
.text-dark {
  color: #2e3d2f; /* Tamna zelena za tekst */
}
.text-white {
  color: white;
}
.text-normal {
  font-weight: normal; /* Nema podebljanja */
}
</style>




