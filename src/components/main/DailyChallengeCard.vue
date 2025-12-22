<template>
  <section class="daily-card">
    <div class="daily-card__header">
      <h2 class="daily-card__title">{{ todayLabel }} Daily Challenge ({{ challengeNo }}회)</h2>
      <button v-if="isDev" class="daily-card__dev-reset" @click="handleDevReset" title="Reset Game (Dev Only)">
        🔄 Reset
      </button>
    </div>

    <div class="daily-card__body">
      <div v-if="!isGameOver" class="daily-card__info">오늘의 단어를 맞춰보세요!</div>

      <!-- Result Message for Success -->
      <div v-else-if="gameStore.status === 'success'" class="daily-card__result daily-card__result--success">
        <div class="daily-card__result-icon">🎉</div>
        <div class="daily-card__result-text">
          축하합니다! 정답은 <span class="daily-card__answer">{{ gameStore.answer }}</span> 입니다.
        </div>
      </div>

      <!-- Result Message for Failure -->
      <div v-else class="daily-card__result daily-card__result--fail">
        <div class="daily-card__result-icon">💡</div>
        <div class="daily-card__result-text">
          아쉽네요. 정답은 <span class="daily-card__answer">{{ gameStore.answer }}</span> 이었습니다.
        </div>
      </div>

      <form v-if="!isGameOver" class="daily-card__form" @submit.prevent="onSubmit">
        <input
          v-model="guess"
          class="daily-card__input"
          :class="{ 'daily-card__input--error': errorMessage }"
          type="text"
          placeholder="단어를 입력하세요"
        />
        <button type="submit" class="daily-card__button">입력</button>
      </form>

      <p v-if="errorMessage" class="daily-card__error">{{ errorMessage }}</p>

      <button
        v-if="!isGameOver"
        type="button"
        class="daily-card__giveup"
        @click="handleGiveUp"
      >
        포기하고 정답 보기
      </button>

      <!-- Merged Guess List Section -->
      <div class="daily-card__summary summary">
        <div class="summary__divider"></div>
        <header class="summary__header">
          <div class="summary__title">추측한 단어</div>
          <div class="summary__badge">{{ attemptsLabel }}</div>
        </header>

        <div v-if="!gameStore.guesses.length" class="summary__empty">아직 입력한 단어가 없습니다.</div>

        <ul v-else class="summary__list">
          <li
            v-for="guess in visibleGuesses"
            :key="guess.word"
            class="summary__item"
            :class="{ 'summary__item--correct': guess.isCorrect }"
          >
            <span class="summary__order">{{ guess.attempt }}</span>
            <span class="summary__word">{{ guess.word }}</span>
            <div class="summary__similarity-container">
              <div class="summary__similarity-bar">
                <div
                  class="summary__similarity-progress"
                  :style="{ width: `${guess.similarity}%` }"
                  :class="{ 'summary__similarity-progress--high': guess.similarity > 90 }"
                ></div>
              </div>
            </div>
            <div class="summary__info-box">
              <span v-if="guess.rank" class="summary__rank">{{ guess.rank }}위</span>
              <span class="summary__score">
                {{ guess.isCorrect ? '정답!' : `${guess.similarity}%` }}
              </span>
            </div>
          </li>
        </ul>

        <button
          v-if="gameStore.guesses.length > 10"
          class="summary__show-more"
          @click="showAllGuesses = !showAllGuesses"
        >
          {{ showAllGuesses ? '접기 ↑' : `전체보기 (${gameStore.guesses.length}개) ↓` }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useGameStore } from "@/stores/game";

const emit = defineEmits(["submit-guess"]);

const gameStore = useGameStore();
const guess = ref("");
const errorMessage = ref("");
const showAllGuesses = ref(false);

const isGameOver = computed(() => gameStore.status !== "playing");
const isDev = import.meta.env.DEV;

