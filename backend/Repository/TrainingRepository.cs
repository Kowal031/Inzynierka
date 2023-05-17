using System.Data; // Importuje przestrzeń nazw System.Data, zawierającą typy dla obsługi danych
using backend.Context; // Importuje przestrzeń nazw backend.Context, zawierającą kontekst Dapper
using backend.Dto; // Importuje przestrzeń nazw backend.Dto, zawierającą klasy obiektów transferu danych (DTO)
using backend.Entities; // Importuje przestrzeń nazw backend.Entities, zawierającą klasy encji
using backend.Interfaces; // Importuje przestrzeń nazw backend.Interfaces, zawierającą interfejsy
using Dapper; // Importuje przestrzeń nazw Dapper, zawierającą metody rozszerzeń dla Dapper

namespace backend.Repository // Przestrzeń nazw backend.Repository, która zawiera implementacje repozytoriów
{
    public class TrainingRepository : ITrainingRepository // Klasa TrainingRepository implementuje interfejs ITrainingRepository i obsługuje operacje na treningach
    {
        private readonly DapperContext _context; // Pole przechowujące instancję kontekstu Dapper

        public TrainingRepository(DapperContext context) => _context = context;  // Konstruktor klasy TrainingRepository, który przyjmuje instancję kontekstu Dapper i przypisuje ją do pola _context
        
        public async Task<IEnumerable<Training>> GetTrainingsByUserId(int userId) // Metoda GetTrainingsByUserId zwraca kolekcję treningów dla określonego identyfikatora użytkownika
        {
            var query = @"SELECT * FROM Training
                         WHERE userId = @userId
                         ORDER BY Id DESC";
            using var connection = _context.CreateConnection();
            var trainings = await connection.QueryAsync<Training>(query, new { userId });

            return trainings;
        }
        
        public async Task<IEnumerable<Training>> GetTrainings()   // Metoda GetTrainings zwraca kolekcję wszystkich treningów
        {
            var query = @"SELECT * FROM Training
                         ORDER BY Id DESC";
            using var connection = _context.CreateConnection();
            var trainings = await connection.QueryAsync<Training>(query);

            return trainings.ToList();
        }

        public async Task<Training> GetTraining(int id)  // Metoda GetTraining zwraca trening o określonym identyfikatorze
        {
            var query = @"SELECT * FROM Training
                     WHERE Id = @Id
                        ORDER BY Id";
            using var connection = _context.CreateConnection();
            var training = await connection.QuerySingleOrDefaultAsync<Training>(query, new { id });

            return training;
        }

        public async Task<Training> CreateTraining(TrainingDto training)  // Metoda CreateTraining tworzy nowy trening na podstawie obiektu transferu danych (DTO)
        {
            var query =
                @"IF NOT EXISTS (SELECT * FROM Training)
                    BEGIN
                        DBCC CHECKIDENT (Training, RESEED, 0);
                    END

                INSERT INTO Training(Name, ShouldersInjury ,ChestInjury  ,BackInjury  ,BicepsInjury ,TricepsInjury
                        ,AbdominalInjury ,ButtocksInjury ,QuadricepsInjury ,HamstringsInjury ,ClavesInjury, Date, userId ) 
                VALUES (@Name, @ShouldersInjury ,@ChestInjury  ,@BackInjury  ,@BicepsInjury ,@TricepsInjury
                        ,@AbdominalInjury ,@ButtocksInjury ,@QuadricepsInjury ,@HamstringsInjury ,@ClavesInjury, GETDATE(), @UserId)

                SELECT CAST(SCOPE_IDENTITY() AS int)";

            var parametrs = new DynamicParameters();
            parametrs.Add("Name", training.Name, DbType.String);
            parametrs.Add("UserId", training.userId, DbType.Int32);

            using var connection = _context.CreateConnection();
            var id = await connection.QuerySingleAsync<int>(query, parametrs);

            var createdTraining = new Training
            {
                Id = id,
                Name = training.Name,
                userId = training.userId
            };

            return createdTraining;
        }

        public async Task DeleteTraining(int id) // Metoda DeleteTraining usuwa trening o określonym identyfikatorze
        {
            var query = @"DELETE FROM Training WHERE Id = @Id
                          DELETE FROM Exercise WHERE IdTraining = @Id
                          DELETE FROM SeriesAndReps WHERE IdTraining = @Id";

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
            }
        }
    }
}