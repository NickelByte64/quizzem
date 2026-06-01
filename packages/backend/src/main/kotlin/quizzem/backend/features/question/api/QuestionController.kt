package quizzem.backend.features.question.api

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import quizzem.backend.features.question.api.dto.CreateQuestionDto
import quizzem.backend.features.question.model.QuestionModel
import quizzem.backend.features.question.service.QuestionService

@RestController
@RequestMapping("/questions")
class QuestionController(val questionService: QuestionService) {
    @PostMapping
    fun createQuestion(@RequestBody dto: CreateQuestionDto): QuestionModel {
        return questionService.createQuestion(dto)
    }
}