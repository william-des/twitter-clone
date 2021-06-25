using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Conversations.Commands.CreateConversation;
using TwitterClone.Domain.Entities;
using static TwitterClone.Application.IntegrationTests.Testing;

namespace TwitterClone.Application.IntegrationTests.Conversations.Commands
{
    public class CreateConversationTests : TestBase
    {
        [Test]
        public void ShouldRequireAtLestOneOtherMember()
        {
            var command = new CreateConversationCommand();

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ShouldRequireValidMemberIds()
        {
            await RunAsDefaultDomainUserAsync();

            var command = new CreateConversationCommand
            {
                Members = new List<int> { 123, 42 }
            };
            
            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldCreateConversation()
        {
            var userId = await RunAsDefaultDomainUserAsync();

            var member1 = new User { FullName = "Member One", Username = "m_one" };
            await AddAsync(member1);

            var member2 = new User { FullName = "Member Two", Username = "m_two" };
            await AddAsync(member2);
            
            var command = new CreateConversationCommand
            {
                Members = new List<int> { member1.Id, member2.Id }
            };
            var createdId = await SendAsync(command);

            var created = await FirstOrDefaultAsync<Conversation>(c => c.Id == createdId, include: c => c.Members);

            created.Should().NotBeNull();
            created.Members.Should().Contain(m => m.Id == member1.Id);
            created.Members.Should().Contain(m => m.Id == member2.Id);
            created.Members.Should().Contain(m => m.Id == userId);
        }
    }
}