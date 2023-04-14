using MobyLabWebProgramming.Core.Entities;

public class AnnouncementUser : BaseEntity
{
    public Guid AnnouncementId { get; set; }
    public Announcement Announcement { get; set; } = default!;

    public Guid UserId { get; set; }
    public User User { get; set; } = default!;
}
