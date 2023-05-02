using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/History")]
[ApiController]
public class HistoryController : ControllerBase
{
    private readonly IHistoryRepository _historyRepo;
    
    public HistoryController(IHistoryRepository historyRepo)
    {
        _historyRepo = historyRepo;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetTraining()
    {
        var historyRepo = await _historyRepo.GetHistory();
        if (historyRepo is null)
            return NotFound();
        return Ok(historyRepo);
    }
}