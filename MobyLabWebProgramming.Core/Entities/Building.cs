using MobyLabWebProgramming.Core.Entities;

public class Building : BaseEntity
{
    public int Surface { get; set; } = default!;
    public int RoomsNumber { get; set; } = default!;
    public int? Year { get; set; } = default!;
    public Guid AddressId { get; set; }
    public Address Address { get; set; } = default!;
    public Guid AnnouncementId { get; set; }
    public Announcement Announcement { get; set; } = default!;
}