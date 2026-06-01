package quizzem.backend.features.question.service

import org.springframework.stereotype.Service
import quizzem.backend.features.question.api.dto.CreateQuestionDto
import quizzem.backend.features.question.model.AnswerModel
import quizzem.backend.features.question.model.QuestionModel
import quizzem.backend.features.question.repository.AnswerRepository
import quizzem.backend.features.question.repository.QuestionRepository

@Service
class QuestionService(
    val questionRepository: QuestionRepository,
    val answerRepository: AnswerRepository,
) {
    fun createQuestion(dto: CreateQuestionDto): QuestionModel {
        val answers = emptyList<AnswerModel>()

        val newQuestion = QuestionModel(
            text = dto.text,
            answerMode = dto.answerMode,
            mediaType = dto.mediaType,
        )

        for (answer in dto.answers) {
            val newAnswer =
                AnswerModel(
                    text = answer.text,
                    isCorrectAnswer = answer.isCorrectAnswer,
                    question = newQuestion
                )

            answerRepository.save(newAnswer)
            answers.plus(newAnswer)
        }

        newQuestion.answers = answers.toMutableList()

        questionRepository.save(newQuestion)

        return newQuestion
    }
}