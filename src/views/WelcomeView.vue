<template>
  <div class="welcome">
    <h1 class="welcome__title">SSAFY Mantle</h1>
    <p class="welcome__subtitle">Welcome / Entry 페이지</p>
    <!-- TODO: DailyChallengeCard + LoginForm 배치 -->
  </div>
</template>

<script setup>
// 나중에 로그인 성공 시 router.push('main') 로 이동
</script>

<style lang="scss" scoped>
.welcome {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  &__subtitle {
    font-size: 1rem;
    color: #6b7280;
  }
}
</style>
