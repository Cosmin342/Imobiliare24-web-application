using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

public class AnnouncementUserConfiguration : IEntityTypeConfiguration<AnnouncementUser>
{
    public void Configure(EntityTypeBuilder<AnnouncementUser> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasOne(e => e.User)
            .WithMany(e => e.FollowedAnnouncements)
            .HasForeignKey(e => e.UserId)
            .HasPrincipalKey(e => e.Id)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
        builder.HasOne(e => e.Announcement)
            .WithMany(e => e.SubscribedUsers)
            .HasForeignKey(e => e.AnnouncementId)
            .HasPrincipalKey(e => e.Id)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}