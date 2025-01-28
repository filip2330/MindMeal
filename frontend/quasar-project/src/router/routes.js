const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/popisplanova', component: () => import('pages/PopisPlanovaPage.vue') },
      { path: '/pretrazivanje', component: () => import('pages/PretrazivanjePlanova.vue') },
      { path: '/onama', component: () => import('pages/ONamaPage.vue') },
      { path: '/lokacija', component: () => import('pages/LokacijaPage.vue') },
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      { path: '/registracija', component: () => import('pages/RegistracijaPage.vue') },
      { path: '/narudzba', component: () => import('pages/NarudzbaPage.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', component: () => import('pages/AdminPage.vue'), name: 'AdminPage' },
<<<<<<< HEAD
      { path: '/admin/biljke', component: () => import('pages/UpravljanjeBiljem.vue') },
      { path: '/admin/korisnici', component: () => import('pages/UpravljanjeKorisnicima.vue') },
      { path: '/admin/narudzbe', component: () => import('pages/UpravljanjeNarudžbama.vue') },
      { path: '/admin/objave', component: () => import('pages/UpravljanjeObjavama.vue') }]
=======
      { path: '/admin/korisnici', component: () => import('pages/UpravljanjeKorisnicima.vue') },
      { path: '/admin/narudzbe', component: () => import('pages/UpravljanjeNarudzbama.vue') }
    ]
>>>>>>> 627c934 (KRAJ)
  },
  // Ruta za 404 stranicu:
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
<<<<<<< HEAD

=======
>>>>>>> 627c934 (KRAJ)
