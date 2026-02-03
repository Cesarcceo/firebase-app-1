import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/user'
import { DatePicker } from 'ant-design-vue';

// const app = createApp(App)

// app.use(createPinia())

// const userStore = useUserStore()
// userStore.initiAuthNotification()

// app.use(router)
// app.mount('#app')
createApp(App).use(createPinia()).use(router).use(DatePicker).mount('#app')
