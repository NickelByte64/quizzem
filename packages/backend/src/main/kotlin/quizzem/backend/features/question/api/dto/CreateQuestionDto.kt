package quizzem.backend.features.question.api.dto

import quizzem.backend.features.question.model.AnswerMode
import quizzem.backend.features.question.model.MediaType

data class CreateQuestionDto(
    var text: String,
    var answerMode: AnswerMode,
    val mediaType: MediaType,
    val answers: MutableList<CreateAnswerDto>
)

