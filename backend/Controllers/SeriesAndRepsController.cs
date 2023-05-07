using backend.Dto;
using backend.Entities;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Authorize]
[Route("api/SeriesAndReps")]
[ApiController]
public class SeriesAndRepsController : ControllerBase
{
    private readonly ISeriesAndRepsRepository _seriesAndRepsRepo;

    public SeriesAndRepsController(ISeriesAndRepsRepository seriesAndRepsRepo)
    {
        _seriesAndRepsRepo = seriesAndRepsRepo;
    }

    [HttpGet("id", Name = "SeriesAndRepsById")]
    public async Task<IActionResult> GetSeriesAndReps(int id)
    {
        var seriesAndRepsRepo = await _seriesAndRepsRepo.GetSeriesAndReps(id);
        if (seriesAndRepsRepo is null)
            return NotFound();
        return Ok(seriesAndRepsRepo);
    }

    [HttpGet("ByExerciseId/{id}")]
    public async Task<IActionResult> GetSeriesAndRepsByExerciseId(int id)
    {
        var exerciseRepo = await _seriesAndRepsRepo.GetSeriesAndRepsByExerciseId(id);
        if (exerciseRepo is null)
            return NotFound();
        return Ok(exerciseRepo);
    }

    [HttpGet("ByExerciseAndSeries/{idExercise}/{idSeries}")]
    public async Task<IActionResult> GetSeriesAndRepsByExerciseAndSeries(int idExercise, int idSeries)
    {
        var exerciseRepo = await _seriesAndRepsRepo.GetSeriesAndRepsByExerciseAndSeries(idExercise, idSeries);
        if (exerciseRepo is null)
            return NotFound();
        return Ok(exerciseRepo);
    }

    [HttpPost]
    public async Task<IActionResult> AddSeriesAndReps([FromBody] SeriesAndRepsDto seriesAndRepsDto)
    {
        var addSeriesAndReps = await _seriesAndRepsRepo.AddSeriesAndReps(seriesAndRepsDto);

        return CreatedAtRoute("SeriesAndRepsById", new { id = addSeriesAndReps.Id }, addSeriesAndReps);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateSeriesAndReps([FromBody] SeriesAndRepsDto[] seriesAndReps)
    {
        foreach (var seriesAndRep in seriesAndReps)
        {
            var exerciseRepo = await _seriesAndRepsRepo.GetSeriesAndRepsByExerciseAndSeries(seriesAndRep.IdExercise, seriesAndRep.SeriesNumber);
 
        }

        await _seriesAndRepsRepo.UpdateSeriesAndReps(seriesAndReps);

        return NoContent();
    }

}