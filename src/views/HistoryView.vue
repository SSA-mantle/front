<template>
  <div class="page">
    <AppHeader />

    <main class="page__content history">
      <section class="history__hero">
        <div class="history__hero-icon">🕑</div>
        <div>
          <p class="history__hero-eyebrow">Yesterday Recap</p>
          <h1 class="history__hero-title">어제의 정답과 유사도</h1>
          <p class="history__hero-description">
            지난 챌린지에서 정답에 가장 가까웠던 단어들을 한 번에 확인하세요.
          </p>
        </div>
      </section>

      <HistoryAnswerCard
        :date-label="yesterdayLabel"
        :answer-word="answerWord"
        :description="answerDescription"
      />

      <HistorySimilarityList :words="topWords" />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { computed } from "vue";

import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import HistoryAnswerCard from "@/components/history/HistoryAnswerCard.vue";
import HistorySimilarityList from "@/components/history/HistorySimilarityList.vue";

const answerWord = "싸피(SSAFY)";
const answerDescription =
  "싸피는 삼성 청년 소프트웨어 AI 아카데미(SSAFY)의 약자입니다. 매년 많은 청년들을 소프트웨어 개발자로 성장시키고 있습니다.";

const yesterdayLabel = computed(() => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
});

const topWords = computed(() => {
  return Array.from({ length: 100 }, (_, index) => {
    const rank = index + 1;
    const base = 98 - index * 0.4;
    const jitter = Math.random() * 1.2;
    return {
      rank,
      word: `관련단어${rank}`,
      similarity: (base - jitter).toFixed(2),
    };
  });
});
</script>

<style lang="scss" scoped>
.history {
  max-width: 1200px;
  margin: 1.5rem auto 3rem;
  padding: 0 1.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__hero {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 1.5rem 2rem;
    border-radius: 1.2rem;
    background: linear-gradient(120deg, #dbeafe, #eff6ff);
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  }

  &__hero-icon {
    width: 60px;
    height: 60px;
    border-radius: 18px;
    background-color: #1d4ed8;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
  }

  &__hero-eyebrow {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: #2563eb;
    letter-spacing: 0.08em;
  }

  &__hero-title {
    margin: 0.2rem 0 0.4rem;
    font-size: clamp(1.8rem, 3vw, 2.4rem);
    font-weight: 900;
    color: #0f172a;
  }

  &__hero-description {
    margin: 0;
    font-size: 1rem;
    color: #374151;
  }
}

@media (max-width: 960px) {
  .history {
    padding: 0 1.5rem 2rem;
  }
}
</style>
