import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'


const routes = [{
  path: '/',
  name: 'home',
  component: Home
},
{
  path: '/login',
  name: 'login',
  component: LoginPage
}

]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:routes
})

export default router
