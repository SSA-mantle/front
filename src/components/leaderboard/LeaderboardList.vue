<template>
  <section class="lb-list">
    <div class="lb-list__header">
      <span class="col-rank">순위</span>
      <span class="col-name">플레이어</span>
      <span class="col-time">완료 시각</span>
      <span class="col-attempt">시도 횟수</span>
    </div>
    <ul class="lb-list__items">
      <LeaderboardRow
        v-for="entry in entries"
        :key="entry.nickname"
        :entry="entry"
        :rank="entry.rank"
        :is-me="entry.nickname === currentUserNickname"
      />
    </ul>
  </section>
</template>

<script setup>
import LeaderboardRow from "./LeaderboardRow.vue";

const props = defineProps({
  entries: {
    type: Array,
    default: () => [],
  },
  currentUserNickname: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.lb-list {
  background-color: #f9fafb;
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.15);

  &__header {
    display: flex;
    align-items: center;
    padding: 0 1.2rem 0.6rem; // Match row padding precisely
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--color-text-muted);
    border-bottom: 2px solid #e2e8f0;
    margin-bottom: 0.5rem;

    .col-rank { width: 60px; text-align: center; }
    .col-name { flex: 1; padding-left: 0.9rem; }
    .col-time { width: 120px; text-align: center; }
    .col-attempt { width: 100px; text-align: center; }
  }

  &__items {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}

@media (max-width: 640px) {
  .lb-list__header {
    display: none;
  }
}
</style>
