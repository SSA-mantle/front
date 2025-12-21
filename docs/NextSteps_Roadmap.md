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

### 🔜 [예정] Phase 3: 게임 로직 구현 (Game Logic)
**목표**: 클라이언트 측 랜덤 로직 제거 및 API 기반 게임 흐름 구현.

#### 1. 게임 스토어 (`stores/game.js`)
- **상태 관리**: 입력한 단어 리스트, 게임 상태(진행중/성공/실패).
- **로컬 스토리지 (localStorage)**:
    - **중복 방지**: 이미 입력한 단어 재입력 시 차단 로직.
    - **기록 관리**: `{ date: "YYYY-MM-DD", words: [...] }` 형태로 저장.
    - **초기화**: 로그인 시 오늘 날짜 기록이 아니면 삭제.
- **정렬 로직**: 입력된 단어들을 유사도 순으로 자동 정렬하여 표시.

#### 2. 게임 API 연동
- **단어 추측 (`POST /games/guess`)**
    - 요청: `{ word: "단어", failCount: N }`
    - 응답: 유사도, 순위 반환. 정답 시 성공 처리.
- **포기하기 (`POST /games/give-up`)**
    - 포기 시 정답 공개.

#### 3. UI 구현 (`DailyChallengeCard.vue` 등)
- **입력 폼**:
    - 중복 단어 입력 시 "중복되었습니다" 빨간색 에러 메시지 표시 및 제출 차단.
- **추측 목록**:
    - [단어 | 유사도 | 순위] 정보 표시.
- **결과 화면 (정답/포기)**:
    - 정답 단어 및 설명 표시.
    - **[중요] 유사도 Top 100 단어 리스트** 표시 (새로운 컴포넌트 필요).

---

## 3. 주의사항 및 해결 과제 (Gaps)

### ⚠️ API 명세서 누락 사항
- **Top 100 단어 데이터**: 기획상 정답/포기 화면에서 "유사도 Top 100 단어"를 보여줘야 하나, 현재 `guess-response-correct.json` 및 `give-up-response.json`에 해당 데이터 필드가 없습니다.
    - **Action**: 백엔드 개발자에게 필드 추가 (`topWords: [...]`) 요청 필요. 당장은 Mock 데이터에 임의로 추가하여 개발 진행.

### ⚠️ 인증 API 명세
- `api-docs/README.md`에 회원 관련 API(`user/*`) 명세가 누락되어 있었으나, `api-docs/users` 폴더의 JSON 파일들을 근거로 표준(`PUT /users/me`)에 맞춰 구현 완료함.
