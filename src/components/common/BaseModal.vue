<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-backdrop" @click.self="close">
        <div class="modal-container card">
          <div class="modal-header" v-if="title">
            <h3 class="modal-title">{{ title }}</h3>
          </div>

          <div class="modal-body">
            <slot></slot>
          </div>

          <div class="modal-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  width: 90%;
  max-width: 420px;
  background: var(--color-surface);
  border-radius: 32px; /* Very rounded corners like the reference */
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transform: translateY(0);
  text-align: center; /* Center everything by default */
}

.modal-header {
  text-align: center;
}

.modal-title {
  margin: 0;
  font-size: 1.6rem; /* Larger title */
  font-weight: 800; /* Bold */
  color: var(--color-text-heading);
  letter-spacing: -0.02em;
}

.modal-body {
  font-size: 1.05rem;
  color: var(--color-text-body);
  line-height: 1.6;
  padding: 0.5rem 0; /* Add some breathing room */
  font-weight: 500;
}

.modal-footer {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.5rem;

  /* Button styling helpers for slots */
  :deep(button) {
    flex: 1; /* Stretch buttons if multiple */
    padding: 0.9rem 1.5rem;
    border-radius: 999px; /* Pill shape */
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    border: none;
    transition: transform 0.1s, opacity 0.2s;
    
    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
}

/* Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
  
  .modal-container {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy pop effect */
  }
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  
  .modal-container {
    transform: scale(0.9);
  }
}
</style>
