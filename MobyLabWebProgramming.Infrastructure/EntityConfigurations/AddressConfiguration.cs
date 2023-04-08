
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class AddressConfiguration : IEntityTypeConfiguration<Address>
{
    public void Configure(EntityTypeBuilder<Address> builder)
    {
        builder.Property(e => e.Id) // This specifies which property is configured.
            .IsRequired(); // Here it is specified if the property is required, meaning it cannot be null in the database.
        builder.HasKey(x => x.Id); // Here it is specifies that the property Id is the primary key.
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.Property(e => e.County)
            .HasMaxLength(31)
            .IsRequired();
        builder.Property(e => e.City)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.Street)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.Number)
            .IsRequired();
    }
}