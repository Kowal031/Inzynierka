using System.Data;
using backend.Context;
using backend.Dto;
using backend.Entities;
using backend.Interfaces;
using Dapper;

namespace backend.Repository;

public class ExerciseRepository : IExerciseRepository
{
    private readonly DapperContext _context;

    public ExerciseRepository(DapperContext context) => _context = context;

    public async Task<IEnumerable<Exercise>> GetExercise()
    {
        var query = @"SELECT * FROM Exercise
ORDER BY Id
                     ";
        using var connection = _context.CreateConnection();
        var exercise = await connection.QueryAsync<Exercise>(query);

        return exercise;
    }

    public async Task<IEnumerable<Exercise>> GetExerciseByTrainingId(int id)
    {
        var query = @"SELECT * FROM Exercise
WHERE IdTraining = @Id
ORDER BY Id
                     ";
        using var connection = _context.CreateConnection();
        var exercise = await connection.QueryAsync<Exercise>(query, new { id });

        return exercise;
    }

    public async Task<Exercise> GetExercise(int id)
    {
        var query = @"SELECT * FROM Exercise
                     WHERE Id = @Id
                     ORDER BY Id";
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

    public async Task UpdateExercise(EditExerciseDto[] editExerciseDtos)
    {
        
        
        var query =
            @"DECLARE @BasicNumberOfSeries INT;
SELECT @BasicNumberOfSeries = NumberOfSeries
FROM Exercise
WHERE Id = @Id;

IF @NumberOfSeries = 0
BEGIN
   SET @NumberOfSeries = @BasicNumberOfSeries;
END

UPDATE Exercise 
SET 
    Name = @Name, 
    IdExerciseBase = @IdExerciseBase,  
    NumberOfSeries = @NumberOfSeries
WHERE 
    Id = @Id;";

        using (var connection = _context.CreateConnection())
        {
            foreach (var editExerciseDto in editExerciseDtos)
            {
                var parameters = new DynamicParameters();

                parameters.Add("Id", editExerciseDto.Id, DbType.Int32);
                parameters.Add("Name", editExerciseDto.Name, DbType.String);

                parameters.Add("IdExerciseBase", editExerciseDto.IdExerciseBase, DbType.Int32);
                parameters.Add("NumberOfSeries", editExerciseDto.NumberOfSeries, DbType.Int32);
                parameters.Add("TrainingTitle", editExerciseDto.TreningTitle, DbType.String);

                await connection.ExecuteAsync(query, parameters);

                var trainingQuery = @"UPDATE Training SET Name = @TrainingTitle WHERE Id = @IdTraining";
                var parametersForTraining = new DynamicParameters();
                parametersForTraining.Add("IdTraining", editExerciseDto.IdTraining, DbType.Int32);
                parametersForTraining.Add("TrainingTitle", editExerciseDto.TreningTitle, DbType.String);

                await connection.ExecuteAsync(trainingQuery, parametersForTraining);
            }
        }
    }
}