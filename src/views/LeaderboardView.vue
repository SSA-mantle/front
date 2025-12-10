<template>
  <div class="page">
    <AppHeader />

    <main class="page__content leaderboard">
      <section class="leaderboard__hero">
        <div class="leaderboard__hero-icon">🏆</div>
        <div class="leaderboard__hero-text">
          <h1 class="leaderboard__hero-title">오늘의 명예의 전당</h1>
          <p class="leaderboard__hero-subtitle">상위 50위 기록을 확인해보세요.</p>
        </div>
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
  max-width: 1100px;
  width: 50%;
  margin: 1.5rem auto 3rem;
  padding: 0 1.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__hero {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #fff4d7;
    border-radius: 1.2rem;
    padding: 1.5rem 2rem;
    border: 1px solid rgba(245, 158, 11, 0.3);
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  }

  &__hero-icon {
    width: 60px;
    height: 60px;
    border-radius: 999px;
    background-color: #facc15;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }

  &__hero-title {
    margin: 0;
    font-size: 1.7rem;
    font-weight: 900;
    color: #111827;
  }

  &__hero-subtitle {
    margin: 0.2rem 0 0;
    font-size: 1rem;
    color: #6b7280;
  }
}

@media (max-width: 640px) {
  .leaderboard {
    &__hero {
      flex-direction: column;
      text-align: center;
    }

    &__hero-icon {
      width: 48px;
      height: 48px;
      font-size: 1.7rem;
    }
  }
}
</style>
