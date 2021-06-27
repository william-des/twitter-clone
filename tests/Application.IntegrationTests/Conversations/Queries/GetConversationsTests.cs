using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Conversations.Queries.GetConversations;
using TwitterClone.Domain.Entities;
using static TwitterClone.Application.IntegrationTests.Testing;

namespace TwitterClone.Application.IntegrationTests.Conversations.Queries
{
    public class GetConversationsTests : TestBase
    {
        [Test]
        public async Task ShouldReturnConversationsWithLastMessage()
        {
            var userId = await RunAsDefaultDomainUserAsync();
            var user = await FindAsync<User>(userId);

            var conversation = new Conversation
            {
                Members = new List<User> { user },
                Messages = new List<Message> { new Message { Content = "First message" }}
            };
            await AddAsync(conversation);

            var lastMessage = new Message { Content = "Last message", ConversationId = conversation.Id };
            await AddAsync(lastMessage);

            var result = await SendAsync(new GetConversationsQuery());
            result.Should().Contain(c => c.Id == conversation.Id && c.LastMessage.Content == lastMessage.Content);
        }

        [Test]
        public async Task ShouldReturnOnlyUsersConversations()
        {
            var userId = await RunAsDefaultDomainUserAsync();
            var user = await FindAsync<User>(userId);

            var conversation1 = new Conversation
            {
                Members = new List<User> { user },
            };
            await AddAsync(conversation1);

            var otherUser = new User { FullName = "Other", Username = "other"};
            await AddAsync(otherUser);

            var conversation2 = new Conversation
            {
                Members = new List<User> { user, otherUser },
            };
            await AddAsync(conversation2);

            var conversationWithoutUser = new Conversation
            {
                Members = new List<User> { otherUser },
            };
            await AddAsync(conversationWithoutUser);

            var result = await SendAsync(new GetConversationsQuery());
            result.Should().Contain(c => c.Id == conversation1.Id);
            result.Should().Contain(c => c.Id == conversation2.Id);
            result.Should().NotContain(c => c.Id == conversationWithoutUser.Id);
        }
    }
}