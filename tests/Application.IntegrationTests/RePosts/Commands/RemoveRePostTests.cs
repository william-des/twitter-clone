using System;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.RePosts.Commands.RemoveRePost;
using TwitterClone.Domain.Entities;
using static Testing;

namespace TwitterClone.Application.IntegrationTests.RePosts.Commands
{
    public class RemoveRePostTests : TestBase
    {
        [Test]
        public async Task ShouldRequireValidPostId()
        {
            var command = new RemoveRePostCommand { PostId = 123};

            await RunAsDefaultDomainUserAsync();

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<NotFoundException>();
        }
        
        [Test]
        public async Task ShouldRemoveRePost()
        {
            await RunAsDomainUserAsync("author","Testing123!", Array.Empty<string>());
            var post = new Post { Content = "Testing" };
            await AddAsync(post);

            var userId = await RunAsDefaultDomainUserAsync();
            var rePost = new RePost { PostId = post.Id };
            await AddAsync(rePost);

            var command = new RemoveRePostCommand { PostId = post.Id };
            await SendAsync(command);

            rePost = await FindAsync<RePost>(userId, post.Id);
            rePost.Should().BeNull();
        }
    }
}