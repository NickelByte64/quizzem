package quizzem.backend.features.game

import org.springframework.stereotype.Service
import quizzem.backend.features.game.dto.CreateGameDto

@Service
class GameService {
    fun createGame(dto: CreateGameDto) {
        println("Creating game ${dto.title}")
    }
}