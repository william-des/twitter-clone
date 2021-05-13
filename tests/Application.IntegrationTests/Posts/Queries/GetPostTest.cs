using System;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Posts.Queries.GetPost;
using TwitterClone.Domain.Entities;
using static Testing;

namespace TwitterClone.Application.IntegrationTests.Posts.Queries
{
    public class GetPostTest: TestBase
    {
        [Test]
        public void ShouldRequireValidUserId()
        {
            var query = new GetPostQuery { Id = 99 };

            FluentActions.Invoking(() =>
                SendAsync(query)).Should().Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldReturnPost()
        {
            var userId = await RunAsDomainUserAsync("test","Testing1234!", Array.Empty<string>());

            var media = new Media { Content = new byte[] { 0x42 }, ContentType="image/jpeg", FileName="test.jpg"};
            await AddAsync(media);
            
            var post = new Post {
                Content = "Testing post",
                CreatedById = userId,
                MediaId = media.Id
            };
            await AddAsync(post);

            var query = new GetPostQuery { Id = post.Id };

            var result = await SendAsync(query);

            result.Id.Should().Be(post.Id);
            result.Content.Should().Be(post.Content);
            result.CreatedBy.Id.Should().Be(userId);
            result.MediaId.Should().Be(media.Id.ToString());
        }
    }
}