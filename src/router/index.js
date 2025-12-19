import { createRouter, createWebHistory } from "vue-router";

import WelcomeView from "@/views/WelcomeView.vue";
import MainView from "@/views/MainView.vue";
import AboutView from "@/views/AboutView.vue";
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
      path: "/about",
      name: "about",
      component: AboutView,
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

router.beforeEach(async (to, from, next) => {
  // Pinia Store는 함수 내부에서 호출
  const { useAuthStore } = await import('@/stores/auth');
  const authStore = useAuthStore();

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // 인증이 필요한 페이지인데 로그인 상태가 아니라면
  if (requiresAuth && !authStore.isAuthenticated) {
    // Welcome 페이지로 리다이렉트
    next({ name: 'welcome' });
  } else {
    // 로그인 되어있는데 Welcome 페이지에 접근하면
    if (to.name === 'welcome' && authStore.isAuthenticated) {
       next({ name: 'main' });
    } else {
       next();
    }
  }
});

export default router;
