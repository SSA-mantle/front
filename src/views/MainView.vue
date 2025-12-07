<!-- src/views/MainView.vue -->
<template>
  <div class="page">
    <AppHeader />

    <main class="page__content main">
      <h1 class="main__title">Main View (게임 화면)</h1>
      <!-- TODO: 게임 UI 배치 -->
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
</script>

<style lang="scss" scoped>
.main {
  max-width: 1200px;
  margin: 1.5rem auto 2rem;
  padding: 0 1.5rem;

  &__title {
    font-size: 1.5rem;
    font-weight: 600;
  }
}
</style>
