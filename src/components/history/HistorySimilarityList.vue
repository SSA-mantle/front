<template>
  <section class="history-list">
    <header class="history-list__header">
      <div>
        <p class="history-list__title">유사도 상위 단어 100개</p>
        <p class="history-list__subtitle">정답 단어 기준으로 가까운 순서입니다.</p>
      </div>
    </header>

    <div class="history-list__table">
      <div class="history-list__table-head">
        <span>순위</span>
        <span>단어</span>
        <span>유사도</span>
      </div>
      <ul class="history-list__items">
        <li v-for="word in words" :key="word.rank" class="history-list__row">
          <span class="history-list__rank">{{ word.rank }}</span>
          <span class="history-list__word">{{ word.word }}</span>
          <span class="history-list__similarity">{{ word.similarity }}%</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
defineProps({
  words: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.history-list {
  background-color: #ffffff;
  border-radius: 1.2rem;
  padding: 1.5rem;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);

  &__header {
    margin-bottom: 1rem;
  }

  &__title {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 800;
    color: #111827;
  }

  &__subtitle {
    margin: 0.4rem 0 0;
    font-size: 0.9rem;
    color: #6b7280;
  }

  &__table {
    border-radius: 0.9rem;
    border: 1px solid #e5e7eb;
    overflow: hidden;
  }

  &__table-head {
    display: grid;
    grid-template-columns: 0.8fr 2fr 1fr;
    background-color: #f3f4f6;
    padding: 0.75rem 1rem;
    font-weight: 700;
    color: #374151;
  }

  &__items {
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 520px;
    overflow-y: auto;
  }

  &__row {
    display: grid;
    grid-template-columns: 0.8fr 2fr 1fr;
    padding: 0.75rem 1rem;
    border-top: 1px solid #f3f4f6;
    align-items: center;
    font-weight: 600;
    color: #1f2937;
  }

  &__rank {
    font-weight: 700;
  }

  &__similarity {
    text-align: right;
    color: #2563eb;
  }
}
</style>
