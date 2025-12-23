<!-- src/views/MyPageView.vue -->
<template>
  <div class="page">
    <AppHeader />

    <main class="page__content mypage">
      <!-- 1. Profile Section -->
      <section class="mypage__profile card">
        <div class="profile-info">
          <div class="avatar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="text">
            <h1 class="username">
              <span v-if="loadingUserInfo" class="skeleton-text w-32"></span>
              <span v-else>{{ nickname }}님</span>
            </h1>
            <p class="user-desc">
              <span v-if="loadingUserInfo" class="skeleton-text w-48"></span>
              <span v-else>{{ email }}</span>
            </p>
          </div>
        </div>
        <router-link to="/profile/edit" class="btn-edit">
<img :src="iconEditProfile" alt="정보수정" class="icon" />
          정보수정
        </router-link>
      </section>

      <!-- 2. Stats Section -->
      <section class="mypage__stats">
        <h2 class="section-title">누적 통계</h2>
        <div class="stats-grid">
          <div class="stat-card card">
            <div class="stat-card__icon icon-blue">
               <!-- Puzzle Piece Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
              </svg>
              <span>총 게임</span>
            </div>
            <div class="stat-card__value text-blue">
              <span v-if="loadingStats" class="skeleton-text w-16"></span>
              <span v-else>{{ stats.totalGamesPlayed }}</span>
            </div>
          </div>

          <div class="stat-card card">
            <div class="stat-card__icon icon-green">
              <!-- Check Badge Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.657 0 3.107.936 3.903 2.327l2.25 4a2.25 2.25 0 01-3.906 2.196L12 8.75l-2.247 2.023A2.25 2.25 0 015.847 8.578l2.25-4a2.25 2.25 0 01.506-.78zM2.25 13.5a3 3 0 013-3h13.5a3 3 0 013 3v1.5a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-1.5zm7.114 4.886a.75.75 0 00-1.114 0l-2.022 2.247c-.23.255-.386.494-.614.389a.75.75 0 00-1.136-1.114l2.022-2.247a.75.75 0 000-1.026l-2.022-2.247a.75.75 0 011.136-1.114l2.022 2.247a.75.75 0 001.026 0l2.022-2.247a.75.75 0 011.136 1.114l-2.022 2.247a.75.75 0 000 1.026l2.022 2.247a.75.75 0 01-1.136 1.114l-2.022-2.247a.75.75 0 00-1.026 0z" clip-rule="evenodd" />
              </svg>
              <span>완료</span>
            </div>
            <div class="stat-card__value text-green">
              <span v-if="loadingStats" class="skeleton-text w-16"></span>
              <span v-else>{{ stats.successfulGames }}</span>
            </div>
          </div>

          <div class="stat-card card">
            <div class="stat-card__icon icon-indigo">
               <!-- Chart Pie Icon -->
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clip-rule="evenodd" />
              </svg>
              <span>승률</span>
            </div>
            <div class="stat-card__value text-indigo">
              <span v-if="loadingStats" class="skeleton-text w-16"></span>
              <span v-else>{{ stats.winRate }}%</span>
            </div>
          </div>

          <div class="stat-card card">
            <div class="stat-card__icon icon-orange">
               <!-- Trophy Icon -->
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                 <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.656-.75c-1.676-.176-3.372-.176-5.048 0a.75.75 0 00-.656.75zm4.749 1.125a.75.75 0 01.75-.75h3.352a.75.75 0 01.75.75v3.014c0 1.34-1.117 2.425-2.456 2.425-1.34 0-2.456-1.084-2.456-2.425V3.746z" clip-rule="evenodd" />
              </svg>
              <span>최고 순위</span>
            </div>
            <div class="stat-card__value text-orange">
              <span v-if="loadingStats" class="skeleton-text w-16"></span>
              <span v-else>{{ stats.bestRank ? `${stats.bestRank}위` : '-' }}</span>
            </div>
          </div>

          <div class="stat-card card">
            <div class="stat-card__icon icon-purple">
               <!-- Arrow Path Icon / Target / Attempts -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
              </svg>
              <span>평균 시도</span>
            </div>
            <div class="stat-card__value text-purple">
              <span v-if="loadingStats" class="skeleton-text w-16"></span>
              <span v-else>{{ stats.averageAttempts }}</span>
            </div>
          </div>

          <div class="stat-card card">
             <div class="stat-card__icon icon-red">
               <!-- Fire Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.177 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
              </svg>
              <span>연속 기록</span>
            </div>
            <div class="stat-card__value text-red">
              <span v-if="loadingStats" class="skeleton-text w-16"></span>
              <span v-else>{{ stats.longestConsecutiveDays }}일</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Achievements Section -->
      <section class="mypage__achievements">
        <h2 class="section-title">업적</h2>
        <div class="achievement-grid">
          <template v-if="loadingAchievements">
            <!-- Skeleton Loading -->
             <div class="achievement-card card" v-for="i in 4" :key="i">
                <div class="skeleton-icon"></div>
                <div class="info">
                   <div class="skeleton-text w-32"></div>
                   <div class="skeleton-text w-48" style="margin-top: 0.5rem; height: 1rem;"></div>
                </div>
             </div>
          </template>

          <template v-else>
             <div
              v-for="achievement in allAchievements"
              :key="achievement.type"
              class="achievement-card card"
              :class="{ 'completed': achievement.isUnlocked, 'locked': !achievement.isUnlocked }"
            >
              <div class="medal-icon" :class="[achievement.isUnlocked ? 'bg-blue' : '', achievement.colorClass]">
                <!-- Fire Icon -->
                <svg v-if="achievement.iconType === 'fire'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.177 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                </svg>
                <!-- Medal Icon -->
                 <svg v-else-if="achievement.iconType === 'medal'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.656-.75c-1.676-.176-3.372-.176-5.048 0a.75.75 0 0 0-.656.75ZM4.565 5.5c1.833-.418 3.725-.634 5.632-.633 1.907-.001 3.799.215 5.632.633a5.253 5.253 0 0 1-1.385 4.393 5.23 5.23 0 0 1-4.247 1.327 5.23 5.23 0 0 1-4.247-1.327A5.253 5.253 0 0 1 4.565 5.5Z" clip-rule="evenodd" />
                </svg>
                <!-- Trophy/Crown Icon (Using Trophy for now) -->
                <svg v-else-if="achievement.iconType === 'trophy'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436h.684c1.248 0 2.25-.809 2.25-1.808 0-1.21-1.24-2.203-2.922-2.348a.75.75 0 0 1-.689-.747V9.75a.75.75 0 0 1 .809-.748c2.91.248 4.302 2.062 4.302 3.848 0 2.28-1.92 4.091-4.75 4.316v1.365c0 1.597-2.197 3.033-5.32 3.208a.75.75 0 0 1-.41-.122L1.875 15a.75.75 0 0 1 0-1.5l8.13-1.016A18.89 18.89 0 0 0 9.315 7.584ZM2.25 10.5a.75.75 0 0 1 .75-1.06 17.653 17.653 0 0 0 4.298-2.652.75.75 0 0 1 1.012 1.107 19.143 19.143 0 0 1-4.496 3.055.75.75 0 0 1-1.077-.282.75.75 0 0 1-.487-.168Z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.656-.75c-1.676-.176-3.372-.176-5.048 0a.75.75 0 0 0-.656.75ZM4.565 5.5c1.833-.418 3.725-.634 5.632-.633 1.907-.001 3.799.215 5.632.633a5.253 5.253 0 0 1-1.385 4.393 5.23 5.23 0 0 1-4.247 1.327 5.23 5.23 0 0 1-4.247-1.327A5.253 5.253 0 0 1 4.565 5.5Z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="info">
                <h3>{{ achievement.title }}</h3>
                <p>{{ achievement.description }}</p>
                <p v-if="achievement.isUnlocked" class="unlocked-date">
                  {{ new Date(achievement.unlockedAt).toLocaleDateString() }} 획득
                </p>
              </div>
            </div>
          </template>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from "@/stores/auth";
