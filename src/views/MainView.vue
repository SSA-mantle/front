<template>
  <div class="page">
    <AppHeader />

    <main class="page__content main">
      <!-- 가운데 로고 + 타이틀 영역 -->
      <section class="main__hero">
        <div class="main__logo-circle">🧠</div>
        <h1 class="main__title">SSA-mantle</h1>
        <p class="main__subtitle">
          <span class="main__subtitle-strong">유사도 기반 단어 유추 게임</span>
        </p>
      </section>

      <!-- 아래: 왼쪽 Daily Challenge, 오른쪽 추측 단어 카드 -->
      <section class="main__row">
        <div class="main__left">
          <DailyChallengeCard @submit-guess="handleSubmitGuess" />
        </div>
        <div class="main__right">
          <GuessSummaryCard :guesses="guesses" />
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from "vue";

import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import DailyChallengeCard from "@/components/main/DailyChallengeCard.vue";
import GuessSummaryCard from "@/components/main/GuessSummaryCard.vue";

const guesses = ref([]);

// 임시 로직: 입력한 단어를 리스트에 쌓기 (백엔드 붙기 전까지만 사용)
const handleSubmitGuess = (word) => {
  const trimmed = word.trim();
  if (!trimmed) return;

  guesses.value = [
    {
      id: Date.now(),
      word: trimmed,
      attempt: guesses.value.length + 1,
      similarity: Math.round(Math.random() * 1000) / 10, // 0.0 ~ 100.0 더미
    },
    ...guesses.value,
  ];
};
</script>

<style lang="scss" scoped>
.main {
  max-width: 800px;
  width: 100%;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;

  &__hero {
    text-align: center;
    margin-bottom: 3rem;
  }

  &__logo-circle {
    width: 120px;
    height: 120px;
    margin: 0 auto 1.5rem;
    border-radius: 32px; /* Sqircle ish */
    background: linear-gradient(135deg, var(--color-primary-400), var(--color-primary-700));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.5rem;
    color: #ffffff;
    box-shadow: var(--shadow-xl);
    transform: rotate(-5deg);
    transition: transform 0.3s var(--ease-spring);

    &:hover {
      transform: rotate(0deg) scale(1.05);
    }
  }

  &__title {
    margin: 0;
    font-size: 3.5rem;
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
    margin: 1rem 0 0;
    font-size: 1.25rem;
    color: var(--color-text-muted);
    font-weight: 500;
  }

  &__subtitle-strong {
    font-weight: 700;
    color: var(--color-text-heading);
  }

  &__row {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }

  &__left,
  &__right {
    width: 100%;
  }
}
</style>
