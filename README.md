# SSA-mantle (싸맨틀) Frontend

**SSA-mantle**은 유사도 기반 SSAFY 관련 단어 유추 게임입니다.  
Semantle 게임의 메커니즘을 SSAFY 테마에 맞춰 재구성한 웹 어플리케이션입니다.

---

## 🚀 주요 기능

### 1. Daily Challenge (일일 도전) 🎯
- 매일 새로운 SSAFY 관련 정답 단어를 유추합니다.
- 입력한 단어와 정답 단어 사이의 유사도를 백분율(%)로 확인합니다.
- 유사도가 높은 상위 1000위 이내의 단어는 순위 정보를 제공합니다.
- 정답을 맞히거나 포기하면 상세 결과(정답 설명, 상위 100개 유사 단어)를 확인할 수 있습니다.

### 2. Leaderboard (명예의 전당) 🏆
- 정답을 맞힌 플레이어들의 순위를 확인합니다. (시도 횟수 및 시간 기준)
- 오늘의 상위 50위 랭커를 시상대(Podium) 형식으로 시각화하여 제공합니다.

### 3. History (히스토리) 📅
- 어제의 정답 단어와 해당 단어의 유사도 상위 100개 목록을 다시 볼 수 있습니다.

### 4. My Page & Achievements (마이페이지 및 업적) 👤
- 개인 통계(성공률, 평균 시도, 최고 순위 등)를 한눈에 파악합니다.
- 다양한 활동을 통해 획득한 업적들을 확인하고 성장 과정을 추적합니다.

### 5. Profile & Intro 🎨
- 사용자 프로필(닉네임) 관리 기능을 제공합니다.
- 처음 게임 진입 시 몰입감을 높여주는 로고 애니메이션 및 인트로 섹션을 포함합니다.

---

## 🛠️ 기술 스택

- **Core**: Vue 3 (Composition API)
- **Store**: Pinia (State Management)
- **Router**: Vue Router
- **Style**: Vanilla CSS / SCSS (Custom Design System)
- **Build Tool**: Vite
- **HTTP Client**: Axios

---

## 📂 프로젝트 구조

```
src/
├── api/          # Axios 인스턴스 및 API 핸들러 (Mock 모드 포함)
├── assets/       # 이미지, 전역 SCSS 스타일
├── components/   # 재사용 가능한 UI 컴포넌트 (섹션별 분류)
├── constants/    # 앱 전역 상수 (업적 메타데이터 등)
├── router/       # Vue Router 설정
├── stores/       # Pinia Store (Auth, Game 상태 관리)
└── views/        # 페이지 단위 뷰 컴포넌트
```

---

## ⚙️ 설정 및 실행 방법

### 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 다음 변수를 설정합니다.
- `VITE_API_BASE_URL`: 백엔드 API 주소
- `VITE_USE_MOCK`: 'true' 설정 시 Mock API 모드로 작동 (프론트 단독 시연용)

### 라이브러리 설치
```sh
npm install
```

### 개발 서버 실행
```sh
npm run dev
```

### 프로덕션 빌드
```sh
npm run build
```
