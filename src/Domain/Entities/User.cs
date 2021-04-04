namespace TwitterClone.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string ApplicationUserId { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
    }
}