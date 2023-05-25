using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Authorize]
[Route("api/History")]
[ApiController]
public class HistoryController : ControllerBase
{
    private readonly IHistoryRepository _historyRepo;
    
    public HistoryController(IHistoryRepository historyRepo)
    {
        _historyRepo = historyRepo;
    }
    
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetTraining(int userId)
    {
        var historyRepo = await _historyRepo.GetHistory(userId);
        if (historyRepo is null)
            return NotFound();
        return Ok(historyRepo);
    }
}