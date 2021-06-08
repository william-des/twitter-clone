using System.Linq;
using AutoMapper;
using TwitterClone.Application.Common.Mappings;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Users.Queries.UserSearch
{
    public class SearchUserDto : IMapFrom<User>
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string PictureId { get; set; }
        public bool FollowedByMe { get; set; }

        public void Mapping(Profile profile) {
            var applicationUserId = "";

            profile.CreateMap<User,SearchUserDto>()
                .ForMember(
                    dto => dto.FollowedByMe, 
                    opt => opt.MapFrom(u => !string.IsNullOrWhiteSpace(applicationUserId) 
                        && u.Followers.Any(f => f.Follower.ApplicationUserId == applicationUserId)));
        }
    }
}