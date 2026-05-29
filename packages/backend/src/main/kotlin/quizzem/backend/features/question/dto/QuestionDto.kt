package quizzem.backend.features.question.dto

import quizzem.backend.features.answer.dto.AnswerDto
import quizzem.backend.features.question.model.QuestionType
import java.time.Instant
import java.util.*

data class QuestionDto(
    val id: UUID,
    val createdAt: Instant,
    val updatedAt: Instant,

    val text: String,
    val type: QuestionType,
    val correctAnswer: String,
    val answers: List<AnswerDto>
)
