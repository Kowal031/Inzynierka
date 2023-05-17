using backend.Dto; // Importuje przestrzeń nazw backend.Dto, zawierającą klasy obiektów transferu danych (DTO)
using backend.Entities; // Importuje przestrzeń nazw backend.Entities, zawierającą klasy encji

namespace backend.Interfaces  // Przestrzeń nazw backend.Interfaces, która zawiera interfejsy
{
    public interface ITrainingRepository  // Interfejs ITrainingRepository definiuje operacje dla repozytorium treningów
    {
        public Task<IEnumerable<Training>> GetTrainingsByUserId(int userId);    // Metoda GetTrainingsByUserId zwraca kolekcję treningów dla określonego identyfikatora użytkownika
        public Task<IEnumerable<Training>> GetTrainings();  // Metoda GetTrainings zwraca kolekcję wszystkich treningów
        public Task<Training> GetTraining(int id);   // Metoda GetTraining zwraca trening o określonym identyfikatorze
        public Task<Training> CreateTraining(TrainingDto training);  // Metoda CreateTraining tworzy nowy trening na podstawie obiektu transferu danych (DTO)
        public Task DeleteTraining(int id);  // Metoda DeleteTraining usuwa trening o określonym identyfikatorze
       
    }
}