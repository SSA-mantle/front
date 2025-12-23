import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { guessWord, giveUpGame, getTodayHistory, getGameStatus } from '@/api/game';

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

    // 2. 백엔드 상태 동기화
    try {
      const res = await getGameStatus();
      if (res.success && res.data) {
        const { status: serverStatus } = res.data;

        // 서버 상태에 따른 로컬 상태 업데이트
        if (serverStatus === 'SOLVED') {
           if (status.value !== 'success') {
             status.value = 'success';
             // 결과가 없으면 가져오기
             if (!answer.value) {
               await fetchTodayHistory();
             }
           }
        } else if (serverStatus === 'GAVE_UP') {
           if (status.value !== 'giveup') {
             status.value = 'giveup';
             // 결과가 없으면 가져오기
             if (!answer.value) {
               await fetchTodayHistory();
             }
           }
        } else {
           // NOT_STARTED or IN_PROGRESS
           // 로컬 상태가 이미 완료(success/giveup)인데 서버가 진행중이라면?
           // -> 서버가 Truth이므로 진행중으로 변경해야 하지만,
           //    보통은 서버가 완료면 로컬도 완료여야 함.
           //    일단 서버가 진행중이면 로컬도 playing으로.
           if (status.value !== 'playing') {
             // 뭔가 동기화가 안맞는 경우 (예: 로컬은 깼는데 서버 기록이 날아감? - 희박함)
             // 혹은 다른 기기에서 리셋함?
             status.value = 'playing';
             answer.value = null;
             top100Words.value = [];
           }
        }

        saveToLocalStorage();
      }
    } catch (error) {
      console.error("Failed to sync game status:", error);
      // 에러 발생 시 로컬 상태 유지 (오프라인 등)
    }
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
        // 정답을 맞추면 서버 상태도 SOLVED가 되었을 것임.
        // 상세 결과(Top100 등)를 위해 히스토리 호출
        await fetchTodayHistory();
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

      // 포기 후에도 결과 정보(Top 100 등)를 가져오기 위해 히스토리 호출
      await fetchTodayHistory();

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
      if (result) {
        if (result.answer) answer.value = result.answer;
        top100Words.value = result.top100Words || [];
        answerDescription.value = result.answerDescription || null; // API might not return description yet based on docs but let's keep logic
      }
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
