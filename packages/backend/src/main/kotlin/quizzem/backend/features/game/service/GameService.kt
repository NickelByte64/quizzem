package quizzem.backend.features.game.service

import org.springframework.stereotype.Service
import quizzem.backend.features.game.api.dto.CreateGameDto
import quizzem.backend.features.game.model.GameModel
import quizzem.backend.features.game.repository.GameRepository
import quizzem.backend.features.question.repository.QuestionRepository
import java.util.*

@Service
class GameService(
    private val gameRepository: GameRepository,
    private val questionRepository: QuestionRepository,
) {
    fun listGames(): List<GameModel> {
        return gameRepository.findAll()
    }

    fun createGame(dto: CreateGameDto): UUID {
        val saved = gameRepository.save(GameModel(title = dto.title, description = dto.description))
        return saved.id
    }
}