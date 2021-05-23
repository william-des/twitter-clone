using System;
using MediatR;

namespace TwitterClone.Application.Posts.Commands.CreatePost
{
    public class CreatePostCommand : IRequest<int>
    {
        public string Content { get; set; }
        public Guid? MediaId { get; set; }
        public int? AnswerToId { get; set; }
    }
}