package quizzem.backend.features.question.api.dto

import quizzem.backend.features.question.model.AnswerMode
import quizzem.backend.features.question.model.MediaType

data class UpdateQuestionDto(
    var text: String? = null,
    var answerMode: AnswerMode? = null,
    val mediaType: MediaType? = null,
    val answers: List<UpdateAnswerDto>? = null
)

