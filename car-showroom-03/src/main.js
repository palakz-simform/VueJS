import { createApp } from 'vue'
import App from './App.vue'
import Navbar from './components/Nav-bar.vue'

const app = createApp(App)
app.component('NavBar',Navbar)
app.mount('#app')