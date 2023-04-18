namespace MobyLabWebProgramming.Core.Entities;
public class Announcement : BaseEntity
{
    public string Title { get; set; } = default!;
    public string? Description { get; set; } = default!;
    public int Price { get; set; } = default!;
    public bool IsActive { get; set; } = default!;
    public Guid BuildingId { get; set; }
    public Building Building { get; set; } = default!;
    public Guid UserId { get; set; }
    public User User { get; set; } = default!;
    public ICollection<AnnouncementUser> SubscribedUsers { get; set; } = default!;
}
