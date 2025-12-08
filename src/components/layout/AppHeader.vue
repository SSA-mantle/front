<template>
  <header class="app-header">
    <div class="app-header__inner">
      <!-- 브랜드 영역 -->
      <RouterLink to="/main" class="app-header__brand">
        <div class="app-header__logo">🧠</div>
        <div class="app-header__brand-text">
          <span class="app-header__title">SSA-mantle</span>
        </div>
      </RouterLink>

      <!-- 메뉴 -->
      <nav class="app-header__nav">
        <RouterLink
          to="/guide"
          class="app-header__nav-link"
          active-class="app-header__nav-link--active"
        >
          How to / Tip
        </RouterLink>
        <RouterLink
          to="/leaderboard"
          class="app-header__nav-link"
          active-class="app-header__nav-link--active"
        >
          Leaderboard
        </RouterLink>
        <RouterLink
          to="/history"
          class="app-header__nav-link"
          active-class="app-header__nav-link--active"
        >
          History
        </RouterLink>
        <RouterLink
          to="/faq"
          class="app-header__nav-link"
          active-class="app-header__nav-link--active"
        >
          FAQ
        </RouterLink>
      </nav>

      <!-- 우측 유저 영역 (임시 버튼) -->
      <div class="app-header__user">
        <button class="app-header__icon-button" @click="goMyPage">👤</button>
        <button class="app-header__user-name" @click="goMyPage">마이페이지</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter, RouterLink } from "vue-router";

const router = useRouter();

const goMyPage = () => {
  router.push({ name: "mypage" });
};
</script>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(90deg, #2563eb, #0ea5e9);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    height: 60px; // ⬅ 높이 키움
    display: flex;
    align-items: center;
    // justify-content: space-between;
    padding: 0 2rem; // ⬅ 좌우 여백 조금 더
  }

  &__brand {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 0.75rem;
  }

  &__logo {
    width: 30px;
    height: 30px;
    border-radius: 999px;
    background-color: rgba(15, 23, 42, 0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
  }

  &__title {
    font-size: 1.3rem;
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 3rem;
    margin-left: auto;
    margin-right: auto;
  }

  &__nav-link {
    position: relative;
    font-size: 1.2rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    padding: 0.35rem 0.6rem;
    border-radius: 999px;
    transition: all 0.18s ease;
    border-bottom: 2px solid transparent;

    &:hover {
      background-color: rgba(255, 255, 255, 0.9);
      color: #0f172a;
    }

    &--active {
      background-color: #ffffff; // ⬅ 선택된 메뉴 표시
      color: #0f172a;
      font-weight: 600;
      border-bottom-color: transparent;
    }
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  &__icon-button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 1.2rem;
  }

  &__user-name {
    border-radius: 999px;
    border: 1px solid rgba(248, 250, 252, 0.75);
    padding: 0.35rem 0.9rem;
    background-color: rgba(15, 23, 42, 0.2);
    color: #f9fafb;
    cursor: pointer;
    font-size: 0.7rem; // ⬅ 글씨 조금 키움
    font-weight: 500;
  }
}
</style>
