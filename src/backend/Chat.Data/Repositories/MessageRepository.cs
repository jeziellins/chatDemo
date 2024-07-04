using Chat.Abstractions;
using Chat.Model;
using Dapper;
using Microsoft.Extensions.Logging;

namespace Chat.Data.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly ILogger<MessageRepository> _logger;
        private readonly DapperContext _context;

        public MessageRepository(ILogger<MessageRepository> logger, DapperContext context)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<bool> SaveAsync(Message message)
        {
            try
            {
                var query = @"INSERT INTO messages (""Id"", ""ReceiveAt"", ""SourceUserId"", ""TargetUserId"", ""Text"") VALUES (@Id, @ReceiveAt, @SourceUserId, @TargetUserId, @Text)";

                using var connection = _context.CreateConnection();
                await connection.ExecuteAsync(query, message);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError("[MessageRepository/SaveAsync] - {message}", ex.Message);
                return false;
            }
        }

        public async Task<IEnumerable<Message>> GetMessageAsync(Guid sourceUserId, Guid targetUserId, DateTime dateTimeOfLastMessage)
        {
            var query = @"SELECT * FROM 
(SELECT 
	                    *
                    FROM
	                    messages 
                    WHERE 
	                    ""SourceUserId"" = @SourceUserId 
	                    AND ""TargetUserId"" = @TargetUserId 	
	                    AND ""ReceiveAt"" < @DateTimeOfLastMessage
                    UNION ALL
                    SELECT 
	                    * 
                    FROM 
	                    messages 
                    WHERE 
	                    ""SourceUserId"" = @TargetUserId 
	                    AND ""TargetUserId"" = @SourceUserId 	
	                    AND ""ReceiveAt"" < @DateTimeOfLastMessage
                    ORDER BY ""ReceiveAt"" DESC LIMIT 10) AS msg 
ORDER BY ""ReceiveAt"" ASC;";

            try
            {
                var parameters = new
                {
                    SourceUserId = sourceUserId,
                    TargetUserId = targetUserId,
                    DateTimeOfLastMessage = dateTimeOfLastMessage
                };

                using var connection = _context.CreateConnection();
                var messages = await connection.QueryAsync<Message>(query, parameters);
                return messages;
            }
            catch (Exception ex)
            {
                _logger.LogError("[MessageRepository/SaveAsync] - {message}", ex.Message);
                throw;
            }
        }

        public Task<IEnumerable<User>> GetChatsAsync(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}
