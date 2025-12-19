# 싸멘틀 게임 API 문서

## 1. 단어 추측 제출

### Endpoint
```
POST /api/v1/games/guess
```

### Headers
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

### Request Body
```json
{
  "word": "사과",        // 추측한 단어 (필수, NotBlank)
  "failCount": 3         // 현재 시도 횟수 (필수, 0 이상)
}
```

파일: [guess-request.json](./games/guess-request.json)

### Response - 정답인 경우 (200 OK)
```json
{
  "success": true,
  "data": {
    "isCorrect": true,
    "message": "정답입니다!",
    "word": "사과",
    "similarity": null,
    "rank": null,
    "answer": "사과",
    "failCount": 3
  },
  "error": null
}
```

파일: [guess-response-correct.json](./games/guess-response-correct.json)

### Response - 오답인 경우 (200 OK)
```json
{
  "success": true,
  "data": {
    "isCorrect": false,
    "message": "오답입니다.",
    "word": "바나나",
    "similarity": 85.42,    // 유사도 (0.0 ~ 100.0)
    "rank": 123,            // 순위 (1 ~ 10000)
    "answer": null,
    "failCount": 0
  },
  "error": null
}
```

파일: [guess-response-wrong.json](./games/guess-response-wrong.json)

### Response - 이미 해결된 문제 (409 Conflict)
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "G003",
    "message": "이미 해결된 문제입니다."
  }
}
```

파일: [guess-response-already-solved.json](./games/guess-response-already-solved.json)

### Response - 이미 포기한 문제 (409 Conflict)
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "G004",
    "message": "이미 포기한 문제입니다."
  }
}
```

파일: [guess-response-already-gave-up.json](./games/guess-response-already-gave-up.json)

---

## 2. 게임 포기

### Endpoint
```
POST /api/v1/games/give-up
```

### Headers
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

### Request Body
요청 본문 없음

### Response - 성공 (200 OK)
```json
{
  "success": true,
  "data": {
    "message": "포기하셨습니다. 정답은 '사과' 입니다.",
    "answer": "사과",
    "failCount": 5,
    "giveUpAt": "2025-12-15T14:30:25.123456"
  },
  "error": null
}
```

파일: [give-up-response.json](./games/give-up-response.json)

### Response - 진행 중인 게임이 없음 (404 Not Found)
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "G005",
    "message": "진행 중인 게임이 없습니다."
  }
}
```

파일: [give-up-response-no-game.json](./games/give-up-response-no-game.json)

---

## 공통 에러 응답

### 인증 실패 (401 Unauthorized)
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "A002",
    "message": "유효하지 않은 토큰입니다."
  }
}
```

### 오늘의 문제 없음 (404 Not Found)
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "G001",
    "message": "오늘의 문제를 찾을 수 없습니다."
  }
}
```

### 유효성 검증 실패 (400 Bad Request)
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "C422",
    "message": "추측 단어는 필수입니다."
  }
}
```

---

## 게임 플로우

### 1. 첫 번째 시도 (새 게임 시작)
```
POST /api/v1/games/guess
Request: { "word": "바나나", "failCount": 1 }
→ 기록(Record)이 없으면 자동 생성
→ Response: { "isCorrect": false, "similarity": 45.2, "rank": 234 }
```

### 2. 두 번째 시도
```
POST /api/v1/games/guess
Request: { "word": "딸기", "failCount": 2 }
→ 기존 기록 조회
→ Response: { "isCorrect": false, "similarity": 62.1, "rank": 156 }
```

### 3. 정답 맞춤
```
POST /api/v1/games/guess
Request: { "word": "사과", "failCount": 3 }
→ Record.failCount = 3, Record.solvedAt = 현재시간
→ User.solveProblem() 호출 (todaySolve = true, 연속기록 증가)
→ Response: { "isCorrect": true, "answer": "사과", "failCount": 3 }
```

### 4. 이미 맞춘 문제에 재시도
```
POST /api/v1/games/guess
Request: { "word": "무엇이든", "failCount": 4 }
→ Error: { "code": "G003", "message": "이미 해결된 문제입니다." }
```

### 5. 포기하기
```
POST /api/v1/games/give-up
→ Record.giveUpAt = 현재시간
→ Response: { "answer": "사과", "giveUpAt": "..." }
```

---

## 필드 설명

### SubmitGuessResponse
| 필드 | 타입 | 설명 | 조건 |
|------|------|------|------|
| isCorrect | boolean | 정답 여부 | 항상 포함 |
| message | string | 응답 메시지 | 항상 포함 |
| word | string | 제출한 단어 | 항상 포함 |
| similarity | double | 유사도 (0.0~100.0) | 오답일 때만 |
| rank | integer | 순위 (1~10000) | 오답일 때만 |
| answer | string | 정답 단어 | 정답일 때만 |
| failCount | integer | 시도 횟수 | 항상 포함 |

### GiveUpGameResponse
| 필드 | 타입 | 설명 |
|------|------|------|
| message | string | 포기 메시지 |
| answer | string | 정답 단어 |
| failCount | integer | 최종 시도 횟수 |
| giveUpAt | datetime | 포기 시간 (ISO 8601) |

---

## 에러 코드 목록

| 코드 | HTTP 상태 | 설명 |
|------|----------|------|
| G001 | 404 | 오늘의 문제를 찾을 수 없습니다. |
| G002 | 404 | 게임 기록을 찾을 수 없습니다. |
| G003 | 409 | 이미 해결된 문제입니다. |
| G004 | 409 | 이미 포기한 문제입니다. |
| G005 | 404 | 진행 중인 게임이 없습니다. |
| A002 | 401 | 유효하지 않은 토큰입니다. |
| C400 | 400 | 잘못된 요청입니다. |
| C422 | 422 | 유효성 검증에 실패했습니다. |