import { getMyInfo, getMyStatistics } from "@/api/users";
import { getMyAchievements } from "@/api/achievements";
import { ACHIEVEMENT_METADATA } from "@/constants/achievements";
import iconEditProfile from '@/assets/icon-edit-profile.png';
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

const authStore = useAuthStore();
const nickname = ref('알 수 없음');
const email = ref('');
const loadingUserInfo = ref(true);
const loadingStats = ref(true);
const loadingAchievements = ref(true);

const stats = ref({
  totalGamesPlayed: 0,
  successfulGames: 0,
  winRate: 0,
  bestRank: null,
  longestConsecutiveDays: 0,
  averageAttempts: 0
});

const myAchievements = ref([]);

// Computed property to merge metadata with user's achievements
const allAchievements = computed(() => {
  return Object.keys(ACHIEVEMENT_METADATA).map(key => {
    const meta = ACHIEVEMENT_METADATA[key];
    const earned = myAchievements.value.find(a => a.type === key);

    return {
      type: key,
      ...meta,
      isUnlocked: !!earned,
      unlockedAt: earned ? earned.unlockedAt : null
    };
  });
});

const fetchUserInfo = async () => {
  try {
    loadingUserInfo.value = true;
    const response = await getMyInfo();
    if (response.success && response.data) {
       // Also update store to keep it in sync
       authStore.user = response.data;
       nickname.value = response.data.nickname;
       email.value = response.data.email;
    }
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    // Fallback to store if available
    if (authStore.user) {
        nickname.value = authStore.user.nickname;
        email.value = authStore.user.email;
    }
  } finally {
    loadingUserInfo.value = false;
  }
};

