using System;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Posts.Commands.CreateLike;
using TwitterClone.Domain.Entities;
using static Testing;

namespace TwitterClone.Application.IntegrationTests.Likes.Commands
{
    public class CreateLikeTests : TestBase
    {
        [Test]
        public async Task ShouldRequireValidPostId()
        {
            var command = new CreateLikeCommand { PostId = 123};

            await RunAsDefaultDomainUserAsync();

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldCreateLike()
        {
            var authorId = await RunAsDomainUserAsync("testingAuthor", "Testing123!", Array.Empty<string>());

            var post = new Post { Content = "Test", CreatedById = authorId};
            await AddAsync(post);

            var userId = await RunAsDefaultDomainUserAsync();

            var command = new CreateLikeCommand { PostId = post.Id };
            await SendAsync(command);

            var like = await FindAsync<Like>(userId, post.Id);
            like.Should().NotBeNull();
        }
    }
}