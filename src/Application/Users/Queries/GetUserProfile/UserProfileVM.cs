namespace TwitterClone.Application.Users.Queries.GetUserProfile
{
    public class UserProfileVM
    {
        public ProfileUserDto User { get; set; }
        public int PostsCount { get; set; }
        public int FollowersCount { get; set; }
        public int FollowedCount { get; set; }
    }
}