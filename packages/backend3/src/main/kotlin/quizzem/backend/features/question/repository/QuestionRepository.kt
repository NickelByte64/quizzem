package quizzem.backend.features.question.repository

import org.springframework.data.jpa.repository.JpaRepository
import quizzem.backend.features.question.model.QuestionModel
import java.util.*

interface QuestionRepository : JpaRepository<QuestionModel, UUID>