package quizzem.backend.features.answer.model

import quizzem.backend.features.question.model.QuestionModel
import java.time.Instant
import java.util.*

data class AnswerModel(
    val id: UUID,
    val createdAt: Instant,
    val updatedAt: Instant,

    val text: String = "",
    val question: QuestionModel
)