const fetchStatistics = async () => {
    try {
        loadingStats.value = true;
        const response = await getMyStatistics();
        if (response.success && response.data) {
            stats.value = response.data;
        }
    } catch (error) {
        console.error("Failed to fetch statistics:", error);
    } finally {
        loadingStats.value = false;
    }
}

const fetchAchievements = async () => {
  try {
    loadingAchievements.value = true;
    const response = await getMyAchievements();
    if (response.success && response.data) {
      myAchievements.value = response.data.achievements || [];
    }
  } catch (error) {
    console.error("Failed to fetch achievements:", error);
  } finally {
    loadingAchievements.value = false;
  }
};

onMounted(() => {
  fetchUserInfo();
  fetchStatistics();
  fetchAchievements();
});
</script>

<style lang="scss" scoped>
.mypage {
  max-width: 1000px;
  margin: 1.5rem auto 4rem;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .section-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--color-text-heading);
    margin-bottom: 1rem;
    padding-left: 0.25rem;
  }

  // 공통 카드 스타일
  .card {
     background: var(--color-surface);
     border-radius: 1rem;
     padding: 1.5rem;
     border: 1px solid var(--color-border);
     box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); /* Modern soft shadow */
  }

  // 1. 프로필 섹션
  &__profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .profile-info {
      display: flex;
      align-items: center;
      gap: 1.25rem;

      .avatar {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 1rem;
        background-color: var(--color-primary); // Brand Color
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
            width: 2rem;
            height: 2rem;
        }
      }

      .text {
        .username {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-text-heading);
          margin: 0;
          line-height: 1.2;
        }
        .user-desc {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          margin: 0;
        }
      }
    }

    .btn-edit {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1rem;
      background-color: #f1f5f9; // Slate 100
      color: #475569; // Slate 600
      border-radius: 0.75rem;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      transition: background-color 0.2s;

      &:hover {
        background-color: #e2e8f0; // Slate 200
      }

      .icon {
        width: 1.1rem;
        height: 1.1rem;
      }
    }
  }

  // 2. 통계 섹션
  &__stats {
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
    }

    .stat-card {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      &__icon {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        // Default color if no class
        color: var(--color-text-muted);
        font-weight: 600;
        font-size: 0.9rem;

        svg {
          width: 1.4rem;
          height: 1.4rem;
        }

        // Color Variants (Modernized)
        &.icon-blue svg { color: #3b82f6; }
        &.icon-green svg { color: #10b981; }
        &.icon-indigo svg { color: #6366f1; }
        &.icon-orange svg { color: #f59e0b; }
        &.icon-purple svg { color: #a855f7; }
        &.icon-red svg { color: #ef4444; }
      }

      &__value {
        font-size: 2rem;
        font-weight: 800;
        line-height: 1;
        letter-spacing: -0.02em;

        // Color Variants (Matching Icons)
        &.text-blue { color: #3b82f6; }
        &.text-green { color: #10b981; }
        &.text-indigo { color: #6366f1; }
        &.text-orange { color: #f59e0b; }
        &.text-purple { color: #a855f7; }
        &.text-red { color: #ef4444; }
      }
    }
  }

  // 3. 업적 섹션
  &__achievements {
    .achievement-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .achievement-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.25rem;
      border: 1px solid var(--color-border);
      background-color: var(--color-surface);

      // Completed style updates
      &.completed {
         .medal-icon {
            background-color: var(--color-primary); // Brand Blue
            color: white;
            box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.25);
         }
      }

      &.locked {
        background-color: #f8fafc; // Slate 50
        .medal-icon {
            background-color: #e2e8f0; // Slate 200
            color: white;
        }
        .info h3, .info p {
             color: #94a3b8; // Slate 400
        }
      }

      .medal-icon {
        width: 3rem;
        height: 3rem;
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        svg {
            width: 1.5rem;
            height: 1.5rem;
        }
      }

      .info {
        h3 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text-heading);
          margin: 0 0 0.25rem;
        }
        p {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin: 0;
        }
      }
    }
  }
}

.skeleton-text {
  display: inline-block;
  height: 1.5rem;
  background-color: #e2e8f0;
  border-radius: 0.25rem;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  &.w-32 { width: 8rem; }
  &.w-48 { width: 12rem; }
  &.w-16 { width: 4rem; }
}

.skeleton-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  background-color: #e2e8f0;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  flex-shrink: 0;
}

.unlocked-date {
  font-size: 0.75rem !important;
  color: var(--color-primary) !important;
  margin-top: 0.25rem !important;
  font-weight: 500;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}

// Responsive
@media (max-width: 768px) {
  .mypage {
    &__stats {
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
    &__achievements .achievement-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
