namespace backend.Dto;

public class ExerciseDto
{
    public int IdTraining { get; set; }
    public string Name { get; set; }
    public int IdExerciseBase { get; set; }
    
    public int UserId { get; set; }
    public int NumberOfSeries { get; set; }
}