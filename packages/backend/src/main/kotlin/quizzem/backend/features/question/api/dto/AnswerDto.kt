package quizzem.backend.features.question.api.dto

import quizzem.backend.core.api.dto.QuizzemDto
import java.time.Instant
import java.util.*

class AnswerDto(
    id: UUID,
    createdAt: Instant,
    updatedAt: Instant,
    val text: String,
    val isCorrectAnswer: Boolean
) : QuizzemDto(id, createdAt, updatedAt)