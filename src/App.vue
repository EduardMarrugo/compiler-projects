<template>
  <v-app>
    <v-app-bar app color="white">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/unimag.png"
          transition="scale-transition"
          width="60"
        />

        <v-toolbar-title class="font-weight-light">
          Curso Compiladores
        </v-toolbar-title>

        <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
      </div>

      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-select
          class="mt-7"
          single-line
          append-icon="mdi-magnify"
          solo-inverted
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
      <router-view />
    </v-main>
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
