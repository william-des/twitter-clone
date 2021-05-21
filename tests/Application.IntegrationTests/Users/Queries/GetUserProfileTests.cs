using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Users.Queries.GetUserProfile;
using TwitterClone.Domain.Entities;
using static TwitterClone.Application.IntegrationTests.Testing;

namespace TwitterClone.Application.IntegrationTests.Users.Queries
{
    public class GetUserProfileTests : TestBase
    {
        [Test]
        public void ShouldRequireValidUsername()
        {
            var query = new GetUserProfileQuery { Username = "invalidUsername" };

            FluentActions.Invoking(() =>
                SendAsync(query)).Should().Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldReturnUser()
        {
            var user = new User {
                Username = "johndoe",
                FullName = "John Doe",
                ApplicationUserId = "123",
                Website="kim.com",
                Location="Vice City",
                Description="My name is Doe, John Doe",
            };
            await AddAsync(user);

            var query = new GetUserProfileQuery { Username = user.Username };

            var result = await SendAsync(query);

            result.User.Id.Should().Be(user.Id);
            result.User.FullName.Should().Be(user.FullName);
            result.User.Username.Should().Be(user.Username);
            result.User.Website.Should().Be(user.Website);
            result.User.Location.Should().Be(user.Location);
            result.User.Description.Should().Be(user.Description);
        }

        [Test]
        public async Task ShouldReturnFollowersCount()
        {
            var user = new User {
                Username = "johndoe",
                FullName = "John Doe",
                ApplicationUserId = "1"
            };
            await AddAsync(user);

            var follower = new User {
                Username = "follower1",
                FullName = "follower1",
                ApplicationUserId = "2"
            };
            await AddAsync(follower);

            var query = new GetUserProfileQuery { Username = user.Username };
            var result = await SendAsync(query);
            result.FollowersCount.Should().Be(0);

            await AddAsync(new Follow { FollowerId = follower.Id, FollowedId = user.Id});
            result = await SendAsync(query);
            result.FollowersCount.Should().Be(1);
        }

        [Test]
        public async Task ShouldReturnFollowedCount()
        {
            var user = new User {
                Username = "johndoe",
                FullName = "John Doe",
                ApplicationUserId = "1"
            };
            await AddAsync(user);

            var followed = new User {
                Username = "followed1",
                FullName = "followed1",
                ApplicationUserId = "2"
            };
            await AddAsync(followed);
            await AddAsync(new Follow { FollowerId = followed.Id, FollowedId = user.Id});

            var query = new GetUserProfileQuery { Username = user.Username };
            var result = await SendAsync(query);
            result.FollowedCount.Should().Be(0);

            await AddAsync(new Follow { FollowerId = user.Id, FollowedId = followed.Id});
            result = await SendAsync(query);
            result.FollowedCount.Should().Be(1);
        }

        [Test]
        public async Task ShouldReturnPostsCount()
        {
            var user = new User {
                Username = "johndoe",
                FullName = "John Doe",
                ApplicationUserId = "1"
            };
            await AddAsync(user);

            await AddAsync(new Post { Content = "Post 1", CreatedById = user.Id});
            await AddAsync(new Post { Content = "Post 2", CreatedById = user.Id});
            await AddAsync(new Post { Content = "Post 3", CreatedById = user.Id});

            var query = new GetUserProfileQuery { Username = user.Username };

            var result = await SendAsync(query);

            result.PostsCount.Should().Be(3);
        }
    }
}