package quizzem.backend.features.answer.dto

import java.time.Instant
import java.util.*

data class AnswerDto(
    val id: UUID,
    val createdAt: Instant,
    val updatedAt: Instant,

    val text: String
)
