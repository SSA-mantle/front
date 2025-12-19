<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

onMounted(async () => {
    // 초기 로딩 시 유저 정보 복구 (토큰이 유효한 경우)
    if (localStorage.getItem('accessToken')) {
        await authStore.fetchUser();
    }
});
</script>

<template>
  <router-view />
</template>

<style></style>
