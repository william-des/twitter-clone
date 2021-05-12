using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Users.Queries.GetUserByApplicationId;
using TwitterClone.Domain.Entities;
using static Testing;

namespace TwitterClone.Application.IntegrationTests.Users.Queries
{
    public class GetUserByApplicationIdTests : TestBase
    {
        [Test]
        public void ShouldRequireValidApplicationUserId()
        {
            var query = new GetUserByApplicationIdQuery { ApplicationUserId = "unknown" };

            FluentActions.Invoking(() =>
                SendAsync(query)).Should().Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldReturnUser()
        {
            var userId = await RunAsDefaultUserAsync();

            var user = new User {
                Username = "johndoe",
                FullName = "John Doe",
                ApplicationUserId = userId
            };
            await AddAsync(user);

            var query = new GetUserByApplicationIdQuery { ApplicationUserId = user.ApplicationUserId };

            var result = await SendAsync(query);

            result.Id.Should().Be(user.Id);
            result.FullName.Should().Be(user.FullName);
            result.Username.Should().Be(user.Username);
        }
    }
}