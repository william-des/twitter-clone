using System;
using MediatR;

namespace TwitterClone.Application.Users.Commands.UpdateUser
{
    public class UpdateUserCommand : IRequest
    {
        public string FullName { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string Website { get; set; }
        public Guid? PictureId { get; set; }
        public Guid? BannerId { get; set; }
    }
}