using System;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Users.Commands.CreateUser;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Domain.Entities;
using static TwitterClone.Application.IntegrationTests.Testing;

namespace TwitterClone.Application.IntegrationTests.Users.Commands
{
    public class CreateUserTests : TestBase
    {
        [Test]
        public void ShouldRequireMinimumFields()
        {
            var command = new CreateUserCommand();

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ShouldRequireAvailableUsername()
        {
            await AddAsync(new User { Username = "TestUsername"});

            var command = new CreateUserCommand {
                Username = "TestUsername",
                FullName = "John Doe",
            };

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ShouldThrowExceptionIfUserAlreadyHasAProfile()
        {
            var userId = await RunAsDefaultUserAsync();

            await AddAsync(new User { Username = "TestUsername"});

            var command = new CreateUserCommand {
                Username = "TestUsername",
                FullName = "John Doe"
            };

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<Exception>();
        }

        [Test]
        public async Task ShouldCreateUser()
        {
            var userId = await RunAsDefaultUserAsync();

            var command = new CreateUserCommand {
                Username = "TestUsername",
                FullName = "John Doe",
                ApplicationUserId = userId
            };

            var id = await SendAsync(command);

            var user = await FindAsync<User>(id);

            user.Should().NotBeNull();
            user.Username.Should().Be(command.Username);
            user.FullName.Should().Be(command.FullName);
            user.ApplicationUserId.Should().Be(command.ApplicationUserId);
        }
    }
}