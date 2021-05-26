using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using TwitterClone.Application.Posts.Queries.GetPostAnswers;
using TwitterClone.Domain.Entities;
using static TwitterClone.Application.IntegrationTests.Testing;

namespace TwitterClone.Application.IntegrationTests.Posts.Queries
{
    public class GetPostAnswersTests : TestBase
    {
        [Test]
        public async Task ShouldReturnAllAnswers()
        {
            var userId = await RunAsDefaultDomainUserAsync();

            var post = new Post { Content = "Post !" };
            await AddAsync(post);
            var answer = new Post { AnswerToId = post.Id, Content = "Post answer"};
            await AddAsync(answer);

            var otherPost = new Post { Content = "Other post !" };
            await AddAsync(otherPost);
            var otherPostAnswer = new Post { AnswerToId = otherPost.Id, Content = "Other post answer"};
            await AddAsync(otherPostAnswer);

            var query = new GetPostAnswersQuery { PostId = post.Id };
            var result = await SendAsync(query);

            result.Should().HaveCount(1);
            result.Should().Contain(p => p.Id == answer.Id);
        }
    }
}
