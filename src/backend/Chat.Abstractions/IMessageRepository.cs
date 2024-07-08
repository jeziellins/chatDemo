using Chat.Model;

namespace Chat.Abstractions
{
    public interface IMessageRepository
    {
        Task<bool> SaveAsync(Message message);
        Task<IEnumerable<Message>> GetMessageAsync(Guid sourceUserId, Guid targetUserId, DateTime dateTimeOfLastMessage);
    }
}
