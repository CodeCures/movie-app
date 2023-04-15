import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../views/Homepage.vue";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Homepage
  },
  {
    path: '/movies/:id',
    name: 'ShowMovie',
    component: () => import('../views/MovieShow.vue')
  }
]


export default createRouter({
  history: createWebHistory(),
  routes
})
