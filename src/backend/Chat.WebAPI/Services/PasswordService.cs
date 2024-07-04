using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace Chat.WebAPI.Services
{
    public class PasswordService
    {
        private readonly PasswordHasher<string> _passwordHasher;

        public PasswordService(IOptions<PasswordHasherOptions> options)
        {
            _passwordHasher = new PasswordHasher<string>(options);
        }

        public string HashPassword(string email, string password)
        {
            return _passwordHasher.HashPassword(email, password);
        }

        public bool VerifyPassword(string email, string passwordHash, string password)
        {
            var result = _passwordHasher.VerifyHashedPassword(email, passwordHash, password);
            return result == PasswordVerificationResult.Success;
        }
    }
}
