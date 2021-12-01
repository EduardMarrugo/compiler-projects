<template>
  <div class="">
    <v-row>
      <v-col cols="12">
        <v-combobox
          :items="items"
          v-model="inputText"
          :label="$t('screen.placehoder')"
          :rules="rules.expresion"
          solo-inverted
          flat
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row class="mt-n8">
      <v-col cols="12" sm="6">
        <v-btn
          depressed
          color="blue ligthen-4"
          style="color: white"
          class="mt-2"
          @click="iniciar"
          :disabled="disabled"
          block
        >
          {{ $t("screen.startBtn") }}
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <v-slider
          tick-size="5"
          ticks="always"
          :tick-labels="tickLabels"
          v-model="velocidad"
          min="1"
          max="5"
          :label="$tc('screen.labels', 2)"
        ></v-slider>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <horizontal-scroll class="horizontal-scroll mt-n5" id="scroll">
          <div class="outer" v-for="(slot, index) in cintaTuring" :key="index">
            <v-card
              :id="index"
              dark
              :color="slot.color"
              class="ma-4"
              height="70"
              width="70"
            >
              <v-container class="fill-height justify-center">
                {{ slot.text }}
              </v-container>
            </v-card>
          </div>
        </horizontal-scroll>
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
import HorizontalScroll from "vue-horizontal-scroll";
import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";
const $ = require("jquery");
window.$ = $;

export default {
  components: {
    "app-network": Network,
    HorizontalScroll,
  },
  data: () => ({
    optiTable: {
      multiSort: false,
      mustSort: false,
    },
    //Cancel Routes
    tickLabels: ["x1", "x2", "x3", "x4", "x5"],
    items: ["aaab", "bababaa", "aaaa"],
    select: "",
    show: true,
    //Frontend
    disabled: false,
    inputText: "",
    cintaTuring: [],
    //Makes routes
    routesArray: [],
    //Rules for automata and RExp
    rules: {
      stringEmtpy: [(v) => !!v || false],
      expresion: [(v) => /^[a-b]+$/.test(v) || false],
    },
    //data network
    networkEvents: "",
    amoutIterator: 50,
    network: {
      nodes: [
        {
          id: 0,
          label: "q0",
          color: {
            border: "#2B7CE9",
            background: "#97C2FC",
          },
        },
        {
          id: 1,
          label: "q1",
          color: {
            border: "#2B7CE9",
            background: "#97C2FC",
          },
        },
        {
          id: 2,
          label: "q2",
          color: {
            border: "#c70216",
            background: "#f26674",
          },
          font: {
            color: "#ffffff",
          },
        },
      ],
      edges: [
        {
          id: 0,
          from: 0,
          to: 1,
          label: "λ;λ;L",
          title: "λ;λ;L",
          arrows: { to: { enabled: true, scaleFactor: 0.5 } },
        },
        {
          id: 1,
          from: 0,
          to: 0,
          label: "a;a;R",
          title: "a;a;R",
          arrows: { to: { enabled: true, scaleFactor: 0.5 } },
        },
        {
          id: 2,
          from: 0,
          to: 0,
          label: "b;a;R",
          title: "b;a;R",
          arrows: { to: { enabled: true, scaleFactor: 0.5 } },
          selfReference: { angle: 3 },
        },
        {
          id: 3,
          from: 1,
          to: 1,
          label: "a;a;L",
          title: "a;a;L",
          arrows: { to: { enabled: true, scaleFactor: 0.5 } },
        },
        {
          id: 4,
          from: 1,
          to: 2,
          label: "λ;λ;R",
          title: "λ;λ;R",
          arrows: { to: { enabled: true, scaleFactor: 0.5 } },
        },
      ],
      options: {
        nodes: {
          shape: "circle",
        },
      },
      optionsFocus: {
        scale: 3,
        offset: { x: 10, y: 40 },
        locked: true,
        animation: true,
      },
    },
    focus: 1,
    velocidad: 1,
  }),
  watch: {
    inputText(val) {
      this.cintaTuring = [];
      if (this.rules.expresion[0](val)) {
        this.cintaTuring = [{ color: "blue ligthen-4", text: "λ" }];
        for (let index = 0; index < this.amoutIterator; index++) {
          let obj = {
            color: "blue ligthen-4",
            text: "",
          };
          if (val.length > index) {
            obj.text = val[index];
            this.cintaTuring.push(obj);
          } else {
            obj.text = "λ";
            this.cintaTuring.push(obj);
          }
        }
      } else {
        for (let index = 0; index < this.amoutIterator; index++) {
          this.cintaTuring.push({ color: "blue ligthen-4", text: "λ" });
        }
      }
    },
  },
  methods: {
    networkEvent(eventName) {
      if (this.networkEvents.length > 500) this.networkEvents = "";
      this.networkEvents += `${eventName}, `;
    },
    async iniciar() {
      if (this.rules.expresion[0](this.inputText)) {
        this.routesArray = [];
        await this.routes(this.network.nodes[0], 1);
      }
    },
    async routes(nodo, indexInput) {
      var edges = this.network.edges.filter((edge) => {
        return edge.from == nodo.id;
      });

      if (edges.length > 0) {
        for (let edge of edges) {
          let spliterEdges = edge.label.split(";");
          spliterEdges[3] = edge.id;

          if (this.cintaTuring[indexInput].text == spliterEdges[0]) {
            let ElemDom = document.getElementById(indexInput);

            ElemDom.classList.replace("blue", "green");
            ElemDom.scrollIntoView();

            await this.sleep(this.speed);

            ElemDom.classList.replace("green", "blue");

            this.routesArray.push(edge.to);

            await this.$refs.network.focus(edge.to, this.optionsFocus);

            switch (spliterEdges[2]) {
              case "R":
                this.routes(this.network.nodes[edge.to], indexInput + 1);

                break;
              case "L":
                this.routes(this.network.nodes[edge.to], indexInput - 1);
                break;
            }
            this.cintaTuring[indexInput].text = spliterEdges[1];
          }
        }
      }
    },

    async conver(index, variable) {
      let aux = this.inputText.split("");
      aux[index] = variable;
      let text = "";
      for (let index = 0; index < aux.length; index++) {
        text += aux[index];
      }
      this.inputText = text;
      // document.getElementById(index).style.color = "black";
      return text;
    },

    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
  computed: {
    speed() {
      let velocidad = 2000 / this.velocidad;
      return velocidad;
    },
  },
  created() {
    for (let index = 0; index < this.amoutIterator; index++) {
      this.cintaTuring.push({ color: "blue ligthen-4", text: "λ" });
    }
  },
};

//
</script>

<style scoped>
@import url("./../../assets/styles/styles.css");
</style>
