import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Menu from "../views/Menu";
import Download from "@/views/Download";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/download",
    name: "Download",
    component: Download,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
