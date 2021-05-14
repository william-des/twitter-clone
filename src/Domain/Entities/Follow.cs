namespace TwitterClone.Domain.Entities
{
    public class Follow
    {
        public User Follower { get; set; }
        public int FollowerId { get; set; }
        public User Followed { get; set; }
        public int FollowedId { get; set; }
    }
}