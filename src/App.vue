<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

onBeforeMount(async () => {
  if (authStore.token) {
    console.log("authStore.token", authStore.token);
    // router.push("/dashboard/Index");
    router.push({ path: "/main" });

    // El usuario está autenticado
  } else {
    router.push({ path: "/auth/login" });
    // Redirigir al login o manejar el estado no autenticado
  }
});
</script>
