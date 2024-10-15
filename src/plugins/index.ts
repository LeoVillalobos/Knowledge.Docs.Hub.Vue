/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import router from '../router'
import { PerfectScrollbar } from "vue3-perfect-scrollbar"; // Importa el componente
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
// Types
import type { App } from 'vue'
import { toastOptions } from '@/helpers/constants';

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(Toast, toastOptions)
    .component('PerfectScrollbar', PerfectScrollbar); // Registra el componente
}
