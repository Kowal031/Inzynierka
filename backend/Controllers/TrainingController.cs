using backend.Dto;
using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/Training")]
[ApiController]
public class TrainingController : ControllerBase
{
    private readonly ITrainingRepository _trainingRepo;

    public TrainingController(ITrainingRepository trainingRepo)
    {
        _trainingRepo = trainingRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetExerciseBase()
    {
        try
        {
            var trainingRepo = await _trainingRepo.GetTrainings();
            return Ok(trainingRepo);
        }
        catch (Exception ex)
        {
            //log error
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("id", Name = "TrainingById")]
    public async Task<IActionResult> GetTraining(int id)
    {
        var trainingRepo = await _trainingRepo.GetTraining(id);
        if (trainingRepo is null)
            return NotFound();
        return Ok(trainingRepo);
    }


    [HttpPost]
    public async Task<IActionResult> CreateTraining([FromBody] TrainingDto trainingDto)
    {
        var createdTraining = await _trainingRepo.CreateTraining(trainingDto);

        return CreatedAtRoute("TrainingById", new { id = createdTraining.Id }, createdTraining);
    }
}