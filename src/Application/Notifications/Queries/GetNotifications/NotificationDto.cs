using AutoMapper;
using TwitterClone.Application.Common.Mappings;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Notifications.Queries.GetNotifications
{
    public class NotificationDto : IMapFrom<Notification>
    {
        public int Id { get; set; }
        public bool Read { get; set; }
        public int PostId { get; set; }
        public string PostContent { get; set; }
        public UserDto CreatedBy { get; set; }
        public NotificationType Type { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Notification, NotificationDto>()
                .ForMember(dto => dto.PostContent, opt => opt.MapFrom(n => n.Post.Content));
        }
    }
}