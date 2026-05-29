package quizzem.backend.features.game.model

import jakarta.persistence.*
import quizzem.backend.features.question.model.QuestionModel
import java.time.Instant
import java.util.*

@Entity
@Table(name = "games")
class GameModel(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    var id: UUID? = null,

    var createdAt: Instant = Instant.now(),

    var updatedAt: Instant = createdAt,

    @Enumerated(EnumType.STRING)
    var state: GameState = GameState.DRAFT,

    @Column(length = 100)
    var title: String? = null,

    @Column(length = 400, nullable = true)
    var description: String? = null,

    @OneToMany(
        mappedBy = "game", cascade = [(CascadeType.ALL)], orphanRemoval = true
    )
    var questions: MutableList<QuestionModel> = mutableListOf()
) {
    @PreUpdate
    fun onUpdate() {
        updatedAt = Instant.now()
    }
}
