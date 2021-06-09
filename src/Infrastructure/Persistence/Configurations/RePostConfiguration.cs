using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Infrastructure.Persistence.Configurations
{
    public class RePostConfiguration : IEntityTypeConfiguration<RePost>
    {
        public void Configure(EntityTypeBuilder<RePost> builder)
        {
            builder.HasKey(r => new { r.CreatedById, r.PostId });
            builder.Ignore(r => r.DomainEvents);
        }
    }
}