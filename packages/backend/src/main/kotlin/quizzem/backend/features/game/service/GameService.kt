package quizzem.backend.features.game.service

import org.springframework.stereotype.Service
import quizzem.backend.features.game.api.dto.CreateGameDto
import quizzem.backend.features.game.model.GameModel
import quizzem.backend.features.game.repository.GameRepository
import java.util.*

@Service
class GameService(
    private val gameRepository: GameRepository,
) {
    fun listGames(): List<GameModel> {
        return gameRepository.findAll()
    }

    fun createGame(dto: CreateGameDto): UUID {
        val game = GameModel(title = dto.title, description = dto.description)
        val saved = gameRepository.save(game)
        return requireNotNull(saved.id) { "Game ID was null after save" }
    }
}