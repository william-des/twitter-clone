using System;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Users.Commands.UpdateUser;
using TwitterClone.Domain.Entities;
using static TwitterClone.Application.IntegrationTests.Testing;

namespace TwitterClone.Application.IntegrationTests.Users.Commands
{
    public class UpdateUserTests : TestBase
    {
        [Test]
        public void ShouldRequireMinimumFields()
        {
            var command = new UpdateUserCommand();

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ShouldRequireDomainUser()
        {
            var command = new UpdateUserCommand { FullName = "John Doe"};

            await RunAsDefaultUserAsync(); 

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ForbiddenAccessException>();
        }

        [Test]
        public async Task ShouldRequireValidPictureId()
        {
            var command = new UpdateUserCommand { FullName = "John Doe", PictureId = Guid.Empty };

            await RunAsDefaultDomainUserAsync(); 

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ShouldRequireValidBannerId()
        {
            var command = new UpdateUserCommand { FullName = "John Doe", BannerId = Guid.Empty };

            await RunAsDefaultDomainUserAsync(); 

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ShouldUpdateUser()
        {
            var userId = await RunAsDefaultDomainUserAsync();

            var banner = new Media {
                FileName = "banner.jpg",
                ContentType = "image/jpeg",
                Content = new byte[] { 0x42} 
            };
            await AddAsync(banner);

            var picture = new Media {
                FileName = "picture.jpg",
                ContentType = "image/jpeg",
                Content = new byte[] { 0x24 } 
            };
            await AddAsync(picture);

            var command = new UpdateUserCommand {
                FullName = "John Doe",
                Description = "My name is Doe, John Doe",
                Website = "kim.com",
                Location = "Vice City",
                PictureId = picture.Id,
                BannerId = banner.Id
            };

            await SendAsync(command);

            var user = await FindAsync<User>(userId);

            user.Should().NotBeNull();
            user.FullName.Should().Be(command.FullName);
            user.Description.Should().Be(command.Description);
            user.Website.Should().Be(command.Website);
            user.Location.Should().Be(command.Location);
            user.BannerId.Should().Be(banner.Id);
            user.PictureId.Should().Be(picture.Id);
        }
    }
}