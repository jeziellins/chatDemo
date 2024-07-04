namespace Chat.Model
{
    public class Message
    {
        public Guid Id { get; set; }
        public DateTime ReceiveAt { get; set; }
        public Guid SourceUserId { get; set; }
        public Guid TargetUserId { get; set; }
        public required string Text { get; set; }
    }
}
