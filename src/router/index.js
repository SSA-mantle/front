import { createRouter, createWebHistory } from "vue-router";

import WelcomeView from "@/views/WelcomeView.vue";
import MainView from "@/views/MainView.vue";
import MyPageView from "@/views/MyPageView.vue";
import EditProfileView from "@/views/EditProfileView.vue";
import LeaderboardView from "@/views/LeaderboardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: WelcomeView,
    },
    {
      path: "/main",
      name: "main",
      component: MainView,
      meta: { requiresAuth: true }, // 로그인 필요
    },
    {
      path: "/mypage",
      name: "mypage",
      component: MyPageView,
      meta: { requiresAuth: true }, // 로그인 필요
    },
    {
      path: "/profile/edit",
      name: "profile-edit",
      component: EditProfileView,
      meta: { requiresAuth: true }, // 로그인 필요
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: LeaderboardView,
      meta: { requiresAuth: true }, // 로그인 필요
    },
  ],
});

export default router;
