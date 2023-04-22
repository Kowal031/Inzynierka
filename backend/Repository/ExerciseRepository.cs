using System.Data;
using backend.Context;
using backend.Dto;
using backend.Entities;
using backend.Interfaces;
using Dapper;

namespace backend.Repository;

public class ExerciseRepository  : IExerciseRepository
{
    private readonly DapperContext _context;

    public ExerciseRepository(DapperContext context) => _context = context;
    
    public async Task<Exercise> GetExercise(int id)
    {
        var query = @"SELECT * FROM Exercise
                     WHERE Id = @Id";
        using var connection = _context.CreateConnection();
        var exercise = await connection.QuerySingleOrDefaultAsync<Exercise>(query, new { id });

        return exercise;
    }
    
    public async Task<Exercise> AddExercise(ExerciseDto exercise)
    {
        var query =
            @"INSERT INTO Exercise(IdTraining, IdExerciseBase) 
            VALUES (@IdTraining, @IdExerciseBase)
            SELECT CAST(SCOPE_IDENTITY() AS int)";

        var parametrs = new DynamicParameters();
        parametrs.Add("IdTraining", exercise.IdTraining, DbType.Int32);
        parametrs.Add("IdExerciseBase", exercise.IdExerciseBase, DbType.Int32);

        using var connection = _context.CreateConnection();
        var id = await connection.QuerySingleAsync<int>(query, parametrs);

        var createdExercise = new Exercise
        {
            Id = id,
            IdTraining = exercise.IdTraining,
            IdExerciseBase = exercise.IdExerciseBase,
        };

        return createdExercise;
    }
}