using System.Data;
using backend.Context;
using backend.Entities;
using backend.Interfaces;
using Dapper;

public class UserRepository : IUserRepository
{
    private readonly IDbConnection _dbConnection;
    private readonly DapperContext _context;

    public UserRepository(DapperContext context) => _context = context;
    public UserRepository(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public async Task<User> GetUserByEmail(string email)
    {
        var query = "SELECT * FROM Users WHERE Email = @Email";
        using var connection = _context.CreateConnection();
        var user = await connection.QueryFirstOrDefaultAsync<User>(query, new { Email = email });

        return user;
    }

    public async Task AddUser(User user)
    {
        var query = "INSERT INTO Users (Email, Password) VALUES (@Email, @Password)";
        using var connection = _context.CreateConnection();
        await connection.ExecuteAsync(query, user);
       
    }
}