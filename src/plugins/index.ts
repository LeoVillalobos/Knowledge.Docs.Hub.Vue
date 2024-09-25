/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import { PerfectScrollbar } from "vue3-perfect-scrollbar"; // Importa el componente
// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    // .use(pinia)
    .component('PerfectScrollbar', PerfectScrollbar); // Registra el componente
}
