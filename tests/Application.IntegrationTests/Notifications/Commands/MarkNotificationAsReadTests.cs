using System;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Notifications.Commands.MarkNotificationAsRead;
using TwitterClone.Domain.Entities;
using static TwitterClone.Application.IntegrationTests.Testing;

namespace TwitterClone.Application.IntegrationTests.Notifications.Commands
{
    public class MarkNotificationAsReadTests : TestBase
    {
        [Test]
        public void ShouldRequireExistingId()
        {
            var command = new MarkNotificationAsReadCommand { Id = 123 };

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldMarkNotificationAsRead()
        {
            var userId = await RunAsDefaultDomainUserAsync();

            var notification = new Notification { Type = NotificationType.Follow, ForUserId = userId, Read = false };
            await AddAsync(notification);

            await SendAsync(new MarkNotificationAsReadCommand { Id = notification.Id});

            var result = await FindAsync<Notification>(notification.Id);

            result.Read.Should().BeTrue();
        }

        [Test]
        public async Task ShouldPreventUpdateFromOtherUser()
        {
            var userId = await RunAsDefaultDomainUserAsync();

            var notification = new Notification { Type = NotificationType.Follow, ForUserId = userId, Read = false };
            await AddAsync(notification);

            await RunAsDomainUserAsync("OtherUser", "OtherUser123!", Array.Empty<string>());

            var command = new MarkNotificationAsReadCommand { Id = notification.Id};
            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ForbiddenAccessException>();
        }
    }
}