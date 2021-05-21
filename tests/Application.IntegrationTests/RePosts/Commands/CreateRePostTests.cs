using System;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.RePosts.Commands.CreateRePost;
using TwitterClone.Domain.Entities;
using static TwitterClone.Application.IntegrationTests.Testing;

namespace TwitterClone.Application.IntegrationTests.RePosts.Commands
{
    public class CreateRePostTests : TestBase
    {
        [Test]
        public async Task ShouldRequireValidPostId()
        {
            var command = new CreateRePostCommand { PostId = 123};

            await RunAsDefaultDomainUserAsync();

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldCreateRePost()
        {
            await RunAsDomainUserAsync("author","Testing123!", Array.Empty<string>());
            var post = new Post { Content = "Testing" };
            await AddAsync(post);

            var userId = await RunAsDefaultDomainUserAsync();
            var command = new CreateRePostCommand { PostId = post.Id };
            await SendAsync(command);

            var rePost = await FindAsync<RePost>(userId, post.Id);
            rePost.Should().NotBeNull();
        }
    }
}