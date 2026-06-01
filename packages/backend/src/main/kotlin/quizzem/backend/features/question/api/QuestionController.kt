package quizzem.backend.features.question.api

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import quizzem.backend.features.question.api.dto.CreateQuestionDto
import quizzem.backend.features.question.service.QuestionService

@RestController
@RequestMapping("/questions")
class QuestionController(val questionService: QuestionService) {
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