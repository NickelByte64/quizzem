package quizzem.backend.features.question.api.dto

import quizzem.backend.core.api.dto.QuizzemDto
import quizzem.backend.features.question.model.AnswerMode
import quizzem.backend.features.question.model.MediaType
import java.time.Instant
import java.util.*

class QuestionDto(
    id: UUID,
    createdAt: Instant,
    updatedAt: Instant,
    var text: String,
    var answerMode: AnswerMode,
    var mediaType: MediaType,
    var answers: List<AnswerDto>
) : QuizzemDto(id, createdAt, updatedAt)
