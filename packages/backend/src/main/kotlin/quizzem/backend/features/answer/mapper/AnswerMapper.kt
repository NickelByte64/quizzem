package quizzem.backend.features.answer.mapper

import quizzem.backend.features.answer.api.dto.AnswerDto
import quizzem.backend.features.answer.model.AnswerModel


fun AnswerModel.toDto(): AnswerDto {
    return AnswerDto(
        id = requireNotNull(id),
        createdAt = createdAt,
        updatedAt = updatedAt,
        text = text
    )
}
