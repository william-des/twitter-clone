using System;
namespace TwitterClone.Application.IntegrationTests.Posts.Queries
{
    using System.Threading.Tasks;
    using FluentAssertions;
    using NUnit.Framework;
    using TwitterClone.Application.Posts.Queries.GetPosts;
    using TwitterClone.Domain.Entities;
    using static Testing;

    public class GetPostsTests : TestBase
    {
        [Test]
        public async Task ShouldReturnAllPostsWithUsers()
        {
            var userId = await RunAsDomainUserAsync("test","Testing1234!", Array.Empty<string>());

            await AddAsync(new Post { Content = "Post 1", CreatedById = userId});
            await AddAsync(new Post { Content = "Post 2", CreatedById = userId});
            await AddAsync(new Post { Content = "Post 3", CreatedById = userId});

            var query = new GetPostsQuery();

            var result = await SendAsync(query);

            result.Should().HaveCount(3);
            result.Should().Contain(p => p.Content == "Post 1");
            result.Should().Contain(p => p.CreatedBy.FullName == "test");
        }
    }
}