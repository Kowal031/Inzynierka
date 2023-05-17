namespace backend.Entities    // Przestrzeń nazw backend.Entities, która zawiera definicje klas dla encji
{
    public class History // Klasa History reprezentuje obiekt dla historii ćwiczeń
    {
        public int Id { get; set; } // Właściwość Id reprezentująca identyfikator historii
        public int IdExercise { get; set; } // Właściwość IdExercise reprezentująca identyfikator ćwiczenia
        public int Reps { get; set; } // Właściwość Reps reprezentująca liczbę powtórzeń
        public int Weight { get; set; } // Właściwość Weight reprezentująca wagę
        public int TrainingId { get; set; } // Właściwość TrainingId reprezentująca identyfikator treningu
        public string TrainingTitle { get; set; } // Właściwość TrainingTitle reprezentująca tytuł treningu
        public DateTime Date { get; set; } // Właściwość Date reprezentująca datę
        public int IdBaseExercise { get; set; } // Właściwość IdBaseExercise reprezentująca identyfikator bazowego ćwiczenia
        public string ExerciseName { get; set; } // Właściwość ExerciseName reprezentująca nazwę ćwiczenia
    }
}