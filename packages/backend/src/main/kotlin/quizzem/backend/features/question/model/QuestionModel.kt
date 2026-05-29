package quizzem.backend.features.question.model

import quizzem.backend.features.answer.model.AnswerModel
import java.time.Instant
import java.util.*

data class QuestionModel(
    val id: UUID,
    val createdAt: Instant,
    val updatedAt: Instant,

    val text: String = "",
    val type: QuestionType = QuestionType.MULTIPLE_CHOICE,
    val correctAnswer: String = "",
    val answers: List<AnswerModel>
)
