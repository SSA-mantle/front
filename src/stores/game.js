import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { guessWord, giveUpGame } from '@/api/game';

export const useGameStore = defineStore('game', () => {
  // --- State ---
  const guesses = ref([]); // 추측 단어 리스트: { word, similarity, rank, isCorrect }
  const status = ref('playing'); // 'playing', 'success', 'giveup'
  const answer = ref(null); // 정답 단어 (게임 종료 시)
  const failCount = computed(() => guesses.value.length);
  const gameDate = ref(new Date().toISOString().split('T')[0]); // 오늘 날짜 (YYYY-MM-DD)

  // --- Persistence ---
  const STORAGE_KEY = 'ssa-mantle-game-state';

  const saveToLocalStorage = () => {
    const state = {
      guesses: guesses.value,
      status: status.value,
      answer: answer.value,
      gameDate: gameDate.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const state = JSON.parse(saved);
      // 날짜가 같으면 복원, 다르면 초기화
      if (state.gameDate === new Date().toISOString().split('T')[0]) {
        guesses.value = state.guesses;
        status.value = state.status;
        answer.value = state.answer;
        gameDate.value = state.gameDate;
      } else {
        resetGame();
      }
    }
  };

  const resetGame = () => {
    guesses.value = [];
    status.value = 'playing';
    answer.value = null;
    gameDate.value = new Date().toISOString().split('T')[0];
    saveToLocalStorage();
  };

  // --- Actions ---

  // 초기화 (App 진입 또는 로그인 시 호출)
  const initializeGame = async () => {
    // TODO: 백엔드에 '오늘의 게임 상태 조회' API가 생기면 여기서 호출하여 동기화
    loadFromLocalStorage();
  };

  const submitGuess = async (word) => {
    if (status.value !== 'playing') return;

    // 중복 체크
    if (guesses.value.some((g) => g.word === word)) {
      throw new Error('이미 시도한 단어입니다.');
    }

    try {
      const response = await guessWord(word, failCount.value);
      const result = response.data.data;

      // 새 추측 결과 추가
      const newGuess = {
        word: result.word,
        similarity: result.similarity,
        rank: result.rank,
        isCorrect: result.isCorrect,
      };

      // 정렬 logic: 유사도 높은 순으로 내림차순 정렬 (정답이 최상단)
      // 실제 표시할 때는 UI에서 정렬할 수도 있지만, store에서 관리하는 것이 편함
      guesses.value.unshift(newGuess);
      guesses.value.sort((a, b) => {
          if (a.isCorrect) return -1;
          if (b.isCorrect) return 1;
          return (b.similarity || 0) - (a.similarity || 0);
      });

      if (result.isCorrect) {
        status.value = 'success';
        answer.value = result.answer;
      }

      saveToLocalStorage();
      return result;
    } catch (error) {
      console.error('Guess failed:', error);
      throw error;
    }
  };

  const giveUp = async () => {
    if (status.value !== 'playing') return;

    try {
      const response = await giveUpGame();
      const result = response.data.data;

      status.value = 'giveup';
      answer.value = result.answer;

      saveToLocalStorage();
      return result;
    } catch (error) {
      console.error('Give up failed:', error);
      throw error;
    }
  };

  return {
    guesses,
    status,
    answer,
    failCount,
    initializeGame,
    submitGuess,
    giveUp,
    resetGame,
  };
});
