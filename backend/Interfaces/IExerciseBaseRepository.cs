using backend.Entities;

namespace backend.Interfaces;

public interface IExerciseBaseRepository
{
    public Task<IEnumerable<ExerciseBase>> GetExerciseBase();
}