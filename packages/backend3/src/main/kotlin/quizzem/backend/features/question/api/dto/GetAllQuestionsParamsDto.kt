package quizzem.backend.features.question.api.dto

import quizzem.backend.core.api.dto.PageableParamsDto

class GetAllQuestionsParamsDto(
    page: Int = 0,
    size: Int = 10,
) : PageableParamsDto(page, size)
