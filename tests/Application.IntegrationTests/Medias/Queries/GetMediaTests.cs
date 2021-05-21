
using System;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Medias.Queries.GetMedia;
using TwitterClone.Domain.Entities;
using static TwitterClone.Application.IntegrationTests.Testing;

namespace TwitterClone.Application.IntegrationTests.Medias.Queries
{
    public class GetMediaTests: TestBase
    {
        [Test]
        public void ShouldRequireValidMediaId()
        {
            var query = new GetMediaQuery { Id = Guid.Empty };

            FluentActions.Invoking(() =>
                SendAsync(query)).Should().Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldReturnMedia()
        {
            var media = new Media { Content = new byte[] { 0x42 }, ContentType="image/jpeg", FileName="test.jpg"};
            await AddAsync(media);
            
            var query = new GetMediaQuery { Id = media.Id };

            var result = await SendAsync(query);

            result.Id.Should().Be(media.Id);
            result.Content.Should().BeEquivalentTo(media.Content);
            result.ContentType.Should().Be(media.ContentType);
            result.FileName.Should().Be(media.FileName);
        }
    }
}