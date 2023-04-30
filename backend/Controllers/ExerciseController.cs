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
    
    [HttpGet]
    public async Task<IActionResult> GetTraining()
    {
        var exerciseRepo = await _exerciseRepo.GetExercise();
        if (exerciseRepo is null)
            return NotFound();
        return Ok(exerciseRepo);
    }
    
    [HttpGet("ByTrainingId/{id}")]
    public async Task<IActionResult> GetExerciseByTrainingId(int id)
    {
        var exerciseRepo = await _exerciseRepo.GetExerciseByTrainingId(id);
        if (exerciseRepo is null)
            return NotFound();
        return Ok(exerciseRepo);
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
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteExercise(int id)
    {
        var exerciseRepo = await _exerciseRepo.GetExercise(id);
        if (exerciseRepo is null)
            return NotFound();
        await _exerciseRepo.DeleteExercise(id);

        return NoContent();
    }
    [HttpDelete("ByTrainingId/{id}")]
    public async Task<IActionResult> DeleteExercises(int id)
    {
        var exerciseRepo = await _exerciseRepo.GetExercise();
        if (exerciseRepo is null)
            return NotFound();
        await _exerciseRepo.DeleteExercises(id);

        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateExercise(int id, [FromBody] ExerciseDto exerciseDto)
    {
        var exerciseRepo = await _exerciseRepo.GetExercise(id);
        if (exerciseRepo is null)
            return NotFound();
        await _exerciseRepo.UpdateExercise(id, exerciseDto);

        return NoContent();
    }
}