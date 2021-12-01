<template>
  <div class="">
    <v-row>
      <v-col cols="12" sm="6">
        <label for="textoEntrada">{{ $tc("screen.labels", 0) }}</label>
        <v-text-field
          name="textoEntrada"
          id="textoEntrada"
          flat
          solo-inverted
          :placeholder="$t('screen.placehoder')"
          v-model="textInput"
          :readonly="disabled"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <label for="expresionRegular">{{ $tc("screen.labels", 1) }}</label>
        <v-text-field
          name="expresionRegular"
          id="expresionRegular"
          flat
          solo-inverted
          readonly
          :value="$t('screen.RExp')"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-slider
          tick-size="5"
          ticks="always"
          :tick-labels="tickLabels"
          v-model="velocidad"
          :disabled="disabled"
          min="1"
          max="5"
          :label="$tc('screen.labels', 2)"
        ></v-slider>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn
          v-if="show"
          block
          color="blue lighten-1"
          elevation="0"
          dark
          href="#network"
          @click="validateRoutes()"
        >
          {{ $tc("screen.botton", 1) }}
        </v-btn>
        <v-btn
          v-else
          block
          color="red lighten-1"
          elevation="0"
          dark
          href="#network"
          @click="show = true"
        >
          {{ $tc("screen.botton", 0) }}
        </v-btn>
      </v-col>
    </v-row>
    <app-network
      id="network"
      class="network"
      ref="network"
      :nodes="network.nodes"
      :edges="network.edges"
      :options="network.options"
    >
    </app-network>
  </div>
</template>

<script>
import { Network } from "vue-visjs";
const Swal = require("sweetalert2");

