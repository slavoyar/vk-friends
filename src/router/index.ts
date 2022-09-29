import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import FriendInfo from "../views/FriendInfo.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/info/:id",
    name: "FriendInfo",
    component: FriendInfo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;