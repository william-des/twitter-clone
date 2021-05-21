using System;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Posts.Queries.GetUserPosts;
using TwitterClone.Domain.Entities;
using static TwitterClone.Application.IntegrationTests.Testing;

namespace TwitterClone.Application.IntegrationTests.Posts.Queries
{
    public class GetUserPostsTest : TestBase
    {
        [Test]
        public async Task ShouldReturnUserPosts()
        {
            var userId = await RunAsDefaultDomainUserAsync();
            await AddAsync(new Post { Content = "Post 1", CreatedById = userId});
            await AddAsync(new Post { Content = "Post 2", CreatedById = userId});

            var otherUserId = await RunAsDomainUserAsync("otheruser", "Testing123!", Array.Empty<string>());
            await AddAsync(new Post { Content = "Post 3", CreatedById = otherUserId});

            var query = new GetUserPostsQuery { Id = userId };

            var result = await SendAsync(query);

            result.Should().HaveCount(2);
            result.Should().Contain(p => p.Content == "Post 1");
            result.Should().Contain(p => p.Content == "Post 2");
            result.Should().NotContain(p => p.Content == "Post 3");
            
        }
    }
}