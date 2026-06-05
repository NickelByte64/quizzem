package quizzem.backend.features.question.api

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import quizzem.backend.features.question.api.dto.CreateQuestionDto
import quizzem.backend.features.question.api.dto.QuestionDto
import quizzem.backend.features.question.mapper.toDto
import quizzem.backend.features.question.service.QuestionService

@RestController
@RequestMapping("/questions")
class QuestionController(val questionService: QuestionService) {
    @GetMapping
    fun getAllQuestions(): List<QuestionDto> {
        val questions = questionService.getAllQuestions()
        return questions.map { it.toDto() }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createQuestion(@RequestBody dto: CreateQuestionDto) {
        questionService.createQuestion(dto)
    }

    @PostMapping("/bulk")
    @ResponseStatus(HttpStatus.CREATED)
    fun createQuestionsBulk(@RequestBody dtos: List<CreateQuestionDto>) {
        questionService.createQuestionsBulk(dtos)
    }
}