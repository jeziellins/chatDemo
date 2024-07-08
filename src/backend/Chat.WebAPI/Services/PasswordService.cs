using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace Chat.WebAPI.Services
{
    public class PasswordService
    {
        private readonly ILogger<PasswordService> _logger;
        private readonly PasswordHasher<string> _passwordHasher;

        public PasswordService(IOptions<PasswordHasherOptions> options, ILogger<PasswordService> logger)
        {
            _passwordHasher = new PasswordHasher<string>(options);
            _logger = logger;
        }

        public string HashPassword(string email, string password)
        {
            try
            {
                return _passwordHasher.HashPassword(email, password);
            }
            catch (Exception ex)
            {
                _logger.LogError("[PasswordService/HashPassword] - {message}", ex.Message);
                throw;
            }
        }

        public bool VerifyPassword(string email, string passwordHash, string password)
        {
            try
            {
                var result = _passwordHasher.VerifyHashedPassword(email, passwordHash, password);
                return result == PasswordVerificationResult.Success;
            }
            catch (Exception ex)
            {
                _logger.LogError("[PasswordService/VerifyPassword] - {message}", ex.Message);
                throw;
            }
        }
    }
}
