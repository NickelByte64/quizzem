package quizzem.backend.features.game.repository

import org.springframework.data.jpa.repository.JpaRepository
import quizzem.backend.features.game.model.GameModel
import java.util.*

interface GameRepository : JpaRepository<GameModel, UUID>