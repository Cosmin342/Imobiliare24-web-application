using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
{
	public void Configure(EntityTypeBuilder<Notification> builder)
	{
		builder.Property(e => e.Id)
			.IsRequired();
		builder.Property(e => e.CreatedAt)
			.IsRequired();
		builder.Property(e => e.UpdatedAt)
			.IsRequired();
		builder.Property(e => e.Title)
			.HasMaxLength(255)
			.IsRequired();
		builder.Property(e => e.Content)
			.HasMaxLength(2047)
			.IsRequired();
	}
}