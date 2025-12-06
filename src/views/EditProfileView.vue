<!-- src/views/EditProfileView.vue -->
<template>
  <div class="edit-profile">
    <h1 class="edit-profile__title">회원 정보 수정</h1>
    <!-- TODO: EditProfileForm + 뒤로가기/탈퇴 버튼 등 -->
  </div>
</template>

<script setup>
// 나중에 "뒤로 가기" → router.push('mypage')
//       "회원 탈퇴" → router.push('welcome') 와 연동
</script>

<style lang="scss" scoped>
.edit-profile {
  padding: 2rem;

  &__title {
    font-size: 1.5rem;
    font-weight: 600;
  }
}
</style>
