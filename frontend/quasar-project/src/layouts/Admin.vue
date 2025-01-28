<template>
  <q-layout view="lHh Lpr lFf" class="layout-background">
    <!-- Header with Green Background -->
<<<<<<< HEAD
    <q-header elevated class="bg-teal-5">
=======
    <q-header elevated class="bg-green-5">
>>>>>>> 627c934 (KRAJ)
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
<<<<<<< HEAD
          Plantie Admin
=======
          MindMeal Admin
>>>>>>> 627c934 (KRAJ)
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- Drawer (Side Menu) -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Izbornik
        </q-item-label>

        <q-item
          v-for="link in linksList"
          :key="link.title"
          clickable
          tag="router-link"
          :to="link.to"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'

defineOptions({
  name: 'AdminLayout'
})

let title = computed(() => {
<<<<<<< HEAD
  return "Plantie admin"
=======
  return "MindMeal admin"
>>>>>>> 627c934 (KRAJ)
})

const linksList = [
  {
    title: 'Admin',
    caption: 'Admin',
    icon: 'home',
    to: '/admin'
  },
  {
    title: 'Korisnici',
    caption: 'Upravljanje korisnicima',
<<<<<<< HEAD
    icon: 'user',
    to: '/admin/korisnici'
  },
  {
    title: 'Biljke',
    caption: 'Upravljanje biljkama',
    icon: 'search',
    to: '/admin/biljke'
  },
  {
    title: 'Narudžbe',
    caption: 'Upravljanje narudžbama',
    icon: 'info',
    to: '/admin/narudzbe'
  },
  {
    title: 'Objave',
    caption: 'Upravljanje objavama',
    icon: 'local_library',
    to: '/admin/objave'
  }
=======
    icon: 'accessibility',
    to: '/admin/korisnici'
  },
  {
    title: 'Planovi prehrane',
    caption: 'Upravljanje planovima prehrane',
    icon: 'assignment',
    to: '/admin/narudzbe'
  },
>>>>>>> 627c934 (KRAJ)
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
.layout-background {
<<<<<<< HEAD
  background-color: #DBFFE9; /* Set very light green background for the whole layout */
=======
  background-color: #4caf50; /* Set very light green background for the whole layout */
>>>>>>> 627c934 (KRAJ)
}

* {
  color: #3E6F52; /* Apply the text color to all text elements */
}

/* Specific adjustments for individual elements if needed */
q-toolbar-title, q-item-label, q-btn {
<<<<<<< HEAD
  color: #3E6F52; /* Make sure titles and labels also have this text color */
=======
  color: #4caf50; /* Make sure titles and labels also have this text color */
>>>>>>> 627c934 (KRAJ)
}
</style>
