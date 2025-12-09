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
  max-width: 1200px;
  margin: 1.5rem auto 2.5rem;
  padding: 0 2rem;

  &__hero {
    text-align: center;
    margin-bottom: 2rem;
  }

  &__logo-circle {
    width: 140px;
    height: 140px;
    margin: 0 auto 1rem;
    border-radius: 999px;
    background-color: #4f46e5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.6rem;
    color: #ffffff;
    box-shadow: 0 18px 40px rgba(79, 70, 229, 0.18);
  }

  &__title {
    margin: 0;
    font-size: 3.6rem;
    font-weight: 900;
    letter-spacing: 0.02em;
    display: inline-block;
    position: relative;
    padding: 0.15rem 0.35rem;
    color: #111827;
  }

  /* highlight bar behind the title text */
  &__title::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 18%;
    height: 26%;
    background: #f59e0b; /* amber/orange */
    z-index: -1;
    border-radius: 4px;
  }

  &__subtitle {
    margin: 0.6rem 0 0;
    font-size: 1.05rem;
    color: #374151;
    font-weight: 600;
  }

  &__subtitle-strong {
    display: inline-block;
    font-weight: 900;
    margin-right: 0.45rem;
  }

  &__row {
    margin-top: 2rem;
    display: flex;
    flex-direction: column; /* 세로로 쌓기 */
    gap: 1rem;
    align-items: center; /* 가로 중앙 정렬 */
  }

  &__left,
  &__right {
    min-height: 260px;
    width: 100%;
    max-width: 760px; /* 두 카드의 가로폭을 일치시키기 위한 제한값 */
  }
}
</style>
