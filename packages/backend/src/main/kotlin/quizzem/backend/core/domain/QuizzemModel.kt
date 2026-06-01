package quizzem.backend.core.domain

import jakarta.persistence.Column
import jakarta.persistence.EntityListeners
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.MappedSuperclass
import org.hibernate.annotations.UuidGenerator
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.Instant
import java.util.*

@MappedSuperclass
@EntityListeners(AuditingEntityListener::class)
abstract class QuizzemModel {
    @Id
    @GeneratedValue
    @UuidGenerator
    lateinit var id: UUID

    @CreatedDate
    @Column(nullable = false)
    lateinit var createdAt: Instant

    @LastModifiedDate
    lateinit var updatedAt: Instant
}