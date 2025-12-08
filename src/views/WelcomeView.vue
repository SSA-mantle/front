<template>
  <div class="welcome">
    <div class="welcome__container">
      <!-- 왼쪽 브랜드 영역 -->
      <div class="welcome__left">
        <WelcomeBrand />
      </div>

      <!-- 오른쪽: 로그인 / 회원가입 카드 -->
      <div class="welcome__right">
        <LoginForm
          v-if="mode === 'login'"
          @login-success="handleLoginSuccess"
          @switch-to-signup="mode = 'signup'"
        />
        <SignupForm
          v-else
          @signup-success="handleSignupSuccess"
          @switch-to-login="mode = 'login'"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import WelcomeBrand from "@/components/welcome/WelcomeBrand.vue";
import LoginForm from "@/components/auth/LoginForm.vue";
import SignupForm from "@/components/auth/SignupForm.vue";

const router = useRouter();

// login / signup 모드 전환
const mode = ref("login");

const handleLoginSuccess = () => {
  // TODO: 나중에 실제 로그인 연동 (Pinia + API)
  router.push({ name: "main" });
};

const handleSignupSuccess = () => {
  // TODO: 나중에 실제 회원가입 연동
  // 지금은 가입 성공했다고 가정하고 로그인 화면으로 전환
  mode.value = "login";
};
</script>

<style lang="scss" scoped>
.welcome {
  min-height: 100vh;
  background: linear-gradient(120deg, #2563eb 0%, #0ea5e9 60%, #1fb3ff 100%);
  display: flex;
}

.welcome__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 시안처럼 왼쪽이 너무 넓지 않게 비율 조정 */
.welcome__left {
  flex: 0 0 45%;
}

.welcome__right {
  flex: 0 0 40%;
  display: flex;
  justify-content: flex-end;
}

/* 반응형 */
@media (max-width: 960px) {
  .welcome__container {
    flex-direction: column;
    padding: 2rem 1.5rem;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
  }

  .welcome__left {
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    flex: none;
  }

  .welcome__right {
    width: 100%;
    justify-content: center;
    flex: none;
  }
}
</style>
