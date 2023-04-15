import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../views/Homepage.vue";


const routes = [
  {
    path: '/',
    component: Homepage,
    name: 'Home'
  }
]


export default createRouter({
  history: createWebHistory(),
  routes
})
