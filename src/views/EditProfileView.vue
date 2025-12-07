<!-- src/views/EditProfileView.vue -->
<template>
  <div class="page">
    <AppHeader />

    <main class="page__content edit-profile">
      <h1 class="edit-profile__title">회원 정보 수정</h1>
      <!-- TODO: 프로필 수정 폼 -->
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
</script>

<style lang="scss" scoped>
.edit-profile {
  max-width: 1200px;
  margin: 1.5rem auto 2rem;
  padding: 0 1.5rem;

  &__title {
    font-size: 1.5rem;
    font-weight: 600;
  }
}
</style>
