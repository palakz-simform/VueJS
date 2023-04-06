import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import NavBar from './components/Nav-bar.vue'
import router from './router'
const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.component('NavBar', NavBar)
app.mount('#app')
