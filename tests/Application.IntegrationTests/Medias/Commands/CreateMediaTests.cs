using System.IO;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Medias.Commands.CreateMedia;
using TwitterClone.Domain.Entities;
using static TwitterClone.Application.IntegrationTests.Testing;

namespace TwitterClone.Application.IntegrationTests.Medias.Commands
{
    public class CreateMediaTests : TestBase
    {
        [Test]
        public void ShouldRequireMinimumFields()
        {
            var command = new CreateMediaCommand();

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ShouldCreateMedia()
        {
            var buffer = new byte[] { 0x42, 0x42};

            var command = new CreateMediaCommand {
                FileName = "test.png",
                ContentType = "image/png",
                Length = buffer.Length,
                OpenReadStream = () => new MemoryStream(buffer)
            };

            var id = await SendAsync(command);

            var media = await FindAsync<Media>(id);

            media.Should().NotBeNull();
            media.ContentType.Should().Be(command.ContentType);
            media.Content.Should().BeEquivalentTo(buffer);
        }
    }
}