using backend.Entities;

namespace backend.Interfaces;

public interface IHistoryRepository
{
    public Task<IEnumerable<History>> GetHistory( int userId);
}