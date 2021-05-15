using MediatR;

namespace TwitterClone.Application.Users.Queries.GetUserProfile
{
    public class GetUserProfileQuery : IRequest<UserProfileVM>
    {
        public string Username { get; set; }
    }
}