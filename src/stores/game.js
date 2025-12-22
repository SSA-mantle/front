import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { guessWord, giveUpGame, getTodayHistory } from '@/api/game';

export const useGameStore = defineStore('game', () => {
  // --- State ---
  const guesses = ref([]); // 추측 단어 리스트: { word, similarity, rank, isCorrect }
  const status = ref('playing'); // 'playing', 'success', 'giveup'
  const answer = ref(null); // 정답 단어 (게임 종료 시)
  const answerDescription = ref(null); // 정답 단어 설명
  const top100Words = ref([]); // 유사도 상위 100개 단어
  const failCount = computed(() => guesses.value.length);
  const gameDate = ref(new Date().toISOString().split('T')[0]); // 오늘 날짜 (YYYY-MM-DD)

  // --- Persistence ---
  const STORAGE_KEY = 'ssa-mantle-game-state';

  const saveToLocalStorage = () => {
    const state = {
      guesses: guesses.value,
      status: status.value,
      answer: answer.value,
      answerDescription: answerDescription.value,
      top100Words: top100Words.value,
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
        answerDescription.value = state.answerDescription || null;
        top100Words.value = state.top100Words || [];
        gameDate.value = state.gameDate;

        // 정렬 보장
        guesses.value.sort((a, b) => {
            if (a.isCorrect) return -1;
            if (b.isCorrect) return 1;
            return (b.similarity || 0) - (a.similarity || 0);
        });
      } else {
        resetGame();
      }
    }
  };

  const resetGame = () => {
    guesses.value = [];
    status.value = 'playing';
    answer.value = null;
    answerDescription.value = null;
    top100Words.value = [];
    gameDate.value = new Date().toISOString().split('T')[0];
    saveToLocalStorage();
  };

  // --- Actions ---

  // 초기화 (App 진입 또는 로그인 시 호출)
  const initializeGame = async () => {
    // 1. 로컬 스토리지 데이터 로드
    loadFromLocalStorage();
    
    // TODO : 백앤드에서 상태 정보 받아온 이후 로직 처리
  
    // // 2. 로컬 상태가 'playing'인 경우, 서버에 이미 종료된 기록이 있는지 한 번 더 확인
    // // (기기 변경이나 새로고침 시 데이터 유실을 방지하기 위함)
    // if (status.value === 'playing') {
    //   try {
    //     const result = await fetchTodayHistory();
    //     if (result && result.answer) {
    //       // 서버에 데이터가 존재한다면 이미 성공(또는 포기)하여 종료된 상태임
    //       status.value = 'success';
    //       answer.value = result.answer;
    //       saveToLocalStorage();
    //     }
    //   } catch (error) {
    //     // 기록이 없는 경우(신규 게임)는 에러를 무시하고 진행
    //   }
    // }
  };

  const submitGuess = async (word) => {
    if (status.value !== 'playing') return;

    // 중복 체크
    if (guesses.value.some((g) => g.word === word)) {
      throw new Error('이미 시도한 단어입니다.');
    }

    try {
      const res = await guessWord(word, failCount.value);
      const result = res.data;

      // 새 추측 결과 추가
      const newGuess = {
        word: result.word,
        similarity: result.similarity,
        rank: result.rank,
        isCorrect: result.isCorrect,
        attempt: failCount.value + 1,
      };

      // 정렬 logic: 정답 우선, 그 다음 유사도 높은 순
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
      const res = await giveUpGame();
      const result = res.data;

      status.value = 'giveup';
      answer.value = result.answer;

      saveToLocalStorage();
      return result;
    } catch (error) {
      console.error('Give up failed:', error);
      throw error;
    }
  };

  const fetchTodayHistory = async () => {
    try {
      const res = await getTodayHistory();
      const result = res.data;
      top100Words.value = result.top100Words || [];
      answerDescription.value = result.description || null;
      saveToLocalStorage();
      return result;
    } catch (error) {
      console.error('Failed to fetch today history:', error);
    }
  };

  return {
    guesses,
    status,
    answer,
    answerDescription,
    top100Words,
    failCount,
    initializeGame,
    submitGuess,
    giveUp,
    fetchTodayHistory,
    resetGame,
  };
});
