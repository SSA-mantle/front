<template>
  <section class="guide-sample">
    <div class="guide-sample__inner">
      <h2 class="guide-sample__title">플레이 예시</h2>
      <p class="guide-sample__description">
        실제 Daily Challenge 화면에서 단어를 입력한 뒤 유사도를 확인하는 과정을 캡쳐해
        튜토리얼로 제공할 예정입니다.
      </p>
      <button class="guide-sample__button" type="button">튜토리얼 준비중</button>
    </div>
    <div class="guide-sample__preview">
      (예시 단어로 플레이하는 캡쳐본 + 플레이 과정 설명이 들어갈 예정입니다)
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
.guide-sample {
  margin-top: 2.5rem;
  background-color: #0ea5e9;
  border-radius: 1.5rem;
  padding: 2.5rem;
  color: #f8fafc;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  align-items: center;

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  &__title {
    margin: 0;
    font-size: 2rem;
    font-weight: 900;
  }

  &__description {
    margin: 0;
    font-size: 1rem;
    line-height: 1.6;
  }

  &__button {
    align-self: flex-start;
    border: none;
    border-radius: 999px;
    background-color: #ffffff;
    color: #0ea5e9;
    font-weight: 700;
    padding: 0.65rem 1.5rem;
    cursor: pointer;
    box-shadow: 0 12px 25px rgba(15, 23, 42, 0.15);
  }

  &__preview {
    border: 2px dashed rgba(255, 255, 255, 0.8);
    border-radius: 1rem;
    padding: 1.5rem;
    font-size: 0.95rem;
    text-align: center;
    line-height: 1.6;
    background: rgba(15, 23, 42, 0.15);
  }
}

@media (max-width: 640px) {
  .guide-sample {
    padding: 1.8rem;

    &__title {
      font-size: 1.6rem;
    }
  }
}
</style>
