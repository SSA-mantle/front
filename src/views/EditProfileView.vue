<!-- src/views/EditProfileView.vue -->
<template>
  <div class="page">
    <AppHeader />

    <main class="page__content edit-profile">
      <div class="edit-profile__container">
        <!-- Header -->
        <div class="edit-profile__header">
          <div class="icon-wrapper">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
              </svg>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 gear">
              <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 5.389c-.02.12-.106.152-.192.201l-2.415.854c-.12.043-.21.063-.326.063-.413 0-.827-.15-1.17-.461L2.83 4.19a1.875 1.875 0 0 0-2.652 2.652l1.857 2.118c.31.343.46.757.46 1.17 0 .117-.02.207-.063.327l-.854 2.414c-.05.087-.082.173-.202.193L-.073 14.77c-.904.152-1.567.934-1.567 1.85 0 .917.663 1.699 1.567 1.85l1.545.253c.12.02.152.106.201.192l.854 2.415c.043.12.063.21.063.326 0 .413-.15.827-.461 1.17l-2.118 1.857a1.875 1.875 0 0 0 2.652 2.652l2.118-1.857c.343-.31.757-.46 1.17-.46.117 0 .207.02.327.063l2.414.854c.087.05.173.082.193.202l.253 1.545c.152.904.934 1.567 1.85 1.567.917 0 1.699-.663 1.85-1.567l.253-1.545c.02-.12.106-.152.192-.201l2.415-.854c.12-.043.21-.063.326-.063.413 0 .827.15 1.17.461l2.118 1.857a1.875 1.875 0 0 0 2.652-2.652l-1.857-2.118c-.31-.343-.46-.757-.46-1.17 0-.117.02-.207.063-.327l.854-2.414c.05-.087.082-.173.202-.193l1.545-.253c.904-.152 1.567-.934 1.567-1.85 0-.917-.663-1.699-1.567-1.85l-1.545-.253c-.12-.02-.152-.106-.201-.192l-.854-2.415c-.043-.12-.063-.21-.063-.326 0-.413.15-.827.461-1.17l2.118-1.857a1.875 1.875 0 0 0-2.652-2.652l-2.118 1.857c-.343.31-.757.46-1.17.46-.117 0-.207-.02-.327-.063l-2.414-.854c-.087-.05-.173-.082-.193-.202L12.928 2.25Z" clip-rule="evenodd" />
            </svg>
          </div>
          <h1 class="edit-profile__title">회원 정보 수정</h1>
        </div>

        <!-- Form -->
        <form @submit.prevent="saveChanges" class="edit-profile__form">
          <!-- Nickname -->
          <div class="form-group">
            <label for="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              v-model="form.nickname"
              class="form-input"
            />
          </div>

          <!-- New Password -->
          <div class="form-group">
            <label for="new-password">새 비밀번호</label>
            <input
              type="password"
              id="new-password"
              v-model="form.newPassword"
              placeholder="변경할 비밀번호를 입력하세요"
              class="form-input"
            />
            <p class="help-text">비밀번호를 변경하지 않으려면 비워두세요</p>
          </div>

          <!-- Confirm New Password (Conditional) -->
          <div class="form-group" v-if="form.newPassword">
            <label for="confirm-password">새 비밀번호 확인</label>
            <input
              type="password"
              id="confirm-password"
              v-model="form.confirmPassword"
              :class="['form-input', { 'error': !isPasswordMatch && form.confirmPassword }]"
              placeholder="새 비밀번호를 다시 입력하세요"
            />
            <p v-if="!isPasswordMatch && form.confirmPassword" class="error-msg">비밀번호가 일치하지 않습니다.</p>
          </div>

          <!-- API Error Message -->
          <p v-if="apiErrorMessage" class="api-error-msg">{{ apiErrorMessage }}</p>

          <!-- Actions -->
          <div class="form-actions">
            <button type="button" class="btn btn-cancel" @click="cancelEdit">취소</button>
            <button type="submit" class="btn btn-save" :disabled="isSubmitting">
              {{ isSubmitting ? '저장 중...' : '저장하기' }}
            </button>
          </div>
        </form>

        <hr class="divider" />

        <!-- Delete Account Section -->
        <section class="delete-section">
          <div class="delete-header">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon-warning">
              <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
            </svg>
            <h2>회원 탈퇴</h2>
          </div>
          <p class="delete-desc">탈퇴하시면 모든 게임 기록과 업적이 삭제되며 복구할 수 없습니다.</p>
          <button type="button" class="btn btn-delete" @click="showDeleteModal = true">회원 탈퇴</button>
        </section>
      </div>
    </main>

    <!-- Delete Modal -->
    <BaseModal
      :isOpen="showDeleteModal"
      title="회원 탈퇴"
      @close="showDeleteModal = false"
    >
      <div class="modal-content">
        <p>
          지금까지 <span class="highlight">{{ form.nickname }}</span> 님이 이루신<br/>
          모든 기록이 삭제됩니다!<br/>
          정말 <span style="color: #ef4444; font-weight: 800;">탈퇴</span>하시겠습니까?
        </p>
      </div>
      <template #footer>
        <button class="btn-cancel-modal" @click="showDeleteModal = false">취소</button>
        <button class="btn-delete-confirm" @click="confirmDelete">탈퇴하기</button>
      </template>
    </BaseModal>

    <!-- Generic Info Modal -->
    <BaseModal
      :isOpen="infoModal.isOpen"
      :title="infoModal.title"
      @close="closeInfoModal"
    >
      <p v-html="infoModal.message"></p>
      <template #footer>
        <button class="modal-confirm-btn" @click="closeInfoModal">확인</button>
      </template>
    </BaseModal>

    <!-- Confirm Modal -->
    <BaseModal
      :isOpen="confirmModal.isOpen"
      :title="confirmModal.title"
      @close="confirmModal.isOpen = false"
    >
      <p>{{ confirmModal.message }}</p>
      <template #footer>
        <button class="btn-cancel-modal" @click="confirmModal.isOpen = false">취소</button>
        <button
          :class="confirmModal.isDanger ? 'modal-confirm-btn--danger' : 'modal-confirm-btn'"
          @click="handleConfirm"
        >
          {{ confirmModal.confirmText || '확인' }}
        </button>
      </template>
    </BaseModal>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import BaseModal from "@/components/common/BaseModal.vue";

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  nickname: "",
  newPassword: "",
  confirmPassword: "",
});

