<template>
  <div class="page">
    <AppHeader />

    <main class="page__content history">
      <section class="history__hero">
        <div class="history__hero-title">
          <span class="history__hero-highlight">어제의 기록</span>
          <span class="history__hero-suffix">다시보기</span>
        </div>
        <p class="history__hero-description">
          지난 챌린지에서 <strong>정답에 가장 가까웠던 단어</strong>들을 확인하세요.
        </p>
      </section>

      <!-- 로딩 상태 -->
      <div v-if="isLoading" class="history__loading">
        <div class="spinner"></div>
        <p>어제의 기록을 불러오는 중입니다...</p>
      </div>

      <!-- 에러 상태 -->
      <div v-else-if="error" class="history__error">
        <p>{{ error }}</p>
        <button @click="fetchYesterdayHistory" class="history__retry-btn">
          다시 시도
        </button>
      </div>

      <!-- 데이터 표시 -->
      <template v-else>
        <HistoryAnswerCard
          :date-label="yesterdayLabel"
          :answer-word="answerWord"
          :description="answerDescription"
        />

        <HistorySimilarityList :words="topWords" />
      </template>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getYesterdayHistory } from "@/api/game";

import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import HistoryAnswerCard from "@/components/history/HistoryAnswerCard.vue";
import HistorySimilarityList from "@/components/history/HistorySimilarityList.vue";

// 상태 관리
const isLoading = ref(true);
const error = ref(null);
const historyData = ref(null);

// 어제 날짜 라벨
const yesterdayLabel = computed(() => {
  if (historyData.value?.date) {
    const date = new Date(historyData.value.date);
    return date.toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
    });
  }

  // 기본값: 현재 날짜 - 1일
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
});

// 정답 단어
const answerWord = computed(() => {
  return historyData.value?.answer || "정답 단어";
});

// 정답 설명
const answerDescription = computed(() => {
  if (!historyData.value?.answer) {
    return "어제의 정답을 확인하려면 로그인이 필요합니다.";
  }
  // API에서 description 제공 시 사용, 없으면 기본 메시지
  return historyData.value?.description || `"${historyData.value.answer}"에 대한 설명입니다.`;
});

// 상위 100개 단어
const topWords = computed(() => {
  return historyData.value?.top100Words || [];
});

// 어제 이력 조회
const fetchYesterdayHistory = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await getYesterdayHistory();

    if (response.success && response.data) {
      historyData.value = response.data;
    } else {
      error.value = "데이터를 불러올 수 없습니다.";
    }
  } catch (err) {
    console.error("Failed to fetch yesterday history:", err);
    error.value = "데이터를 불러오는 중 오류가 발생했습니다.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchYesterdayHistory();
});
</script>

<style lang="scss" scoped>
.history {
  width: 100%;
  max-width: 800px;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__hero {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  &__hero-title {
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  &__hero-highlight {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    background: linear-gradient(135deg, var(--color-primary-600), var(--color-accent-purple));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  &__hero-suffix {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 700;
    color: var(--color-text-muted);
  }

  &__hero-description {
    margin: 0;
    font-size: 1.1rem;
    color: var(--color-text-body);
    line-height: 1.6;

    strong {
      color: var(--color-primary);
      font-weight: 700;
    }
  }

  &__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 0;
    color: var(--color-text-muted);
    gap: 1rem;

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid var(--color-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    p {
      margin: 0;
      font-size: 1rem;
    }
  }

  &__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    background: #fef2f2;
    border-radius: 1rem;
    border: 1px solid #fecaca;

    p {
      margin: 0 0 1.5rem;
      color: #dc2626;
      font-size: 1rem;
      text-align: center;
    }
  }

  &__retry-btn {
    padding: 0.75rem 1.5rem;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--color-primary-600);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 960px) {
  .history {
    padding: 0 1.5rem 2rem;
  }
}
</style>
