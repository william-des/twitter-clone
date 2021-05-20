using System;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Posts.Queries.GetPosts;
using TwitterClone.Domain.Entities;
using static Testing;

namespace TwitterClone.Application.IntegrationTests.Posts.Queries
{
    public class GetPostsTests : TestBase
    {
        [Test]
        public async Task ShouldReturnAllPosts()
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

        [Test]
        public async Task ShouldReturnPostsLikedByFollowedUsers()
        {
            var authorId = await RunAsDomainUserAsync("author", "Author1234!", Array.Empty<string>());
            var likedPost = new Post { Content = "Liked post" };
            await AddAsync(likedPost);
            var nonLikedPost = new Post { Content = "Liked post" };
            await AddAsync(nonLikedPost);

            var followedId = await RunAsDomainUserAsync("followed", "Followed1234!", Array.Empty<string>());
            await AddAsync(new Like { PostId = likedPost.Id});

            var userId = await RunAsDefaultDomainUserAsync();
            await AddAsync(new Follow { FollowedId = followedId, FollowerId = userId });

            var query = new GetPostsQuery();
            var result = await SendAsync(query);

            result.Should().Contain(p => p.Id == likedPost.Id);
            result.Should().NotContain(p => p.Id == nonLikedPost.Id);
        }

        [Test]
        public async Task ShouldReturnPostsByFollowedUsers()
        {
            var authorId = await RunAsDomainUserAsync("author", "Author1234!", Array.Empty<string>());
            var postByNonFollowedUser = new Post { Content = "Post 1" };
            await AddAsync(postByNonFollowedUser);

            var followedId = await RunAsDomainUserAsync("followed", "Followed1234!", Array.Empty<string>());
            var postByFollowedUser = new Post { Content = "Post 2" };
            await AddAsync(postByFollowedUser);

            var userId = await RunAsDefaultDomainUserAsync();
            await AddAsync(new Follow { FollowedId = followedId, FollowerId = userId });

            var query = new GetPostsQuery();
            var result = await SendAsync(query);

            result.Should().NotContain(p => p.Id == postByNonFollowedUser.Id);
            result.Should().Contain(p => p.Id == postByFollowedUser.Id);
        }

        [Test]
        public async Task ShouldReturnPostsRePostedByFollowedUsers()
        {
            var authorId = await RunAsDomainUserAsync("author", "Author1234!", Array.Empty<string>());
            var rePostedPost = new Post { Content = "Liked post" };
            await AddAsync(rePostedPost);
            var otherPost = new Post { Content = "Liked post" };
            await AddAsync(otherPost);

            var followedId = await RunAsDomainUserAsync("followed", "Followed1234!", Array.Empty<string>());
            await AddAsync(new RePost { PostId = rePostedPost.Id});

            var userId = await RunAsDefaultDomainUserAsync();
            await AddAsync(new Follow { FollowedId = followedId, FollowerId = userId });

            var query = new GetPostsQuery();
            var result = await SendAsync(query);

            result.Should().Contain(p => p.Id == rePostedPost.Id);
            result.Should().NotContain(p => p.Id == otherPost.Id);
        }
    }
}