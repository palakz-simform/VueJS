import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import CarDetail from '../views/CarDetail.vue'
import NotFound from '../views/NotFound.vue'
import { useUserStore } from '../stores/user'

const routes = [{
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    requiresAuth: true
  }
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
},
{
  path: '/details/:id(\\d+)',
  name: 'carDetail',
  component: CarDetail,
  meta: {
    requiresAuth: true
  },
  // Per route guard
  async beforeEnter(to, from) {
    try {
      const response = await axios.get(`https://testapi.io/api/dartya/resource/cardata/`)
      const cdata = response.data.data
      const cardata = cdata.find(data => data.id == to.params.id)
      if (!cardata) {
        return {
          name: 'NotFound',
          //allows keeping URL while redirectiong to the home page. "PathMatch" is a property in Vue.js that is used to capture dynamic segments of a URL
          params: { pathMatch: to.path.split('/').slice(1) },
        }
      }
    }
    catch {
      return {
        name: 'NotFound',
        //allows keeping URL while redirectiong to the home page. "PathMatch" is a property in Vue.js that is used to capture dynamic segments of a URL
        params: { pathMatch: to.path.split('/').slice(1) },
      }
    }
  }
},
{
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: NotFound
}

]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return
  }
  const store = useUserStore();
  if (store.login) {
    next();
  }
  else {
    next({ name: "login" })
  }
});

import axios from 'axios'
export default router
