using backend.Dto;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/Exercise")]
[ApiController]
public class ExerciseController : ControllerBase
{
    private readonly IExerciseRepository _exerciseRepo;

    public ExerciseController(IExerciseRepository exerciseRepo)
    {
        _exerciseRepo = exerciseRepo;
    }
    
    [HttpGet("id", Name = "ExerciseById")]
    public async Task<IActionResult> GetTraining(int id)
    {
        var exerciseRepo = await _exerciseRepo.GetExercise(id);
        if (exerciseRepo is null)
            return NotFound();
        return Ok(exerciseRepo);
    }
    
    [HttpPost]
    public async Task<IActionResult> AddExercise([FromBody] ExerciseDto exerciseDto)
    {
        var addExercise = await _exerciseRepo.AddExercise(exerciseDto);

        return CreatedAtRoute("ExerciseById", new { id = addExercise.Id }, addExercise);
    }
}