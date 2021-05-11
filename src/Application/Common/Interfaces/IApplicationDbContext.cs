using TwitterClone.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace TwitterClone.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<User> DomainUsers { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
