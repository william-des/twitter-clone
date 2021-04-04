using MediatR;

namespace TwitterClone.Application.Users.Commands.CreateUser
{
    public class CreateUserCommand : IRequest<int>
    {
        public string FullName { get; set; }
        public string Username { get; set; }
        public string ApplicationUserId { get; set; }
    }
}