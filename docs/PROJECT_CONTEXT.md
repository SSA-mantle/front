# SSA-mantle Frontend Project Context

SSAFY 관통 프로젝트 `SSA-mantle` 프론트엔드 공통 컨텍스트 문서.  
이 문서를 항상 참고해서 작업한다.
답변은 모두 한국어로 진행한다. 
---

## 1. 기술 스택 & 개발 환경

- **Framework**: Vue.js 3 (Composition API, `<script setup>` 사용)
- **빌드 도구**: Vite
- **언어**: JavaScript (TypeScript 사용 ❌)
- **스타일**: SCSS
  - 각 컴포넌트: `<style lang="scss" scoped>`
  - 전역 스타일: `src/assets/main.scss`
- **상태관리**: Pinia (추후 Auth/유저 정보, 게임 상태에 사용 예정)
- **라우팅**: Vue Router
- **UI 라이브러리**: 직접 구현 (Tailwind 등 사용 ❌)
- **기타 금지 사항**
  - Tailwind, PostCSS 기반 유틸 클래스 ❌
  - 인라인 스타일 남발 ❌

---

## 2. 프로젝트 목표 & 도메인

- **도메인**: SSAFY 교육생을 위한 유사도 기반 단어 유추 게임
- **핵심 기능**
  - 하루 1문제 Daily Challenge
  - 입력 단어와 정답 사이의 의미적 유사도 확인
  - 추측 기록 / 랭킹 / 플레이 히스토리 / FAQ
  - SSAFY 도메인 단어(교육, 공통커리, 싸피 용어 등)에 특화된 게임 경험
- **백엔드**: 별도 레포 (`server`, `embedding-server`)에서 개발,  
  프론트는 **초기에는 더미 데이터 + 목 API**, 이후 실제 API 연동.

---

## 3. 폴더 구조 & 레이아웃 컴포넌트

```text
src/
  assets/
    main.scss           # 전역 스타일, 폰트, 공통 변수 등
  components/
    layout/
      AppHeader.vue
      AppFooter.vue
    welcome/
      WelcomeBrand.vue
    auth/
      LoginForm.vue
      SignupForm.vue
    main/
      DailyChallengeCard.vue
      GuessSummaryCard.vue
      (필요시 추후 추가)
    ...
  views/
    WelcomeView.vue
    MainView.vue
    GuideView.vue        # How to / Tip
    LeaderboardView.vue
    HistoryView.vue
    FAQView.vue
    MyPageView.vue
    EditProfileView.vue
    (필요 시 추후 추가)
  router/
    index.js
  stores/
    ... (Pinia)
```

## 4. 라우팅 구조

/ -> WelcomeView (로그인 전 첫 화면)
/main -> MainView (메인 게임 화면)
/guide -> GuideView (How to / Tip)
/leaderboard -> LeaderboardView
/history -> HistoryView
/faq -> FAQView
/mypage -> MyPageView
/mypage/edit -> EditProfileView

- Header 메뉴 클릭 시 해당 라우트로 이동.
- 로고 클릭 시 /main.
- 인증 플로우
  - 초기 개발: 프론트에서만 로그인 성공 시 /main으로 라우팅.
  - 추후: 백엔드 로그인 API + 토큰 기반 인증 → Pinia에 유저정보 저장 → 라우터 가드로 비로그인 시 /로 리다이렉트.

## 5. UI / UX 디자인 원칙

- 폰트: Pretendard 사용 (전역에서 로딩/적용 예정).
- 컬러 톤
  - 메인 그라디언트: 파란 계열 (예: #2563eb → #0ea5e9 → #1fb3ff)
  - 포인트 색: SSAFY 느낌의 선명한 블루 (#2563eb), 보라 계열 버튼.
- 중요한 텍스트는 볼드 처리.
- 반응형
  - 기준 폭 1200px
  - 약 max-width: 960px 이하에서 컬럼 레이아웃을 세로 스택으로 변경.

## 6. 컴포넌트 설계 & 코딩 규칙

### 6.1. Vue 컴포넌트

- 항상 <script setup> 사용 :

```
<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  ...
});

const emit = defineEmits(["..."]);
</script>

```

props/emit 명칭

이벤트: kebab-case string, 변수/메서드에서 사용할 때는 camelCase 사용

예: @submit-guess → emit("submit-guess", value) → 핸들러 handleSubmitGuess

역할이 나뉘면 컴포넌트 분리 기준

왼쪽 브랜드 영역 → WelcomeBrand.vue

로그인/회원가입 → LoginForm.vue, SignupForm.vue

메인 게임의 Daily 카드, 요약 카드, 전체 리스트 등도 각각 분리

### 6.2. SCSS 스타일

- 각 컴포넌트는 BEM 스타일 네이밍 사용 :

```
.component {
  &__element { ... }
  &--modifier { ... }
}

```

전역 색상/폰트/공통 여백은 main.scss 혹은 별도 변수 파일에 정리 (추후).

scoped 스타일 사용을 기본으로 하되, 전역 Reset/폰트 설정은 전역 스타일에서 처리.

## 7. 상태 관리 및 API 설계 (초기 전략)

### 7.1. 현재 단계:

- 로그인/회원가입/게임 로직 등은 프론트에서 임시 더미로 처리
  - 예: 유사도는 Math.random() 값으로 생성

### 7.2. 추후 계획:
docs/api-docs를 참고해서 백앤드와 API 연동작업

로그인/로그아웃, 유저 정보, 토큰 보관, 오늘 정답, 시도 리스트, 랭킹 요약 등

API 모듈: src/api/\*.js

Axios 기반

백엔드 레포의 REST API 스펙과 맞춰서 구현
