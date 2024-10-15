<script setup lang="ts">
import { reactive } from "vue";
import Cookies from "js-cookie";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
// import { loginUser } from "@/services/auth/index";
import { ILogin } from "@/models/auth";
import { COOKIE_NAME_SESSION } from '@/helpers/constants';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth } from "@/firebase";
import { handleFinishError } from "@/helpers/toastAlert";

const router = useRouter();
const store = useAuthStore();

const user: ILogin = reactive({
  username: "",
  password: "",
});

interface IFirebase  {
  FirebaseError: {
    Error: any;
  }
}
const login = async () => {
  try {

    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, user.username, user.password);

    // Extraer el token de la respuesta (suponiendo que la respuesta tiene una propiedad 'token')
    const token = await userCredential.user.getIdToken();

    console.log(COOKIE_NAME_SESSION, token);

    console.log(`Bearer ${token}` );
    // Almacena el token en el módulo Pinia y en la cookie
    store.setToken(token);
    Cookies.set(COOKIE_NAME_SESSION, token);

    // Redirige al usuario
    router.push({ path: "/main" });

  } catch (error) {
    console.error("Error en la autenticación:", error);
    handleFinishError(`Error en la autenticación: ${handleError(error)} `);
    // Manejo de errores: podrías mostrar un mensaje de error al usuario
  }
};

const handleError = (error: any): string => {
  // Mapeo de códigos de error a mensajes personalizados
  const errorMessages: { [key: string]: string } = {
    'auth/invalid-email': 'El correo electrónico es inválido.',
    'auth/wrong-password': 'La contraseña es incorrecta.',
    'auth/user-not-found': 'No se encontró ningún usuario con este correo.',
    'auth/missing-password': 'La contraseña es obligatoria.',
    'auth/invalid-credential': 'La credencial es inválida.',
    // Puedes agregar más códigos de error según sea necesario
  };

  // Retornar el mensaje correspondiente o un mensaje genérico si no está mapeado
  return errorMessages[error.code] || `Error en la autenticación: ${error.message}`;
};

onMounted(() => {
  console.log("store", store.token)
})
</script>

<template>
  <div class="d-flex align-center justify-center flex-column" style="margin-top: 100px">
    <v-card
      class="flex-wrap mx-auto mt-3"
      elevation="10"
      rounded="lg"
      flat
      :width="1200"
      :height="750"
    >
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="6">
            <v-carousel
              class="mt-16 mr-6"
              cycle
              :continuous="false"
              :show-arrows="false"
              :width="600"
              :height="600"
              hide-delimiter-background
            >
              <v-carousel-item src="@/assets/images/brain.jpg" cover></v-carousel-item>

              <v-carousel-item src="@/assets/images/books.jpg" cover></v-carousel-item>

              <v-carousel-item src="@/assets/images/head.png" cover></v-carousel-item>

              <v-carousel-item src="@/assets/images/couch.png" cover></v-carousel-item>
            </v-carousel>
          </v-col>

          <v-col cols="6">
            <v-card elevation="0" flat class="mt-16 pl-12 pr-12">
              <v-card-title> Bienvenido </v-card-title>

              <div class="d-sm-flex align-center justify-center mb-4 mt-4 pt-sm-2">
                <v-btn density="default" class="mr-6">
                  Sign in with Google

                  <template v-slot:prepend>
                    <v-icon
                      color="green-darken-2"
                      icon="mdi-google"
                      size="large"
                    ></v-icon>
                  </template>
                </v-btn>

                <v-btn density="default">
                  Sign in with FB

                  <template v-slot:prepend>
                    <v-icon color="blue" icon="mdi-facebook" size="large"></v-icon>
                  </template>
                </v-btn>
              </div>

              <div class="d-sm-flex align-center justify-center mt-12">
                or sign in with
              </div>

              <v-divider></v-divider>

              <form class="mt-8">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="user.username"
                        clearable
                        class="pa-1 ma-1"
                        label="Usuario"
                        variant="underlined"
                        color="reyma-blue-marine"
                        baseColor="reyma-blue-marine"
                        :counter="350"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="user.password"
                        clearable
                        class="pa-1 ma-1"
                        label="Contraseña"
                        type="password"
                        variant="underlined"
                        color="reyma-blue-marine"
                        baseColor="reyma-blue-marine"
                        :counter="350"
                        @keyup.enter="login"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </form>

              <template v-slot:actions>
                <v-btn
                  class="flex-grow-1 mt-2"
                  height="48"
                  variant="tonal"
                  @click="login"
                >
                  Sigin in
                </v-btn>
              </template>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