export default {
  components: {
    "app-network": Network,
  },
  data: () => ({
    //Cancel Routes
    show: true,
    //Frontend
    disabled: false,
    tickLabels: ["x1", "x2", "x3", "x4", "x5"],

    textInput: "",

    //Makes routes
    routesArray: [],

    //Handle Error
    manage_err: {
      not_found_edge: false,
      not_accepted_state: false,
    },

    //Rules for automata and RExp
    rules: {
      stringEmtpy: [(v) => !!v || false],
      expresion: [(v) => /(^((\w)+)$) | (^(\?)$)/.test(v) || false],
      expresionValida: [
        (v) => /(^((aaa)*(aab)*b*)*$)|(^(\?)$)/.test(v) || false,
      ],
      tabulaciones: [(v) => v.includes(" ")],
      vacio: [(v) => /^\?$/.test(v) || false],
    },

    //data network
    focus: 1,
    velocidad: 1,
    networkEvents: "",
    network: {
      nodes: [
        { id: 0, label: "q0", color: "green" },
        { id: 1, label: "q1" },
        { id: 2, label: "q2" },
        { id: 3, label: "q3", color: "red" },
        { id: 4, label: "q4", color: "red" },
      ],
      edges: [
        { id: 0, from: 0, to: 3, label: "b", title: "b", arrows: { to: true } },
        { id: 1, from: 0, to: 1, label: "a", title: "a", arrows: { to: true } },
        { id: 2, from: 1, to: 2, label: "a", title: "a", arrows: { to: true } },
        { id: 3, from: 2, to: 3, label: "b", title: "b", arrows: { to: true } },
        { id: 4, from: 2, to: 4, label: "a", title: "a", arrows: { to: true } },
        { id: 5, from: 3, to: 1, label: "a", title: "a", arrows: { to: true } },
        { id: 6, from: 3, to: 3, label: "b", title: "b", arrows: { to: true } },
        { id: 7, from: 4, to: 1, label: "a", title: "a", arrows: { to: true } },
        { id: 8, from: 4, to: 3, label: "b", title: "b", arrows: { to: true } },
      ],
      options: {
        nodes: {
          shape: "circle",
        },
      },
    },
  }),
  created() {
    // this.$vuetify.theme.light = "#ffff";
    this.showInfoAboutEmpty();
  },
  computed: {
    speed() {
      let velocidad = 2000 / this.velocidad;
      return velocidad;
    },
    validar_entrada() {
      return (
        this.rules.stringEmtpy[0](this.textInput) &&
        this.rules.expresionValida[0](this.textInput) &&
        !this.rules.tabulaciones[0](this.textInput)
      );
    },
  },
  methods: {
    networkEvent(eventName) {
      if (this.networkEvents.length > 500) this.networkEvents = "";
      this.networkEvents += `${eventName}, `;
    },
    showInfoAboutEmpty() {
      Swal.fire(
        this.$i18n.tc("alerts.whatif", 1),
        this.$i18n.tc("alerts.whatif", 0),
        "info"
      );
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    routes(nodo, input) {
      this.routesArray.push(nodo.id);

      var edges = this.network.edges.filter((edge) => {
        return edge.from == nodo.id;
      });

      if (edges.length > 0 && input <= this.textInput.length) {
        //
        for (let edge of edges) {
          if (this.textInput[input] == edge.label) {
            this.routes(this.network.nodes[edge.to], input + 1);
          }
        }
      }
    },
    startRoute() {
      Swal.fire({
        title: this.$i18n.tc("alerts.start", 1),
        html: this.$i18n.tc("alerts.start", 0),
        timer: 2700,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          clearInterval(700);
          this.show = false;
          this.set_focus(this.focus);
        },
      });
    },
    validateRoutes() {
      if (this.rules.stringEmtpy[0](this.textInput)) {
        if (this.rules.expresionValida[0](this.textInput)) {
          this.startRoute();
        } else {
          Swal.fire({
            icon: "warning",
            title: this.$i18n.tc("alerts.validateRoutes.form", 1),
            text: this.$i18n.tc("alerts.validateRoutes.form", 0),
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: this.$i18n.tc(
              "alerts.validateRoutes.bottoms",
              1
            ),
            cancelButtonText: this.$i18n.tc("alerts.validateRoutes.bottoms", 0),
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          }).then((res) => {
            if (res.isConfirmed) {
              this.startRoute();
            }
          });
        }
      } else {
        Swal.fire(this.$i18n.t("alerts.whithoutText"), "", "warning");
      }
    },
    async set_focus() {
      this.disabled = true;
      this.manage_err.not_found_edge = "";

      await this.routes(this.network.nodes[0], 0);
      let options = {
        scale: 3,
        offset: { x: 10, y: 40 },
        locked: true,
        animation: true,
      };

      let focus = this.routesArray;
      console.log(focus);
      if (
        this.textInput[0] == "b" ||
        this.textInput[0] == "a" ||
        this.textInput[0] == "?"
      ) {
        for (let index = 0; index < focus.length; index++) {
          if (this.show == false) {
            await this.sleep(this.speed);
            this.$refs.network.focus(focus[index], options);
          } else {
            Swal.fire(
              this.$i18n.tc("alerts.stop", 1),
              this.$i18n.tc("alerts.stop", 0),
              "info"
            );
            break;
          }
        }
      }
      if (this.show == false) {
        setTimeout(() => {
          if (this.rules.expresionValida[0](this.textInput)) {
            Swal.fire(this.$i18n.tc("alerts.valideWord", 1), "", "success");
          } else {
            Swal.fire(this.$i18n.tc("alerts.valideWord", 0), "", "error").then(
              (res) => {
                console.log(res);
                if (res.isConfirmed == true || res.isDismissed == true) {
                  if (focus.length - 1 != this.textInput.length) {
                    if (this.textInput != "?") {
                      Swal.fire({
                        icon: "error",
                        title: this.$i18n.tc("alerts.notFoundRoute", 1),
                        text:
                          this.$i18n.tc("alerts.notFoundRoute", 0) +
                          this.textInput[focus.length - 1] +
                          "'",
                      });
                    }
                  }
                }
              }
            );
          }
        }, 1500);
      }

      this.show = true;
      this.disabled = false;
      this.routesArray = [];
    },
  },
};
</script>

<style scoped>
@import url("./../../assets/styles/styles.css");
</style>
