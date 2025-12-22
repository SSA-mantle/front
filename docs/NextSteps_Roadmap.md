# 프로젝트 분석 및 로드맵

## 1. 프로젝트 구조 분석

### 도메인 및 목표
**"싸멘틀(SSA-mantle)"**: 싸피생들을 위한 의미 유사도 추측 게임 (Wordle 스타일 + Semantle).
- **현재 단계**: 인증(Authentication) 구현 완료. (Mock API 기반)
- **다음 단계**: 게임 로직 구현 및 백엔드 연동 준비.

### 기술 스택
- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **Styling**: SCSS (BEM 네이밍), 외부 UI 키트 금지 (Tailwind 사용 안함).
- **State**: Pinia (Auth Store 완료, Game Store 예정).
- **Build**: Vite.

---

## 2. 개발 로드맵 (진행 상황)

### ✅ [완료] Phase 2: 인증 및 사용자 관리 (Authentication)
**목표**: 더미 로직 제거 및 JWT 인증 시스템 구축 (Mock API 활용).

1.  **Mock API 인프라 구축**
    - `src/api/mockHandlers.js` 생성: 네트워크 지연(500ms) 및 에러 상황 시뮬레이션.
    - JSON 파일 기반 응답 처리 (성공/오류 케이스 완벽 연동).
    - `PUT /users/me` (회원 정보 수정) 핸들러 추가 구현.

2.  **회원 기능 구현**
    - **회원가입**: 닉네임, 이메일 중복 체크 포함.
    - **로그인**: `useAuthStore`를 통한 토큰 관리 및 세션 유지 (`localStorage`).
    - **회원 정보 수정**: 마이페이지에서 닉네임 수정 기능 구현 및 즉시 반영 (`PUT /users/me`).

3.  **보안 및 라우팅**
    - `router.beforeEach` 네비게이션 가드: 비로그인 사용자 접근 차단.
    - 로그아웃 기능 구현.

### ✅ [완료] Phase 3: 게임 로직 구현 (Game Logic)
**목표**: 클라이언트 측 랜덤 로직 제거 및 API 기반 게임 흐름 구현.

1.  **게임 스토어 (`stores/game.js`)**
    - 입력한 단어 리스트, 게임 상태(진행중/성공/실패) 상태 관리 완료.
    - 로컬 스토리지 연동하여 페이지 새로고침 시에도 기록 유지 구현.
    - 유사도 순 자동 정렬 로직 구현.

2.  **게임 API 연동**
    - `POST /games/guess` 및 `POST /games/give-up` 연동 완료 (Mock API).

3.  **UI 구현**
    - `DailyChallengeCard.vue`: 단어 입력, 중복 체크, 포기하기 기능 완료.
    - `GuessSummaryCard.vue`: 추측 히스토리 및 유사도 표시 완료.

### 🔜 [예정] Phase 4: UI/UX 고도화 및 부가 기능 (Polishing & Features)
**목표**: 게임의 완성도를 높이고 랭킹/히스토리 등 핵심 부가 기능 구현.

#### 1. 결과 화면 고도화
- **Top 100 리스트**: 정답/포기 시 해당 회차의 유사도 Top 100 단어 리스트를 보여주는 전용 컴포넌트(`TopWordsList.vue`) 구현.
- **결과 공유 기능**: 오늘 나의 기록을 텍스트/이미지로 복사하는 기능.

#### 2. 부가 서비스 페이지 구현 (Mock Data 기반)
- **랭킹 (`LeaderboardView.vue`)**: 전체 사용자 순위 및 내 순위 표시.
- **기록 (`HistoryView.vue`)**: 과거 플레이 기록 리스트 및 상세 보기.
- **마이페이지 (`MyPageView.vue`)**: 내 정보 시각화 및 통계(플레이 횟수, 성공률 등).

#### 3. UX/UI 폴리싱
- **애니메이션**: 단어 입력 시 리스트 추가 애니메이션, 정답 시 축하 효과.
- **반응형 최적화**: 모바일 환경에서의 조작 편의성 개선.
- **에러 핸들링**: 네트워크 에러 또는 서버 에러 발생 시 사용자 안내 강화.

---

## 4. 백엔드 연동 계획 (Transition to Real API)
- 현재 Mock API 기반 개발에서 실제 백엔드로 전환하기 위한 환경 설정 (`.env` 활용).
- Axios 인스턴스 설정 및 인터셉터를 통한 토큰 자동 주입.

## 3. 주의사항 및 해결 과제 (Gaps)

### ⚠️ API 명세서 누락 사항
- **Top 100 단어 데이터**: 기획상 정답/포기 화면에서 "유사도 Top 100 단어"를 보여줘야 하나, 현재 `guess-response-correct.json` 및 `give-up-response.json`에 해당 데이터 필드가 없습니다.
    - **Action**: 백엔드 개발자에게 필드 추가 (`topWords: [...]`) 요청 필요. 당장은 Mock 데이터에 임의로 추가하여 개발 진행.

### ⚠️ 인증 API 명세
- `api-docs/README.md`에 회원 관련 API(`user/*`) 명세가 누락되어 있었으나, `api-docs/users` 폴더의 JSON 파일들을 근거로 표준(`PUT /users/me`)에 맞춰 구현 완료함.
