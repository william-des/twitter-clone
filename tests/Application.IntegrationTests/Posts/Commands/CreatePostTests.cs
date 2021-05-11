using System;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Posts.Commands.CreatePost;
using TwitterClone.Domain.Entities;
using static Testing;

namespace TwitterClone.Application.IntegrationTests.Posts.Commands
{
    public class CreatePostTests : TestBase
    {
        [Test]
        public void ShouldRequireMinimumFields()
        {
            var command = new CreatePostCommand();

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ShouldCreatePost()
        {
            var userId = await RunAsDefaultDomainUserAsync();

            var command = new CreatePostCommand {
                Content = "Tesla stock price is too high imo"
            };

            var id = await SendAsync(command);

            var post = await FindAsync<Post>(id);

            post.Should().NotBeNull();
            post.Content.Should().Be(command.Content);
            post.CreatedById.Should().Be(userId);
            post.Created.Should().BeCloseTo(DateTime.Now, 10000);
        }
    }
}