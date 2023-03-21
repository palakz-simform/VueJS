import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue' 


const routes = [{
  path: '/',
  name: 'home',
  component: Home
},
{
  path: '/login',
  name: 'login',
  component: LoginPage
},
{
  path: '/register',
  name: 'register',
  component: RegisterPage
}

]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:routes
})

export default router
