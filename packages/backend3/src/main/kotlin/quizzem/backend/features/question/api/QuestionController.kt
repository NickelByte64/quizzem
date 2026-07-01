package quizzem.backend.features.question.api

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import quizzem.backend.core.api.dto.PageableDto
import quizzem.backend.features.question.api.dto.CreateQuestionDto
import quizzem.backend.features.question.api.dto.GetAllQuestionsParamsDto
import quizzem.backend.features.question.api.dto.QuestionDto
import quizzem.backend.features.question.api.dto.UpdateQuestionDto
import quizzem.backend.features.question.mapper.toDto
import quizzem.backend.features.question.service.QuestionService
import java.util.*

@RestController
@RequestMapping("/questions")
class QuestionController(val questionService: QuestionService) {
    @GetMapping
    fun getAllQuestions(
        @ModelAttribute params: GetAllQuestionsParamsDto,
    ): PageableDto<QuestionDto> {
        val questions = questionService.getAllQuestions(params)
        return PageableDto(
            data = questions.data.map { it.toDto() },
            page = questions.page,
            size = questions.size,
            totalElements = questions.totalElements,
            totalPages = questions.totalPages
        )
    }

    @GetMapping("/{id}")
    fun getQuestionById(@PathVariable id: UUID): QuestionDto {
        val question = questionService.getQuestionById(id)
        return question.toDto()
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

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun updateQuestion(@PathVariable id: UUID, @RequestBody dto: UpdateQuestionDto) {
        questionService.updateQuestion(id, dto)
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteQuestion(@PathVariable id: UUID) {
        questionService.deleteQuestion(id)
    }
}