package quizzem.backend.features.question.service

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import quizzem.backend.features.question.api.dto.CreateQuestionDto
import quizzem.backend.features.question.model.AnswerMode
import quizzem.backend.features.question.model.AnswerModel
import quizzem.backend.features.question.model.MediaType
import quizzem.backend.features.question.model.QuestionModel
import quizzem.backend.features.question.repository.QuestionRepository

@Service
class QuestionService(
    val questionRepository: QuestionRepository,
) {
    fun getAllQuestions(): List<QuestionModel> {
        return questionRepository.findAll()
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
}