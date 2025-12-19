<template>
  <div class="auth-card">
    <div class="auth-card__header">
      <div class="auth-card__icon">➜</div>
      <h2 class="auth-card__title">로그인</h2>
      <p class="auth-card__subtitle">게임을 시작하려면 로그인하세요.</p>
    </div>
    <form class="auth-card__form" @submit.prevent="onSubmit">
      <div class="auth-card__field">
        <label class="auth-card__label">아이디</label>
        <input
          v-model="userId"
          type="text"
          class="auth-card__input"
          placeholder="아이디를 입력해주세요"
        />
      </div>

      <div class="auth-card__field">
        <label class="auth-card__label">비밀번호</label>
        <input
          v-model="password"
          type="password"
          class="auth-card__input"
          placeholder="비밀번호를 입력해주세요"
        />
      </div>

      <p v-if="errorMessage" class="auth-card__error">
        {{ errorMessage }}
      </p>

      <button type="submit" class="auth-card__button">로그인</button>
    </form>

    <p class="auth-card__hint">
      계정이 없으신가요?
      <button type="button" class="auth-card__link" @click="switchToSignup">회원가입</button>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits(["login-success", "switch-to-signup"]);
const authStore = useAuthStore();

const userId = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const onSubmit = async () => {
  if (!userId.value || !password.value) {
    errorMessage.value = "아이디와 비밀번호를 모두 입력해주세요.";
    return;
  }

  errorMessage.value = "";
  isLoading.value = true;

  try {
    const success = await authStore.login(userId.value, password.value);
    if (success) {
      emit("login-success");
    } else {
      errorMessage.value = "로그인에 실패했습니다.";
    }
  } catch (error) {
    // API throws error (e.g. 401)
    if (error.response && error.response.data && error.response.data.error) {
       errorMessage.value = error.response.data.error.message;
    } else {
       errorMessage.value = "서버 오류가 발생했습니다.";
    }
  } finally {
    isLoading.value = false;
  }
};

const switchToSignup = () => {
  emit("switch-to-signup");
};
</script>

<style lang="scss" scoped>
.auth-card {
  width: 100%;
  max-width: 420px;
  border-radius: 1.6rem;
  padding: 2.3rem 2.5rem 2.1rem;
  background-color: #ffffff;

  /* 👉 입체감 있는 그림자 + 살짝 hover 효과 */
  box-shadow: 0 22px 45px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(148, 163, 184, 0.18);
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 26px 60px rgba(15, 23, 42, 0.45), 0 0 0 1px rgba(148, 163, 184, 0.22);
  }
  &__header {
    text-align: center;
    margin-bottom: 1.8rem;
  }
  &__icon {
    width: 50px;
    height: 50px;
    border-radius: 1.25rem;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f9fafb;
    font-size: 1.5rem;
    margin: 0 auto 1.3rem;
  }

  &__title {
    margin: 0;
    font-size: 1.7rem;
    font-weight: 800;
  }

  &__subtitle {
    margin: 0.4rem 0 1.8rem;
    font-size: 0.95rem;
    color: #6b7280;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.05rem;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  &__label {
    font-size: 0.85rem;
    color: #4b5563;
    font-weight: 500;
  }

  &__input {
    border-radius: 999px;
    border: 1px solid #d1d5db;
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    outline: none;
    transition: all 0.15s ease;

    &::placeholder {
      color: #9ca3af;
    }

    &:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.25);
    }
  }

  &__error {
    margin: -0.2rem 0 0;
    font-size: 0.8rem;
    color: #dc2626;
  }

  &__button {
    margin-top: 0.4rem;
    width: 100%;
    border: none;
    border-radius: 999px;
    padding: 0.85rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    background: linear-gradient(135deg, #2563eb, #4f46e5);
    cursor: pointer;
    transition: transform 0.08s ease, box-shadow 0.08s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 25px rgba(37, 99, 235, 0.4);
    }

    &:active {
      transform: translateY(0);
      box-shadow: none;
    }
  }

  &__hint {
    margin: 1.1rem 0 0;
    font-size: 0.85rem;
    color: #6b7280;
    text-align: center;
  }

  &__link {
    border: none;
    background: transparent;
    padding: 0;
    margin-left: 0.2rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: #2563eb;
    cursor: pointer;
  }
}
</style>
