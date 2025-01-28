<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="custom-toolbar-title">
          <img
            alt="MindMeal logo"
            src="~assets/Untitled-4.png"
            style="width: 200px; height: 62px"
          />
        </q-toolbar-title>

        <img
          alt="MindMeal logo"
          src="~assets/logo.png"
          style="width: 85px; height: 50px"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'Naslovna',
    caption: 'Početna stranica',
    icon: 'home',
    to: '/'
  },

  {
    title: 'Popis svih planova prehrane',
    caption: 'Dostupni planovi',
    icon: 'library_books',
    to: '/popisplanova'
  },
  {
    title: 'Pretraživanje Planova',
    caption: 'Pretraži planove',
    icon: 'search',
    to: '/pretrazivanje'
  },
  {
    title: 'Lokacija',
    caption: 'Pronađite nas',
    icon: 'place',
    to: '/lokacija'
  },
  {
    title: 'Login',
    caption: 'Prijavite se',
    icon: 'login',
    to: '/login'
  },
  {
    title: 'Registracija',
    caption: 'Registrirajte se',
    icon: 'person_add',
    to: '/registracija'
  },
  {
    title: 'Odaberi plan',
    caption: 'Odluči koji je najbolji za tebe',
    icon: 'library_books',
    to: '/narudzba'
  },
]


const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
