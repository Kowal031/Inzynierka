using System.Data;
using backend.Context;
using backend.Dto;
using backend.Entities;
using backend.Interfaces;
using Dapper;

namespace backend.Repository;

public class SeriesAndRepsRepository : ISeriesAndRepsRepository
{
    private readonly DapperContext _context;

    public SeriesAndRepsRepository(DapperContext context) => _context = context;


    public async Task<SeriesAndReps> GetSeriesAndReps(int id)
    {
        var query = @"SELECT * FROM SeriesAndReps
ORDER BY Id
                     ";
        using var connection = _context.CreateConnection();
        var seriesAndReps = await connection.QuerySingleOrDefaultAsync<SeriesAndReps>(query, new { id });

        return seriesAndReps;
    }

    public async Task<SeriesAndReps> GetSeriesAndRepsByExerciseAndSeries(int idExercise, int idSeries)
    {
        var query = @"SELECT * FROM SeriesAndReps WHERE idExercise = @idExercise AND  seriesNumber = @idSeries
ORDER BY Id
                     ";
        using var connection = _context.CreateConnection();
        var seriesAndReps =
            await connection.QuerySingleOrDefaultAsync<SeriesAndReps>(query, new { idExercise, idSeries });

        return seriesAndReps;
    }

    public async Task<IEnumerable<SeriesAndReps>> GetSeriesAndRepsByExerciseId(int id)
    {
        var query = @"SELECT * FROM SeriesAndReps
WHERE IdExercise = @Id
ORDER BY Id

                     ";
        using var connection = _context.CreateConnection();
        var exercise = await connection.QueryAsync<SeriesAndReps>(query, new { id });

        return exercise;
    }


    public async Task<SeriesAndReps> AddSeriesAndReps(SeriesAndRepsDto seriesAndRepsDto)
    {
        var query =
            @"INSERT INTO SeriesAndReps(IdExercise, SeriesNumber, Reps, Weight) 
            VALUES (@IdExercise, @SeriesNumber, @Reps, @Weight)
            SELECT CAST(SCOPE_IDENTITY() AS int)";

        var parametrs = new DynamicParameters();
        parametrs.Add("IdExercise", seriesAndRepsDto.IdExercise, DbType.Int32);
        parametrs.Add("SeriesNumber", seriesAndRepsDto.SeriesNumber, DbType.Int32);
        parametrs.Add("Reps", seriesAndRepsDto.Reps, DbType.Int32);
        parametrs.Add("Weight", seriesAndRepsDto.Weight, DbType.Int32);

        using var connection = _context.CreateConnection();
        var id = await connection.QuerySingleAsync<int>(query, parametrs);

        var createdSeriesAndReps = new SeriesAndReps
        {
            Id = id,
            IdExercise = seriesAndRepsDto.IdExercise,
            SeriesNumber = seriesAndRepsDto.SeriesNumber,
            Reps = seriesAndRepsDto.Reps,
            Weight = seriesAndRepsDto.Weight,
        };

        return createdSeriesAndReps;
    }

    public async Task UpdateSeriesAndReps(SeriesAndRepsDto[] seriesAndReps)
    {
        var query = @"
DECLARE @IdTraining INT;
DECLARE @IdBaseExercise INT;
DECLARE @ExerciseName VARCHAR(50);
SELECT @IdTraining = IdTraining, @ExerciseName = Name, @IdBaseExercise = IdExerciseBase FROM Exercise WHERE Id = @IdExercise;

DECLARE @Title VARCHAR(50);
SELECT @Title = Name FROM Training WHERE Id = @IdTraining;

MERGE SeriesAndReps AS target
USING (SELECT @IdExercise AS IdExercise, @SeriesNumber AS SeriesNumber, @Reps AS Reps, @Weight AS Weight) AS source
ON (target.IdExercise = source.IdExercise AND target.SeriesNumber = source.SeriesNumber)
WHEN MATCHED THEN
UPDATE SET target.Reps = source.Reps, target.Weight = source.Weight
WHEN NOT MATCHED THEN
INSERT (IdExercise, SeriesNumber, Reps, Weight) VALUES (source.IdExercise, source.SeriesNumber, source.Reps, source.Weight);

INSERT INTO History (IdExercise, Reps, Weight, TrainingId, TrainingTitle, Date, IdBaseExercise, ExerciseName)
VALUES (@IdExercise, @Reps, @Weight, @IdTraining, @Title, GETDATE(), @IdBaseExercise, @ExerciseName);
";
        using (var connection = _context.CreateConnection())
        {
            foreach (var seriesAndRep in seriesAndReps)
            {
                var parameters = new DynamicParameters();
                parameters.Add("IdExercise", seriesAndRep.IdExercise, DbType.Int32);
                parameters.Add("SeriesNumber", seriesAndRep.SeriesNumber, DbType.Int32);
                parameters.Add("Reps", seriesAndRep.Reps, DbType.Int32);
                parameters.Add("Weight", seriesAndRep.Weight, DbType.Int32);

                await connection.ExecuteAsync(query, parameters);
            }
        }
    }
}