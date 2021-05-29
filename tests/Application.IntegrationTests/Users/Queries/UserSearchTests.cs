using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Users.Queries.UserSearch;
using TwitterClone.Domain.Entities;
using static TwitterClone.Application.IntegrationTests.Testing;

namespace TwitterClone.Application.IntegrationTests.Users.Queries
{
    public class UserSearchTests : TestBase
    {
        [Test]
        public void ShouldRequireValidSearchTerms()
        {
            var query = new UserSearchQuery();

            FluentActions.Invoking(() =>
                SendAsync(query)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ShouldReturnMatchingUsers()
        {
            var matchingUser = new User {
                Username = "johndoe",
                FullName = "John Doe",
            };
            await AddAsync(matchingUser);

            var matchingUser2 = new User {
                Username = "Johndoes",
                FullName = "John Does",
            };
            await AddAsync(matchingUser2);

            var otherUser = new User {
                Username = "cnolan",
                FullName = "Christopher Nolan",
            };
            await AddAsync(otherUser);

            var query = new UserSearchQuery { Search = "John" };

            var result = await SendAsync(query);

            result.Should().Contain(u => u.Id == matchingUser.Id);
            result.Should().Contain(u => u.Id == matchingUser2.Id);
            result.Should().NotContain(u => u.Id == otherUser.Id);
        }

        [Test]
        public async Task ShouldPutPerfectMatchesFirst()
        {

            var matching = new User {
                Username = "Johndoes",
                FullName = "John Does",
            };
            await AddAsync(matching);

            var perfectMatching = new User {
                Username = "johndoe",
                FullName = "John Doe",
            };
            await AddAsync(perfectMatching);

            var query = new UserSearchQuery { Search = "johndoe" };

            var result = await SendAsync(query);

            result.First().Id.Should().Be(perfectMatching.Id);
        }

        [Test]
        public async Task ShouldPutFollowedsFirst()
        {

            var otherUser = new User {
                Username = "Johndoes",
                FullName = "John Does",
            };
            await AddAsync(otherUser);

            var followed = new User {
                Username = "johndoe",
                FullName = "John Doe",
            };
            await AddAsync(followed);

            var userId = await RunAsDefaultDomainUserAsync();
            await AddAsync(new Follow { FollowerId = userId, FollowedId = followed.Id});

            var query = new UserSearchQuery { Search = "john" };

            var result = await SendAsync(query);

            result.First().Id.Should().Be(followed.Id);
        }
    }
}