<!-- src/views/FaqView.vue -->
<template>
  <div class="page">
    <AppHeader />

    <main class="page__content faq">
      <section class="faq__hero">
        <div class="faq__hero-title">
          <span class="faq__hero-highlight">자주 묻는 질문</span>
          <span class="faq__hero-suffix">Q&A</span>
        </div>
        <p class="faq__hero-description">
          SSA-mantle에 대해 <strong>궁금한 점</strong>을 확인해보세요.
        </p>
      </section>

      <div class="faq__list">
        <div 
          v-for="(item, index) in faqList" 
          :key="index" 
          class="faq__item"
          :class="{ 'is-open': item.isOpen }"
        >
          <button class="faq__question" @click="toggleFaq(index)">
            <span class="faq__question-text">{{ item.question }}</span>
            <span class="faq__arrow">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
          </button>
          <div class="faq__answer" v-show="item.isOpen">
            <div class="faq__answer-inner">
              {{ item.answer }}
            </div>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

const faqList = ref([
  {
    question: "SSA-mantle이 무엇인가요?",
    answer: "SSA-mantle은 숨겨진 단어를 추측하는 게임입니다. 입력한 단어와 정답 단어 사이의 의미적 유사도를 기반으로 힌트를 제공합니다.",
    isOpen: false
  },
  {
    question: "유사도는 어떻게 계산되나요?",
    answer: "Word2Vec과 같은 자연어 처리 모델을 사용하여 두 단어 사이의 코사인 유사도를 계산합니다.",
    isOpen: false
  },
  {
    question: "하루에 몇 번 플레이할 수 있나요?",
    answer: "플레이 횟수에 제한은 없습니다. 원하는 만큼 즐길 수 있습니다.",
    isOpen: false
  },
  {
    question: "순위는 어떻게 결정되나요?",
    answer: "정답을 맞추기까지 시도한 횟수가 적을수록 높은 순위를 기록합니다.",
    isOpen: false
  },
  {
    question: "포기하면 기록이 남나요?",
    answer: "네, 포기하더라도 해당 게임의 기록은 남습니다.",
    isOpen: false
  },
  {
    question: "어떤 단어를 입력할 수 있나요?",
    answer: "명사 위주의 단어를 입력하는 것을 권장합니다. 사전에 없는 단어는 입력되지 않을 수 있습니다.",
    isOpen: false
  },
  {
    question: "게임 팁이 있나요?",
    answer: "관련된 주제의 단어들을 다양하게 시도해보며 유사도가 높은 단어 주변을 탐색해보세요.",
    isOpen: false
  },
  {
    question: "회원가입은 필수인가요?",
    answer: "네, 회원가입은 필수입니다. 플레이 기록 저장 및 랭킹 등록을 위해서 회원가입이 필요합니다.",
    isOpen: false
  }
]);

const toggleFaq = (index) => {
  faqList.value[index].isOpen = !faqList.value[index].isOpen;
};
</script>

<style lang="scss" scoped>
.faq {
  width: 100%;
  max-width: 800px; 
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;

  &__hero {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
    margin-bottom: 2.5rem;
  }

  &__hero-title {
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 0.5rem;
  }

  &__hero-highlight {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    background: linear-gradient(135deg, var(--color-primary-600), var(--color-accent-purple));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  &__hero-suffix {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 700;
    color: var(--color-text-muted);
  }

  &__hero-description {
    margin: 0;
    font-size: 1.1rem;
    color: var(--color-text-body);
    line-height: 1.6;

    strong {
      color: var(--color-primary);
      font-weight: 700;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__item {
    background-color: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    border: 1px solid #e0e0e0;
    transition: box-shadow 0.2s;

    &:hover {
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }
  }

  &__question {
    width: 100%;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text, #333);
    transition: background-color 0.2s;

    &:hover {
      background-color: #f8f9fa;
    }
  }

  &__arrow {
    display: flex;
    align-items: center;
    color: #888;
    transition: transform 0.3s ease;
    
    .is-open & {
      transform: rotate(180deg);
    }
  }

  &__answer {
    // max-height transition을 위해 JS 애니메이션 혹은 충분한 max-height 설정 필요
    // 여기서는 간단하게 처리
    border-top: 1px solid #f0f0f0;
    background-color: #fafafa;
    
    &-inner {
      padding: 1.5rem;
      color: #666;
      line-height: 1.6;
      font-size: 0.95rem;
    }
  }
}
</style>
