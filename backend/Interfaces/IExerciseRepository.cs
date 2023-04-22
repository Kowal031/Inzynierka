using backend.Dto;
using backend.Entities;

namespace backend.Interfaces;

public interface IExerciseRepository
{
    public Task<Exercise> GetExercise(int id);
    public Task<Exercise> AddExercise(ExerciseDto exercise);
}