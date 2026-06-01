package quizzem.backend.features.question.model

import jakarta.persistence.*
import quizzem.backend.core.domain.QuizzemModel
import quizzem.backend.features.game.model.GameModel

@Entity
@Table(name = "questions")
class QuestionModel(
    @Column(columnDefinition = "TEXT")
    var text: String,

    @Enumerated(EnumType.STRING)
    var answerMode: AnswerMode = AnswerMode.SINGLE_CHOICE,

    @Enumerated(EnumType.STRING)
    var mediaType: MediaType = MediaType.NONE,

    @ManyToMany(
        mappedBy = "questions",
        fetch = FetchType.LAZY
    )
    var games: MutableList<GameModel> = mutableListOf(),

    @OneToMany(
        mappedBy = "question",
        cascade = [CascadeType.ALL],
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    var answers: MutableList<AnswerModel> = mutableListOf(),
) : QuizzemModel()
