package quizzem.backend.features.game.mapper

import quizzem.backend.features.game.api.dto.GameDto
import quizzem.backend.features.game.model.GameModel
import quizzem.backend.features.question.mapper.toDto

fun GameModel.toDto(): GameDto {
    return GameDto(
        id = requireNotNull(id),
        createdAt = createdAt,
        updatedAt = updatedAt,
        state = state,
        title = title,
        description = description,
        questions = questions.map { it.toDto() },
    )
}

