<script lang="ts" setup>
import { ref } from 'vue';
import { auth } from '@/firebase'; // Asegúrate de que esta ruta es correcta
import { getIdToken } from 'firebase/auth';
import CryptoJS from 'crypto-js'; // Importa la librería de encriptación
import { IPassword } from '@/models/password';
import { getPasswordsByUserId } from '@/services/auth';
import Cookies from 'js-cookie';
import { COOKIE_NAME_SESSION } from '@/helpers/constants';
// Definición de la interfaz para las contraseñas

// Tipos para la respuesta de la API
interface IApiResponse {
  success: boolean;
  data: IPassword[];
}

// Aquí debes definir tu clave de desencriptación
const decryptionKey = 'cad05c4c3725a3bf54b589b720e4d28b9159c3bbd891eb14305a111fcea943a9'; // Reemplaza esto con tu clave real

const decryptPassword = (encryptedPassword: string): string => {
  // Desencriptar la contraseña utilizando

  const bytes = CryptoJS.AES.decrypt(encryptedPassword, decryptionKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData; // Devuelve la contraseña desencriptada
};

const passwordData = ref<IPassword[]>([]);
const error = ref<string | null>(null);

// Función para obtener las contraseñas
const fetchPasswords = async () => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('User is not authenticated');
    }

    // Obtener el ID token
    const idToken = await getIdToken(user, true);

    // Realizar la petición a la API para obtener las contraseñas
    // const response = await getPasswordsByUserId();

    console.log("idToken", idToken);
    const response = await fetch(`http://localhost:3001/api/password/byUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch password data');
    }

    const result: IApiResponse = await response.json(); // Almacena los datos de la respuesta

    console.log("result", result);

    if (result.success) {
      passwordData.value = result.data; // Actualiza el estado con los datos de las contraseñas
      error.value = null; // Resetea el error en caso de éxito
    } else {
      throw new Error('Failed to fetch password data');
    }
  } catch (err) {
    console.log("error");
    error.value = `Error: ${err}`;
    passwordData.value = []; // Resetea los datos de contraseñas en caso de error
  }
};

onMounted( async () => {
  await fetchPasswords();
})
</script>

<template>
  <div>
    <h1>Password List</h1>
    <div v-if="error">{{ error }}</div>
    <div v-if="passwordData.length">
      <h2>Stored Passwords</h2>
      <ul>
        <li v-for="password in passwordData" :key="password.id">
          <p><strong>Site:</strong> {{ password.site }}</p>
          <p><strong>Username:</strong> {{ password.username }}</p>
          <p><strong>Password:</strong> {{ decryptPassword(password.password) }}</p>
          <p v-if="password.note"><strong>Note:</strong> {{ password.note }}</p>
        </li>
      </ul>
    </div>
    <!-- <button @click="fetchPasswords">Fetch Passwords</button> -->
  </div>
</template>

<style scoped>
/* Estilos para tu componente */
h1 {
  font-size: 2rem;
}

button {
  margin-top: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
