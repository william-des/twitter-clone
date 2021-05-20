using MediatR;

namespace TwitterClone.Application.RePosts.Commands.RemoveRePost
{
    public class RemoveRePostCommand : IRequest
    {
        public int PostId { get; set; }
    }
}