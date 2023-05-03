using backend.Context;
using backend.Entities;
using backend.Interfaces;
using Dapper;

namespace backend.Repository;

public class HistoryRepository : IHistoryRepository
{
    private readonly DapperContext _context;
    public HistoryRepository(DapperContext context) => _context = context;
    
    public async Task<IEnumerable<History>> GetHistory()
    {
        var query = @"SELECT * FROM History
ORDER BY Id
                     ";
        using var connection = _context.CreateConnection();
        var history = await connection.QueryAsync<History>(query);

        return history;
    }
}