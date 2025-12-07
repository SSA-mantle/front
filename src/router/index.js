import { createRouter, createWebHistory } from "vue-router";

import WelcomeView from "@/views/WelcomeView.vue";
import MainView from "@/views/MainView.vue";
import GuideView from "@/views/GuideView.vue";
import LeaderboardView from "@/views/LeaderboardView.vue";
import HistoryView from "@/views/HistoryView.vue";
import FaqView from "@/views/FaqView.vue";
import MyPageView from "@/views/MyPageView.vue";
import EditProfileView from "@/views/EditProfileView.vue";

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
      meta: { requiresAuth: true },
    },
    {
      path: "/guide",
      name: "guide",
      component: GuideView,
      meta: { requiresAuth: true },
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: LeaderboardView,
      meta: { requiresAuth: true },
    },
    {
      path: "/history",
      name: "history",
      component: HistoryView,
      meta: { requiresAuth: true },
    },
    {
      path: "/faq",
      name: "faq",
      component: FaqView,
      meta: { requiresAuth: true },
    },
    {
      path: "/mypage",
      name: "mypage",
      component: MyPageView,
      meta: { requiresAuth: true },
    },
    {
      path: "/profile/edit",
      name: "profile-edit",
      component: EditProfileView,
      meta: { requiresAuth: true },
    },

    // 잘못된 URL 들어오면 첫 화면으로 보내기
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
