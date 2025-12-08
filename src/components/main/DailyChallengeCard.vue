<template>
  <section class="daily-card">
    <div class="daily-card__topbar">
      <div class="daily-card__badge">{{ todayLabel }} Daily Challenge ({{ challengeNo }}회)</div>
    </div>

    <div class="daily-card__body">
      <div class="daily-card__info">오늘의 단어를 맞춰보세요!</div>

      <form class="daily-card__form" @submit.prevent="onSubmit">
        <input
          v-model="guess"
          class="daily-card__input"
          type="text"
          placeholder="단어를 입력하세요"
        />
        <button type="submit" class="daily-card__button">입력</button>
      </form>

      <button type="button" class="daily-card__giveup">포기하고 정답 보기</button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";

const emit = defineEmits(["submit-guess"]);

const guess = ref("");

const todayLabel = computed(() => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${m}/${day}`;
});

// TODO: 나중에 서버에서 받아오는 값으로 교체
const challengeNo = 142;

const onSubmit = () => {
  if (!guess.value.trim()) return;
  emit("submit-guess", guess.value);
  guess.value = "";
};
</script>

<style lang="scss" scoped>
.daily-card {
  margin-bottom: 1.5rem;
  /* outer container holds topbar + body */
  border-radius: 1rem;
  position: relative;
  overflow: visible;

  /* blue topbar */
  &__topbar {
    background: linear-gradient(90deg, #2563eb, #4f46e5);
    padding: 0.6rem 1rem;
    border-top-left-radius: 0.95rem;
    border-top-right-radius: 0.95rem;
    color: #fff;
  }

  &__badge {
    display: inline-block;
    padding: 0.28rem 0.7rem;
    border-radius: 999px;
    background-color: rgba(255, 255, 255, 0.12);
    color: #f9fafb;
    font-size: 0.86rem;
    font-weight: 700;
  }

  /* white body panel */
  &__body {
    background-color: #ffffff;
    padding: 1.3rem 1.4rem 1.2rem;
    border-bottom-left-radius: 0.95rem;
    border-bottom-right-radius: 0.95rem;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
    margin-top: -6px; /* slightly overlap with topbar for joined look */
  }

  &__info {
    margin-top: 0;
    font-size: 1.12rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }

  &__form {
    display: flex;
    gap: 0.7rem;
    align-items: center;
  }

  &__input {
    flex: 1;
    border-radius: 999px;
    border: 1px solid #e6eefc;
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    outline: none;
    background-color: #fbfdff;

    &::placeholder {
      color: #9ca3af;
    }

    &:focus {
      border-color: #1e40af;
      box-shadow: 0 6px 18px rgba(37, 99, 235, 0.12);
    }
  }

  &__button {
    border: none;
    border-radius: 999px;
    padding: 0.68rem 1.1rem;
    font-size: 0.95rem;
    font-weight: 700;
    color: #ffffff;
    background: linear-gradient(90deg, #2563eb, #4f46e5);
    cursor: pointer;
    box-shadow: 0 10px 22px rgba(79, 70, 229, 0.18);
  }

  &__giveup {
    margin-top: 0.9rem;
    border: none;
    background: transparent;
    font-size: 0.85rem;
    color: #6b7280;
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
