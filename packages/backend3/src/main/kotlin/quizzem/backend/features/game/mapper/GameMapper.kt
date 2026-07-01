package quizzem.backend.features.game.mapper

import quizzem.backend.features.game.api.dto.GameDto
import quizzem.backend.features.game.model.GameModel

fun GameModel.toDto(): GameDto {
    return GameDto(
        id = id,
        createdAt = createdAt,
        updatedAt = updatedAt,
        state = state,
        title = title,
        description = description,
        questions = emptyList()
    )
}

