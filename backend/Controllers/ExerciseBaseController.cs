using backend.Interfaces; // Importuje przestrzeń nazw backend.Interfaces, zawierającą IExerciseBaseRepository
using Microsoft.AspNetCore.Authorization; // Importuje przestrzeń nazw Microsoft.AspNetCore.Authorization, zawierającą funkcje uwierzytelniania i autoryzacji
using Microsoft.AspNetCore.Mvc; // Importuje przestrzeń nazw Microsoft.AspNetCore.Mvc, zawierającą funkcje obsługi żądań HTTP i generowania odpowiedzi

[Authorize] // Wymaga uwierzytelnienia dla dostępu do kontrolera
[Route("api/ExerciseBase")] // Określa ścieżkę bazową dla wszystkich metod w kontrolerze
[ApiController] // Informuje framework, że klasa jest kontrolerem API
public class ExerciseBaseController : ControllerBase
{
    private readonly IExerciseBaseRepository _exerciseRepo; // Pole przechowujące repozytorium IExerciseBaseRepository

    public ExerciseBaseController(IExerciseBaseRepository exerciseRepo)
    {
        _exerciseRepo = exerciseRepo; // Przypisanie zależności IExerciseBaseRepository do pola _exerciseRepo w konstruktorze
    }

    [HttpGet] // Obsługuje żądania HTTP GET
    public async Task<IActionResult> GetExerciseBase()
    {
        try
        {
            var exerciseRepo = await _exerciseRepo.GetExerciseBase(); // Pobiera dane dotyczące baz ćwiczeń
            return Ok(exerciseRepo); // Zwraca wynik operacji z kodem stanu 200 (OK) i danymi baz ćwiczeń
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message); // Zwraca odpowiedź ze statusem 500 (Internal Server Error) i komunikatem błędu
        }
    }
}