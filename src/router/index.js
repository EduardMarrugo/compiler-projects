import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    // redirect: "/turing-machine",
    component: Home,
    children: [
      {
        path: "finite-automata",
        name: "FiniteAutomata",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/projects/AutomataFinito.vue"
          ),
      },
      {
        path: "turing-machine",
        name: "TuringMachine",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/projects/TuringMachine.vue"
          ),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
