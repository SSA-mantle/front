<template>
  <div class="page">
    <AppHeader />

    <main class="page__content leaderboard">
      <section class="leaderboard__hero">
        <div class="leaderboard__hero-title">
          <span class="leaderboard__hero-highlight">명예의 전당</span>
          <span class="leaderboard__hero-suffix">TOP 50</span>
        </div>
        <p class="leaderboard__hero-description">
          오늘의 <strong>상위 50위</strong> 플레이어 기록을 확인해보세요.
        </p>
      </section>

      <LeaderboardList :entries="sortedEntries" />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import LeaderboardList from "@/components/leaderboard/LeaderboardList.vue";

const TOTAL_PLAYERS = 50;
const PLAYER_PREFIX = "플레이어";

const createEntry = (id) => {
  const attempts = Math.floor(Math.random() * 4) + 2;
  const playtimeSeconds = Math.floor(Math.random() * 360) + 120;
  return {
    id,
    name: `${PLAYER_PREFIX}${id}`,
    attempts,
    playtimeSeconds,
  };
};

const entries = ref(Array.from({ length: TOTAL_PLAYERS }, (_, idx) => createEntry(idx + 1)));

const sortedEntries = computed(() => {
  return [...entries.value].sort((a, b) => {
    if (a.attempts === b.attempts) {
      return a.playtimeSeconds - b.playtimeSeconds;
    }
    return a.attempts - b.attempts;
  });
});
</script>

<style lang="scss" scoped>
.leaderboard {
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

@media (max-width: 640px) {
  .leaderboard {
    &__hero-title {
       justify-content: center;
    }
  }
}
</style>
