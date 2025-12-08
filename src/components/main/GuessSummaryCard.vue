<template>
  <section class="summary">
    <header class="summary__header">
      <div class="summary__title">추측한 단어</div>
      <div class="summary__badge">{{ attemptsLabel }}</div>
    </header>

    <div v-if="!guesses.length" class="summary__empty">아직 입력한 단어가 없습니다.</div>

    <ul v-else class="summary__list">
      <li v-for="guess in limitedGuesses" :key="guess.id" class="summary__item">
        <span class="summary__order">{{ guess.attempt }}</span>
        <span class="summary__word">{{ guess.word }}</span>
        <span class="summary__score">{{ guess.similarity }}%</span>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  guesses: {
    type: Array,
    default: () => [],
  },
});

const attemptsLabel = computed(() => {
  const n = props.guesses.length;
  return n === 0 ? "0회 시도" : `${n}회 시도`;
});

// 유사도 내림차순으로 정렬
const limitedGuesses = computed(() => {
  return [...props.guesses].sort((a, b) => (b.similarity || 0) - (a.similarity || 0));
  // .slice(0, 5);
});
</script>

<style lang="scss" scoped>
.summary {
  border-radius: 1rem;
  padding: 1.1rem 1.2rem 1.1rem;
  background-color: #ffffff;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
  font-size: 0.95rem;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.8rem;
  }

  &__title {
    font-weight: 800;
    font-size: 1.05rem;
  }

  &__badge {
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.78rem;
    color: #1d4ed8;
    background-color: #f1f7ff;
    font-weight: 700;
    font-size: 0.85rem;
  }

  &__empty {
    font-size: 0.95rem;
    color: #6b7280;
    padding: 0.8rem 0.4rem;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    display: grid;
    grid-template-columns: 0.4fr 2fr 1fr;
    align-items: center;
    padding: 0.75rem 0.9rem;
    border-radius: 0.75rem;
    background-color: #ffffff;
    margin-bottom: 0.65rem;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
    border: 1px solid rgba(15, 23, 42, 0.03);
  }

  &__order {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 999px;
    background-color: #f3f7ff;
    color: #1f2937;
    font-weight: 700;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
  }

  &__word {
    font-weight: 700;
    color: #0f172a;
    padding-left: 0.6rem;
  }

  &__score {
    text-align: right;
    font-weight: 800;
    color: #1e40af;
  }

  /* make the list container stand out a bit */
  &__list {
    padding: 0.2rem 0;
  }
}
</style>
