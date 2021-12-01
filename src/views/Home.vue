<template>
  <div>
    <v-row v-show="url == 'Home'">
      <v-col cols="12" sm="6">
        <v-card rounded="" elevation="2" class="mx-2">
          <v-card-title class=" font-weight-light"> 
            <v-btn icon>
              <v-icon>
                mdi-code-braces-box
              </v-icon>
            </v-btn>
            Projects</v-card-title>
          <v-list subheader two-line>
            <v-list-item v-for="file in files" :key="file.title" @click="$router.push({name: file.name})">
              <v-list-item-avatar>
                <v-icon :class="file.color" dark v-text="file.icon"></v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="file.title"></v-list-item-title>

                <v-list-item-subtitle
                  v-text="file.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
         <v-card rounded="" elevation="2" class="mx-2">
          <v-card-title class=" font-weight-light"> 
           <v-btn icon>
              <v-icon >
                mdi-account-group
            </v-icon>
           </v-btn>
            Integrantes</v-card-title>
          <v-list subheader two-line>
            <v-list-item v-for="file in Integrantes" :key="file.title" @click="$router.push({name: file.name})">
              <v-list-item-avatar>
                <v-icon :class="file.color" dark v-text="file.icon"></v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="file.title"></v-list-item-title>

                <v-list-item-subtitle
                  v-text="file.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <router-view></router-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import HelloWorld from '../components/HelloWorld'

export default {
  name: "Home",
  data() {
    return {
      files: [
        {
          color: "blue",
          icon: "mdi-source-branch",
          subtitle: "Nov 14, 2021",
          title: "Finite automata",
          name: 'FiniteAutomata'
        },
        {
          color: "amber",
          icon: "mdi-select-compare",
          subtitle: "Nov 30, 2021",
          title: "Turing machine",
          name: "TuringMachine"
        },
        {
          color: "green lighten-1",
          icon: "mdi-language-cpp",
          subtitle: "20 Sept, 2021",
          title: "C/C++ File reader",
          name: "Home"
        },
        {
          color: "red lighten-1",
          icon: "mdi-clipboard-text-play-outline",
          subtitle: "17 Dic, 2021",
          title: "Proyecto Final",
          name: "Home"
        },
      ],
      Integrantes: [
        {
          color: "amber",
          icon: "mdi-shield-account",
          subtitle: "Nov 30, 2021",
          title: "Eduard Marrugo",
          name: "Home"
        },
          {
          color: "blue",
          icon: "mdi-shield-account",
          subtitle: "Nov 14, 2021",
          title: "Fry Simmonds",
          name: 'Home'
        },
        {
          color: "green lighten-1",
          icon: "mdi-shield-account",
          subtitle: "20 Sept, 2021",
          title: "Jeison Martinez",
          name: "Home"
        },
          {
          color: "red lighten-1",
          icon: "mdi-shield-account",
          subtitle: "20 Sept, 2021",
          title: "Sebastian Fuentes",
          name: "Home"
        },
      ],
    };
  },
  components: {
    // HelloWorld,
  },
  computed: {
    url() {
      return this.$route.name;
    },
  },
  created() {
    console.log(this.$route);
  },
};
</script>
