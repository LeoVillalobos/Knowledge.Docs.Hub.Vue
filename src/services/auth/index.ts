import type { IPassword } from "@/models/password/index"; // Asegúrate de tener la interfaz IPassword en la ubicación correcta
import axios from "axios";
import { responseBody, responseError } from "@/helpers/axiosResponse";


/**
 * @method getPasswordsByUserId
 * @returns {Promise<IPassword[]>} - Una promesa que resuelve un arreglo de contraseñas
 */
const getPasswordsByUserId = (): Promise<IPassword[]> =>
  new Promise((resolve, reject) => {
    axios
      .get(`password/byUser`) // Asegúrate de que esta sea la URL correcta
      .then((response) => {
        // Asumiendo que la respuesta tiene la misma estructura que el ejemplo que diste
        const passwords = responseBody(response).data; // Aquí accedemos a la propiedad `data`
        resolve(passwords);
      })
      .catch((error) => {
        reject(responseError(error));
      });
  });

export { getPasswordsByUserId };
