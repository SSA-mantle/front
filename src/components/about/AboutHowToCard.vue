<template>
  <section class="about-how">
    <header class="about-how__header">
      <span class="about-how__icon">🎮</span>
      <div>
        <p class="about-how__title">게임 방법</p>
        <p class="about-how__subtitle">정답 단어와 가장 유사한 단어를 찾아보세요</p>
      </div>
    </header>

    <ol class="about-how__list">
      <li v-for="item in items" :key="item.number" class="about-how__item">
        <span class="about-how__badge">{{ item.number }}</span>
        <p class="about-how__text">{{ item.text }}</p>
      </li>
    </ol>
  </section>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.about-how {
  background-color: #ffffff;
  border-radius: 1.25rem;
  padding: 1.8rem 2rem;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
  flex: 1;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.9rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  &__icon {
    width: 48px;
    height: 48px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    background-color: rgba(59, 130, 246, 0.1);
  }

  &__title {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 800;
  }

  &__subtitle {
    margin: 0.2rem 0 0;
    font-size: 0.9rem;
    color: #6b7280;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__item {
    display: flex;
    gap: 0.9rem;
    align-items: flex-start;
  }

  &__badge {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    background-color: #2563eb;
    color: #ffffff;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__text {
    margin: 0;
    color: #1f2937;
    font-weight: 600;
    line-height: 1.4;
  }
}

@media (max-width: 768px) {
  .about-how {
    padding: 1.4rem 1.2rem;
  }
}
</style>
