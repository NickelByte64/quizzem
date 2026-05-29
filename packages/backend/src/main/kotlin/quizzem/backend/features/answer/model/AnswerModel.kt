package quizzem.backend.features.answer.model

import jakarta.persistence.*
import quizzem.backend.features.question.model.QuestionModel
import java.time.Instant
import java.util.*

@Entity
@Table(name = "answers")
class AnswerModel(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: UUID? = null,

    var createdAt: Instant = Instant.now(),

    var updatedAt: Instant = createdAt,

    @Column(length = 400) var text: String = "",

    @ManyToOne @JoinColumn(name = "question_id") var question: QuestionModel
) {
    @PreUpdate
    fun onUpdate() {
        updatedAt = Instant.now()
    }
}
