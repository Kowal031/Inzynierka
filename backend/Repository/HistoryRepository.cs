using backend.Context;
using backend.Entities;
using backend.Interfaces;
using Dapper;

namespace backend.Repository;

public class HistoryRepository : IHistoryRepository
{
    private readonly DapperContext _context;
    public HistoryRepository(DapperContext context) => _context = context;
    
    public async Task<IEnumerable<History>> GetHistory(int userId)
    {
        var query = @"SELECT * FROM History
         WHERE UserId = @UserId
ORDER BY Id
                     ";
        using var connection = _context.CreateConnection();
        var history = await connection.QueryAsync<History>(query, new { userId });

        return history;
    }


}