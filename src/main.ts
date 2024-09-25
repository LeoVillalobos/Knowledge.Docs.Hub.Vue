/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { axiosConfig } from './plugins/axios'
import pinia from '@/stores'

const app = createApp(App);

app.use(pinia);

registerPlugins(app)

axiosConfig();

app.mount('#app')


