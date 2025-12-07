<!-- src/views/LeaderboardView.vue -->
<template>
  <div class="page">
    <AppHeader />

    <main class="page__content leaderboard">
      <h1 class="leaderboard__title">Leaderboard</h1>
      <!-- TODO: 랭킹 리스트 -->
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
</script>

<style lang="scss" scoped>
.leaderboard {
  max-width: 1200px;
  margin: 1.5rem auto 2rem;
  padding: 0 1.5rem;

  &__title {
    font-size: 1.5rem;
    font-weight: 600;
  }
}
</style>
