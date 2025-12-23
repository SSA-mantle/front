# 개발 작업 리스트 (API v1.1 반영)

## 1. 마이페이지 (My Page)
- [x] **내 정보 조회 연동**
  - `GET /api/v1/users/me`
  - 닉네임, 이메일 표시
- [x] **내 게임 통계 조회 연동**
  - `GET /api/v1/users/me/statistics`
  - 총 게임, 승률, 연승, 최고 순위 등 데이터 바인딩
- [ ] **[NEW] 내 업적 목록 조회 연동**
  - `GET /api/v1/achievements/me`
  - 기존 더미 데이터 대신 실제 획득한 업적 표시 (획득/미획득 상태 구분)
- [ ] **내 정보 수정**
  - `PATCH /api/v1/users/me`
  - 닉네임 및 비밀번호 변경 기능

## 2. 게임 플레이 (Game Play)
- [ ] **[NEW] 실시간 업적 획득 알림**
  - `POST /api/v1/games/guess` 응답의 `newAchievements` 필드 확인
  - 업적 획득 시 사용자에게 Toast 또는 모달로 알림 제공

## 3. 인증 (Auth)
- [ ] 로그인 (`POST /api/v1/auth/sign-in`) - 완료됨
- [ ] 회원가입 (`POST /api/v1/users`) - 완료됨
- [ ] 토큰 갱신 (`POST /api/v1/auth/refresh`) - 인터셉터 구현 필요

## 4. 기타
- [ ] 리더보드 조회 (`GET /api/v1/leaderboard`) - 완료됨
- [ ] 어제/오늘 정답 이력 조회 - 완료됨
