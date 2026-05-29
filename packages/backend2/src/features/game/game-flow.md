# Quiz Game Flow (Multiplayer Real-Time)

## 1. Game Creation (Host)

- Host creates a new game session
- System generates a unique `gameId`
- Game is persisted in database
- Initial status: `DRAFT`
- Host becomes game owner

**Persisted data:**

- gameId
- hostId
- createdAt
- status

---

## 2. Quiz Setup (Host)

Host configures the quiz content:

- Title / description
- Questions
- Answers per question
- Correct answer
- Optional settings:
  - Time limit per question
  - Points system
  - Categories / difficulty

**Validation rules:**

- At least 1 question required
- Each question must have exactly one correct answer
- No empty answers allowed

---

## 3. Open Lobby

- Host opens the game for players
- Status changes: `DRAFT → LOBBY`
- Join code is generated

**Lobby features:**

- Players can join via code
- Players set nickname
- Host sees live player list

---

## 4. Player Join Flow

- Player enters game code
- Connects via WebSocket
- Sends nickname
- Server registers player in game session

**Events:**

- `playerJoined`
- `playerLeft`

**Lobby state includes:**

- Connected players
- Ready status per player (optional)

---

## 5. Start Game

- Host starts the game manually
- Preconditions can be checked:
  - Minimum players
  - Valid quiz data

**Status change:**

- `LOBBY → COUNTDOWN`

**Optional:**

- 3–5 second countdown before first question

---

## 6. Question Round Lifecycle

### 6.1 Start Question

- Server selects next question
- Sends question to all players
- Starts timer

**Status:**

- `QUESTION`

**Payload:**

- question text
- answers (without correct answer)
- duration

---

### 6.2 Answer Phase

- Players submit answers via WebSocket
- Server stores first valid answer only (or allows overwrite if desired)
- Prevent duplicate submissions

**Stored data:**

- playerId
- questionId
- selectedAnswer
- timestamp

---

### 6.3 End Question

Triggered when:

- Timer ends OR
- All players answered

**Status:**

- `ANSWER_REVEAL`

---

### 6.4 Reveal Answers

- Correct answer is shown
- Optional stats displayed:
  - answer distribution
  - percentage per option

---

### 6.5 Score Calculation

- Points are calculated per player

Common models:

- Flat score per correct answer
- Time-based bonus scoring

Example:

- basePoints + speedBonus

Scores are persisted per round

---

### 6.6 Scoreboard Phase

- Updated leaderboard is broadcast
- Players see ranking after each question

**Status:**

- `SCOREBOARD`

---

## 7. Next Question Loop

- If questions remain:
  - `SCOREBOARD → QUESTION`
- Else:
  - proceed to final results

---

## 8. Final Results

- Game ends after last question

**Status:**

- `FINAL_RESULTS`

Displayed:

- Winner
- Full ranking
- Total scores
- Optional stats:
  - accuracy
  - response time
  - streaks

---

## 9. Game End

- Status: `ENDED`
- Cleanup:
  - Close WebSocket room
  - Persist final results
  - Archive game session

---

## Core State Machine

```text
DRAFT
  ↓
LOBBY
  ↓
COUNTDOWN
  ↓
QUESTION
  ↓
ANSWER_REVEAL
  ↓
SCOREBOARD
  ↺ (loop QUESTION → SCOREBOARD)
  ↓
FINAL_RESULTS
  ↓
ENDED
```
