package quizzem.backend.features.question.service

import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import quizzem.backend.core.api.dto.PageableDto
import quizzem.backend.features.question.api.dto.CreateQuestionDto
import quizzem.backend.features.question.api.dto.GetAllQuestionsParamsDto
import quizzem.backend.features.question.model.AnswerMode
import quizzem.backend.features.question.model.AnswerModel
import quizzem.backend.features.question.model.MediaType
import quizzem.backend.features.question.model.QuestionModel
import quizzem.backend.features.question.repository.QuestionRepository
import java.util.*

@Service
class QuestionService(
    val questionRepository: QuestionRepository,
) {
    fun getAllQuestions(params: GetAllQuestionsParamsDto): PageableDto<QuestionModel> {
        val pageable = PageRequest.of(params.page ?: 0, params.size ?: 10)
        val page = questionRepository.findAll(pageable)

        return PageableDto(
            data = page.content,
            page = pageable.pageNumber,
            size = pageable.pageSize,
            totalElements = page.totalElements,
            totalPages = page.totalPages
        )
    }

    fun createQuestion(dto: CreateQuestionDto) {
        val newQuestion = QuestionModel(
            text = dto.text,
            answerMode = dto.answerMode ?: AnswerMode.SINGLE_CHOICE,
            mediaType = dto.mediaType ?: MediaType.NONE,
        )

        newQuestion.answers = dto.answers.map { answer ->
            AnswerModel(
                text = answer.text,
                isCorrectAnswer = answer.isCorrectAnswer ?: false,
                question = newQuestion
            )
        }.toMutableList()

        questionRepository.save(newQuestion)
    }

    @Transactional
    fun createQuestionsBulk(dtos: List<CreateQuestionDto>) {
        dtos.forEach { createQuestion(it) }
    }

    fun deleteQuestion(id: UUID) {
        questionRepository.deleteById(id)
    }
}