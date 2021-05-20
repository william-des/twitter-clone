using System;
using System.Collections.Generic;
using TwitterClone.Domain.Common;

namespace TwitterClone.Domain.Entities
{
    public class User : AuditableEntity
    {
        public int Id { get; set; }
        public string ApplicationUserId { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public Media Picture { get; set; }
        public Guid? PictureId { get; set; }
        public Media Banner { get; set; }
        public Guid? BannerId { get; set; }
        public string Location { get; set; }
        public string Website { get; set; }
        public string Description { get; set; }
        public IEnumerable<Follow> Followers { get; set; } = new List<Follow>();
        public IEnumerable<Follow> Followeds { get; set; } = new List<Follow>();
    }
}