using TwitterClone.Domain.Common;
using System.Threading.Tasks;

namespace TwitterClone.Application.Common.Interfaces
{
    public interface IDomainEventService
    {
        Task Publish(DomainEvent domainEvent);
    }
}
