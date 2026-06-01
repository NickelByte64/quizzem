package quizzem.backend.core.api.dto

import java.time.Instant
import java.util.*

abstract class QuizzemDto(
    val id: UUID,
    val createdAt: Instant,
    val updatedAt: Instant
)