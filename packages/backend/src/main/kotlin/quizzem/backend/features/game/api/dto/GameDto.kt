package quizzem.backend.features.game.api.dto

import quizzem.backend.core.api.dto.QuizzemDto
import quizzem.backend.features.game.model.GameState
import quizzem.backend.features.question.api.dto.QuestionDto
import java.time.Instant
import java.util.*

class GameDto(
    id: UUID,
    createdAt: Instant,
    updatedAt: Instant,
    val state: GameState,
    val title: String?,
    val description: String?,
    val questions: List<QuestionDto>
) : QuizzemDto(id, createdAt, updatedAt)
