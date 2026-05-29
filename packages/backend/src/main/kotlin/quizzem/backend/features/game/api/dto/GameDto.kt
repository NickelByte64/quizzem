package quizzem.backend.features.game.api.dto

import quizzem.backend.features.game.model.GameState
import quizzem.backend.features.question.api.dto.QuestionDto
import java.time.Instant
import java.util.*

data class GameDto(
    val id: UUID,
    val createdAt: Instant,
    val updatedAt: Instant,
    val state: GameState,
    val title: String?,
    val description: String?,
    val questions: List<QuestionDto>
)
