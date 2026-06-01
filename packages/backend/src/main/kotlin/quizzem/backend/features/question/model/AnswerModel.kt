package quizzem.backend.features.question.model

import jakarta.persistence.*
import quizzem.backend.core.domain.QuizzemModel

@Entity
@Table(name = "answers")
class AnswerModel(
    @Column(columnDefinition = "TEXT")
    var text: String,

    var isCorrectAnswer: Boolean = false,

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "question_id", nullable = false)
    var question: QuestionModel
) : QuizzemModel()