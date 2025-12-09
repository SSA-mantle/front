<template>
  <div class="page">
    <AppHeader />

    <main class="page__content guide">
      <section class="guide__hero">
        <!-- <p class="guide__hero-eyebrow">SSA-mantle 이란?</p> -->
        <div class="guide__hero-title">
          <span class="guide__hero-highlight">SSA-mantle</span>
          <span class="guide__hero-suffix">이란?</span>
        </div>
        <p class="guide__hero-description">
          <strong>SSA-mantle(싸맨틀)</strong>은
          <strong>유사도 기반 SSAFY 관련 단어 유추게임</strong>
          입니다.
        </p>
      </section>

      <section class="guide__grid">
        <GuideHowToCard :items="howToItems" />
        <GuideTips :tips="tips" />
      </section>

      <GuideSampleBanner />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import GuideHowToCard from "@/components/guide/GuideHowToCard.vue";
import GuideTips from "@/components/guide/GuideTips.vue";
import GuideSampleBanner from "@/components/guide/GuideSampleBanner.vue";

const howToItems = [
  { number: 1, text: "정답 단어와 의미적으로 가장 유사한 단어를 찾는 게임입니다." },
  { number: 2, text: "입력한 단어의 유사도가 백분율(%)로 표시됩니다." },
  { number: 3, text: "유사도가 높을수록 정답에 가까워집니다." },
  { number: 4, text: "상위 1000개 단어에 들면 순위가 함께 표시됩니다." },
];

const tips = [
  {
    title: "넓게 시작하세요",
    description: "처음에는 일반적인 단어로 의미 범위를 좁혀보세요.",
    icon: "🌐",
    tint: "#dbeafe",
  },
  {
    title: "유사어를 활용하세요",
    description: "높은 유사도 단어의 동의어를 차근차근 시도해보세요.",
    icon: "🧠",
    tint: "#fef3c7",
  },
  {
    title: "카테고리를 추측하세요",
    description: "단어가 속한 분야를 먼저 파악하면 빠르게 접근할 수 있어요.",
    icon: "⚡",
    tint: "#fee2e2",
  },
];
</script>

<style lang="scss" scoped>
.guide {
  max-width: 1280px;
  width: 100%;
  margin: 1.5rem auto 3.5rem;
  padding: 0 3rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__hero {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__hero-eyebrow {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: #3b82f6;
    letter-spacing: 0.08em;
  }

  &__hero-title {
    display: flex;
    color: #1e3a8a;
    align-items: baseline;
    gap: 0.5rem;
  }

  &__hero-highlight {
    font-size: clamp(2.4rem, 4vw, 3.6rem);
    font-weight: 900;
    position: relative;
    padding: 0.1rem 0.4rem;

    &::after {
      content: "";
      position: absolute;
      inset: 60% 0 0;
      background-color: #fbbf24;
      border-radius: 6px;
      z-index: -1;
    }
  }

  &__hero-suffix {
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 700;
    color: #1e3a8a;
  }

  &__hero-description {
    margin: 0;
    font-size: 1.2rem;
    color: #1f2937;
    line-height: 1.6;

    strong {
      font-weight: 800;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 45% 55%;
    // grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 1024px) {
  .guide {
    padding: 0 1.5rem 2.5rem;

    &__grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
