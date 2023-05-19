import { createApp } from 'vue'
import App from './App.vue'
import Navbar from './components/Nav-bar.vue'

createApp(App).component('Navbar',Navbar).mount('#app')