package quizzem.backend.features.question.api.dto

import quizzem.backend.features.question.model.AnswerMode
import quizzem.backend.features.question.model.MediaType

data class CreateQuestionDto(
    var text: String,
    var answerMode: AnswerMode? = AnswerMode.SINGLE_CHOICE,
    val mediaType: MediaType? = MediaType.NONE,
    val answers: List<CreateAnswerDto> = emptyList()
)

