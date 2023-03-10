import { createApp } from 'vue'
import App from './App.vue'
import Navbar from './components/Nav-bar.vue'
createApp(App).mount('#app')
createApp(App).component('Navbar',Navbar)