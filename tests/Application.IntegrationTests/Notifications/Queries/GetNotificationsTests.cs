using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Notifications.Queries.GetNotifications;
using TwitterClone.Domain.Entities;
using static TwitterClone.Application.IntegrationTests.Testing;

namespace TwitterClone.Application.IntegrationTests.Notifications.Queries
{
    public class GetNotificationsTests : TestBase
    {
        [Test]
        public async Task ShouldReturnNotifications()
        {
            var userId = await RunAsDefaultDomainUserAsync();

            var notification = new Notification { Type = NotificationType.Follow, ForUserId = userId, Read = false };
            await AddAsync(notification);

            var notification2 = new Notification { Type = NotificationType.Follow, ForUserId = userId, Read = true };
            await AddAsync(notification2);

            var query = new GetNotificationsQuery();
            
            var result = await SendAsync(query);

            result.TotalUnread.Should().Be(1);
            result.Notifications.Should().Contain(n => n.Id == notification.Id);
            result.Notifications.Should().Contain(n => n.Id == notification2.Id);
        }
    }
}