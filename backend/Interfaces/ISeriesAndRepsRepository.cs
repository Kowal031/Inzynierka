using backend.Dto;
using backend.Entities;

namespace backend.Interfaces;

public interface ISeriesAndRepsRepository
{
    public Task<SeriesAndReps> GetSeriesAndReps(int id); 
    public Task<SeriesAndReps> GetSeriesAndRepsByExerciseAndSeries(int idExercise, int idSeries);
    public Task<SeriesAndReps> AddSeriesAndReps(SeriesAndRepsDto seriesAndRepsDto);
    public Task<IEnumerable<SeriesAndReps>> GetSeriesAndRepsByExerciseId(int id);
    public Task UpdateSeriesAndReps(SeriesAndRepsDto[] seriesAndReps);
}