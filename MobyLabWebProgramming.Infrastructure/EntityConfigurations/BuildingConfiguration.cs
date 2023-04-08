using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

public class BuildingConfiguration : IEntityTypeConfiguration<Building>
{
    public void Configure(EntityTypeBuilder<Building> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();
        builder.Property(e => e.Surface)
            .IsRequired();
        builder.Property(e => e.RoomsNumber)
            .IsRequired();
        builder.Property(e => e.Year)
            .IsRequired(false);
        builder.HasOne(e => e.Address)
            .WithMany(e => e.Buildings)
            .HasForeignKey(e => e.AddressId)
            .HasPrincipalKey(e => e.Id)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade); // This specifies the delete behavior when the referenced entity is removed.
        builder.HasOne(e => e.Announcement)
            .WithOne(e => e.Building)
            .HasForeignKey<Announcement>(e => e.BuildingId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}