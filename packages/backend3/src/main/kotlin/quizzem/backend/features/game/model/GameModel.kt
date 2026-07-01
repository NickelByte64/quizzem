package quizzem.backend.features.game.model

import jakarta.persistence.*
import quizzem.backend.core.domain.QuizzemModel
import quizzem.backend.features.question.model.QuestionModel

@Entity
@Table(name = "games")
class GameModel(
    @Enumerated(EnumType.STRING)
    var state: GameState = GameState.DRAFT,

    @Column(length = 100)
    var title: String,

    @Column(columnDefinition = "TEXT")
    var description: String? = null,

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "games_questions",
        joinColumns = [JoinColumn(name = "games_id")],
        inverseJoinColumns = [JoinColumn(name = "questions_id")]
    )
    var questions: MutableList<QuestionModel> = mutableListOf(),
) : QuizzemModel()