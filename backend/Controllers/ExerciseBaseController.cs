using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

[Route("api/ExerciseBase")]
[ApiController]
public class ExerciseBaseController : ControllerBase
{
    private readonly IExerciseBaseRepository _exerciseRepo;

    public ExerciseBaseController(IExerciseBaseRepository exerciseRepo)
    {
        _exerciseRepo = exerciseRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetExerciseBase()
    {
        try
        {
            var exerciseRepo = await _exerciseRepo.GetExerciseBase();
            return Ok(exerciseRepo);
        }
        catch (Exception ex)
        {
            //log error
            return StatusCode(500, ex.Message);
        }
    }
}