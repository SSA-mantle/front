<template>
  <li class="lb-row" :class="rowClass">
    <div class="lb-row__left">
      <div class="lb-row__rank">{{ rank }}</div>
      <p class="lb-row__name">{{ entry.name }}</p>
    </div>

    <div class="lb-row__right">
      <span class="lb-row__time">{{ formattedPlaytime }}</span>
      <span class="lb-row__attempt">{{ attemptLabel }}</span>
    </div>
  </li>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  entry: {
    type: Object,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
});

const rowClass = computed(() => {
  if (props.rank === 1) return "lb-row--gold";
  if (props.rank === 2) return "lb-row--silver";
  if (props.rank === 3) return "lb-row--bronze";
  return "";
});

const formattedPlaytime = computed(() => {
  const minutes = Math.floor(props.entry.playtimeSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(props.entry.playtimeSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
});

const attemptLabel = computed(() => `${props.entry.attempts}\uD68C`);
</script>

<style lang="scss" scoped>
.lb-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  border: 1px solid #eef2ff;
  gap: 1rem;

  & + & {
    margin-top: 0.75rem;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    flex: 1;
  }

  &__rank {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    background-color: #eef2ff;
    color: #1f2937;
  }

  &__name {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: #0f172a;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__time {
    font-weight: 700;
    color: #0f172a;
    min-width: 52px;
    text-align: right;
  }

  &__attempt {
    border-radius: 999px;
    background-color: #2563eb;
    color: #ffffff;
    font-weight: 700;
    padding: 0.3rem 0.9rem;
    min-width: 54px;
    text-align: center;
  }

  &--gold {
    border-color: rgba(250, 204, 21, 0.6);
    background-color: #fff9db;
  }

  &--silver {
    border-color: rgba(148, 163, 184, 0.6);
    background-color: #f8fbff;
  }

  &--bronze {
    border-color: rgba(248, 191, 131, 0.6);
    background-color: #fff4e1;
  }
}

@media (max-width: 640px) {
  .lb-row {
    flex-direction: column;
    align-items: flex-start;

    &__right {
      width: 100%;
      justify-content: space-between;
    }
  }
}
</style>
