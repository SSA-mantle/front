import signInResponse from './api-docs/api-docs/auth/sign-in-response.json';
import signUpResponse from './api-docs/api-docs/users/sign-up-response.json';
import signUpResponseDuplicate from './api-docs/api-docs/users/sign-up-response-duplicate-email.json';
import getMyInfoResponse from './api-docs/api-docs/users/get-my-info-response.json';
import refreshResponse from './api-docs/api-docs/auth/refresh-response.json';
import signInInvalidResponse from './api-docs/api-docs/auth/sign-in-response-invalid-credentials.json';
import guessResponseCorrect from '../../docs/api-docs/api-docs/games/guess-response-correct.json';
import guessResponseWrong from '../../docs/api-docs/api-docs/games/guess-response-wrong.json';
import giveUpResponse from '../../docs/api-docs/api-docs/games/give-up-response.json';


// Simple delay function to simulate network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory mock database
let mockUser = { ...getMyInfoResponse.data };

export const mockHandler = async (config) => {
  await delay(500); // Simulate 500ms delay

  const { method, url, data } = config;
  console.log(`[Mock API] ${method.toUpperCase()} ${url}`, data);

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
      
      // Update mock user email on login (for consistency if we had multiple users)
      // For now, allow any login to succeed as the "current" mock user
      return { data: signInResponse, status: 200 };
  }

  if (url === '/users/sign-up' && method === 'post') {
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
      mockUser = {
          ...mockUser,
          email,
          nickname: nickname || 'New User',
          userId: Date.now()
      };
      
      return { data: signUpResponse, status: 200 };
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
  
  if (url === '/auth/refresh' && method === 'post') {
      return { data: refreshResponse, status: 200 };
  }

  if (url === '/users/me' && method === 'put') {
      const { nickname, password } = JSON.parse(data);
      
      // Update mockUser
      if (nickname) mockUser.nickname = nickname;
      // We don't store password in mockUser for safety/realism, but we acknowledge it
      
      // Return updated info (simulating response)
      return {
          data: {
              success: true,
              data: { ...mockUser, message: "유저 정보가 성공적으로 수정되었습니다." },
              error: null
          },
          status: 200
      };
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
              ...guessResponseWrong,
              data: { 
                  ...guessResponseWrong.data, 
                  word, 
                  failCount: (failCount || 0) + 1,
                  similarity: (Math.random() * 100).toFixed(2), // TODO: 실제 백엔드 연동 시 제거
                  rank: Math.floor(Math.random() * 1000) + 1    // TODO: 실제 백엔드 연동 시 제거
              }
          }, 
          status: 200 
      };
  }

  if (url === '/games/give-up' && method === 'post') {
      return { data: giveUpResponse, status: 200 };
  }

  // Default: 404
  console.warn(`[Mock API] Unhandled Request: ${method} ${url}`);
  return Promise.reject({
      response: { status: 404, data: { message: "Mock endpoint not found" } }
  });
};
