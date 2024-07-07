using Chat.Model;

namespace Chat.Abstractions
{
    public interface IUserRepository
    {
        Task<(Guid Id, string Hash)> GetUserHashAsync(string email);
        Task<IEnumerable<User>> GetAllUsersAsync(Guid userId);
        Task<User> GetUser(Guid userId);
    }
}
