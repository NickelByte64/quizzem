package quizzem.backend.features.game.api.dto

data class CreateGameDto(
    val title: String,
    val description: String? = null
)
