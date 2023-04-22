using backend.Context;
using backend.Entities;
using backend.Interfaces;
using Dapper;

namespace backend.Repository;

public class ExerciseBaseRepository : IExerciseBaseRepository
{
    private readonly DapperContext _context;

    public ExerciseBaseRepository(DapperContext context) => _context = context;

    public async Task<IEnumerable<ExerciseBase>> GetExerciseBase()
    {
        var query = @"SELECT * FROM ExerciseBase
                       ORDER BY Name";
        using (var connection = _context.CreateConnection())
        {
            var exercise = await connection.QueryAsync<ExerciseBase>(query);

            return exercise.ToList();
        }
    }
}