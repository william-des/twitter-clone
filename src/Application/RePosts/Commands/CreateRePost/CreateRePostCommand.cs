using MediatR;

namespace TwitterClone.Application.RePosts.Commands.CreateRePost
{
    public class CreateRePostCommand : IRequest
    {
        public int PostId { get; set; }
    }
}