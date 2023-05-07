using backend.Entities;

namespace backend.Interfaces;

public interface IUserRepository
{
    Task<User> GetUserByEmail(string email);

    Task AddUser(User user);
}