package quizzem.backend.features.game.service

import org.springframework.stereotype.Service
import quizzem.backend.features.game.api.dto.CreateGameDto
import quizzem.backend.features.game.repository.GameRepository

@Service
class GameService(
    private val gameRepository: GameRepository,
) {
    fun createGame(dto: CreateGameDto) {
        println("Creating game ${dto.title}")
    }
}