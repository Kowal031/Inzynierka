using backend.Dto;
using backend.Entities;

namespace backend.Interfaces;

public interface IExerciseRepository
{
    
    public Task<IEnumerable<Exercise>> GetExercise();
    public Task<IEnumerable<Exercise>> GetExerciseByTrainingId(int id);
    public Task<Exercise> GetExercise(int id);
    public Task DeleteExercise(int id);
    public Task DeleteExercises(int id);
    public Task<Exercise> AddExercise(ExerciseDto exercise);
}