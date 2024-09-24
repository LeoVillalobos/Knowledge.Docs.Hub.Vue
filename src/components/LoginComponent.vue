<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-card>
          <v-card-title>
            <h1>Login</h1>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                outlined
                required
              ></v-text-field>
              <v-btn type="submit" color="primary">Login</v-btn>
            </v-form>
            <v-alert v-if="error" type="error" dismissible>{{ error }}</v-alert>
            <v-alert v-if="passwordData" type="success" dismissible>
              <h2>Password Data</h2>
              <pre>{{ passwordData }}</pre>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { auth } from '@/firebase'; // Importa tu configuración de Firebase
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';

const email = ref<string>('');
const password = ref<string>('');
const idToken = ref<string | null>(null);
const error = ref<string | null>(null);
const passwordData = ref<any>(null); // Pa

const login = async () => {
  try {
    // Iniciar sesión con email y contraseña
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email.value, password.value);

    // Obtener el ID token
    idToken.value = await userCredential.user.getIdToken();
    error.value = null; // Resetea el error en caso de éxito

    console.log("idToken.value", idToken.value)
    // Hacer la petición a la API con el ID token
    const response = await fetch(`http://localhost:3001/api/password/byUser`, {
      method: 'GET', // Usamos GET ya que solo estamos recuperando datos
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken.value}`, // Envía el ID token en el header
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch password data');
    }

    passwordData.value = await response.json(); // Almacena los datos de la respuesta

  } catch (err) {
    error.value = `Error: ${err}`;
    idToken.value = null; // Resetea el ID token en caso de error
  }
};
</script>

<style scoped>
/* Estilos para tu componente */
</style>
