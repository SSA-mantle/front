import signInResponse from '../../docs/api-docs/auth/sign-in-response.json';
import signUpResponse from '../../docs/api-docs/users/sign-up-response.json';
import signUpResponseDuplicate from '../../docs/api-docs/users/sign-up-response-duplicate-email.json';
import getMyInfoResponse from '../../docs/api-docs/users/get-my-info-response.json';
import refreshResponse from '../../docs/api-docs/auth/refresh-response.json';
import signInInvalidResponse from '../../docs/api-docs/auth/sign-in-response-invalid-credentials.json';
import guessResponseCorrect from '../../docs/api-docs/games/guess-response-correct.json';
import guessResponseWrong from '../../docs/api-docs/games/guess-response-wrong.json';
import giveUpResponse from '../../docs/api-docs/games/give-up-response.json';
import myStatisticsResponse from '../../docs/api-docs/users/get-my-statistics-response.json';
import todayHistoryResponse from '../../docs/api-docs/games/answer-history-today-response.json';
import yesterdayHistoryResponse from '../../docs/api-docs/games/answer-history-yesterday-response.json';
import leaderboardResponse from '../../docs/api-docs/leaderboard/get-leaderboard-response.json';


// Simple delay function to simulate network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory mock database with simple sessionStorage persistence for refreshes
const STORAGE_KEY = 'ssa-mantle-mock-user';
const getInitialUser = () => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { ...getMyInfoResponse.data };
};

let mockUser = getInitialUser();

const saveMockUser = (user) => {
    mockUser = user;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const mockHandler = async (config) => {
  await delay(500); // Simulate 500ms delay

  const { method, data, params } = config;

  // Robust URL matching: get the path relative to the API base
  let url = config.url;
  // Strip protocol and domain if present
  if (url.startsWith('http')) {
      const urlObj = new URL(url);
      url = urlObj.pathname;
  }
  // Strip baseURL prefix (e.g., /api/v1)
  const baseURL = config.baseURL || '';
  if (url.startsWith(baseURL)) {
      url = url.substring(baseURL.length);
  }
  // Ensure it starts with /
  if (!url.startsWith('/')) url = '/' + url;

  console.log(`[Mock API] ${method.toUpperCase()} ${url}`, { data, params });

  // --- Auth & User ---
  if (url === '/auth/sign-in' && method === 'post') {
      const { email, password } = JSON.parse(data);
      // Simulate Wrong Password
      if (password === 'wrong') {
          return Promise.reject({
             response: {
                 status: 401,
                 data: signInInvalidResponse
             }
         });
      }

      // Update mock user on login, preserving nickname if possible
      const updatedUser = {
          ...mockUser,
          email,
          nickname: mockUser.nickname && mockUser.nickname !== 'user123'
                    ? mockUser.nickname
                    : (email.split('@')[0] || 'user123')
      };
      saveMockUser(updatedUser);

      // Return response matching the current mockUser
      const dynamicSignInResponse = {
          ...signInResponse,
          data: {
              ...signInResponse.data,
              email: updatedUser.email,
              nickname: updatedUser.nickname,
              userId: updatedUser.userId
          }
      };

      return { data: dynamicSignInResponse, status: 200 };
  }

  // POST /api/v1/users
  if (url === '/users' && method === 'post') {
      const { email, nickname } = JSON.parse(data);
      if (email === 'wrong') {
          return Promise.reject({
               response: {
                   status: 409,
                   data: signUpResponseDuplicate
               }
           });
      }

      // Update in-memory user to simulate successful signup
      const newUser = {
          ...mockUser,
          email,
          nickname: nickname || 'New User',
          userId: Date.now()
      };
      saveMockUser(newUser);

      // Return response matching the new user
      const dynamicSignUpResponse = {
          ...signUpResponse,
          data: {
              ...signUpResponse.data,
              userId: newUser.userId,
              email: newUser.email,
              nickname: newUser.nickname
          }
      };

      return { data: dynamicSignUpResponse, status: 200 };
  }

  if (url === '/users/me' && method === 'get') {
      // Return the current state of mockUser
      return {
          data: {
              success: true,
              data: mockUser,
              error: null
          },
          status: 200
      };
  }

  // PATCH /api/v1/users/me
  if (url === '/users/me' && method === 'patch') {
      const { nickname, password } = JSON.parse(data);

      // Update mockUser
      const updatedUser = { ...mockUser };
      if (nickname) updatedUser.nickname = nickname;
      saveMockUser(updatedUser);

      // Return updated info (simulating response)
      return {
          data: {
              success: true,
              data: { ...updatedUser, message: "유저 정보가 성공적으로 수정되었습니다." },
              error: null
          },
          status: 200
      };
  }

  if (url === '/users/me/statistics' && method === 'get') {
      return { data: myStatisticsResponse, status: 200 };
  }

  if (url === '/auth/refresh' && method === 'post') {
      return { data: refreshResponse, status: 200 };
  }

  // --- Games ---
  if (url === '/games/guess' && method === 'post') {
      const { word, failCount } = JSON.parse(data);

      // '사과'를 입력하면 정답 처리
      if (word === '사과') {
          return {
              data: {
                  ...guessResponseCorrect,
                  data: { ...guessResponseCorrect.data, failCount: (failCount || 0) + 1 }
              },
              status: 200
          };
      }

      // 그 외에는 오답 처리 (유사도/순위는 일단 고정값 반환)
      return {
          data: {
              success: true,
              data: {
                  ...guessResponseWrong.data,
                  word,
                  failCount: (failCount || 0) + 1,
                  similarity: (Math.random() * 100).toFixed(2),
                  rank: Math.floor(Math.random() * 1000) + 1
              },
              error: null
          },
          status: 200
      };
  }

  if (url === '/games/give-up' && method === 'post') {
      return { data: giveUpResponse, status: 200 };
  }

  if (url === '/games/answer-history/today' && method === 'get') {
      return { data: todayHistoryResponse, status: 200 };
  }

  if (url === '/games/answer-history/yesterday' && method === 'get') {
      return { data: yesterdayHistoryResponse, status: 200 };
  }

  // --- Leaderboard ---
  if (url === '/leaderboard' && method === 'get') {
      const dateParam = params?.date || 'today';
      console.log(`[Mock API] Leaderboard for: ${dateParam}`);
      return { data: leaderboardResponse, status: 200 };
  }

  // Default: 404
  console.warn(`[Mock API] Unhandled Request: ${method} ${url}`);
  return Promise.reject({
      response: { status: 404, data: { message: "Mock endpoint not found" } }
  });
};
