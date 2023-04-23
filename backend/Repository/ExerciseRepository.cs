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
    
    public async Task<IEnumerable<Exercise>> GetExercise()
    {
        var query = @"SELECT * FROM Exercise
                     ";
        using var connection = _context.CreateConnection();
        var exercise = await connection.QueryAsync<Exercise>(query);

        return exercise;
    }
    
    public async Task<IEnumerable<Exercise>> GetExerciseByTrainingId(int id)
    {
        var query = @"SELECT * FROM Exercise
WHERE IdTraining = @Id
                     ";
        using var connection = _context.CreateConnection();
        var exercise = await connection.QueryAsync<Exercise>(query, new {id});

        return exercise;
    }
    
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
            @"INSERT INTO Exercise(IdTraining, Name, IdExerciseBase,NumberOfSeries) 
            VALUES (@IdTraining, @Name, @IdExerciseBase, @NumberOfSeries)
            SELECT CAST(SCOPE_IDENTITY() AS int)";

        var parametrs = new DynamicParameters();
        parametrs.Add("IdTraining", exercise.IdTraining, DbType.Int32);
        parametrs.Add("Name", exercise.Name, DbType.String);
        parametrs.Add("IdExerciseBase", exercise.IdExerciseBase, DbType.Int32);
        parametrs.Add("NumberOfSeries", exercise.NumberOfSeries, DbType.Int32);

        using var connection = _context.CreateConnection();
        var id = await connection.QuerySingleAsync<int>(query, parametrs);

        var createdExercise = new Exercise
        {
            Id = id,
            IdTraining = exercise.IdTraining,
            Name = exercise.Name,
            IdExerciseBase = exercise.IdExerciseBase,
            NumberOfSeries = exercise.NumberOfSeries,
        };

        return createdExercise;
    }
    
    public async Task DeleteExercise(int id)
    {
        var query = @"DELETE FROM Exercise WHERE Id = @Id";

        using (var connection = _context.CreateConnection())
        {
            await connection.ExecuteAsync(query, new { id });
        }
    }

    public async Task DeleteExercises(int id)
    {
        var query = @"DELETE FROM Exercise WHERE IdTraining = @Id";
        using (var connection = _context.CreateConnection())
        {
            await connection.ExecuteAsync(query, new { id });
        }
    }
}