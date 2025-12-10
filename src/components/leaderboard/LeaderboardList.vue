<template>
  <section class="lb-list">
    <ul class="lb-list__items">
      <LeaderboardRow
        v-for="(entry, index) in entries"
        :key="entry.id"
        :entry="entry"
        :rank="index + 1"
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
});
</script>

<style lang="scss" scoped>
.lb-list {
  background-color: #f9fafb;
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.15);

  &__items {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
