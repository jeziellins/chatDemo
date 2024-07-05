using Chat.Model;

namespace Chat.WebAPI.ViewModels
{
    public class UserViewModel
    {
        public UserViewModel(User user)
        {
            Id = user.Id;
            Name = user.Name;
        }
        public Guid Id { get; private set; }
        public string Name { get; private set; }

    }
}
