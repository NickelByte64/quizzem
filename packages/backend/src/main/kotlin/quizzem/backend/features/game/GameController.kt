package quizzem.backend.features.game

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import quizzem.backend.features.game.dto.CreateGameDto

@RestController
@RequestMapping("/game")
class GameController(private val gameService: GameService) {

    @PostMapping
    fun createGame(@RequestBody() dto: CreateGameDto) {
        return gameService.createGame(dto)
    }
}