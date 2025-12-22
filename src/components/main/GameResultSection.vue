<template>
  <aside class="result-section">
    <!-- Answer Header Card (Style similar to HistoryAnswerCard) -->
    <div class="result-section__answer answer-card" :class="{ animate: shouldAnimate }">
      <div class="answer-card__header">
        <span class="answer-card__badge">오늘의 정답</span>
        <p class="answer-card__date">{{ todayFullDate }}</p>
      </div>
      <div class="answer-card__content">
        <h2 class="answer-card__word">{{ gameStore.answer }}</h2>
        <button
          class="answer-card__toggle"
          type="button"
          @click="showDescription = !showDescription"
        >
          {{ showDescription ? '설명 닫기' : '설명 보기' }}
        </button>
      </div>
      <transition name="fade-slide">
        <div v-if="showDescription" class="answer-card__description-container">
          <p class="answer-card__description">
            {{ gameStore.answerDescription || '단어 설명을 불러오는 중입니다...' }}
          </p>
          <div class="answer-card__actions">
            <button class="answer-card__share-btn" @click="handleShare">
              <span class="icon">🔗</span> 결과 공유하기
            </button>
            <span v-if="copyFeedback" class="answer-card__feedback">{{ copyFeedback }}</span>
          </div>
        </div>
      </transition>
    </div>

    <!-- Top 100 List (Style similar to HistorySimilarityList) -->
    <div class="result-section__list similarity-list" :class="{ animate: shouldAnimate }">
      <header class="similarity-list__header">
        <div>
          <h3 class="similarity-list__title">유사도 상위 단어 100개</h3>
          <p class="similarity-list__subtitle">정답 단어 기준으로 가까운 순서입니다.</p>
        </div>
      </header>

      <div class="similarity-list__table">
        <div class="similarity-list__table-head">
          <span class="col-rank">순위</span>
          <span class="col-word">단어</span>
          <span class="col-sim">유사도</span>
        </div>
        <ul class="similarity-list__items">
          <li
            v-for="wordObj in gameStore.top100Words"
            :key="wordObj.rank"
            class="similarity-list__row"
          >
            <span class="similarity-list__rank col-rank">{{ wordObj.rank }}</span>
            <span class="similarity-list__word col-word">{{ wordObj.word }}</span>
            <span class="similarity-list__sim col-sim">{{ wordObj.similarity }}%</span>
          </li>
          <li v-if="!gameStore.top100Words.length" class="similarity-list__empty">
            데이터를 불러오는 중...
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useGameStore } from '@/stores/game';

const props = defineProps({
  shouldAnimate: {
    type: Boolean,
    default: false
  }
});

const gameStore = useGameStore();
const showDescription = ref(true);
const copyFeedback = ref("");

const handleShare = async () => {
  const challengeNo = 142; // TODO: Dynamic from store/API
  const attempts = gameStore.guesses.length;
  const statusEmoji = gameStore.status === 'success' ? '🎉' : '💡';

  const text = `🧠 SSA-mantle #${challengeNo}
정답: ${gameStore.answer}
결과: ${statusEmoji} ${attempts}회 시도 성공!
최종 유사도: 100%

#싸멘틀 #SSAFY #단어게임`;

  try {
    await navigator.clipboard.writeText(text);
    copyFeedback.value = "복사 완료!";
    setTimeout(() => {
      copyFeedback.value = "";
    }, 2000);
  } catch (err) {
    console.error('Failed to copy: ', err);
    alert('결과 복사에 실패했습니다.');
  }
};

const todayFullDate = computed(() => {
  return new Date().toLocaleDateString("ko-KR", {
    year: 'numeric',
    month: "long",
    day: "numeric",
  });
});

onMounted(async () => {
  if (gameStore.top100Words.length === 0) {
    await gameStore.fetchTodayHistory();
  }
});
</script>

