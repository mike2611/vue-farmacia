import Vue from 'vue';
import Router from 'vue-router';

import DashBoard from './components/DashBoard.vue'
import PuntoVenta from './components/PuntoVenta.vue'
import LoginTemplate from './components/LoginTemplate.vue'

Vue.use(Router);

const routes = [
    { path: '/dashboard', component: DashBoard },
    { path: '/puntoVenta', component: PuntoVenta },
    { path: '/login', component: LoginTemplate },
  ];
  
  const router = new Router({
    mode: 'history',
    routes,
  });
  
export default router;
