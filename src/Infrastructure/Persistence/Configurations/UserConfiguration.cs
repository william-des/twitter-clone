using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Infrastructure.Persistence.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasIndex(e => e.ApplicationUserId).IsUnique();
            builder.Property(e => e.FullName).HasMaxLength(60);
            builder.Property(e => e.Username).HasMaxLength(30);
            builder.HasIndex(e => e.Username).IsUnique();
        }
    }
}