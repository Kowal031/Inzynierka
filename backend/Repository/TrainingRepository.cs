using System.Data;
using backend.Context;
using backend.Dto;
using backend.Entities;
using backend.Interfaces;
using Dapper;

namespace backend.Repository;

public class TrainingRepository : ITrainingRepository
{
    private readonly DapperContext _context;

    public TrainingRepository(DapperContext context) => _context = context;

    public async Task<IEnumerable<Training>> GetTrainings()
    {
        var query = @"SELECT * FROM Training
                       ORDER BY Name";
        using var connection = _context.CreateConnection();
        var trainings = await connection.QueryAsync<Training>(query);

        return trainings.ToList();
    }

    public async Task<Training> GetTraining(int id)
    {
        var query = @"SELECT * FROM Training
                     WHERE Id = @Id";
        using var connection = _context.CreateConnection();
        var training = await connection.QuerySingleOrDefaultAsync<Training>(query, new { id });

        return training;
    }

    public async Task<Training> CreateTraining(TrainingDto training)
    {
        var query =
            @"IF NOT EXISTS (SELECT * FROM Training)
                BEGIN
                    DBCC CHECKIDENT (Training, RESEED, 0);
                END

            INSERT INTO Training(Name, ShouldersInjury ,ChestInjury  ,BackInjury  ,BicepsInjury ,TricepsInjury
                    ,AbdominalInjury ,ButtocksInjury ,QuadricepsInjury ,HamstringsInjury ,ClavesInjury, Date) 
            VALUES (@Name, @ShouldersInjury ,@ChestInjury  ,@BackInjury  ,@BicepsInjury ,@TricepsInjury
                    ,@AbdominalInjury ,@ButtocksInjury ,@QuadricepsInjury ,@HamstringsInjury ,@ClavesInjury, GETDATE())

            SELECT CAST(SCOPE_IDENTITY() AS int)";

        var parametrs = new DynamicParameters();
        parametrs.Add("Name", training.Name, DbType.String);
        parametrs.Add("ShouldersInjury", training.ShouldersInjury, DbType.Int32);
        parametrs.Add("ChestInjury", training.ChestInjury, DbType.Int32);
        parametrs.Add("BackInjury", training.BackInjury, DbType.Int32);
        parametrs.Add("BicepsInjury", training.BicepsInjury, DbType.Int32);
        parametrs.Add("TricepsInjury", training.TricepsInjury, DbType.Int32);
        parametrs.Add("AbdominalInjury", training.AbdominalInjury, DbType.Int32);
        parametrs.Add("ButtocksInjury", training.ButtocksInjury, DbType.Int32);
        parametrs.Add("QuadricepsInjury", training.QuadricepsInjury, DbType.Int32);
        parametrs.Add("HamstringsInjury", training.HamstringsInjury, DbType.Int32);
        parametrs.Add("ClavesInjury", training.ClavesInjury, DbType.Int32);

        using var connection = _context.CreateConnection();
        var id = await connection.QuerySingleAsync<int>(query, parametrs);

        var createdTraining = new Training
        {
            Id = id,
            Name = training.Name,
            ShouldersInjury = training.ShouldersInjury,
            ChestInjury = training.ChestInjury,
            BackInjury = training.BackInjury,
            BicepsInjury = training.BicepsInjury,
            TricepsInjury = training.TricepsInjury,
            AbdominalInjury = training.AbdominalInjury,
            ButtocksInjury = training.ButtocksInjury,
            QuadricepsInjury = training.QuadricepsInjury,
            HamstringsInjury = training.HamstringsInjury,
            ClavesInjury = training.ClavesInjury,
        };

        return createdTraining;
    }

    public async Task DeleteTraining(int id)
    {
        var query = @"DELETE FROM Training WHERE Id = @Id
";

        using (var connection = _context.CreateConnection())
        {
            await connection.ExecuteAsync(query, new { id });
        }
    }
}