<script setup lang="ts">
import { UserIcon, MailIcon, ListCheckIcon, SignLeftIcon } from "vue-tabler-icons";
// import { useAuth, useOidcStore } from "@/plugins/oidc";

// const { signoutRedirect } = useAuth();
// const { state } = useOidcStore();

const signout = () => {
  // signoutRedirect({ id_token_hint: state.value.user?.id_token });
};

</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn class="profileBtn custom-hover-primary" variant="text" v-bind="props" icon>
        <v-avatar size="35">
          <img src="@/assets/images/users/avatar-1.jpg" height="35" alt="user" />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="200" elevation="10" class="mt-2">
      <v-list class="py-0" lines="one" density="compact">
        <!-- <v-list-item value="item4" active-color="primary" v-on:click="login">
          <template v-slot:prepend>
            <SignLeftIcon size="20" />
          </template>
          <v-list-item-title class="pl-4 text-body-1">Login</v-list-item-title>
        </v-list-item> -->
        <!-- <v-list-item value="item1" active-color="primary">
          <template v-slot:prepend>
            <UserIcon size="20" />
          </template>
          <v-list-item-title class="pl-4 text-body-1">Cerrar sesión</v-list-item-title>
        </v-list-item> -->
        <!-- <v-list-item value="item2" active-color="primary">
          <template v-slot:prepend>
            <MailIcon size="20" />
          </template>
          <v-list-item-title class="pl-4 text-body-1">My Account</v-list-item-title>
        </v-list-item> -->
        <!-- <v-list-item value="item3" active-color="primary">
          <template v-slot:prepend>
            <ListCheckIcon size="20" />
          </template>
          <v-list-item-title class="pl-4 text-body-1">My Task</v-list-item-title>
        </v-list-item> -->
      </v-list>
      <div class="pt-4 pb-4 px-5 text-center">
        <v-btn to="/auth/login" color="primary" variant="outlined" block @click="signout">Logout</v-btn>
      </div>
    </v-sheet>
  </v-menu>
</template>
