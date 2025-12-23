<template>
  <section class="summary">
    <header class="summary__header">
      <div class="summary__title">추측한 단어</div>
      <div class="summary__badge">{{ attemptsLabel }}</div>
    </header>

    <div v-if="!guesses.length" class="summary__empty">아직 입력한 단어가 없습니다.</div>

    <ul v-else class="summary__list">
      <li
        v-for="guess in limitedGuesses"
        :key="guess.word"
        class="summary__item"
        :class="{ 'summary__item--correct': guess.isCorrect }"
      >
        <span class="summary__order">{{ guess.failCount }}</span>
        <span class="summary__word">{{ guess.word }}</span>
        <div class="summary__info-box">
          <span v-if="guess.rank" class="summary__rank">{{ guess.rank }}위</span>
          <span class="summary__score">
            {{ guess.isCorrect ? '정답!' : `${guess.similarity}%` }}
          </span>
        </div>
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

// 정렬: 이미 store에서 정렬되어 있지만, UI에서도 일관성을 위해 한 번 더 보장할 수 있음
// 여기서는 store의 순서를 따르되 props로 받은 것을 그대로 사용 (이미 store에서 정렬됨)
const limitedGuesses = computed(() => {
  return props.guesses;
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
    grid-template-columns: 36px 1fr auto;
    gap: 1rem;
    align-items: center;
    padding: 0.75rem 0.9rem;
    border-radius: 0.75rem;
    background-color: #ffffff;
    margin-bottom: 0.65rem;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
    border: 1px solid rgba(15, 23, 42, 0.03);
    transition: all 0.3s ease;

    &--correct {
      background: linear-gradient(90deg, #fefce8, #fef9c3);
      border: 2px solid #facc15;
      box-shadow: 0 10px 25px rgba(250, 204, 21, 0.2);
      animation: correct-bounce 0.6s ease-out;

      .summary__order {
        background-color: #facc15;
        color: #854d0e;
      }

      .summary__word {
        color: #854d0e;
        font-size: 1.1rem;
      }

      .summary__score {
        color: #ca8a04;
        font-weight: 900;
      }
    }
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
    font-size: 0.85rem;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
  }

  &__word {
    font-weight: 700;
    color: #0f172a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__info-box {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.1rem;
  }

  &__rank {
    font-size: 0.75rem;
    color: #000000;
    font-weight: 700;
  }

  &__score {
    text-align: right;
    font-weight: 800;
    color: #1e40af;
    font-size: 0.95rem;
  }

  /* make the list container stand out a bit */
  &__list {
    padding: 0.2rem 0;
  }
}

@keyframes correct-bounce {
  0% { transform: scale(0.95); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
}
</style>
