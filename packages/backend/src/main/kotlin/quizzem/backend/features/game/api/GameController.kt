package quizzem.backend.features.game.api

import org.springframework.web.bind.annotation.*
import quizzem.backend.features.game.api.dto.CreateGameDto
import quizzem.backend.features.game.api.dto.CreateGameResponseDto
import quizzem.backend.features.game.api.dto.GameDto
import quizzem.backend.features.game.mapper.toDto
import quizzem.backend.features.game.service.GameService

@RestController
@RequestMapping("/games")
class GameController(private val gameService: GameService) {

    @GetMapping
    fun listGames(): List<GameDto> {
        val games = gameService.listGames()
        return games.map { it.toDto() }
    }

    @PostMapping
    fun createGame(@RequestBody() dto: CreateGameDto): CreateGameResponseDto {
        val gameId = gameService.createGame(dto)
        return CreateGameResponseDto(gameId)
    }
}