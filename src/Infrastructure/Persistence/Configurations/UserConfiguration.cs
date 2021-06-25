using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Infrastructure.Persistence.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasIndex(u => u.ApplicationUserId).IsUnique();
            builder.Property(u => u.FullName).HasMaxLength(60);
            builder.Property(u => u.Username).HasMaxLength(30);
            builder.Property(u => u.Description).HasMaxLength(160);
            builder.Property(u => u.Website).HasMaxLength(100);
            builder.Property(u => u.Location).HasMaxLength(30);
            builder.HasMany(u => u.Conversations).WithMany(c => c.Members);
            builder.HasIndex(u => u.Username).IsUnique();
        }
    }
}