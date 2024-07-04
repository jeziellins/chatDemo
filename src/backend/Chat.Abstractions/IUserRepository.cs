namespace Chat.Abstractions
{
    public interface IUserRepository
    {
        Task<(Guid Id, string Hash)> GetUserHashAsync(string email);
    }
}
