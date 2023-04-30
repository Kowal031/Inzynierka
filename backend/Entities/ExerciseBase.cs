namespace backend.Entities;

public class ExerciseBase
{
    public int? Id { get; set; }
    public string? Name { get; set; }
    public int? ShouldersInjuryGenerating { get; set; }
    public int? ChestInjuryGenerating { get; set; }
    public int? BackInjuryGenerating { get; set; }
    public int? BicepsInjuryGenerating { get; set; }
    public int? TricepsInjuryGenerating { get; set; }
    public int? AbdominalInjuryGenerating { get; set; }
    public int? ButtocksInjuryGenerating { get; set; }
    public int? QuadricepsInjuryGenerating { get; set; }
    public int? HamstringsInjuryGenerating { get; set; }
    public int? ClavesInjuryGenerating { get; set; }
}