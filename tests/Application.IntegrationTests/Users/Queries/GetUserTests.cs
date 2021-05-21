using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Users.Queries.GetUser;
using TwitterClone.Domain.Entities;
using static TwitterClone.Application.IntegrationTests.Testing;

namespace TwitterClone.Application.IntegrationTests.Users.Queries
{
    public class GetUserTests : TestBase
    {
        [Test]
        public void ShouldRequireValidUserId()
        {
            var query = new GetUserQuery { Id = 99 };

            FluentActions.Invoking(() =>
                SendAsync(query)).Should().Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldReturnUser()
        {
            var user = new User {
                Username = "johndoe",
                FullName = "John Doe",
                ApplicationUserId = "123"
            };
            await AddAsync(user);

            var query = new GetUserQuery { Id = user.Id };

            var result = await SendAsync(query);

            result.Id.Should().Be(user.Id);
            result.FullName.Should().Be(user.FullName);
            result.Username.Should().Be(user.Username);
        }
    }
}