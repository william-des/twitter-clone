using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using TwitterClone.Domain.Common;

namespace TwitterClone.Domain.Entities
{
    public class Post : AuthorAuditableEntity
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public Guid? MediaId { get; set; }
        public Media Media { get; set; }
        public IEnumerable<Like> Likes { get; set; }

        public static Expression<Func<Post,bool>> LikedBySomeoneFollowedBy(int userId) {
            return p => p.Likes.Any(l => l.CreatedBy.Followers.Any(f => f.FollowerId == userId));
        }

        public static Expression<Func<Post,bool>> AuthorFollowedBy(int userId) {
            return p => p.CreatedBy.Followers.Any(f => f.FollowerId == userId);
        }

        public static Expression<Func<Post, User>> GetUserWhoLikedFollowedBy(int userId) {
            return p => p.Likes.Select(l => l.CreatedBy).FirstOrDefault(u => u.Followers.Any(f => f.FollowerId == userId));
        }

        public static Expression<Func<Post, bool>> IsLikedBy(int userId) {
            return p => p.Likes.Any(l => l.CreatedById == userId);
        }
    }
}