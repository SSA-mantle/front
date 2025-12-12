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
          to="/about"
          class="app-header__nav-link"
          active-class="app-header__nav-link--active"
        >
          About
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
  z-index: 100;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
  }

  &__brand {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 0.5rem;
  }

  &__logo {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--color-primary-400), var(--color-primary-600));
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    box-shadow: var(--shadow-md);
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--color-text-heading);
    letter-spacing: -0.02em;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: auto;
    margin-right: 2rem;
  }

  &__nav-link {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-text-muted);
    padding: 0.5rem 1rem;
    border-radius: 999px;
    transition: all 0.2s var(--ease-spring);

    &:hover {
      background-color: var(--color-bg-inset);
      color: var(--color-primary);
    }

    &--active {
      background-color: var(--color-primary-50);
      color: var(--color-primary);
    }
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-left: 1.5rem;
    border-left: 1px solid var(--color-border);
  }

  &__icon-button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 1.25rem;
    color: var(--color-text-muted);
    padding: 4px;
    border-radius: 50%;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--color-bg-inset);
      color: var(--color-text-heading);
    }
  }

  &__user-name {
    border: 1px solid var(--color-border);
    padding: 0.4rem 1rem;
    border-radius: 999px;
    background-color: transparent;
    color: var(--color-text-body);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: var(--color-primary-400);
      color: var(--color-primary);
      background-color: var(--color-surface);
    }
  }
}

@media (max-width: 768px) {
  .app-header {
    &__nav {
      display: none; // Mobile menu to be implemented later or use hamburger
    }
    
    &__user {
      margin-left: auto;
      border-left: none;
    }
  }
}
</style>
