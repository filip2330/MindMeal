<template>
  <q-page padding>
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <!-- Zamijenjen lokalni put za sliku s URL-om -->
        <img alt="Slika Biljke" src="https://cdn.britannica.com/24/118324-050-BA5BD2FD/Grass-cottage-pink.jpg" style="width: 50%; height: auto;">
          <div class="text-h3 text-weight-bolder absolute-bottom text-center">
            O nama
          </div>
        <img>
      </q-card-section>
      <q-card-section class="text-h4 text-justify">
        {{ o_nama }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  setup() {
    return {
      o_nama: 'Plantie Online Trg je online trgovina specijalizirana za prodaju bilja, biljnih suplemenata i sličnih proizvoda. Na njihovoj platformi možete pronaći široku ponudu biljaka, začina, ljekovitih trava i drugih prirodnih proizvoda, koji su dostupni za kupovinu putem interneta. Trgovina se fokusira na kvalitetu, prirodnost i zdravlje svojih korisnika, nudeći proizvode koji podržavaju zdrav način života i održivost.'
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>
