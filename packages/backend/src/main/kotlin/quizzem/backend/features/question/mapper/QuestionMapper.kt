package quizzem.backend.features.question.mapper

import quizzem.backend.features.question.api.dto.AnswerDto
import quizzem.backend.features.question.api.dto.QuestionDto
import quizzem.backend.features.question.model.AnswerModel
import quizzem.backend.features.question.model.QuestionModel


fun QuestionModel.toDto(): QuestionDto {
    return QuestionDto(
        id = id,
        createdAt = createdAt,
        updatedAt = updatedAt,
        text = text,
        mediaType = mediaType,
        answerMode = answerMode,
        answers = answers.map { it.toDto() }
    )
}


fun AnswerModel.toDto(): AnswerDto {
    return AnswerDto(
        id = id,
        createdAt = createdAt,
        updatedAt = updatedAt,
        text = text,
        isCorrectAnswer = isCorrectAnswer
    )
}
