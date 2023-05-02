namespace backend.Entities;

public class History
{
    public int IdExercise { get; set; }
 
    public int Reps { get; set; }
    public int Weight { get; set; }
    public int TrainingId { get; set; }
    public string TrainingTitle { get; set; }
    public DateTime Date { get; set; }
    public int IdBaseExercise { get; set; }
    public string ExerciseName { get; set; }
    
}