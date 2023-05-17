namespace backend.Entities
{
    // Przestrzeń nazw backend.Entities, która zawiera definicje klas dla encji

    public class EditExerciseDto
    {
        // Klasa EditExerciseDto reprezentuje obiekt transferu danych (DTO) do edycji ćwiczenia

        public int Id { get; set; } // Właściwość Id reprezentująca identyfikator ćwiczenia
        public int IdTraining { get; set; } // Właściwość IdTraining reprezentująca identyfikator treningu
        public string TreningTitle { get; set; } // Właściwość TreningTitle reprezentująca tytuł treningu
        public string Name { get; set; } // Właściwość Name reprezentująca nazwę ćwiczenia
        public int IdExerciseBase { get; set; } // Właściwość IdExerciseBase reprezentująca identyfikator bazy ćwiczeń
        public int NumberOfSeries { get; set; } // Właściwość NumberOfSeries reprezentująca liczbę serii
    }
}