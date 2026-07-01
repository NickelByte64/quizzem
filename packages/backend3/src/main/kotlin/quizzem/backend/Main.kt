package quizzem.backend

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/quizzes")
class Main {
    @GetMapping("/yeah")
    fun ping() = "flicked"
}