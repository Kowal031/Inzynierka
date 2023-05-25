namespace backend.Entities;

public class Exercise
{
    public int Id { get; set; }
    public int IdTraining { get; set; }
    public string Name { get; set; }
    public int IdExerciseBase { get; set; }
    public int NumberOfSeries { get; set; }
    
    public string Description { get; set; }
}