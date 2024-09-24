<template>
  <div>
    <h1>Login</h1>
    <input v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p v-if="error">{{ error }}</p>
    <p v-if="idToken">ID Token: {{ idToken }}</p>
    <div v-if="passwordData">
      <h2>Password Data</h2>
      <pre>{{ passwordData }}</pre>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { auth } from '@/firebase'; // Importa tu configuración de Firebase
// import { auth } from '@/firebase.example'; // Importa tu configuración de Firebase
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

    console.log("idToken.value", idToken.value);
    error.value = null; // Resetea el error en caso de éxito

    // Hacer la petición a la API con el ID token
    // const response = await fetch(`http://localhost:3001/api/password/byUser/leo`, {
    //   method: 'GET', // Usamos GET ya que solo estamos recuperando datos
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${idToken.value}`, // Envía el ID token en el header
    //   },
    // });

    // if (!response.ok) {
    //   throw new Error('Failed to fetch password data');
    // }

    // passwordData.value = await response.json(); // Almacena los datos de la respuesta

  } catch (err) {
    error.value = `Error: ${err}`;
    idToken.value = null; // Resetea el ID token en caso de error
  }
};
</script>

<style scoped>
/* Estilos para tu componente */
</style>