const showDeleteModal = ref(false);
const apiErrorMessage = ref("");
const isSubmitting = ref(false);

const infoModal = ref({
  isOpen: false,
  title: "",
  message: "",
  onClose: null
});

const confirmModal = ref({
  isOpen: false,
  title: "",
  message: "",
  confirmText: "확인",
  isDanger: false,
  onConfirm: null
});

const showAlert = (title, message, onClose = null) => {
  infoModal.value = { isOpen: true, title, message, onClose };
};

const showConfirm = (options) => {
  confirmModal.value = {
    isOpen: true,
    title: options.title || "",
    message: options.message || "",
    confirmText: options.confirmText || "확인",
    isDanger: options.isDanger || false,
    onConfirm: options.onConfirm || null
  };
};

const closeInfoModal = () => {
  infoModal.value.isOpen = false;
  if (infoModal.value.onClose) infoModal.value.onClose();
};

const handleConfirm = () => {
  confirmModal.value.isOpen = false;
  if (confirmModal.value.onConfirm) confirmModal.value.onConfirm();
};

// Load user data into form
watch(() => authStore.user, (newUser) => {
    if (newUser) {
        form.value.nickname = newUser.nickname || "";
    }
}, { immediate: true });

onMounted(async () => {
  if (!authStore.user) {
    await authStore.fetchUser();
  }
});

const isPasswordMatch = computed(() => {
  if (!form.value.newPassword) return true;
  return form.value.newPassword === form.value.confirmPassword;
});

const cancelEdit = () => {
  showConfirm({
    title: "수정 취소",
    message: "수정을 취소하시겠습니까?",
    onConfirm: () => {
      router.push("/mypage");
    }
  });
};

