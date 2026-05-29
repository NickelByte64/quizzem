package quizzem.backend.features.question.mapper

import quizzem.backend.features.answer.mapper.toDto
import quizzem.backend.features.question.api.dto.QuestionDto
import quizzem.backend.features.question.model.QuestionModel


fun QuestionModel.toDto(): QuestionDto {
    return QuestionDto(
        id = requireNotNull(id),
        createdAt = createdAt,
        updatedAt = updatedAt,
        text = text,
        type = type,
        answers = answers.map { it.toDto() }
    )
}