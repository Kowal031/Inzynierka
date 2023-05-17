using System.Data; // Importuje przestrzeń nazw System.Data, zawierającą klasy do obsługi danych
using System.Data.SqlClient; // Importuje przestrzeń nazw System.Data.SqlClient, zawierającą klasy specyficzne dla obsługi SQL Servera

namespace backend.Context
{
    public class DapperContext
    {
        private readonly IConfiguration _configuration; // Pole przechowujące obiekt IConfiguration
        private readonly string _connectionString; // Pole przechowujące ciąg połączenia do bazy danych

        public DapperContext(IConfiguration configuration)
        {
            _configuration = configuration; // Przypisanie obiektu IConfiguration do pola _configuration w konstruktorze
            _connectionString = _configuration.GetConnectionString("DefaultConnection"); // Pobranie ciągu połączenia o nazwie "DefaultConnection" z obiektu konfiguracji
        }

        public IDbConnection CreateConnection() // Metoda do tworzenia połączenia
            => new SqlConnection(_connectionString); // Tworzenie nowego połączenia SqlConnection i zwracanie go jako obiekt IDbConnection
    }
}