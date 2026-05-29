package quizzem.backend.features.answer.repository

import org.springframework.data.jpa.repository.JpaRepository
import quizzem.backend.features.answer.model.AnswerModel
import java.util.*

interface AnswerRepository : JpaRepository<AnswerModel, UUID>