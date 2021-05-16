using System;
using TwitterClone.Application.Common.Mappings;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Posts.Queries.GetUserPosts
{
    public class PostDto : IMapFrom<Post>
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public UserDto CreatedBy { get; set; }
        public string MediaId { get; set; }
    }
}