# Tasks: Migration vers TypeScript et Amélioration de l'Architecture Backend

**Input**: Design documents from `D:\PROJETS\LANGAGE\JS\NODE\youplaylist\specs\001-migration-vers-typescript\`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 3.1: Setup
- [X] T001 Create `tsconfig.json` for the backend in `backend/tsconfig.json`.
- [X] T002 Install TypeScript and `@types/*` dev dependencies in `backend/package.json`.
- [X] T003 [P] Configure ESLint and Prettier for TypeScript in `backend/.eslintrc.js` and `backend/.prettierrc.js`.
- [X] T004 Update `backend/package.json` scripts for TypeScript build and run commands.

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [X] T005 [P] Write integration tests for User authentication and management in `backend/src/tests/user.test.ts`.
- [X] T006 [P] Write integration tests for Playlist creation and management in `backend/src/tests/playlist.test.ts`.
- [X] T007 [P] Write integration tests for Track addition and management in `backend/src/tests/track.test.ts`.
- [X] T008 [P] Write integration tests for `yt-stream` integration in `backend/src/tests/youtube.test.ts`.

## Phase 3.3: Core Implementation (Migration & Refactoring)
- [X] T009 [P] Migrate `backend/src/models/User.js` to `backend/src/models/User.ts` with TypeScript types.
- [X] T010 [P] Migrate `backend/src/models/Playlist.js` to `backend/src/models/Playlist.ts` with TypeScript types.
- [X] T011 [P] Migrate `backend/src/models/Track.js` to `backend/src/models/Track.ts` with TypeScript types.
- [X] T012 [P] Migrate `backend/src/utils/auth.js` to `backend/src/utils/auth.ts` with TypeScript types.
- [X] T013 [P] Migrate `backend/src/utils/redisClient.js` to `backend/src/utils/redisClient.ts` with TypeScript types.
- [X] T014 [P] Migrate `backend/src/config/db.js` to `backend/src/config/db.ts` with TypeScript types.
- [X] T015 [P] Migrate `backend/src/middlewares/authMiddleware.js` to `backend/src/middlewares/authMiddleware.ts` with TypeScript types.
- [X] T016 [P] Migrate `backend/src/services/youtubeService.js` to `backend/src/services/youtubeService.ts` with TypeScript types.
- [X] T017 [P] Migrate `backend/src/services/streamService.js` to `backend/src/services/streamService.ts` with TypeScript types.
- [X] T018 Refactor and migrate `backend/src/controllers/authController.js` to `backend/src/controllers/authController.ts` with types and improved architecture.
- [X] T019 Refactor and migrate `backend/src/controllers/playlistController.js` to `backend/src/controllers/playlistController.ts` with types and improved architecture.
- [X] T020 Refactor and migrate `backend/src/controllers/trackController.js` to `backend/src/controllers/trackController.ts` with types and improved architecture.
- [X] T021 Migrate `backend/src/routes/authRoutes.js` to `backend/src/routes/authRoutes.ts`.
- [X] T022 Migrate `backend/src/routes/playlistRoutes.js` to `backend/src/routes/playlistRoutes.ts`.
- [X] T023 Migrate `backend/src/routes/trackRoutes.js` to `backend/src/routes/trackRoutes.ts`.
- [X] T024 Migrate `backend/src/app.js` to `backend/src/app.ts`.

## Phase 3.4: Integration & Performance
- [X] T025 Implement caching mechanisms (e.g., Redis integration for API responses) in `backend/src/services/cacheService.ts`.
- [X] T026 Update frontend API calls to match any TypeScript-driven backend API changes in `frontend/src/services/httpService.ts` and `frontend/src/utils/http.js`.
- [X] T027 Verify all existing functionalities after migration and refactoring through manual and automated tests.

## Phase 3.5: Polish
- [X] T028 [P] Add JSDoc/TSDoc comments for new/refactored TypeScript code in `backend/src/**/*.ts`.
- [X] T029 Review and optimize backend code for 200 concurrent users.
- [X] T030 Update `README.md` with TypeScript development instructions and build process.

## Dependencies
- T001-T004 must be completed before T005-T024.
- T005-T008 must be completed before T009-T024.
- T009-T017 can be done in parallel.
- T018-T020 depend on their respective models and services being migrated.
- T021-T023 depend on their respective controllers being migrated.
- T024 depends on all other backend files being migrated.
- T025 depends on `redisClient.ts` (T013).
- T026 depends on any API changes from T018-T024.
- T027 depends on all previous implementation tasks.
- T028-T030 can be done after core implementation.

## Parallel Example
```
# Launch T005-T008 together:
Task: "Write integration tests for User authentication and management in backend/src/tests/user.test.ts"
Task: "Write integration tests for Playlist creation and management in backend/src/tests/playlist.test.ts"
Task: "Write integration tests for Track addition and management in backend/src/tests/track.test.ts"
Task: "Write integration tests for yt-stream integration in backend/src/tests/youtube.test.ts"

# Launch T009-T017 together (after tests are written and failing):
Task: "Migrate backend/src/models/User.js to backend/src/models/User.ts with TypeScript types"
Task: "Migrate backend/src/models/Playlist.js to backend/src/models/Playlist.ts with TypeScript types"
Task: "Migrate backend/src/models/Track.js to backend/src/models/Track.ts with TypeScript types"
Task: "Migrate backend/src/utils/auth.js to backend/src/utils/auth.ts with TypeScript types"
Task: "Migrate backend/src/utils/redisClient.js to backend/src/utils/redisClient.ts with TypeScript types"
Task: "Migrate backend/src/config/db.js to backend/src/config/db.ts with TypeScript types"
Task: "Migrate backend/src/middlewares/authMiddleware.js to backend/src/middlewares/authMiddleware.ts with TypeScript types"
Task: "Migrate backend/src/services/youtubeService.js to backend/src/services/youtubeService.ts with TypeScript types"
Task: "Migrate backend/src/services/streamService.js to backend/src/services/streamService.ts with TypeScript types"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task
   
2. **From Data Model**:
   - Each entity → model creation task [P]
   - Relationships → service layer tasks
   
3. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Services → Endpoints → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task
