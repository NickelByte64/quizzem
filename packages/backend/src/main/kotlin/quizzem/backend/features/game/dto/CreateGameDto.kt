package quizzem.backend.features.game.dto

data class CreateGameDto(
    val title: String,
    val description: String? = null
)
