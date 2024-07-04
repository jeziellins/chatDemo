namespace Chat.WebAPI.ViewModels
{
    public class MessageViewModel
    {
        public Guid TargetUserId { get; set; }
        public required string Text { get; set; }

    }
}
