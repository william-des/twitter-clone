using System;
using System.Collections.Generic;
using System.Linq;
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

            var query = new GetUserPostsQuery { UserId = userId };

            var result = await SendAsync(query);

            result.Should().HaveCount(2);
            result.Should().Contain(p => p.Content == "Post 1");
            result.Should().Contain(p => p.Content == "Post 2");
            result.Should().NotContain(p => p.Content == "Post 3");
            
        }

        [Test]
        public async Task ShouldReturnRequestedPostsCount()
        {
            var userId = await RunAsDefaultDomainUserAsync();

            await AddRangeAsync(new List<Post> {
                new Post { Content = "Post 1"},
                new Post { Content = "Post 2"},
                new Post { Content = "Post 3"},
            });

            var query = new GetUserPostsQuery { Count = 2, UserId = userId};
            var result = await SendAsync(query);

            result.Count().Should().Be(query.Count);
        }

        
        [Test]
        public async Task ShouldReturnPostsBeforeRequestId()
        {
            var userId = await RunAsDefaultDomainUserAsync();

            var post1 = new Post { Content = "Post 1"};
            await AddAsync(post1);
            var post2 = new Post { Content = "Post 2"};
            await AddAsync(post2);
            var post3 = new Post { Content = "Post 3"};
            await AddAsync(post3);

            var query = new GetUserPostsQuery { BeforeId = post3.Id, UserId = userId };
            var result = await SendAsync(query);

            result.Should().Contain(p => p.Id == post1.Id);
            result.Should().Contain(p => p.Id == post2.Id);
        }
    }
}