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

## ✅ 완료된 작업 (Phase 3: 게임 로직)
- [x] **Game Store 구현 (`stores/game.js`)**
    - [x] `words` 배열 상태 관리
    - [x] `submitGuess` 액션 구현
- [x] **로컬 스토리지 연동**
    - [x] 입력 내역 저장 및 불러오기
    - [x] 로그인 시 날짜 확인 후 만료된(어제) 기록 삭제
- [x] **중복 검사 로직**
    - [x] 입력 시 중복 체크 -> 에러 메시지(빨강) 출력 및 제출 방지
- [x] **API 연동 및 데이터 처리**
    - [x] `mockHandlers.js`의 `/games/guess`, `/games/give-up` 연동
    - [x] 게임 API 연결 (`api/game.js` 신설)
- [x] **UI 구현 및 개선**
    - [x] 입력 폼 개선 (`DailyChallengeCard.vue`)
    - [x] 추측 히스토리 리스트 (`GuessSummaryCard.vue`)

---

## 🚀 다음 세션 목표 (Phase 4: UI/UX 고도화)

### 1. 결과 화면 고도화 (우선순위 높음)
- [ ] **Top 100 리스트 컴포넌트 (`TopWordsList.vue`)**
    - [ ] 결과 데이터 바인딩 및 유사도 순 정렬 표시
- [ ] **결과 공유 (Share)**
    - [ ] 현재 기록 복사 기능 (Wordle 스타일)

### 2. 페이지 구현 (Mock Data 활용)
- [ ] **랭킹 페이지 (`LeaderboardView.vue`)**
    - [ ] 상단 랭커 하이라이트 UI 및 내 순위 표시
- [ ] **플레이 기록 페이지 (`HistoryView.vue`)**
    - [ ] 과거 플레이 결과 리스트 UI
- [ ] **마이페이지 통계**
    - [ ] 누적 플레이 횟수, 성공률 등 대시보드

### 3. 품질 및 최적화
- [ ] **반응형 디자인 및 애니메이션**
    - [ ] 모바일 레이아웃 최적화 및 Vue Transition 적용