const saveChanges = async () => {
  if (form.value.newPassword && !isPasswordMatch.value) {
    showAlert("오류", "새 비밀번호가 일치하지 않습니다.");
    return;
  }

  apiErrorMessage.value = "";

  showConfirm({
    title: "회원 정보 수정",
    message: "회원 정보를 수정하시겠습니까?",
    onConfirm: async () => {
      isSubmitting.value = true;
      try {
        const payload = {
          nickname: form.value.nickname,
        };
        if (form.value.newPassword) {
          payload.password = form.value.newPassword;
        }

        const success = await authStore.updateProfile(payload);

        if (success) {
          showAlert("수정 완료", "회원 정보가 수정되었습니다", () => {
            router.push("/mypage");
          });
        }
      } catch (error) {
         console.error(error);
         if (error.response && error.response.data && error.response.data.error) {
            apiErrorMessage.value = error.response.data.error.message;
         } else {
            apiErrorMessage.value = "이미 사용 중인 닉네임이거나 정보 수정에 실패했습니다.";
         }
      } finally {
        isSubmitting.value = false;
      }
    }
  });
};

const confirmDelete = () => {

    showDeleteModal.value = false;
    showAlert("탈퇴 완료", "회원 탈퇴가 완료되었습니다... <br>Good Bye...", () => {
      authStore.logout();
      router.push("/");
    });
};
</script>

<style lang="scss" scoped>
.edit-profile {
  display: flex;
  justify-content: center;
  padding: 2rem 1.5rem;

  &__container {
    background: white;
    width: 100%;
    max-width: 600px;
    padding: 2rem;
    border-radius: 1rem;
    // box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); // Optional: if we want a card look, but image matches 'MyPage' cleaner look
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
    gap: 0.5rem;

    .icon-wrapper {
        position: relative;
        color: #3b82f6;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;

        .gear {
            position: absolute;
            bottom: -2px;
            right: -2px;
            width: 1.25rem;
            height: 1.25rem;
            background: white;
            border-radius: 50%;
        }
    }

    .edit-profile__title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #111827;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      label {
        font-weight: 600;
        font-size: 0.95rem;
        color: #374151;
      }

      .form-input {
        padding: 0.75rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.75rem;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.2s;

        &:focus {
          border-color: #3b82f6;
        }

        &::placeholder {
           color: #9ca3af;
        }

        &.error {
            border-color: #ef4444;
        }
      }

      .help-text {
        font-size: 0.85rem;
        color: #6b7280;
      }

      .error-msg {
        font-size: 0.85rem;
        color: #ef4444;
      }
    }

    .api-error-msg {
      margin: 0;
      font-size: 0.9rem;
      font-weight: 700;
      color: #ef4444;
      text-align: center;
      background-color: #fef2f2;
      padding: 0.75rem;
      border-radius: 0.75rem;
      border: 1px solid #fee2e2;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;

      .btn {
        flex: 1;
        padding: 0.75rem;
        border-radius: 0.75rem;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        border: none;
      }

      .btn-cancel {
        background-color: #f3f4f6;
        color: #374151;
        &:hover { background-color: #e5e7eb; }
      }

      .btn-save {
        background-color: #3b82f6;
        color: white;
        &:hover { background-color: #2563eb; }
      }
    }
  }

  .divider {
    border: 0;
    height: 1px;
    background: #e5e7eb;
    margin: 2rem 0;
  }

  .delete-section {
    .delete-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;

      .icon-warning {
        width: 1.5rem;
        height: 1.5rem;
        color: #ef4444;
      }

      h2 {
        font-size: 1.1rem;
        font-weight: 700;
        color: #111827;
        margin: 0;
      }
    }

    .delete-desc {
      color: #4b5563;
      font-size: 0.95rem;
      margin-bottom: 1rem;
    }

    .btn-delete {
      padding: 0.75rem 1.5rem;
      border: 1px solid #fee2e2;
      background-color: #fef2f2;
      color: #ef4444;
      border-radius: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: #fee2e2;
      }
    }
  }
}


  .modal-content {
    margin-bottom: 2rem;

    p {
      color: #4b5563;
      font-size: 1.1rem;
      line-height: 1.6;
      word-break: keep-all;

      .highlight {
        color: #3b82f6;
        font-weight: 700;
      }
    }
  }

  .btn-cancel-modal {
    background-color: #f3f4f6;
    color: #374151;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 1rem;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    &:hover { background-color: #e5e7eb; }
  }

  .btn-delete-confirm {
    background-color: #ef4444;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 1rem;
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    &:hover { background-color: #dc2626; }
  }

// Mobile
@media (max-width: 640px) {
    .edit-profile__container {
        padding: 1.5rem;
    }
}
</style>
