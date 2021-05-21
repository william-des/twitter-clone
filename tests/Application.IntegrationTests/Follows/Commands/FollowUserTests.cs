using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Follows.Commands.FollowUserCommand;
using TwitterClone.Domain.Entities;
using static TwitterClone.Application.IntegrationTests.Testing;

namespace TwitterClone.Application.IntegrationTests.Follows.Commands
{
    public class FollowUserCommandTests : TestBase
    {
        [Test]
        public async Task ShouldRequireValidUserId()
        {
            var command = new FollowUserCommand { UserId = 123};

            await RunAsDefaultDomainUserAsync();

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldCreateFollow()
        {
            var userId = await RunAsDefaultDomainUserAsync();

            var followed = new User { Username = "Followed", FullName = "Followed", ApplicationUserId = "Testing" };
            await AddAsync(followed);

            var follow = await FindAsync<Follow>(userId, followed.Id);
            follow.Should().BeNull();

            var command = new FollowUserCommand { UserId = followed.Id };
            await SendAsync(command);

            follow = await FindAsync<Follow>(userId, followed.Id);
            follow.Should().NotBeNull();
        }
    }
}