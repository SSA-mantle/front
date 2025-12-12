<template>
  <div class="page">
    <AppHeader />

    <main class="page__content history">
      <section class="history__hero">
        <div class="history__hero-title">
          <span class="history__hero-highlight">어제의 기록</span>
          <span class="history__hero-suffix">다시보기</span>
        </div>
        <p class="history__hero-description">
          지난 챌린지에서 <strong>정답에 가장 가까웠던 단어</strong>들을 확인하세요.
        </p>
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
  width: 100%;
  max-width: 800px;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__hero {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  &__hero-title {
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  &__hero-highlight {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    background: linear-gradient(135deg, var(--color-primary-600), var(--color-accent-purple));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  &__hero-suffix {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 700;
    color: var(--color-text-muted);
  }

  &__hero-description {
    margin: 0;
    font-size: 1.1rem;
    color: var(--color-text-body);
    line-height: 1.6;

    strong {
      color: var(--color-primary);
      font-weight: 700;
    }
  }
}

@media (max-width: 960px) {
  .history {
    padding: 0 1.5rem 2rem;
  }
}
</style>
