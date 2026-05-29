package quizzem.backend.features.game.api

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import quizzem.backend.features.game.api.dto.CreateGameDto
import quizzem.backend.features.game.service.GameService

@RestController
@RequestMapping("/game")
class GameController(private val gameService: GameService) {

    @PostMapping
    fun createGame(@RequestBody() dto: CreateGameDto) {
        return gameService.createGame(dto)
    }
}