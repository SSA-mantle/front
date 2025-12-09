<template>
  <section class="guide-tips">
    <header class="guide-tips__header">
      <span class="guide-tips__icon">💡</span>
      <div>
        <p class="guide-tips__title">게임 팁</p>
        <p class="guide-tips__subtitle">정답에 가까워지는 방법을 빠르게 익혀보세요</p>
      </div>
    </header>

    <div class="guide-tips__cards">
      <article v-for="tip in tips" :key="tip.title" class="guide-tips__card">
        <div class="guide-tips__card-icon" :style="{ backgroundColor: tip.tint }">
          {{ tip.icon }}
        </div>
        <h3 class="guide-tips__card-title">{{ tip.title }}</h3>
        <p class="guide-tips__card-desc">{{ tip.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  tips: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.guide-tips {
  background: linear-gradient(135deg, #e0f2ff, #f5f3ff);
  border-radius: 1.25rem;
  padding: 1.8rem 2rem;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
  flex: 1;

  &__header {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    margin-bottom: 1.5rem;
  }

  &__icon {
    width: 48px;
    height: 48px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    background-color: rgba(250, 204, 21, 0.15);
  }

  &__title {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 800;
  }

  &__subtitle {
    margin: 0.2rem 0 0;
    font-size: 0.9rem;
    color: #6b7280;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
  }

  &__card {
    background-color: #ffffff;
    border-radius: 1rem;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
  }

  &__card-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    margin-bottom: 0.7rem;
  }

  &__card-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 800;
  }

  &__card-desc {
    margin: 0.35rem 0 0;
    font-size: 0.85rem;
    color: #4b5563;
  }
}

@media (max-width: 768px) {
  .guide-tips {
    padding: 1.4rem 1.2rem;
  }
}
</style>
