<template>
  <div class="page">
    <AppHeader />

    <main class="page__content about">
      <section class="about__hero">
        <div class="about__hero-title">
          <span class="about__hero-highlight">SSA-mantle</span>
          <span class="about__hero-suffix">이란?</span>
        </div>
        <p class="about__hero-description">
          <strong>SSA-mantle(싸맨틀)</strong>은
          <strong>유사도 기반 SSAFY 관련 단어 유추게임</strong>
          입니다.
        </p>
      </section>

      <section class="about__grid">
        <AboutHowToCard :items="howToItems" />
        <AboutTips :tips="tips" />
      </section>

      <AboutSampleBanner />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import AboutHowToCard from "@/components/about/AboutHowToCard.vue";
import AboutTips from "@/components/about/AboutTips.vue";
import AboutSampleBanner from "@/components/about/AboutSampleBanner.vue";

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
.about {
  max-width: 1000px; /* Slightly narrower for modern look but wide enough for grid */
  width: 100%;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  &__hero {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
    align-items: center;
  }

  &__hero-title {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__hero-highlight {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 900;
    line-height: 1.1;
    background: linear-gradient(135deg, var(--color-primary-600), var(--color-accent-purple));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  &__hero-suffix {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    font-weight: 700;
    color: var(--color-text-heading);
  }

  &__hero-description {
    margin: 1rem 0 0;
    font-size: 1.15rem;
    color: var(--color-text-body);
    line-height: 1.6;

    strong {
      color: var(--color-primary);
      font-weight: 700;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .about {
    &__grid {
      grid-template-columns: 1fr;
    }
    
    &__hero-title {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
