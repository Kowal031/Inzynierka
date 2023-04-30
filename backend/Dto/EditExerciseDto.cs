namespace backend.Entities;

public class EditExerciseDto
{
    public int Id {get; set;}
    public int IdTraining {get; set;}
    public string TreningTitle {get; set;}
    public string Name {get; set;}
    public int IdExerciseBase {get; set;}
    public int NumberOfSeries {get; set;}
}