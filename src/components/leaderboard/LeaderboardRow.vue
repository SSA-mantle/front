<template>
  <li class="lb-row" :class="rowClass">
    <div class="lb-row__left">
      <div class="lb-row__rank-wrapper">
        <div class="lb-row__rank">{{ rankDisplay }}</div>
      </div>
      <p class="lb-row__name">
        {{ entry.nickname }}
        <span v-if="isMe" class="lb-row__me-badge">나</span>
      </p>
    </div>

    <div class="lb-row__right">
      <span class="lb-row__time">{{ formattedSolvedAt }}</span>
      <div class="lb-row__attempt">
        <span class="lb-row__pill">{{ attemptLabel }}</span>
      </div>
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
  isMe: {
    type: Boolean,
    default: false,
  },
});

const rankDisplay = computed(() => {
  if (props.rank === 1) return "🥇";
  if (props.rank === 2) return "🥈";
  if (props.rank === 3) return "🥉";
  return props.rank;
});

const rowClass = computed(() => {
  return {
    "lb-row--gold": props.rank === 1,
    "lb-row--silver": props.rank === 2,
    "lb-row--bronze": props.rank === 3,
    "lb-row--me": props.isMe,
  };
});

const formattedSolvedAt = computed(() => {
  if (!props.entry.solvedAt) return "-";
  try {
    const date = new Date(props.entry.solvedAt);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  } catch (e) {
    return props.entry.solvedAt;
  }
});

const attemptLabel = computed(() => `${props.entry.failCount}\uD68C \uC2DC\uB3C4`);
</script>

<style lang="scss" scoped>
.lb-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem; // Restored height
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
  border: 1px solid #eef2ff;
  transition: all 0.2s ease;

  & + & {
    margin-top: 0.75rem; // Restored spacing
  }

  &:hover {
    background-color: #f8fafc;
    transform: scale(1.005);
  }

  &__left {
    display: flex;
    align-items: center;
    flex: 1;
  }
 
   &__rank-wrapper {
    width: 60px;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
  }
 
   &__rank {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    background-color: #f1f5f9;
    color: #475569;
    font-size: 0.9rem;
  }
 
   &__name {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-left: 0.9rem;
  }
 
   &__me-badge {
    font-size: 0.65rem;
    background-color: var(--color-primary);
    color: white;
    padding: 0.1rem 0.35rem;
    border-radius: 4px;
    font-weight: 800;
  }
 
   &__right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
 
   &__time {
    font-size: 0.9rem;
    font-weight: 600;
    color: #475569;
    width: 120px;
    text-align: center;
  }
 
   &__attempt {
    width: 100px;
    display: flex;
    justify-content: center;
  }
 
   &__pill {
    background-color: #2563eb;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.8rem;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    min-width: 54px;
    text-align: center;
  }
 
   &--gold {
    border-color: rgba(250, 204, 21, 0.6);
    background-color: #fffef0;
    .lb-row__rank { background-color: #fef3c7; font-size: 1.3rem; }
  }
 
   &--silver {
    border-color: rgba(148, 163, 184, 0.6);
    background-color: #f8fafc;
    .lb-row__rank { background-color: #e2e8f0; font-size: 1.3rem; }
  }
 
   &--bronze {
    border-color: rgba(248, 191, 131, 0.6);
    background-color: #fffaf3;
    .lb-row__rank { background-color: #ffedd5; font-size: 1.3rem; }
  }
 
   &--me {
    border: 2px solid var(--color-primary) !important;
    background-color: #eff6ff !important;
    transform: scale(1.01);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.1) !important;
    z-index: 1;
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
