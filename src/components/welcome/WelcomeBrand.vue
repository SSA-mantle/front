<template>
  <section class="brand">
    <div class="brand__title-row">
      <!-- <div class="brand__line"></div> -->

      <div class="brand__title-block">
        <!-- 여기서 SSA- / Mantle 줄바꿈 -->
        <h1 class="brand__title">
          <span class="brand__title-top">SSA-</span>
          <span class="brand__title-bottom">&nbsp;&nbsp; Mantle</span>
        </h1>
      </div>

      <!-- <div class="brand__line brand__line--right"></div> -->
    </div>

    <div class="brand__badge-wrapper">
      <div class="brand__badge"><b> 유사도 기반 &nbsp; </b> 단어 유추 게임</div>
    </div>

    <p class="brand__cta">오늘의 싸피 단어를 찾아보세요!</p>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
.brand {
  color: #f9fafb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 520px;

  &__title-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.8rem;
    margin-bottom: 1.8rem;
  }

  &__line {
    flex: 1;
    max-width: 90px;
    height: 3px;
    border-radius: 999px;
    background-color: #020617; // 검은색 라인

    &--right {
      margin-left: 1rem;
    }
  }

  &__title-block {
    display: flex;
    flex-direction: column;
  }

  .brand__title {
    margin: 0;
    font-size: 6rem;
    font-weight: 900;
    // letter-spacing: 0.02em;
    line-height: 1;
    color: #020617; // 타이틀 검은색
  }

  .brand__title-top,
  .brand__title-bottom {
    display: block; // SSA- / Mantle 줄바꿈
  }

  &__subtitle {
    margin: 0.35rem 0 0;
    font-size: 1.05rem;
    opacity: 0.96;
    color: rgba(15, 23, 42, 0.9);
  }

  &__badge-wrapper {
    margin-top: 0.8rem;
    margin-bottom: 2.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.55rem 1.9rem;
    border-radius: 999px;
    background-color: #ffffff;
    color: #111827;
    font-size: 1.2rem;
    font-weight: 700;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.45);
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    font-size: 1.5rem;
    font-weight: 800;
    opacity: 0.9;
    color: #111827;
  }
}
</style>
