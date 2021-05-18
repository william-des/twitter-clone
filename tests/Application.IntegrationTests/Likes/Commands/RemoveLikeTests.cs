using System;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Posts.Commands.RemoveLike;
using TwitterClone.Domain.Entities;
using static Testing;

namespace TwitterClone.Application.IntegrationTests.Likes.Commands
{
    public class RemoveLikeCommandTests : TestBase
    {
        [Test]
        public async Task ShouldRequireValidPostId()
        {
            var command = new RemoveLikeCommand { PostId = 123};

            await RunAsDefaultDomainUserAsync();

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldRemoveLike()
        {
            var authorId = await RunAsDomainUserAsync("testingAuthor", "Testing123!", Array.Empty<string>());

            var post = new Post { Content = "Test", CreatedById = authorId};
            await AddAsync(post);

            var userId = await RunAsDefaultDomainUserAsync();

            var like = new Like { PostId = post.Id };
            await AddAsync(like);

            var command = new RemoveLikeCommand { PostId = post.Id };
            await SendAsync(command);

            like = await FindAsync<Like>(userId, post.Id);
            like.Should().BeNull();
        }
    }
}