using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Follows.Queries.GetFollowSuggestions;
using TwitterClone.Domain.Entities;
using static TwitterClone.Application.IntegrationTests.Testing;

namespace TwitterClone.Application.IntegrationTests.Follows.Queries
{
    public class GetFollowSuggestionsTests : TestBase
    {
        [Test]
        public async Task ShouldReturnSuggestions()
        {
            var notFollowed = new User { Username = "notfollowed", FullName = "NotFollowed"};
            await AddAsync(notFollowed);
            var notFollowed2 = new User { Username = "notfollowed2", FullName = "NotFollowed"};
            await AddAsync(notFollowed2);
            var followed = new User { Username = "Followed", FullName = "Followed" };
            await AddAsync(followed);

            var userId = await RunAsDefaultDomainUserAsync();
            await AddAsync(new Follow { FollowerId = userId, FollowedId = followed.Id });

            var query = new GetFollowSuggestionsQuery();
            var result = await SendAsync(query);

            result.Should().Contain(u => u.Id == notFollowed.Id);
            result.Should().Contain(u => u.Id == notFollowed2.Id);
            result.Should().NotContain(u => u.Id == followed.Id);
        }
    }
}