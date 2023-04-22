using backend.Dto;
using backend.Entities;

namespace backend.Interfaces;

public interface ITrainingRepository
{
    public Task<IEnumerable<Training>> GetTrainings();
    public Task<Training> GetTraining(int id);
    public Task<Training> CreateTraining(TrainingDto training);
}