const todayLabel = computed(() => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${m}/${day}`;
});

const attemptsLabel = computed(() => {
  const n = gameStore.guesses.length;
  return n === 0 ? "0회 시도" : `${n}회 시도`;
});

const visibleGuesses = computed(() => {
  return showAllGuesses.value ? gameStore.guesses : gameStore.guesses.slice(0, 10);
});

// TODO: 나중에 서버에서 받아오는 값으로 교체
const challengeNo = 142;

const handleDevReset = () => {
  if (confirm("[Dev] 게임 상태를 초기화하시겠습니까?")) {
    gameStore.resetGame();
    showAllGuesses.value = false;
  }
};

const onSubmit = () => {
  errorMessage.value = "";
  const trimmed = guess.value.trim();

  if (!trimmed) return;

  // 중복 체크
  if (gameStore.guesses.some(g => g.word === trimmed)) {
    errorMessage.value = "이미 시도한 단어입니다.";
    guess.value = ""; // 중복 시 입력창 비우기
    return;
  }

  emit("submit-guess", trimmed);
  guess.value = "";
};

const handleGiveUp = async () => {
  if (confirm("정말로 포기하시겠습니까? 정답이 공개됩니다.")) {
    try {
      await gameStore.giveUp();
    } catch (error) {
      alert("포기 처리에 실패했습니다.");
    }
  }
};
</script>

<style lang="scss" scoped>
.daily-card {
  margin-bottom: 2rem;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0; // Clearer border for the card

  &__header {
    background-color: #1e40af; // Deeper blue
    padding: 0.8rem 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
  }

  &__title {
    margin: 0;
    color: #ffffff;
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: -0.025em;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  &__dev-reset {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    backdrop-filter: blur(4px);
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-1px);
    }
  }

  &__body {
    background-color: #ffffff;
    padding: 1.5rem 1.25rem;
  }

  &__info {
    font-size: 1rem;
    font-weight: 600;
    color: #4b5563;
    margin-bottom: 1.25rem;
    text-align: left;
  }

  /* Result styling */
  &__result {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    text-align: center;
    animation: slide-up 0.4s ease-out;
    border-width: 1px;
    border-style: solid;

    &--success {
      background-color: #f0fdf4;
      border-color: #bbf7d0;
      .daily-card__result-text { color: #166534; }
      .daily-card__answer { color: #15803d; }
    }

    &--fail {
      background-color: #fef2f2;
      border-color: #fecaca;
      .daily-card__result-text { color: #991b1b; }
      .daily-card__answer { color: #b91c1c; }
    }
  }

  &__result-icon {
    font-size: 1.75rem;
  }

  &__result-text {
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1.4;
  }

  &__answer {
    font-size: 1.15rem;
    font-weight: 900;
    text-decoration: underline;
    text-underline-offset: 3px;
    margin: 0 0.1rem;
  }

  &__form {
    display: flex;
    gap: 0.5rem;
  }

  &__input {
    flex: 1;
    border-radius: 0.75rem;
    border: 2px solid #e2e8f0; // Stronger border
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    font-weight: 500;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    &--error {
      border-color: #ef4444 !important;
      background-color: #fffafb;
    }
  }

  &__button {
    background: #1e40af; // Deeper blue
    color: white;
    border: none;
    padding: 0 1.25rem;
    border-radius: 0.75rem;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.2);

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 14px rgba(59, 130, 246, 0.3);
    }
  }

  &__error {
    color: #ef4444;
    font-size: 0.8rem;
    font-weight: 600;
    margin: 0.4rem 0 0 0.5rem;
  }

  &__giveup {
    margin-top: 1rem;
    display: inline-block;
    background: none;
    border: none;
    color: #94a3b8;
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #64748b;
    }
  }
}

/* Merged Summary Styles */
.summary {
  margin-top: 1.5rem;

  &__divider {
    height: 1px;
    background-color: #f1f5f9;
    margin-bottom: 1.25rem;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  &__title {
    font-weight: 800;
    font-size: 1.15rem; // Increased from 0.95rem
    color: #1e293b;
  }

  &__badge {
    padding: 0.2rem 0.5rem;
    border-radius: 999px;
    font-size: 0.75rem;
    color: #3b82f6;
    background-color: #eff6ff;
    font-weight: 700;
  }

  &__empty {
    font-size: 0.9rem;
    color: #94a3b8;
    padding: 1.25rem 0;
    text-align: center;
    background-color: #f8fafc;
    border-radius: 0.75rem;
    border: 1px dashed #e2e8f0;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    display: grid;
    grid-template-columns: 36px minmax(80px, 1fr) 2fr auto; // Slightly wider order, flexible word
    gap: 1.25rem; // Increased gap from 1rem
    align-items: center;
    padding: 0.75rem 1rem; // Increased padding
    border-radius: 0.6rem;
    background-color: #ffffff;
    margin-bottom: 0.5rem;
    box-shadow: none;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;

    &:hover {
      border-color: #cbd5e1;
      background-color: #f8fafc;
    }

    &--correct {
      background: linear-gradient(90deg, #fefce8, #fef9c3);
      border: 1.5px solid #facc15;
      box-shadow: 0 4px 12px rgba(250, 204, 21, 0.1);
      animation: correct-bounce 0.6s ease-out;

      .summary__order {
        background-color: #facc15;
        color: #854d0e;
      }

      .summary__word {
        color: #854d0e;
        font-size: 1rem;
      }

      .summary__score {
        color: #ca8a04;
        font-weight: 900;
      }

      .summary__similarity-progress {
        background-color: #facc15; // Solid color
      }
    }
  }

  &__order {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background-color: #f1f5f9;
    color: #64748b;
    font-weight: 700;
    font-size: 0.75rem;
  }

  &__word {
    font-weight: 700;
    color: #1e293b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.95rem;
  }

  &__similarity-container {
    width: 100%;
    padding: 0 0.75rem; // Increased horizontal padding to separate from neighbors
  }

  &__similarity-bar {
    height: 10px; // Slightly thicker
    background-color: #e2e8f0; // Darker track for better 0-100 visibility
    border: 1px solid #cbd5e1; // Subtle border to define the range
    border-radius: 999px;
    overflow: hidden;
    width: 100%;
    position: relative;
  }

  &__similarity-progress {
    height: 100%;
    background-color: #3b82f6; // Solid color
    border-radius: 999px;
    transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);

    &--high {
      background-color: #2563eb; // Solid color
    }
  }

  &__info-box {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 65px; // Slightly wider
    margin-left: 0.5rem; // Added margin to separate from bar
  }

  &__rank {
    font-size: 0.65rem;
    color: #94a3b8;
    font-weight: 700;
  }

  &__score {
    text-align: right;
    font-weight: 800;
    color: #3b82f6;
    font-size: 0.9rem;
  }

  &__show-more {
    display: block;
    width: 100%;
    margin-top: 0.75rem;
    padding: 0.5rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    color: #64748b;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #f1f5f9;
      color: #334155;
      border-color: #cbd5e1;
    }
  }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes correct-bounce {
  0% { transform: scale(0.98); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}
</style>
