<!-- src/views/GuideView.vue -->
<template>
  <div class="page">
    <AppHeader />

    <main class="page__content guide">
      <h1 class="guide__title">GuideView (How to / Tip)</h1>
      <!-- TODO: 게임 설명/팁 UI -->
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
</script>

<style lang="scss" scoped>
.guide {
  max-width: 1200px;
  margin: 1.5rem auto 2rem;
  padding: 0 1.5rem;

  &__title {
    font-size: 1.5rem;
    font-weight: 600;
  }
}
</style>
