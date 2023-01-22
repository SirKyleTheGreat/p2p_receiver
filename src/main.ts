import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// TAILWINDS
import './assets/tailwinds.css'
import "toastify-js/src/toastify.css"

import { Buffer } from 'buffer';

// @ts-ignore
window.Buffer = Buffer;

createApp(App).use(store).use(router).mount('#app')
