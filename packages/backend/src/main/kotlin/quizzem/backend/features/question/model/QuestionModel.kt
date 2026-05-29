package quizzem.backend.features.question.model

import jakarta.persistence.*
import quizzem.backend.features.answer.model.AnswerModel
import quizzem.backend.features.game.model.GameModel
import java.time.Instant
import java.util.*

@Entity
@Table(name = "questions")
class QuestionModel(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: UUID? = null,

    var createdAt: Instant = Instant.now(),

    var updatedAt: Instant,

    @Column(length = 400) var text: String = "",

    @Enumerated(EnumType.STRING) var type: QuestionType = QuestionType.MULTIPLE_CHOICE,

    @OneToMany(
        mappedBy = "question", cascade = [(CascadeType.ALL)], orphanRemoval = true
    ) var answers: MutableList<AnswerModel> = mutableListOf(),

    @ManyToOne @JoinColumn(name = "game_id") var game: GameModel
) {
    @PreUpdate
    fun onUpdate() {
        updatedAt = Instant.now()
    }
}
