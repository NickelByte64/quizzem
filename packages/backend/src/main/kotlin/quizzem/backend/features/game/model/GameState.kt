package quizzem.backend.features.game.model

enum class GameState {
    DRAFT,
    LOBBY,
    COUNTDOWN,
    QUESTION,
    ANSWER_REVEAL,
    SCOREBOARD,
    NEXT_QUESTION,
    FINAL_RESULTS,
    ENDED, ;
}