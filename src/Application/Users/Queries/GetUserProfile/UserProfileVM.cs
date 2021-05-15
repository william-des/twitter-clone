namespace TwitterClone.Application.Users.Queries.GetUserProfile
{
    public class UserProfileVM
    {
        public UserDto User { get; set; }
        public int PostsCount { get; set; }
        public int FollowersCount { get; set; }
        public int FollowedCount { get; set; }
    }
}