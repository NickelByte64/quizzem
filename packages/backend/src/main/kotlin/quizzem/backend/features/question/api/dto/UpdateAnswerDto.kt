package quizzem.backend.features.question.api.dto

data class UpdateAnswerDto(
    val text: String,
    val isCorrectAnswer: Boolean
)
