<template>
  <v-app>
    <v-app-bar app color="white">
      <router-link style="text-decoration: none; color: black" to="/">
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="./assets/unimag.png"
            transition="scale-transition"
            width="50"
          />

          <v-toolbar-title class="font-weight-light text-truncate">
            Curso Compiladores
          </v-toolbar-title>
        </div>
      </router-link>

      <v-spacer></v-spacer>
      <v-col cols="2">
        <v-select
          class="mt-7 mr-n10"
          single-line
          prepend-inner-icon="mdi-translate"
          solo
          flat
          v-model="lang"
          @change="handleLang"
          :items="items"
          :value="lang"
        >
        </v-select>
      </v-col>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-footer absolute :padless="true">
      <v-card flat tile width="100%" class="white lighten-1 text-center">
        <v-card-text class="dark--text">
          {{ new Date().getFullYear() }} — <strong>Curso de Compiladores</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: function () {
    const lang = localStorage.getItem("lang") || "es";
    return {
      lang: lang,
      items: ["en", "es", "fr"],
    };
  },
  methods: {
    handleLang(item) {
      localStorage.setItem("lang", item);
    },
  },
};
</script>
