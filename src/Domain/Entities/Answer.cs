namespace TwitterClone.Domain.Entities
{
    public class Answer : Post
    {
        public Post AnswerTo { get; set; }
        public int AnswerToId { get; set; }
    }
}