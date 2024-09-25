<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { auth } from "@/firebase"; // Asegúrate de importar tu configuración de Firebase
// import { useAuthStore } from '@/stores/auth';
const token = useAuthStore().token;
const router = useRouter();
const authStore = useAuthStore();

onBeforeMount(async () => {
  if (authStore.token) {
    router.push({ name: 'Home' });
  // El usuario está autenticado
} else {
    router.push({ name: "Login" });
  // Redirigir al login o manejar el estado no autenticado
}
  // if (token) {
  //   try {
  //     // Verificar el token de Firebase
  //     const user = await auth.currentUser?.getIdTokenResult();

  //     console.log("hola", user);
  //     if (token) {
  //       // Token válido, redirigir a la página principal
  //       console.log("Token válido", token);
  //       // console.log("a", auth.)
  //       router.push({ name: 'Home' });
  //     } else {
  //       // Token inválido o no existe, redirigir a Login
  //       console.log("Token inválido, redirigiendo a Login");
  //       router.push({ name: "Login" });

  //       // useAuthStore().logout();
  //     }
  //   } catch (error) {
  //     console.error("Error al verificar el token:", error);
  //     router.push({ name: "Login" });
  //   }
  // } else {
  //   // Si no hay token, redirigir a Login
  //   router.push({ name: "Login" });
  // }
});
</script>
