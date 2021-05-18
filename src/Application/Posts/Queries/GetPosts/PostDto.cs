using System;
using System.Linq;
using AutoMapper;
using TwitterClone.Application.Common.Mappings;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Posts.Queries.GetPosts
{
    public class PostDto : IMapFrom<Post>
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public UserDto CreatedBy { get; set; }
        public string MediaId { get; set; }
        public UserDto LikedBy { get; set; }
        public bool LikedByMe { get; set; }
        public int Likes { get; set; }

        public void Mapping(Profile profile) {
            int userId = 0;
            profile.CreateMap<Post, PostDto>()
                .ForMember(dto => dto.Likes, opt => opt.MapFrom(p => p.Likes.Count()))
                .ForMember(dto => dto.LikedBy, opt => opt.MapFrom(Post.GetUserWhoLikedFollowedBy(userId)))
                .ForMember(dto => dto.LikedByMe, opt => opt.MapFrom(Post.IsLikedBy(userId)));
        }
    }
}