<template>
  <section class="history-answer">
    <div class="history-answer__header">
      <span class="history-answer__badge">어제의 정답</span>
      <p class="history-answer__date">{{ dateLabel }}</p>
    </div>
    <div class="history-answer__content">
      <h2 class="history-answer__word">{{ answerWord }}</h2>
      <button class="history-answer__toggle" type="button" @click="toggleDescription">
        {{ buttonLabel }}
      </button>
    </div>
    <p v-if="showDescription" class="history-answer__description">{{ description }}</p>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  dateLabel: {
    type: String,
    default: "",
  },
  answerWord: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});

const showDescription = ref(false);
const toggleDescription = () => {
  showDescription.value = !showDescription.value;
};

const buttonLabel = computed(() => (showDescription.value ? "설명 닫기" : "설명 보기"));
</script>

<style lang="scss" scoped>
.history-answer {
  background: linear-gradient(135deg, #eef2ff, #dbeafe);
  border-radius: 1.2rem;
  padding: 1.8rem 2rem;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.09);

  &__header {
    display: flex;
    align-items: baseline;
    gap: 0.9rem;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    padding: 0.4rem 1rem;
    background-color: #2563eb;
    color: #ffffff;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
  }

  &__date {
    margin: 0;
    color: #4b5563;
    font-size: 0.9rem;
  }

  &__word {
    margin: 0.7rem 0 0.6rem;
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 900;
    color: #111827;
  }

  &__content {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  &__toggle {
    border: none;
    border-radius: 999px;
    background: linear-gradient(135deg, #2563eb, #4f46e5);
    color: #ffffff;
    font-weight: 700;
    padding: 0.45rem 1.2rem;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
  }

  &__description {
    margin: 0;
    font-size: 1rem;
    color: #1f2937;
    line-height: 1.5;
    margin-top: 0.9rem;
  }
}
</style>
