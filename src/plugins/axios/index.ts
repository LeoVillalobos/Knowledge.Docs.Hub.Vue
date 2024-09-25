import { useAuthStore } from "@/stores/auth"; // Importa el store de autenticación
import axios, { type InternalAxiosRequestConfig } from "axios";
import Cookies from 'js-cookie';
import { COOKIE_NAME_SESSION } from "@/helpers/constants";
// Configura la base URL de Axios
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosConfig = () => {
  // Obtén el store de autenticación
  const authStore = useAuthStore();

  // Interceptor para las solicitudes
  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const authStore = useAuthStore();
      const token = authStore.token || Cookies.get(COOKIE_NAME_SESSION); // Toma el token del store o la cookie

      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Añade el token a las cabeceras
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor para respuestas
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Si el token es inválido, redirigir al login
      if (error.response && error.response.status === 401) {
        authStore.logout(); // Elimina el token del store y de las cookies
        window.location.href = "/login"; // Redirige a la página de login
      }
      return Promise.reject(error);
    }
  );
};

export { axiosConfig };
