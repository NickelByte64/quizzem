package quizzem.backend.features.game.model

import quizzem.backend.features.question.dto.QuestionDto
import java.time.Instant
import java.util.*

data class GameModel(
    val id: UUID,
    val createdAt: Instant,
    val updatedAt: Instant,

    val state: GameState = GameState.DRAFT,
    val title: String? = null,
    val description: String? = null,
    val questions: List<QuestionDto>
)
