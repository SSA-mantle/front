<template>
  <div class="page">
    <AppHeader />

    <main class="page__content leaderboard">
      <section class="leaderboard__hero">
        <div class="leaderboard__hero-title">
          <span class="leaderboard__hero-highlight">명예의 전당</span>
          <span class="leaderboard__hero-suffix">TOP 50</span>
        </div>
        <p class="leaderboard__hero-description">
          오늘의 <strong>상위 50위</strong> 플레이어 기록을 확인해보세요.
        </p>
      </section>

      <div v-if="isLoading" class="leaderboard__loading">
        <div class="spinner"></div>
        <p>기록을 불러오는 중입니다...</p>
      </div>

      <template v-else>
        <!-- 상위 3명 포디움 (챔피언 섹션) -->
        <section v-if="top3.length > 0" class="leaderboard__podium">
          <div
            v-for="(player, idx) in podiumSorted"
            :key="player.nickname"
            class="podium-card"
            :class="[`podium-card--${player.rank}`, { 'podium-card--me': player.nickname === currentUserNickname }]"
          >
            <div class="podium-card__medal">{{ player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : '🥉' }}</div>
            <div class="podium-card__name">{{ player.nickname }}</div>
            <div class="podium-card__stats">
              <span class="attempts">{{ player.failCount }}회 시도</span>
              <span class="time">{{ formatTime(player.solvedAt) }}</span>
            </div>
            <div class="podium-card__rank-label">{{ player.rank }}st</div>
          </div>
        </section>

        <!-- 나머지 리스트 -->
        <section class="leaderboard__main-list">
          <LeaderboardList
            :entries="remainingEntries"
            :current-user-nickname="currentUserNickname"
          />

          <!-- 50위 밖의 내 순위 표시 -->
          <div v-if="myRankEntry" class="leaderboard__my-rank-section">
            <div class="leaderboard__divider">
              <span class="leaderboard__divider-text">내 순위</span>
            </div>
            <LeaderboardList
              :entries="[myRankEntry]"
              :current-user-nickname="currentUserNickname"
            />
          </div>

          <p v-if="top50Entries.length === 0" class="leaderboard__empty">
            아직 정답을 맞힌 플레이어가 없습니다. 첫 번째 주인공이 되어보세요!
          </p>
        </section>
      </template>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { getLeaderboard } from "@/api/leaderboard";
import { useAuthStore } from "@/stores/auth";

import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import LeaderboardList from "@/components/leaderboard/LeaderboardList.vue";

const authStore = useAuthStore();
const entries = ref([]);
const myRank = ref(null);
const isLoading = ref(true);

const currentUserNickname = computed(() => authStore.user?.nickname || "");

// 상위 50명만 표시
const top50Entries = computed(() => entries.value.slice(0, 50));
const top3 = computed(() => top50Entries.value.slice(0, 3));
const remainingEntries = computed(() => top50Entries.value.slice(3));

// 내 순위가 50위 밖인지 확인
const isMyRankOutsideTop50 = computed(() => {
  if (!myRank.value) return false;
  return myRank.value.rank > 50;
});

// 50위 밖이면 내 순위를 별도로 표시
const myRankEntry = computed(() => {
  if (!isMyRankOutsideTop50.value) return null;
  return myRank.value;
});

// For podium layout: [2nd, 1st, 3rd] looks more natural
const podiumSorted = computed(() => {
  if (top3.value.length < 3) return top3.value;
  return [top3.value[1], top3.value[0], top3.value[2]];
});

const formatTime = (isoString) => {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const fetchLeaderboard = async () => {
  isLoading.value = true;
  try {
    const res = await getLeaderboard();
    if (res.success && res.data) {
      entries.value = res.data.topRankers || [];
      myRank.value = res.data.myRank;
    }
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error);
  } finally {
    isLoading.value = false;
  }
};

// 사용자 정보가 로드되면 리더보드를 다시 fetch하여 하이라이트 적용
watch(() => authStore.user, (newUser, oldUser) => {
  // user가 null에서 실제 값으로 변경되었을 때만 실행
  if (!oldUser && newUser && entries.value.length > 0) {
    // 이미 리더보드가 로드된 상태에서 user만 업데이트된 경우
    // 컴포넌트가 자동으로 리렌더링되어 하이라이트가 적용됨
  }
});


onMounted(async () => {
  // 인증된 사용자의 경우, user 정보가 로드될 때까지 대기
  if (authStore.isAuthenticated && !authStore.user) {
    // user 정보가 로드될 때까지 최대 3초 대기
    const maxWaitTime = 3000;
    const startTime = Date.now();
    while (!authStore.user && (Date.now() - startTime) < maxWaitTime) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  fetchLeaderboard();
});
</script>

<style lang="scss" scoped>
.leaderboard {
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

  &__section-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-heading);
    margin-bottom: 1rem;
    padding-left: 0.5rem;
  }

  // Podium Styles
  &__podium {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 1.5rem;
    margin: 1rem 0 3rem;
    padding: 0 1rem;
  }

  .podium-card {
    flex: 1;
    max-width: 220px;
    background: white;
    border-radius: 1.5rem;
    padding: 2rem 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--color-border);
    transition: all 0.3s var(--ease-spring);

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    &__medal {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    &__name {
      font-weight: 800;
      font-size: 1.1rem;
      color: var(--color-text-heading);
      margin-bottom: 0.5rem;
      text-align: center;
    }

    &__stats {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      font-size: 0.85rem;
      color: var(--color-text-muted);
      font-weight: 600;

      .attempts { color: var(--color-primary); }
    }

    &__rank-label {
      position: absolute;
      top: -10px;
      right: -10px;
      background: var(--color-text-heading);
      color: white;
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 900;
    }

    // Individual Podium Colors
    &--1 {
      height: 280px;
      border-color: #fde047;
      background: linear-gradient(to bottom, #fffef0, #ffffff);
      transform: scale(1.05);
      z-index: 2;
      &:hover { transform: scale(1.08) translateY(-8px); }
      .podium-card__rank-label { background: #eab308; }
    }
    &--2 {
      height: 240px;
      border-color: #cbd5e1;
    }
    &--3 {
      height: 220px;
      border-color: #fdba74;
    }

    &--me {
      border: 2px solid var(--color-primary);
      box-shadow: 0 10px 30px rgba(37, 99, 235, 0.15);
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
  }

  &__my-rank-section {
    margin-top: 2rem;
  }

  &__divider {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 1.5rem 0;
    position: relative;

    &::before,
    &::after {
      content: '';
      flex: 1;
      border-bottom: 2px dashed #cbd5e1;
    }

    &-text {
      padding: 0 1rem;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--color-text-muted);
      background-color: #f9fafb;
      border-radius: 999px;
      padding: 0.4rem 1rem;
      border: 1px solid #e2e8f0;
    }
  }

  &__empty {
    text-align: center;
    padding: 3rem;
    background: #f8fafc;
    border-radius: 1rem;
    color: var(--color-text-muted);
    border: 1px dashed #cbd5e1;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .leaderboard {
    &__podium {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .podium-card {
      width: 100%;
      max-width: none;
      height: auto !important;
      padding: 1.5rem;
      transform: none !important;
      flex-direction: row;
      justify-content: space-between;

      &__medal { margin-bottom: 0; font-size: 2rem; }
      &__stats { align-items: flex-end; }
      &__name { text-align: left; flex: 1; margin-left: 1rem; margin-bottom: 0; }
    }
  }
}

@media (max-width: 640px) {
  .leaderboard {

    &__hero-title {
       justify-content: center;
    }
  }
}
</style>
