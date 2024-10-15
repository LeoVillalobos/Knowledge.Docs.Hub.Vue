<script lang="ts" setup>
import { ref } from "vue";
import { auth } from "@/firebase"; // Asegúrate de que esta ruta es correcta
import { getIdToken } from "firebase/auth";
import CryptoJS from "crypto-js"; // Importa la librería de encriptación
import { IPassword } from "@/models/password";
import { useAuthStore } from "@/stores/auth";
import { getPasswordsByUserId } from "@/services/auth";

const authStore = useAuthStore();

// Tipos para la respuesta de la API
interface IApiResponse {
  success: boolean;
  data: IPassword[];
}

// Aquí debes definir tu clave de desencriptación
const decryptionKey =
  "cad05c4c3725a3bf54b589b720e4d28b9159c3bbd891eb14305a111fcea943a9"; // Reemplaza esto con tu clave real

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
      throw new Error("User is not authenticated");
    }

    passwordData.value  = await getPasswordsByUserId();

  } catch (err) {
    console.log("error");
    error.value = `Error: ${err}`;
    passwordData.value = []; // Resetea los datos de contraseñas en caso de error
  }
};

onMounted(async () => {
  await fetchPasswords();
});
</script>

<template>
  <div>
    <v-container>
      <v-row class="flex-nowrapt" no-gutters>
        <v-col
          class="flex-grow-0 flex-shrink-0"
          cols="4"
          v-for="password in passwordData"
          :key="password.id"
        >
          <v-card class="mx-auto" max-width="344" elevation="6" rounded="lg">
            <v-card-text>
              <div>Sitio</div>

              <p class="text-h4 font-weight-black">{{ password.site }}</p>

              <p><strong>Url:</strong></p>
              <p><strong>Username:</strong>{{ password.site }}</p>
              <p>
                <strong>Contraseña</strong>
                {{ decryptPassword(password.password) }}
              </p>

              <div class="text-medium-emphasis">{{ password.note }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
