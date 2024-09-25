import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { auth } from '@/firebase'; // Asegúrate de importar la instancia de Firebase
import { COOKIE_NAME_SESSION } from '@/helpers/constants';
// import type firebase from 'firebase/app'; // Importa los tipos de Firebase si lo necesitas
import type { User } from 'firebase/auth';

interface AuthState {
  token: string | null;
  user: User | null; // Para almacenar el usuario autenticado de Firebase
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: Cookies.get(COOKIE_NAME_SESSION) || null, // Carga el token desde las cookies
    user: null,
  }),
  actions: {
    // Configura el estado inicial de autenticación con Firebase y cookies
    async initAuth() {
      return new Promise<void>((resolve, reject) => {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            this.user = user; // Asigna el usuario
            this.token = await user.getIdToken(); // Obtiene el token de Firebase
            Cookies.set(COOKIE_NAME_SESSION, this.token); // Guarda el token en cookies
          } else {
            this.logout(); // Si no hay usuario, se limpia la sesión
          }
          resolve();
        });
      });
    },

    // Método para establecer el token manualmente
    async setToken(token: string) {
      Cookies.set(COOKIE_NAME_SESSION, token);
      this.token = token;
    },

    // Logout: Elimina el token y cierra la sesión de Firebase
    async logout() {
      console.log("adios")
      await auth.signOut(); // Cierra la sesión en Firebase
      Cookies.remove(COOKIE_NAME_SESSION); // Elimina la cookie del token
      this.token = null;
      this.user = null;
    },
  },
});


// import { defineStore } from 'pinia';
// import Cookies from 'js-cookie';
// import { COOKIE_NAME_SESSION } from '@/helpers/constants';


// interface AuthState {
//   token: string | null;
// }

// export const useAuthStore = defineStore('auth', {
//   state: (): AuthState => ({
//     token: Cookies.get(COOKIE_NAME_SESSION) || null,
//   }),
//   actions: {
//     setToken(token: string) {
//       Cookies.set(COOKIE_NAME_SESSION, token);
//       this.token = token;
//     },
//     logout() {
//       Cookies.remove(COOKIE_NAME_SESSION);
//       this.token = null;
//     },
//   },
// });
