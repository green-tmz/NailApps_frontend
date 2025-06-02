import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification';
import VueTheMask from 'vue-the-mask';
import { Dialog, Quasar } from 'quasar'

// import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import 'vue-toastification/dist/index.css';
import './assets/main.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, {
  maxToasts: 2,
  hideProgressBar: true,
  newestOnTop: true
})
app.use(Quasar, {
  plugins: {
    Dialog // активируем плагин Dialog
  },
})
app.use(VueTheMask)

app.mount('#app')
