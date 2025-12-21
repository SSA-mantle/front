# Project Analysis & Roadmap

## 1. Project Structure Analysis

### Domain & Goal
**"SSA-mantle"**: A Wordle-like semantic similarity guessing game tailored for SSAFY students.
- **Current Phase**: Frontend UI constructed with dummy data/logic.
- **Next Phase**: Integration with Backend API (`server`, `embedding-server`).

### Technology Stack
- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **Styling**: SCSS (BEM naming convention), No external UI kits (Tailwind forbidden).
- **State**: Pinia (Planned for global state management).
- **Build**: Vite.

### Current Directory Structure
The `src` directory is well-organized by feature:
- `components/`: Logic separated into `auth`, `main` (game), `layout`, `welcome`.
- `views/`: Matches the routing requirements (`MainView`, `MyPageView`, etc.).
- `assets/`: Contains global `main.scss`.

---

## 2. API Integration & Development Roadmap

Based on `docs/api-docs`, here are the necessary next steps to transition from "Dummy Mode" to "Live Mode".

### Phase 1: API Layer Setup
**Goal**: Establish communication with the backend.
- [x] Install `axios`.
- [x] Create `src/api/index.js` (or similar) with an Axios instance.
    - Implement **Interceptors**:
        - **Request**: Inject `Authorization: Bearer {token}` into headers.
        - **Response**: Handle global errors (e.g., `401 Unauthorized` -> redirect to login).

### Phase 2: Authentication & User Management
**Goal**: Replace dummy login with real JWT auth.

**[PR 1] Mock API Infrastructure**
- [x] Create `mj/mock-infra`
- [x] Implement `src/api/index.js`, `src/api/mockHandlers.js`
- [x] Add `.env.example`

**[PR 2] Nickname Feature**
- [x] Create `mj/nickname-feature`
- [x] Add Nickname Input to `SignupForm.vue`
- [x] Update `SignupForm` logic to send nickname
- [x] Update `mockHandlers.js` to persist nickname
- [x] Update `MyPageView.vue` to display nickname

**[PR 3] Login/Signup Integration**
- [x] Create `mj/auth-api-integration`
- [x] Connect `LoginForm.vue` to `useAuthStore`
- [x] Implement `useAuthStore` actions

**[PR 4] Route Guards & Security**
- [x] Create `mj/route-guards`
- [x] Implement `router.beforeEach`
- [x] Protect `/main`, `/mypage`
- [x] Persist session in `App.vue`

### Phase 3: Game Logic Migration
**Goal**: Move game logic from client (random math) to server (AI embedding).
*Current client-side logic must be removed.*

1.  **Submitting a Guess** (`POST /api/v1/games/guess`)
    - **Input**: User word + current fail count.
    - **Output**:
        - **Correct**: Stop game, show success animation.
        - **Incorrect**: Receive `similarity` (0-100) and `rank` from server. Display in the guess history list.
    - **Error Handling**: Handle `409 Conflict` (Already solved/given up).

2.  **Give Up** (`POST /api/v1/games/give-up`)
    - Implement "Give Up" button in UI.
    - Show the correct answer returned by the server.

### Phase 4: Data & Features
- [ ] **Leaderboard**: Fetch real ranking data instead of hardcoded lists.
- [ ] **History**: Display actual past game records from the server.
- [ ] **MyPage**: Show real user stats (cumulative attempts, success rate).

## 3. Immediate Recommendation
The most critical missing piece is the **API Client Module**. I recommend starting by creating the Axios setup and integrating the **Login** flow first, as the Game API requires an `accessToken`.
