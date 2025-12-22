<template>
  <div class="page">
    <AppHeader />

    <main class="page__content main">
      <transition name="intro-fade" mode="out-in">
        <!-- 인트로 모드: 로그인 후 처음 진입 시 -->
        <section v-if="showIntro" class="main__intro" @click="closeIntro">
          <div class="main__intro-logo">
            <img :src="logoImg" alt="SSA-mantle Logo" class="main__intro-img" />
          </div>
          <div class="main__intro-hint">Click to Start</div>
        </section>

        <!-- 실제 메인 게임 콘텐츠 -->
        <div 
          v-else 
          class="main__actual-content"
          :class="{ 'main--animate': isFirstEntrance }"
        >
          <!-- 가운데 로고 + 타이틀 영역 -->
          <section class="main__hero">
            <div class="main__logo-circle">
              <img :src="logoImg" alt="SSA-mantle Logo" class="main__logo-img" />
            </div>
            <h1 class="main__title">SSA-mantle</h1>
            <p class="main__subtitle">
              <span class="main__subtitle-strong">유사도 기반 단어 유추 게임</span>
            </p>
          </section>

          <!-- 아래: 게임 영역 (게임 종료 시 2컬럼 레이아웃) -->
          <div
            class="main__game-container"
            :class="{ 'main__game-container--split': isGameOver }"
          >
            <section class="main__challenge">
              <DailyChallengeCard :should-animate="isFirstEntrance || showResultAnimation" />
            </section>

            <transition :name="showResultAnimation ? 'fade-scale' : ''">
              <section v-if="isGameOver" class="main__result">
                <GameResultSection :should-animate="isFirstEntrance || showResultAnimation" />
              </section>
            </transition>
          </div>
        </div>
      </transition>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useGameStore } from "@/stores/game";

import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import DailyChallengeCard from "@/components/main/DailyChallengeCard.vue";
import GameResultSection from "@/components/main/GameResultSection.vue";
import logoImg from "@/assets/logo.png";

const gameStore = useGameStore();
const isGameOver = computed(() => gameStore.status !== "playing");

// 인트로 표시 여부 확인
const hasSeenIntro = typeof window !== 'undefined' ? !!sessionStorage.getItem("ssa_intro_seen") : true;
const showIntro = ref(!hasSeenIntro);

// 처음 진입 애니메이션 제어 (인트로 클릭 후 1회만)
const isFirstEntrance = ref(false);

const closeIntro = () => {
  showIntro.value = false;
  isFirstEntrance.value = true; // 인트로 닫을 때만 애니메이션 활성화
  sessionStorage.setItem("ssa_intro_seen", "true");
};

// 정답 처리 애니메이션 제어 (게임 종료 시 1회만)
const showResultAnimation = ref(false);

const stopResultAnimation = () => {
  showResultAnimation.value = false;
};

// 게임 상태 모니터링하여 새로 정답을 맞혔을 때만 애니메이션 적용
import { watch } from "vue";
watch(isGameOver, (newValue, oldValue) => {
  if (newValue === true && oldValue === false) {
    showResultAnimation.value = true;
  }
});

onMounted(async () => {
  await gameStore.initializeGame();
});
</script>

<style lang="scss" scoped>
.main {
  max-width: 1200px; // Increased to accommodate split layout
  width: 100%;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;

  &__intro {
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 2rem;
  }

  &__intro-logo {
    width: 320px;
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: float-rotate 6s ease-in-out infinite;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__intro-hint {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-primary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    animation: pulse 2s ease-in-out infinite;
  }



  &__hero {
    text-align: center;
    margin-bottom: 3.5rem;
  }

  &__logo-circle {
    width: 240px;
    height: 240px;
    margin: 0 auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s var(--ease-spring);
    animation: float-rotate 6s ease-in-out infinite;

    &:hover {
      transform: scale(1.08) rotate(0deg);
      animation-play-state: paused;
    }
  }

  &__logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__title {
    margin: 0;
    font-size: 3rem;
    font-weight: 900;
    line-height: 1.1;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, var(--color-text-heading) 30%, var(--color-primary-600));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
  }

  &__subtitle {
    margin: 0.8rem 0 0;
    font-size: 1.15rem;
    color: var(--color-text-muted);
    font-weight: 500;
  }

  &__subtitle-strong {
    font-weight: 700;
    color: var(--color-text-heading);
  }

  &__game-container {
    display: grid;
    grid-template-columns: minmax(0, 700px);
    justify-content: center;
    gap: 2rem;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);

    &--split {
      grid-template-columns: 1fr 1fr;
    }
  }

  // First-time Entrance Animations
  &--animate {
    .main__hero {
      animation: slide-up 0.8s var(--ease-spring) both;
      animation-delay: 0.1s;
    }
    .main__game-container {
      animation: slide-up 0.8s var(--ease-spring) both;
      animation-delay: 0.4s;
    }
  }

  &__challenge {
    width: 100%;
  }

  &__result {
    width: 100%;
  }
}

// Keyframes
@keyframes float-rotate {
  0%, 100% { transform: rotate(-5deg) translateY(0); }
  50% { transform: rotate(5deg) translateY(-15px); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

// Transitions
.intro-fade-enter-active, .intro-fade-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.intro-fade-enter-from, .intro-fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
  filter: blur(10px);
}

.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

// Mobile Responsiveness
@media (max-width: 1024px) {
  .main {
    &__game-container--split {
      grid-template-columns: 1fr;
    }

    &__hero {
      margin-bottom: 2.5rem;
    }

    &__intro-logo {
      width: 240px;
      height: 240px;
    }
  }
}
</style>
