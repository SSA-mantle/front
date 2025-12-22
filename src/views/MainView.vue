<template>
  <div class="page">
    <AppHeader />

    <main class="page__content main">
      <!-- 가운데 로고 + 타이틀 영역 -->
      <section class="main__hero">
        <div class="main__logo-circle">
          <img :src="logoImg" alt="SSA-mantle Logo" class="main__logo-img" />
        </div>
        <h1 class="main__title">SSA-mantle</h1>
        <p class="main__subtitle">
          <span class="main__subtitle-strong">유사도 기반 단어 유추 게임</span>
        </p>
      </section>

      <!-- 아래: 게임 영역 (게임 종료 시 2컬럼 레이아웃) -->
      <div
        class="main__game-container"
        :class="{ 'main__game-container--split': isGameOver }"
      >
        <section class="main__challenge">
          <DailyChallengeCard />
        </section>

        <transition name="fade-scale">
          <section v-if="isGameOver" class="main__result">
            <GameResultSection />
          </section>
        </transition>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useGameStore } from "@/stores/game";

import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import DailyChallengeCard from "@/components/main/DailyChallengeCard.vue";
import GameResultSection from "@/components/main/GameResultSection.vue";
import logoImg from "@/assets/logo.png";

const gameStore = useGameStore();
const isGameOver = computed(() => gameStore.status !== "playing");

onMounted(async () => {
  await gameStore.initializeGame();
});
</script>

<style lang="scss" scoped>
.main {
  max-width: 1200px; // Increased to accommodate split layout
  width: 100%;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;

  &__hero {
    text-align: center;
    margin-bottom: 3.5rem;
  }

  &__logo-circle {
    width: 300px;
    height: 300px;
    margin: 0 auto 1.2rem;
    border-radius: 40px;
    background: #eff6ff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px; // Padding for the larger 300px size
    box-shadow: 0 20px 50px rgba(30, 64, 175, 0.1);
    transform: rotate(-5deg);
    transition: all 0.4s var(--ease-spring);
    overflow: hidden;

    &:hover {
      transform: rotate(0deg) scale(1.08);
      box-shadow: 0 20px 40px rgba(30, 64, 175, 0.25);
    }
  }

  &__logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__title {
    margin: 0;
    font-size: 3rem;
    font-weight: 900;
    line-height: 1.1;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, var(--color-text-heading) 30%, var(--color-primary-600));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
  }

  &__subtitle {
    margin: 0.8rem 0 0;
    font-size: 1.15rem;
    color: var(--color-text-muted);
    font-weight: 500;
  }

  &__subtitle-strong {
    font-weight: 700;
    color: var(--color-text-heading);
  }

  &__game-container {
    display: grid;
    grid-template-columns: minmax(0, 700px);
    justify-content: center;
    gap: 2rem;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);

    &--split {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__challenge {
    width: 100%;
  }

  &__result {
    width: 100%;
  }
}

// Custom Scaling Transition for Result Section
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

// Mobile Responsiveness
@media (max-width: 1024px) {
  .main {
    &__game-container--split {
      grid-template-columns: 1fr; // Stack columns on smaller screens
    }

    &__hero {
      margin-bottom: 2.5rem;
    }
  }
}
</style>
