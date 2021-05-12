using MediatR;

namespace TwitterClone.Application.Users.Queries.GetUserByApplicationId
{
    public class GetUserByApplicationIdQuery : IRequest<UserDto>
    {
        public string ApplicationUserId { get; set; }
    }
}