package quizzem.backend.features.question.api.dto

data class CreateAnswerDto(
    val text: String,
    val isCorrectAnswer: Boolean = false
)
