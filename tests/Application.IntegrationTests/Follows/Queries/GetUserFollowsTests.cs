using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Follows.Queries.GetUserFollows;
using TwitterClone.Domain.Entities;
using static Testing;

namespace TwitterClone.Application.IntegrationTests.Follows.Queries
{
    public class GetUserFollowsTests : TestBase
    {
        [Test]
        public async Task ShouldReturnUserFollows()
        {
            var userId = await RunAsDefaultDomainUserAsync();

            var followed = new User { Username = "Followed", FullName = "Followed", ApplicationUserId = "Testing" };
            await AddAsync(followed);
            await AddAsync(new Follow { FollowerId = userId, FollowedId = followed.Id});

            var follower = new User { Username = "Follower", FullName = "Follower", ApplicationUserId = "Testing" };
            await AddAsync(follower);
            await AddAsync(new Follow { FollowerId = follower.Id, FollowedId = userId});

            var query = new GetUserFollowsQuery { UserId = userId };
            
            var result = await SendAsync(query);

            result.FollowedIds.Should().BeEquivalentTo(new int[] { followed.Id });
            result.FollowerIds.Should().BeEquivalentTo(new int[] { follower.Id });
        }
    }
}