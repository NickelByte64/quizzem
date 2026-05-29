package quizzem.backend.features.game

import quizzem.backend.features.game.dto.GameDto
import quizzem.backend.features.game.model.GameModel

fun GameModel.toDto(): GameDto {
    return GameDto(
        id = id,
        createdAt = createdAt,
        updatedAt = updatedAt,
        state = state,
        title = title,
        description = description,
        questions = questions
    )
}

