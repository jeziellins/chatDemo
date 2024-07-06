using Chat.Abstractions;
using Chat.Model;
using Dapper;
using Microsoft.Extensions.Logging;

namespace Chat.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ILogger<UserRepository> _logger;
        private readonly DapperContext _context;

        public UserRepository(ILogger<UserRepository> logger, DapperContext context)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync(Guid userId)
        {
            var query = @"SELECT * FROM users WHERE ""Id"" <> @Id ORDER BY ""Name"" ASC";

            try
            {   
                using var connection = _context.CreateConnection();
                var parameters = new
                {
                    Id = userId
                };
                return await connection.QueryAsync<User>(query, parameters);
            }
            catch (Exception ex)
            {
                _logger.LogError("[UserRepository/GetAllUsersAsync] - {message}", ex.Message);
                throw;
            }
        }

        public async Task<(Guid Id, string Hash)> GetUserHashAsync(string email)
        {
            var query = @"SELECT ""Id"", ""PasswordHash"" FROM users WHERE ""Email"" = @Email;";

            try
            {
                var parameters = new
                {
                    Email = email
                };

                using var connection = _context.CreateConnection();                
                return await connection.QueryFirstAsync<(Guid Id, string hash)>(query, parameters);
            }
            catch (Exception ex)
            {
                _logger.LogError("[UserRepository/GetUserHash] - {message}", ex.Message);
                throw;
            }
        }
    }
}
