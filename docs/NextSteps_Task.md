# 개발 진행 상황 및 투두 리스트

## ✅ 완료된 작업 (Phase 2: 인증)
- [x] **Mock API 인프라**
    - `git add api/index.js mockHandlers.js .env.example`
- [x] **닉네임 기능 및 회원가입**
    - `git add SignupForm.vue MyPageView.vue`
- [x] **로그인 및 인증 로직**
    - `git add LoginForm.vue stores/auth.js api/auth.js`
- [x] **사용자 정보 수정 (User Update)**
    - `git add EditProfileView.vue` (닉네임 수정 기능)
- [x] **라우터 가드 & 보안**
    - `git add router/index.js App.vue`

---

## 🚀 다음 세션 목표 (Phase 3: 게임 로직)

### 1. 게임 스토어 및 편의 기능 (우선순위 높음)
- [ ] **Game Store 구현 (`stores/game.js`)**
    - [ ] `words` 배열 상태 관리
    - [ ] `submitGuess` 액션 구현
- [ ] **로컬 스토리지 연동**
    - [ ] 입력 내역 저장 및 불러오기
    - [ ] 로그인 시 날짜 확인 후 만료된(어제) 기록 삭제
- [ ] **중복 검사 로직**
    - [ ] 입력 시 중복 체크 -> 에러 메시지(빨강) 출력 및 제출 방지

### 2. API 연동 및 데이터 처리
- [ ] **Mock 데이터 보완 (Top 100)**
    - [ ] `mockHandlers.js`의 `/games/guess`, `/games/give-up` 응답에 `topWords` 더미 데이터 추가
- [ ] **게임 API 연결 (`api/game.js` 신설)**
    - [ ] 단어 추측: `POST /games/guess`
    - [ ] 포기하기: `POST /games/give-up`

### 3. UI 구현 및 개선
- [ ] **입력 폼 개선 (`DailyChallengeCard.vue`)**
    - [ ] 중복 경고 UI, 유효성 검사 시각화
- [ ] **추측 히스토리 리스트**
    - [ ] 유사도 높은 순 정렬 표시
    - [ ] [단어 / 유사도 / 순위] 컴포넌트 디자인
- [ ] **결과 화면 (모달/확장영역)**
    - [ ] 정답 공개 및 Top 100 리스트 렌더링
