using System;
using TwitterClone.Application.Common.Mappings;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Users.Queries.GetUserProfile
{
    public class UserDto : IMapFrom<User>
    { 
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public DateTime Created { get; set; }
        public string PictureId { get; set; }
    }
}