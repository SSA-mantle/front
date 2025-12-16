<!-- src/views/EditProfileView.vue -->
<template>
  <div class="page">
    <AppHeader />

    <main class="page__content edit-profile">
      <div class="edit-profile__header">
        <h1 class="edit-profile__title">회원 정보 수정</h1>
        <router-link to="/mypage" class="btn-back">
          &larr; 마이페이지로 돌아가기
        </router-link>
      </div>
      
      <div class="edit-profile__placeholder">
        <p>회원 정보 수정 페이지입니다.</p>
        <p class="sub-text">(추후 구현 예정)</p>
      </div>
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
  max-width: 800px;
  margin: 1.5rem auto 4rem;
  padding: 0 1.5rem;

  &__header {
    margin-bottom: 2rem;
  }

  &__title {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--color-text-heading);
  }

  .btn-back {
    display: inline-block;
    color: var(--color-primary);
    font-weight: 500;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  &__placeholder {
    background: white;
    padding: 3rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    text-align: center;
    border: 1px solid var(--color-border);
    
    p {
      font-size: 1.25rem;
      color: var(--color-text-heading);
      margin-bottom: 0.5rem;
    }

    .sub-text {
      font-size: 1rem;
      color: var(--color-text-muted);
    }
  }
}
</style>
