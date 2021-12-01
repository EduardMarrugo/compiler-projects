<template>
  <div>
    <v-row v-show="url == 'Home'">
      <v-col>
        <v-card rounded="" elevation="2" class="mx-2">
          <v-card-title class=" font-weight-light"> Projects : {{ url }}  </v-card-title>
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
          icon: "mdi-select-compare",
          subtitle: "Nov 14, 2021",
          title: "Finite automata",
          name: 'FiniteAutomata'
        },
        {
          color: "amber",
          icon: "mdi-state-machine",
          subtitle: "Nov 30, 2021",
          title: "Turing machine",
          name: "TuringMachine"
        },
        {
          color: "green lighten-1",
          icon: "mdi-clipboard-text-play-outline",
          subtitle: "20 Sept, 2021",
          title: "C/C++ File reader",
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
