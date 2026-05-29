package quizzem.backend.features.question.api.dto

import quizzem.backend.features.answer.api.dto.AnswerDto
import quizzem.backend.features.question.model.QuestionType
import java.time.Instant
import java.util.*

data class QuestionDto(
    val id: UUID,
    val createdAt: Instant,
    val updatedAt: Instant,
    val text: String,
    val type: QuestionType,
    val answers: List<AnswerDto>
)