<style lang="scss" scoped>
.result-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: fit-content;

  // Answer Card Styling (Appears first)
  .answer-card {
    background: linear-gradient(135deg, #eff6ff, #dbeafe);
    border-radius: 1.25rem;
    padding: 1.5rem;
    box-shadow: 0 10px 25px rgba(30, 64, 175, 0.05);
    border: 1px solid #bfdbfe;

    &.animate {
      animation: slide-in-top 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
    }

    &__header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    &__badge {
      background-color: #1e40af;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 700;
    }

    &__date {
      margin: 0;
      font-size: 0.8rem;
      color: #64748b;
      font-weight: 500;
    }

    &__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    &__word {
      margin: 0;
      font-size: 2.2rem;
      font-weight: 900;
      color: #1e293b;
      letter-spacing: -0.02em;
    }

    &__toggle {
      background: white;
      color: #1e40af;
      border: 1px solid #bfdbfe;
      padding: 0.4rem 0.8rem;
      border-radius: 0.75rem;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      &:hover { background: #f8fafc; transform: translateY(-1px); }
    }

    &__description-container {
      margin: 1rem 0 0;
      padding-top: 1rem;
      border-top: 1px solid rgba(191, 219, 254, 0.5);
    }

    &__description {
      margin: 0 0 1.25rem;
      font-size: 0.95rem;
      line-height: 1.6;
      color: #334155;
    }

    &__actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    &__share-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background-color: #1e40af;
      color: white;
      border: none;
      padding: 0.6rem 1.2rem;
      border-radius: 0.75rem;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(30, 64, 175, 0.2);

      &:hover {
        background-color: #1e3a8a;
        transform: translateY(-1px);
        box-shadow: 0 6px 16px rgba(30, 64, 175, 0.3);
      }

      .icon { font-size: 1rem; }
    }

    &__feedback {
      font-size: 0.8rem;
      font-weight: 700;
      color: #059669;
      animation: fade-in 0.3s ease-out;
    }
  }

  // Similarity List Styling (Appears second)
  .similarity-list {
    background-color: #ffffff;
    border-radius: 1.25rem;
    padding: 1.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
    border: 1px solid #e2e8f0;

    &.animate {
      animation: slide-in-bottom 0.7s cubic-bezier(0.16, 1, 0.3, 1) 1.1s both;
    }

    &__header { margin-bottom: 1.25rem; }
    &__title { margin: 0; font-size: 1.15rem; font-weight: 800; color: #1e293b; }
    &__subtitle { margin: 0.25rem 0 0; font-size: 0.85rem; color: #64748b; }

    &__table {
      border-radius: 0.75rem;
      border: 1px solid #f1f5f9;
      overflow: hidden;
    }

    &__table-head {
      display: grid;
      grid-template-columns: 60px 1fr 80px;
      background-color: #f8fafc;
      padding: 0.75rem 1rem;
      font-weight: 700;
      color: #475569;
      font-size: 0.85rem;
      border-bottom: 1px solid #f1f5f9;
    }

    &__items {
      list-style: none;
      margin: 0;
      padding: 0;
      max-height: 400px;
      overflow-y: auto;

      &::-webkit-scrollbar { width: 5px; }
      &::-webkit-scrollbar-track { background: transparent; }
      &::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
    }

    &__row {
      display: grid;
      grid-template-columns: 60px 1fr 80px;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #f8fafc;
      align-items: center;
      font-weight: 600;
      color: #334155;
      font-size: 0.9rem;
      &:last-child { border-bottom: none; }
      &:hover { background-color: #f1f5f9; }
    }

    &__rank { font-weight: 700; color: #94a3b8; }
    &__word { font-weight: 700; color: #1e293b; }
    &__sim { text-align: right; color: #3b82f6; font-weight: 700; }
    &__empty { padding: 2rem; text-align: center; color: #94a3b8; font-size: 0.9rem; }
  }

  .col-rank { justify-self: start; }
  .col-word { justify-self: start; }
  .col-sim { justify-self: end; }
}

// Transitions & Animations
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@keyframes slide-in-top {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-in-bottom {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
