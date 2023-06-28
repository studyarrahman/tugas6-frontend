import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import updateBuku from '../views/Dashboard/updateBuku.vue';
import updateKategori from '../views/Dashboard/updateKategori.vue';
import dashboardAdmin from '../views/Dashboard/dashboardAdmin.vue';
import pageProfile from '../views/Profile/pageProfile.vue';
import updateProfile from '../views/Profile/updateProfile.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboardAdmin,
    },
    {
      path: '/updateBuku/:kode',
      name: 'updateBuku',
      component: updateBuku,
    },
    {
      path: '/updateKategori/:kode',
      name: 'updateKategori',
      component: updateKategori,
    },
    {
      path: '/profile',
      name: 'pageProfile',
      component: pageProfile,
    },
    {
      path: '/updateProfile/:nomor',
      name: 'updateProfile',
      component: updateProfile,
    },
  ],
});

export default router;
