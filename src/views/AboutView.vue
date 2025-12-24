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

      <div class="about__grid">
        <AboutHowToCard :items="howToItems" />
        <AboutTips :tips="tips" />
      </div>

      <section class="about__pages">
        <header class="about__pages-header">
          <h2 class="about__pages-title">페이지 가이드</h2>
          <p class="about__pages-subtitle">SSA-mantle의 다양한 기능을 탐색해보세요</p>
        </header>

        <div class="about__pages-grid">
          <article v-for="page in pageIntros" :key="page.title" class="about__pages-item">
            <div class="about__pages-icon" :style="{ backgroundColor: page.tint }">
              {{ page.icon }}
            </div>
            <div class="about__pages-info">
              <h3 class="about__pages-item-title">{{ page.title }}</h3>
              <p class="about__pages-item-desc">{{ page.description }}</p>
            </div>
          </article>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import AboutHowToCard from "@/components/about/AboutHowToCard.vue";
import AboutTips from "@/components/about/AboutTips.vue";

const howToItems = [
  { number: 1, text: "추측한 단어의 유사도가 백분율(%)로 표시됩니다" },
  { number: 2, text: "유사도가 높을수록 정답에 가까워집니다" },
  { number: 3, text: "유사도 상위 1000위 안의 단어는 순위가 함께 표시됩니다" },
  { number: 4, text: "도저히 모르겠을때는 포기하고 정답을 확인해보세요" },
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

const pageIntros = [
  {
    title: "게임 (Daily Challenge)",
    description: "매일 새로운 정답 단어를 맞춰보세요.",
    icon: "🎯",
    tint: "#dcfce7",
  },
  {
    title: "리더보드 (Leaderboard)",
    description: "다른 유저들의 순위를 확인하고 나의 위치를 파악해보세요.",
    icon: "🏆",
    tint: "#fef9c3",
  },
  {
    title: "히스토리 (History)",
    description: "어제의 정답 단어와 유사도 상위 100개 단어를 확인해보세요.",
    icon: "📅",
    tint: "#e0f2fe",
  },
  {
    title: "마이페이지 (My Page)",
    description: "나의 상세 프로필과 업적 등을 관리하고 게임 통계를 확인해보세요.",
    icon: "👤",
    tint: "#f5f3ff",
  },
  {
    title: "FAQ",
    description: "서비스 이용에 궁금한 점들을 확인해보세요.",
    icon: "❓",
    tint: "#f1f5f9",
  },
];
</script>

<style lang="scss" scoped>
.about {
  max-width: 1400px;
  width: 100%;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;

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
    grid-template-columns: 2fr 3fr;
    gap: 2rem;
    align-items: stretch;
  }

  &__pages {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &-header {
      text-align: center;
    }

    &-title {
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--color-text-heading);
      margin: 0;
    }

    &-subtitle {
      font-size: 1rem;
      color: var(--color-text-muted);
      margin: 0.5rem 0 0;
    }

    &-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1rem;
    }

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1rem;
      background-color: var(--color-surface);
      border-radius: 1.25rem;
      padding: 1.5rem 1rem;
      border: 1px solid var(--color-border);
      transition: all 0.2s var(--ease-spring);

      &:hover {
        transform: translateY(-2px);
        border-color: var(--color-primary-200);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.04);
      }
    }

    &-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    &-item-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--color-text-heading);
      margin: 0;
      word-break: keep-all;
    }

    &-item-desc {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      margin: 0.25rem 0 0;
      line-height: 1.4;
      word-break: keep-all;
    }
  }
}



@media (max-width: 900px) {
  .about {
    &__grid {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: 768px) {
  .about {
    gap: 3rem;

    &__hero-title {
      flex-direction: column;
      align-items: center;
    }

    &__pages-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
